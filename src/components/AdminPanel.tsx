import React, { useState, useEffect } from 'react';
import { 
  Lock, Key, TrendingUp, ShoppingCart, RefreshCw, Clock, CheckCircle, 
  Search, ShieldAlert, FileText, ChevronDown, Trash, BarChart, Download 
} from 'lucide-react';

export default function AdminPanel() {
  const [passkey, setPasskey] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authError, setAuthError] = useState('');
  
  const [orders, setOrders] = useState<any[]>([]);
  const [analytics, setAnalytics] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  
  const [isLoading, setIsLoading] = useState(false);
  const [actionMessage, setActionMessage] = useState('');

  const ADMIN_SECRET = 'KhanAdmin2026';

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passkey === ADMIN_SECRET) {
      setIsAuthenticated(true);
      setAuthError('');
      // Store in session storage for convenience
      sessionStorage.setItem('admin_token', ADMIN_SECRET);
    } else {
      setAuthError('ভুল পাসকি! সঠিক পাসকি দিয়ে আবার চেষ্টা করুন।');
    }
  };

  // Check session on load
  useEffect(() => {
    const token = sessionStorage.getItem('admin_token');
    if (token === ADMIN_SECRET) {
      setIsAuthenticated(true);
    }
  }, []);

  const fetchAdminData = async () => {
    if (!isAuthenticated) return;
    setIsLoading(true);
    try {
      // 1. Fetch Orders
      const ordRes = await fetch(`/api/orders?secret=${ADMIN_SECRET}`);
      if (!ordRes.ok) throw new Error('অর্ডার ডাটা লোড করতে ব্যর্থ হয়েছে।');
      const ordData = await ordRes.json();
      setOrders(ordData);

      // 2. Fetch Analytics
      const alyRes = await fetch(`/api/analytics?secret=${ADMIN_SECRET}`);
      if (!alyRes.ok) throw new Error('বিশ্লেষণ ডাটা লোড করতে ব্যর্থ হয়েছে।');
      const alyData = await alyRes.json();
      setAnalytics(alyData);
    } catch (err: any) {
      console.error(err);
      setActionMessage('ডাটা লোড করতে সমস্যা হয়েছে। অনুগ্রহ করে রিফ্রেশ করুন।');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAdminData();
  }, [isAuthenticated]);

  const handleUpdateStatus = async (orderId: string, newStatus: string) => {
    try {
      const res = await fetch('/api/orders/update', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          secret: ADMIN_SECRET,
          orderId,
          status: newStatus
        })
      });

      const result = await res.json();
      if (!res.ok) throw new Error(result.error || 'আপডেট করতে ব্যর্থ হয়েছে।');

      // Update local states
      setActionMessage(`অর্ডার ${orderId} সফলভাবে ${newStatus} করা হয়েছে!`);
      fetchAdminData();
      setTimeout(() => setActionMessage(''), 4000);
    } catch (err: any) {
      alert(err.message);
    }
  };

  const filteredOrders = orders.filter((o) => {
    const matchesSearch = 
      o.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      o.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      o.phone.includes(searchQuery) ||
      o.district.toLowerCase().includes(searchQuery.toLowerCase());
      
    const matchesStatus = statusFilter === 'all' || o.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  // Export to CSV helper
  const handleExportCSV = () => {
    if (filteredOrders.length === 0) return;
    const headers = ['Order ID', 'Name', 'Phone', 'District', 'Upazila', 'Address', 'Package', 'Qty', 'Total BDT', 'Payment Method', 'Payment Phone', 'TrxID', 'Note', 'Status', 'Date'];
    const csvContent = [
      headers.join(','),
      ...filteredOrders.map(o => [
        o.id,
        `"${o.name.replace(/"/g, '""')}"`,
        o.phone,
        `"${o.district}"`,
        `"${o.upazila}"`,
        `"${o.address.replace(/"/g, '""')}"`,
        `"${o.packageName}"`,
        o.quantity,
        o.total,
        o.paymentMethod,
        o.paymentPhone || '',
        o.transactionId || '',
        `"${(o.specialNote || '').replace(/"/g, '""')}"`,
        o.status,
        o.createdAt
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `KHH-Orders-${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (!isAuthenticated) {
    return (
      <div className="py-32 bg-zinc-50 min-h-screen flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-3xl border border-zinc-200 shadow-xl max-w-md w-full space-y-6 text-center animate-in zoom-in-95">
          <div className="w-16 h-16 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center mx-auto shadow-md">
            <Lock className="w-8 h-8" />
          </div>

          <div className="space-y-2">
            <h1 className="text-xl sm:text-2xl font-black font-display text-gray-900">অ্যাডমিন সিকিউর পোর্টালে লগইন</h1>
            <p className="text-xs text-gray-500 leading-relaxed">
              অর্ডার পরিসংখ্যান ও ব্যবসায়িক বিশ্লেষণ দেখতে অনুগ্রহ করে ভেরিফাইড অ্যাডমিন পাসকি প্রদান করুন।
            </p>
          </div>

          {authError && (
            <div className="bg-red-50 border border-red-200 text-red-800 text-xs p-3 rounded-xl font-semibold flex items-center gap-1.5 justify-center">
              <ShieldAlert className="w-4 h-4 text-red-600" />
              <span>{authError}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4 text-left">
            <div>
              <label htmlFor="passkeyInput" className="block text-xs font-bold text-gray-700 mb-1.5">সিক্রেট পাসকি</label>
              <div className="relative">
                <input
                  type="password"
                  id="passkeyInput"
                  value={passkey}
                  onChange={(e) => setPasskey(e.target.value)}
                  placeholder="পাসকি প্রবেশ করুন..."
                  className="w-full pl-10 pr-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl text-sm focus-ring font-mono"
                  required
                />
                <Key className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-gray-400" />
              </div>
              <span className="text-[10px] text-gray-400 block mt-1">Hint: Use "KhanAdmin2026"</span>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-emerald-950 hover:bg-emerald-900 text-white rounded-xl text-xs font-bold transition-all shadow-md"
              id="admin-login-btn"
            >
              লগইন নিশ্চিত করুন
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <section className="py-24 bg-zinc-50 min-h-screen text-left">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Title */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-zinc-200 pb-5">
          <div>
            <span className="text-emerald-700 font-bold text-xs uppercase tracking-widest block">KHAN HERBAL HUB</span>
            <h1 className="text-2xl sm:text-3xl font-black font-display text-gray-900">ব্যবস্থাপনা অ্যাডমিন ড্যাশবোর্ড</h1>
          </div>
          <div className="flex items-center space-x-3 shrink-0">
            <button
              onClick={fetchAdminData}
              className="flex items-center space-x-1.5 bg-white border border-zinc-200 text-gray-700 hover:text-emerald-800 px-4 py-2.5 rounded-xl text-xs font-semibold shadow-sm cursor-pointer"
              id="admin-refresh-btn"
            >
              <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
              <span>রিফ্রেশ ডাটা</span>
            </button>
            <button
              onClick={() => {
                sessionStorage.removeItem('admin_token');
                setIsAuthenticated(false);
              }}
              className="bg-red-50 hover:bg-red-100 text-red-700 px-4 py-2.5 rounded-xl text-xs font-bold transition-colors cursor-pointer"
              id="admin-logout-btn"
            >
              লগআউট
            </button>
          </div>
        </div>

        {/* Action / Success Status */}
        {actionMessage && (
          <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-4 rounded-2xl text-xs sm:text-sm font-bold flex items-center space-x-2 animate-in fade-in">
            <CheckCircle className="w-5 h-5 text-emerald-600" />
            <span>{actionMessage}</span>
          </div>
        )}

        {/* Analytics Section */}
        {analytics && (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            
            {/* KPI 1 */}
            <div className="bg-white p-5 rounded-3xl border border-zinc-200 shadow-sm flex items-center space-x-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
                <TrendingUp className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[10px] text-gray-400 font-bold uppercase block">মোট রাজস্ব (রাজস্ব)</span>
                <span className="text-lg sm:text-2xl font-black font-mono text-gray-900 mt-0.5">৳{analytics.totalRevenue}</span>
              </div>
            </div>

            {/* KPI 2 */}
            <div className="bg-white p-5 rounded-3xl border border-zinc-200 shadow-sm flex items-center space-x-4">
              <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center shrink-0">
                <ShoppingCart className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[10px] text-gray-400 font-bold uppercase block">মোট অর্ডার সংখ্যা</span>
                <span className="text-lg sm:text-2xl font-black font-mono text-gray-900 mt-0.5">{analytics.totalOrders} টি</span>
              </div>
            </div>

            {/* KPI 3 */}
            <div className="bg-white p-5 rounded-3xl border border-zinc-200 shadow-sm flex items-center space-x-4">
              <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-700 flex items-center justify-center shrink-0">
                <Clock className="w-6 h-6 animate-pulse" />
              </div>
              <div>
                <span className="text-[10px] text-gray-400 font-bold uppercase block">প্রক্রিয়াধীন অর্ডার</span>
                <span className="text-lg sm:text-2xl font-black font-mono text-gray-900 mt-0.5">{analytics.pendingOrders} টি</span>
              </div>
            </div>

            {/* KPI 4 */}
            <div className="bg-white p-5 rounded-3xl border border-zinc-200 shadow-sm flex items-center space-x-4">
              <div className="w-12 h-12 rounded-2xl bg-purple-100 text-purple-700 flex items-center justify-center shrink-0">
                <BarChart className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[10px] text-gray-400 font-bold uppercase block">সর্বাধিক জনপ্রিয় প্যাক</span>
                <span className="text-xs sm:text-sm font-black text-gray-900 block mt-1 truncate max-w-[150px]">{analytics.popularPackage}</span>
              </div>
            </div>

          </div>
        )}

        {/* Filters and List */}
        <div className="bg-white rounded-3xl border border-zinc-200 shadow-sm overflow-hidden">
          
          {/* List Toolbar */}
          <div className="p-6 border-b border-zinc-200/80 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 bg-zinc-50/50">
            <h2 className="text-base sm:text-lg font-bold text-gray-900 flex items-center space-x-2">
              <FileText className="w-5 h-5 text-emerald-800" />
              <span>অর্ডার ডেটা টেবিল ({filteredOrders.length})</span>
            </h2>

            <div className="flex flex-col sm:flex-row gap-3">
              {/* Search input */}
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="নাম, ফোন বা জেলা দিয়ে খুঁজুন..."
                  className="pl-9 pr-4 py-2 bg-white border border-zinc-200 rounded-xl text-xs w-full sm:w-60 focus-ring"
                />
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-gray-400" />
              </div>

              {/* Status filter dropdown */}
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-3 py-2 bg-white border border-zinc-200 rounded-xl text-xs focus-ring cursor-pointer"
              >
                <option value="all">সব স্ট্যাটাস</option>
                <option value="pending">Pending (অপেক্ষমান)</option>
                <option value="processing">Processing (চলমান)</option>
                <option value="completed">Completed (সম্পন্ন)</option>
              </select>

              {/* Export Button */}
              <button
                onClick={handleExportCSV}
                className="flex items-center justify-center space-x-1.5 bg-emerald-900 hover:bg-emerald-800 text-white px-4 py-2 rounded-xl text-xs font-bold transition-colors cursor-pointer"
                id="admin-export-btn"
              >
                <Download className="w-4 h-4" />
                <span>CSV ডাউনলোড</span>
              </button>
            </div>
          </div>

          {/* Table container with responsive horizontal scroll */}
          <div className="overflow-x-auto">
            {filteredOrders.length === 0 ? (
              <div className="p-16 text-center text-gray-400">
                <p className="text-sm font-semibold">কোনো অর্ডারের তথ্য পাওয়া যায়নি!</p>
              </div>
            ) : (
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-zinc-50 border-b border-zinc-200 text-xs font-black text-gray-500 uppercase">
                    <th className="py-4.5 px-6">ID / তারিখ</th>
                    <th className="py-4.5 px-6">গ্রাহকের নাম ও ফোন</th>
                    <th className="py-4.5 px-6">ডেলিভারি ঠিকানা</th>
                    <th className="py-4.5 px-6">পণ্য বিবরণ</th>
                    <th className="py-4.5 px-6">পেমেন্ট পদ্ধতি</th>
                    <th className="py-4.5 px-6">মোট বিল</th>
                    <th className="py-4.5 px-6">স্ট্যাটাস</th>
                    <th className="py-4.5 px-6 text-center">অ্যাকশন</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-100 text-xs sm:text-sm">
                  {filteredOrders.map((o) => {
                    const dateFormatted = new Date(o.createdAt).toLocaleString('bn-BD', {
                      month: 'short',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    });

                    return (
                      <tr key={o.id} className="hover:bg-zinc-50/40 transition-colors">
                        
                        {/* ID / Date */}
                        <td className="py-4 px-6 text-left">
                          <span className="block font-black font-mono text-emerald-800">{o.id}</span>
                          <span className="text-[10px] text-gray-400 font-medium block mt-1">{dateFormatted}</span>
                        </td>

                        {/* Customer Info */}
                        <td className="py-4 px-6 text-left">
                          <span className="block font-bold text-gray-900">{o.name}</span>
                          <span className="block font-mono text-xs text-gray-500 mt-1">{o.phone}</span>
                        </td>

                        {/* Shipping Address */}
                        <td className="py-4 px-6 text-left max-w-[200px]">
                          <span className="block font-bold text-gray-800">{o.district} &gt; {o.upazila}</span>
                          <span className="block text-xs text-gray-500 mt-0.5 truncate" title={o.address}>
                            {o.address}
                          </span>
                        </td>

                        {/* Product Detail */}
                        <td className="py-4 px-6 text-left">
                          <span className="block font-bold text-emerald-900">{o.packageName}</span>
                          <span className="text-xs text-gray-500 mt-0.5 block font-medium">পরিমাণ: {o.quantity} টি</span>
                        </td>

                        {/* Payment Method */}
                        <td className="py-4 px-6 text-left">
                          <span className={`inline-block px-2.5 py-1 rounded-md font-bold text-[10px] ${
                            o.paymentMethod === 'COD' 
                              ? 'bg-emerald-50 text-emerald-800 border border-emerald-100' 
                              : 'bg-red-50 text-red-700 border border-red-100'
                          }`}>
                            {o.paymentMethod}
                          </span>
                          {o.paymentMethod !== 'COD' && (
                            <span className="block text-[10px] text-gray-400 font-mono mt-1">
                              Trx: {o.transactionId}
                            </span>
                          )}
                        </td>

                        {/* Grand Total */}
                        <td className="py-4 px-6 text-left font-black font-mono text-gray-900">
                          ৳{o.total}
                        </td>

                        {/* Status badge */}
                        <td className="py-4 px-6 text-left">
                          <span className={`inline-flex items-center space-x-1 px-2.5 py-1 rounded-full text-[10px] font-black ${
                            o.status === 'completed' 
                              ? 'bg-emerald-100 text-emerald-800' 
                              : o.status === 'processing'
                              ? 'bg-blue-100 text-blue-800'
                              : 'bg-amber-100 text-amber-800'
                          }`}>
                            <span className={`w-1.5 h-1.5 rounded-full inline-block mr-1 ${
                              o.status === 'completed' ? 'bg-emerald-600' : o.status === 'processing' ? 'bg-blue-600' : 'bg-amber-500'
                            }`} />
                            <span className="capitalize">{o.status}</span>
                          </span>
                        </td>

                        {/* Actions drop */}
                        <td className="py-4 px-6 text-center">
                          <div className="flex items-center justify-center space-x-1.5">
                            <button
                              onClick={() => handleUpdateStatus(o.id, 'processing')}
                              className="px-2 py-1 bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 rounded text-[10px] font-bold cursor-pointer"
                              title="Set to Processing"
                            >
                              Process
                            </button>
                            <button
                              onClick={() => handleUpdateStatus(o.id, 'completed')}
                              className="px-2 py-1 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 rounded text-[10px] font-bold cursor-pointer"
                              title="Set to Completed"
                            >
                              Complete
                            </button>
                          </div>
                        </td>

                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
          </div>

        </div>

      </div>
    </section>
  );
}
