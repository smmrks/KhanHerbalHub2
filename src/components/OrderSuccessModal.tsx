import React from 'react';
import { CheckCircle2, Phone, MessageSquare, Home, Sparkles, Calendar, ShieldCheck } from 'lucide-react';

interface OrderSuccessProps {
  order: any;
  onClose: () => void;
}

export default function OrderSuccessModal({ order, onClose }: OrderSuccessProps) {
  if (!order) return null;

  // Calculate estimated delivery dates (2-3 days from today)
  const today = new Date();
  const dateStr1 = new Date(today.getTime() + 2 * 24 * 60 * 60 * 1000).toLocaleDateString('bn-BD', { month: 'long', day: 'numeric' });
  const dateStr2 = new Date(today.getTime() + 3 * 24 * 60 * 60 * 1000).toLocaleDateString('bn-BD', { month: 'long', day: 'numeric' });

  return (
    <div className="fixed inset-0 bg-emerald-950/80 backdrop-blur-md z-50 flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-300">
      
      {/* Decorative floating particles */}
      <div className="absolute top-1/4 left-1/4 w-3 h-3 bg-amber-400 rounded-full animate-ping pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-2 h-2 bg-emerald-400 rounded-full animate-bounce pointer-events-none" />

      {/* Main Container */}
      <div className="bg-white rounded-3xl p-6 sm:p-10 w-full max-w-lg border border-emerald-100 shadow-2xl relative overflow-hidden animate-in zoom-in-95 duration-300 text-center">
        
        {/* Confetti Background Sparkles */}
        <div className="absolute -top-10 -left-10 w-40 h-40 bg-emerald-500/10 rounded-full blur-2xl" />
        <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-amber-500/10 rounded-full blur-2xl" />

        {/* Animated Green Checkmark */}
        <div className="flex justify-center mb-6 relative">
          <div className="absolute inset-0 bg-emerald-100 rounded-full blur-xl scale-125 animate-pulse" />
          <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center relative border-4 border-emerald-500/10 shadow-lg animate-bounce">
            <CheckCircle2 className="w-12 h-12 text-emerald-600" />
          </div>
        </div>

        {/* Congrats Header */}
        <span className="inline-flex items-center space-x-1.5 bg-emerald-50 border border-emerald-100 text-emerald-800 text-xs font-bold px-3 py-1 rounded-full mb-3">
          <Sparkles className="w-3.5 h-3.5 text-amber-500 animate-spin" />
          <span>অর্ডারটি সফলভাবে সম্পন্ন হয়েছে!</span>
        </span>

        <h2 className="text-2xl sm:text-3xl font-black font-display text-gray-900 leading-tight">
          অভিনন্দন, {order.name}!
        </h2>
        <p className="text-gray-500 text-xs sm:text-sm mt-2 max-w-md mx-auto leading-relaxed">
          আপনার অর্ডারটি আমাদের ডাটাবেজে রেকর্ড করা হয়েছে। আমাদের একজন কাস্টমার প্রতিনিধি শিগগিরই আপনার সাথে যোগাযোগ করে অর্ডারটি কনফার্ম করবেন।
        </p>

        {/* Order Details Ticket */}
        <div className="my-6 bg-zinc-50 border border-zinc-200/60 rounded-2xl p-4.5 text-left space-y-3.5">
          <div className="flex justify-between items-center border-b border-zinc-200/60 pb-2.5">
            <span className="text-xs font-bold text-gray-500">অর্ডার ট্র্যাকিং আইডি (Order ID):</span>
            <span className="text-sm font-black font-mono text-emerald-800 bg-emerald-50 border border-emerald-200/50 px-2.5 py-1 rounded-lg">
              {order.id}
            </span>
          </div>

          <div className="space-y-2 text-xs sm:text-sm">
            <div className="flex justify-between">
              <span className="text-gray-500">নির্বাচিত প্যাকেজ:</span>
              <span className="font-bold text-gray-800">{order.packageName}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">পরিমাণ:</span>
              <span className="font-bold text-gray-800">{order.quantity} টি</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">মোট মূল্য (ক্যাশ অন ডেলিভারি):</span>
              <span className="font-black text-amber-600 font-mono">৳{order.total}</span>
            </div>
            <div className="flex justify-between items-start pt-1.5 border-t border-zinc-100">
              <span className="text-gray-500">ডেলিভারি ঠিকানা:</span>
              <span className="font-semibold text-gray-800 text-right max-w-[200px] leading-tight block">
                {order.address}, {order.upazila}, {order.district}
              </span>
            </div>
          </div>

          {/* Delivery Estimation Badge */}
          <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-3 flex items-start space-x-2.5">
            <Calendar className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div className="text-xs">
              <span className="block font-bold text-amber-800">সম্ভাব্য ডেলিভারি সময়:</span>
              <span className="text-amber-700 font-medium">
                {dateStr1} থেকে {dateStr2}-এর মধ্যে।
              </span>
            </div>
          </div>
        </div>

        {/* Support instructions */}
        <div className="bg-emerald-50 border border-emerald-100/50 rounded-xl p-3.5 text-xs text-emerald-800 font-medium mb-8 flex items-center space-x-2 justify-center">
          <ShieldCheck className="w-4.5 h-4.5 text-emerald-600 shrink-0" />
          <span>অর্ডার সংক্রান্ত যেকোনো প্রয়োজনে নিচের বাটনে কল অথবা মেসেজ করুন।</span>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col gap-3">
          <div className="grid grid-cols-2 gap-3">
            <a
              href={`tel:+8801608780378`}
              className="flex items-center justify-center space-x-2 bg-emerald-950 hover:bg-emerald-900 text-white py-3.5 px-4 rounded-xl text-xs font-bold transition-colors shadow-sm"
            >
              <Phone className="w-4 h-4 text-amber-400" />
              <span>কল সাপোর্ট</span>
            </a>
            
            <a
              href={`https://wa.me/8801608780378?text=আমার অর্ডার আইডি: ${order.id}। অনুগ্রহ করে অর্ডারটি জলদি কনফার্ম করুন।`}
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-center space-x-2 bg-green-600 hover:bg-green-700 text-white py-3.5 px-4 rounded-xl text-xs font-bold transition-all shadow-md shadow-green-950/10"
            >
              <MessageSquare className="w-4 h-4" />
              <span>হোয়াটসঅ্যাপ চ্যাট</span>
            </a>
          </div>

          <button
            onClick={onClose}
            className="w-full flex items-center justify-center space-x-2 bg-zinc-100 hover:bg-zinc-200 text-gray-700 py-3 rounded-xl text-xs font-bold transition-colors cursor-pointer focus:outline-none"
            id="success-modal-continue-btn"
          >
            <Home className="w-4 h-4" />
            <span>হোম পেজে ফিরে যান</span>
          </button>
        </div>

      </div>
    </div>
  );
}
