import express from "express";
import path from "path";
import fs from "fs";
import { createServer as createViteServer } from "vite";

const app = express();
const PORT = 3000;
const ORDERS_FILE = path.join(process.cwd(), "orders.json");

// Middleware to parse JSON bodies
app.use(express.json());

// Helper to read orders safely
const readOrders = (): any[] => {
  try {
    if (!fs.existsSync(ORDERS_FILE)) {
      fs.writeFileSync(ORDERS_FILE, JSON.stringify([], null, 2));
      return [];
    }
    const data = fs.readFileSync(ORDERS_FILE, "utf-8");
    return JSON.parse(data || "[]");
  } catch (error) {
    console.error("Error reading orders:", error);
    return [];
  }
};

// Helper to write orders safely
const writeOrders = (orders: any[]): boolean => {
  try {
    fs.writeFileSync(ORDERS_FILE, JSON.stringify(orders, null, 2));
    return true;
  } catch (error) {
    console.error("Error writing orders:", error);
    return false;
  }
};

// --- API ROUTES ---

// 1. POST /api/orders - Create a new order with server-side pricing verification
app.post("/api/orders", (req, res) => {
  try {
    const {
      name,
      phone,
      district,
      upazila,
      address,
      packageId,
      quantity,
      paymentMethod,
      paymentPhone,
      transactionId,
      specialNote,
      couponCode,
    } = req.body;

    // Validation
    if (!name || !phone || !district || !upazila || !address || !packageId || !quantity || !paymentMethod) {
      return res.status(400).json({ error: "সবগুলো প্রয়োজনীয় ক্ষেত্র পূরণ করুন।" });
    }

    if (!/^(?:\+88|01)?\d{11}$/.test(phone.replace(/[\s-]/g, ""))) {
      return res.status(400).json({ error: "সঠিক ১১ ডিজিটের বাংলাদেশী মোবাইল নম্বর প্রদান করুন।" });
    }

    // Verify package and compute prices server-side
    let basePrice = 0;
    let weight = "";
    let packageName = "";

    if (packageId === "pkg-250g") {
      basePrice = 890;
      weight = "২৫০ গ্রাম";
      packageName = "স্টার্টার ট্রায়াল প্যাক (হিরো প্যাক)";
    } else if (packageId === "pkg-500g") {
      basePrice = 1590;
      weight = "৫০০ গ্রাম";
      packageName = "ফ্যামিলি পপুলার প্যাক";
    } else if (packageId === "pkg-1000g") {
      basePrice = 3190;
      weight = "১০০০ গ্রাম (১ কেজি)";
      packageName = "মেগা লাইফস্টাইল প্যাক";
    } else {
      return res.status(400).json({ error: "নির্বাচিত প্যাকেজটি সঠিক নয়।" });
    }

    const qty = Math.max(1, parseInt(quantity) || 1);
    const subtotal = basePrice * qty;
    const deliveryCharge = 100; // Flat delivery charge nationwide

    // Apply simple coupon logic if present
    let discount = 0;
    const cleanCoupon = couponCode ? couponCode.trim().toUpperCase() : "";
    if (cleanCoupon === "KHAN10") {
      discount = Math.round(subtotal * 0.10); // 10% discount on first order
    } else if (cleanCoupon === "HERBAL50") {
      discount = 50; // Special ৳50 discount
    } else if (cleanCoupon === "KHAN100") {
      discount = 100; // Special ৳100 discount
    }

    const total = subtotal + deliveryCharge - discount;

    const orders = readOrders();

    // Prevent duplicate orders submitted in the last 1 minute with same phone and package
    const now = new Date();
    const duplicate = orders.find(
      (o) =>
        o.phone === phone &&
        o.packageId === packageId &&
        (now.getTime() - new Date(o.createdAt).getTime()) < 60000
    );

    if (duplicate) {
      return res.status(409).json({ error: "এই নম্বরে ইতিমধ্যে একটি অর্ডার প্রক্রিয়াধীন রয়েছে। অনুগ্রহ করে ১ মিনিট অপেক্ষা করুন।" });
    }

    // Generate Order ID
    const orderId = `KHH-${now.getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;

    const newOrder = {
      id: orderId,
      name,
      phone,
      district,
      upazila,
      address,
      packageId,
      packageName,
      weight,
      quantity: qty,
      paymentMethod,
      paymentPhone: paymentPhone || "",
      transactionId: transactionId || "",
      specialNote: specialNote || "",
      couponCode: couponCode || "",
      status: "pending",
      subtotal,
      deliveryCharge,
      discount,
      total,
      createdAt: now.toISOString(),
    };

    orders.unshift(newOrder); // Add to beginning of array
    writeOrders(orders);

    res.status(201).json({ success: true, order: newOrder });
  } catch (error) {
    console.error("Server error creating order:", error);
    res.status(500).json({ error: "অর্ডারটি প্রসেস করতে ত্রুটি হয়েছে। অনুগ্রহ করে আবার চেষ্টা করুন।" });
  }
});

// 2. GET /api/orders - Get all orders, protected by admin passkey
app.get("/api/orders", (req, res) => {
  const secret = req.query.secret;
  if (secret !== "KhanAdmin2026") {
    return res.status(401).json({ error: "অননুমোদিত অ্যাক্সেস। সঠিক পাসকি প্রদান করুন।" });
  }
  const orders = readOrders();
  res.json(orders);
});

// 3. POST /api/orders/update - Update order status, protected by admin passkey
app.post("/api/orders/update", (req, res) => {
  const { secret, orderId, status } = req.body;
  if (secret !== "KhanAdmin2026") {
    return res.status(401).json({ error: "অননুমোদিত অ্যাক্সেস। সঠিক পাসকি প্রদান করুন।" });
  }
  if (!orderId || !status) {
    return res.status(400).json({ error: "অর্ডার আইডি এবং স্ট্যাটাস প্রদান করা আবশ্যক।" });
  }

  const orders = readOrders();
  const index = orders.findIndex((o) => o.id === orderId);
  if (index === -1) {
    return res.status(404).json({ error: "অর্ডারটি খুঁজে পাওয়া যায়নি।" });
  }

  orders[index].status = status;
  writeOrders(orders);

  res.json({ success: true, order: orders[index] });
});

// 4. GET /api/analytics - Business analytics for Admin Panel
app.get("/api/analytics", (req, res) => {
  const secret = req.query.secret;
  if (secret !== "KhanAdmin2026") {
    return res.status(401).json({ error: "অননুমোদিত অ্যাক্সেস।" });
  }

  const orders = readOrders();
  const totalRevenue = orders
    .filter((o) => o.status === "completed" || o.status === "pending")
    .reduce((sum, o) => sum + o.total, 0);

  const totalOrders = orders.length;
  const pendingOrders = orders.filter((o) => o.status === "pending").length;
  const completedOrders = orders.filter((o) => o.status === "completed").length;

  const packageCounts: Record<string, number> = {};
  orders.forEach((o) => {
    packageCounts[o.packageName] = (packageCounts[o.packageName] || 0) + o.quantity;
  });

  let popularPackage = "তথ্য নেই";
  let maxCount = 0;
  for (const [name, count] of Object.entries(packageCounts)) {
    if (count > maxCount) {
      maxCount = count;
      popularPackage = name;
    }
  }

  res.json({
    totalRevenue,
    totalOrders,
    pendingOrders,
    completedOrders,
    popularPackage,
    packageBreakdown: packageCounts,
  });
});

// --- VITE MIDDLEWARE SETUP ---
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    // Development Mode
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    // Production Mode
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Khan Herbal Hub backend server running on http://localhost:${PORT}`);
  });
}

startServer();
