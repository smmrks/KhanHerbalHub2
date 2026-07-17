import React, { useState, useEffect } from 'react';
import { PACKAGES, BD_DISTRICTS } from '../data';
import { 
  ShoppingBag, Phone, User, MapPin, ClipboardList, Gift, ShieldAlert, 
  ArrowRight, CreditCard, Sparkles, CheckCircle2, RefreshCw 
} from 'lucide-react';
import UrgencyTimer from './UrgencyTimer';

interface CheckoutProps {
  selectedPackageId: string;
  onOrderSuccess: (orderData: any) => void;
}

export default function CheckoutOrderForm({ selectedPackageId, onOrderSuccess }: CheckoutProps) {
  // Form State
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [district, setDistrict] = useState('Dhaka (ঢাকা)');
  const [upazila, setUpazila] = useState('');
  const [address, setAddress] = useState('');
  const [packageId, setPackageId] = useState(selectedPackageId || 'pkg-250g');
  const [quantity, setQuantity] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState<'COD' | 'bKash' | 'Nagad' | 'Rocket'>('COD');
  const [paymentPhone, setPaymentPhone] = useState('');
  const [transactionId, setTransactionId] = useState('');
  const [specialNote, setSpecialNote] = useState('');
  const [couponCode, setCouponCode] = useState('');
  
  // UI Helpers
  const [couponApplied, setCouponApplied] = useState(false);
  const [couponDiscount, setCouponDiscount] = useState(0);
  const [appliedCouponCode, setAppliedCouponCode] = useState('');
  const [couponError, setCouponError] = useState('');
  const [validationError, setValidationError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Sync props when selected package changes in parent
  useEffect(() => {
    if (selectedPackageId) {
      setPackageId(selectedPackageId);
    }
  }, [selectedPackageId]);

  // Reset Upazila selection when District changes
  useEffect(() => {
    const availableUpazilas = BD_DISTRICTS[district] || [];
    if (availableUpazilas.length > 0) {
      setUpazila(availableUpazilas[0]);
    } else {
      setUpazila('');
    }
  }, [district]);

  // Find currently selected package details
  const currentPkg = PACKAGES.find(p => p.id === packageId) || PACKAGES[0];

  // Pricing calculations
  const subtotal = currentPkg.price * quantity;
  // Nationwide flat delivery charge of ৳100
  const deliveryCharge = 100;
  const grandTotal = Math.max(0, subtotal + deliveryCharge - couponDiscount);

  // Re-calculate dynamic discount when subtotal changes
  useEffect(() => {
    if (couponApplied && appliedCouponCode === 'KHAN10') {
      setCouponDiscount(Math.round(subtotal * 0.10));
    }
  }, [subtotal, couponApplied, appliedCouponCode]);

  // Coupon application handler
  const handleApplyCoupon = () => {
    setCouponError('');
    const code = couponCode.trim().toUpperCase();
    
    if (!code) {
      setCouponError('অনুগ্রহ করে কুপন কোডটি লিখুন।');
      return;
    }

    if (code === 'KHAN10') {
      const discount = Math.round(subtotal * 0.10);
      setCouponDiscount(discount);
      setCouponApplied(true);
      setAppliedCouponCode('KHAN10');
    } else if (code === 'HERBAL50') {
      setCouponDiscount(50);
      setCouponApplied(true);
      setAppliedCouponCode('HERBAL50');
    } else if (code === 'KHAN100') {
      setCouponDiscount(100);
      setCouponApplied(true);
      setAppliedCouponCode('KHAN100');
    } else {
      setCouponError('দুঃখিত, কুপন কোডটি সঠিক নয় বা মেয়াদ শেষ!');
      setCouponApplied(false);
      setCouponDiscount(0);
      setAppliedCouponCode('');
    }
  };

  // Order Submission Handler
  const handleSubmitOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError('');
    
    // Strict Field Validations
    if (!name.trim()) {
      setValidationError('অনুগ্রহ করে আপনার সম্পূর্ণ নাম লিখুন।');
      return;
    }
    
    const formattedPhone = phone.trim().replace(/[\s-]/g, "");
    if (!formattedPhone) {
      setValidationError('মোবাইল নম্বর দেওয়া আবশ্যক।');
      return;
    }
    
    // Validate BD phone format: length 11 digits, starts with 01
    const bdPhoneRegex = /^(?:\+88)?01[3-9]\d{8}$/;
    if (!bdPhoneRegex.test(formattedPhone)) {
      setValidationError('অনুগ্রহ করে একটি সঠিক ১১ ডিজিটের বাংলাদেশী মোবাইল নম্বর দিন (যেমন: 016XXXXXXXX)।');
      return;
    }

    if (!district) {
      setValidationError('অনুগ্রহ করে আপনার জেলা নির্বাচন করুন।');
      return;
    }

    if (!upazila) {
      setValidationError('অনুগ্রহ করে আপনার থানা/উপজেলা নির্বাচন করুন।');
      return;
    }

    if (!address.trim() || address.trim().length < 8) {
      setValidationError('অনুগ্রহ করে আপনার সঠিক সম্পূর্ণ ঠিকানা লিখুন (কমপক্ষে ৮ অক্ষর)। যেন কুরিয়ার ম্যান সহজেই পৌঁছাতে পারে।');
      return;
    }

    if (paymentMethod !== 'COD') {
      if (!paymentPhone.trim()) {
        setValidationError(`অনুগ্রহ করে আপনার ${paymentMethod} নম্বরটি প্রদান করুন।`);
        return;
      }
      if (!transactionId.trim() || transactionId.trim().length < 6) {
        setValidationError(`অনুগ্রহ করে সঠিক ${paymentMethod} ট্রানজেকশন আইডি (TrxID) প্রদান করুন।`);
        return;
      }
    }

    setIsSubmitting(true);

    try {
      // POST order to our express backend server API
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: name.trim(),
          phone: formattedPhone,
          district,
          upazila,
          address: address.trim(),
          packageId,
          quantity,
          paymentMethod,
          paymentPhone: paymentPhone.trim(),
          transactionId: transactionId.trim(),
          specialNote: specialNote.trim(),
          couponCode: couponApplied ? couponCode.trim() : '',
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'অর্ডারটি প্রসেস করতে ব্যর্থ হয়েছে।');
      }

      // Success
      onOrderSuccess(result.order);
      
      // Clear Form states
      setName('');
      setPhone('');
      setAddress('');
      setSpecialNote('');
      setCouponCode('');
      setCouponApplied(false);
      setCouponDiscount(0);
      setPaymentPhone('');
      setTransactionId('');
    } catch (err: any) {
      console.error('Checkout submit error:', err);
      setValidationError(err.message || 'নেটওয়ার্ক সংযোগে ত্রুটি হয়েছে। অনুগ্রহ করে আবার চেষ্টা করুন।');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="order" className="py-20 bg-gradient-to-b from-white to-zinc-50 scroll-mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-red-600 font-bold text-xs uppercase tracking-widest block flex items-center justify-center gap-1.5 animate-pulse">
            <span className="w-2 h-2 rounded-full bg-red-600 inline-block" />
            দ্রুত অর্ডার নিশ্চিত করুন (সীমিত স্টক বাকি)
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold font-display text-gray-900 tracking-tight">
            সহজ অর্ডার ফর্ম - <span className="text-emerald-700">ক্যাশ অন ডেলিভারি</span>
          </h2>
          <div className="w-16 h-1 bg-amber-500 mx-auto rounded-full mt-2" />
          <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
            কোনো প্রকার অগ্রিম টাকা ছাড়াই অর্ডার করুন, ডেলিভারিম্যান থেকে বুঝে নিয়ে মূল্য পরিশোধ করুন।
          </p>
        </div>

        {/* Urgency Countdown Timer */}
        <UrgencyTimer />

        {/* Validation Error Banner */}
        {validationError && (
          <div className="max-w-4xl mx-auto mb-8 bg-red-50 border border-red-200 text-red-800 p-4 rounded-2xl flex items-start space-x-3 text-sm animate-in fade-in duration-200">
            <ShieldAlert className="w-5 h-5 shrink-0 text-red-600 mt-0.5" />
            <div className="text-left font-semibold">
              {validationError}
            </div>
          </div>
        )}

        <form onSubmit={handleSubmitOrder} className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-start max-w-6xl mx-auto">
          
          {/* Form Side */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-3xl border border-zinc-200/80 shadow-sm space-y-6">
            
            {/* Step 1: Personal Details */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2 text-emerald-800 border-b border-zinc-100 pb-2">
                <User className="w-5 h-5" />
                <h3 className="text-base sm:text-lg font-bold">১. আপনার তথ্য প্রদান করুন</h3>
              </div>
              
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="text-left">
                  <label htmlFor="fullName" className="block text-xs font-bold text-gray-700 mb-1.5">সম্পূর্ণ নাম <span className="text-red-500">*</span></label>
                  <div className="relative">
                    <input
                      type="text"
                      id="fullName"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="যেমন: মোঃ কামরুল ইসলাম"
                      className="w-full pl-10 pr-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl text-sm focus-ring"
                      required
                    />
                    <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-gray-400" />
                  </div>
                </div>

                <div className="text-left">
                  <label htmlFor="phoneNumber" className="block text-xs font-bold text-gray-700 mb-1.5">সক্রিয় মোবাইল নম্বর <span className="text-red-500">*</span></label>
                  <div className="relative">
                    <input
                      type="tel"
                      id="phoneNumber"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="যেমন: 01608780378"
                      className="w-full pl-10 pr-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl text-sm focus-ring font-mono"
                      required
                    />
                    <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-gray-400" />
                  </div>
                </div>
              </div>
            </div>

            {/* Step 2: Shipping Details */}
            <div className="space-y-4 pt-2">
              <div className="flex items-center space-x-2 text-emerald-800 border-b border-zinc-100 pb-2">
                <MapPin className="w-5 h-5" />
                <h3 className="text-base sm:text-lg font-bold">২. ডেলিভারি ঠিকানা</h3>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="text-left">
                  <label htmlFor="district" className="block text-xs font-bold text-gray-700 mb-1.5">জেলা নির্বাচন করুন <span className="text-red-500">*</span></label>
                  <select
                    id="district"
                    value={district}
                    onChange={(e) => setDistrict(e.target.value)}
                    className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl text-sm focus-ring cursor-pointer"
                    required
                  >
                    {Object.keys(BD_DISTRICTS).map((dist) => (
                      <option key={dist} value={dist}>{dist}</option>
                    ))}
                  </select>
                </div>

                <div className="text-left">
                  <label htmlFor="upazila" className="block text-xs font-bold text-gray-700 mb-1.5">থানা / উপজেলা <span className="text-red-500">*</span></label>
                  <select
                    id="upazila"
                    value={upazila}
                    onChange={(e) => setUpazila(e.target.value)}
                    className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl text-sm focus-ring cursor-pointer"
                    required
                  >
                    {(BD_DISTRICTS[district] || []).map((upa) => (
                      <option key={upa} value={upa}>{upa}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="text-left">
                <label htmlFor="fullAddress" className="block text-xs font-bold text-gray-700 mb-1.5">বিস্তারিত সম্পূর্ণ ঠিকানা <span className="text-red-500">*</span></label>
                <textarea
                  id="fullAddress"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="যেমন: বাড়ি নম্বর, রোড নম্বর, গ্রামের নাম বা এলাকার পরিচিতি উল্লেখ করুন।"
                  className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl text-sm focus-ring h-20 resize-none"
                  required
                />
              </div>
            </div>

            {/* Step 3: Package Configuration */}
            <div className="space-y-4 pt-2">
              <div className="flex items-center space-x-2 text-emerald-800 border-b border-zinc-100 pb-2">
                <ClipboardList className="w-5 h-5" />
                <h3 className="text-base sm:text-lg font-bold">৩. প্যাকেজ ও পরিমাণ নির্বাচন</h3>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="text-left">
                  <label htmlFor="package" className="block text-xs font-bold text-gray-700 mb-1.5">পছন্দের প্যাকেজ <span className="text-red-500">*</span></label>
                  <select
                    id="package"
                    value={packageId}
                    onChange={(e) => setPackageId(e.target.value)}
                    className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl text-sm focus-ring cursor-pointer font-bold text-emerald-800"
                    required
                  >
                    {PACKAGES.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.name} ({p.weight}) - ৳{p.price}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="text-left">
                  <label htmlFor="quantity" className="block text-xs font-bold text-gray-700 mb-1.5">পরিমাণ (Quantity) <span className="text-red-500">*</span></label>
                  <div className="flex items-center space-x-2">
                    <button
                      type="button"
                      onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                      className="px-4 py-2.5 bg-zinc-100 border border-zinc-200 rounded-xl hover:bg-zinc-200 text-lg font-bold"
                      id="qty-minus-btn"
                    >
                      -
                    </button>
                    <input
                      type="number"
                      id="quantity"
                      value={quantity}
                      onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                      className="w-full text-center py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl text-sm font-bold font-mono focus-ring"
                      min="1"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setQuantity(prev => prev + 1)}
                      className="px-4 py-2.5 bg-zinc-100 border border-zinc-200 rounded-xl hover:bg-zinc-200 text-lg font-bold"
                      id="qty-plus-btn"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 4: Payment Methods */}
            <div className="space-y-4 pt-2">
              <div className="flex items-center space-x-2 text-emerald-800 border-b border-zinc-100 pb-2">
                <CreditCard className="w-5 h-5" />
                <h3 className="text-base sm:text-lg font-bold">৪. পেমেন্ট পদ্ধতি নির্বাচন করুন</h3>
              </div>

              {/* Payment Select Cards Grid */}
              <div className="grid grid-cols-2 gap-3">
                {/* Cash on Delivery */}
                <div
                  onClick={() => setPaymentMethod('COD')}
                  className={`border-2 p-4 rounded-2xl cursor-pointer transition-all flex flex-col items-center justify-center text-center space-y-1.5 ${
                    paymentMethod === 'COD'
                      ? 'border-emerald-600 bg-emerald-50/20 text-emerald-950 font-bold'
                      : 'border-zinc-200 hover:border-zinc-300 text-gray-600'
                  }`}
                  id="pay-card-cod"
                >
                  <ShoppingBag className={`w-6 h-6 ${paymentMethod === 'COD' ? 'text-emerald-700' : 'text-gray-400'}`} />
                  <span className="text-xs">ক্যাশ অন ডেলিভারি</span>
                </div>

                {/* bKash */}
                <div
                  onClick={() => setPaymentMethod('bKash')}
                  className={`border-2 p-4 rounded-2xl cursor-pointer transition-all flex flex-col items-center justify-center text-center space-y-1.5 ${
                    paymentMethod === 'bKash'
                      ? 'border-[#e2125d] bg-[#e2125d]/5 text-[#e2125d] font-bold'
                      : 'border-zinc-200 hover:border-zinc-300 text-gray-600'
                  }`}
                  id="pay-card-bkash"
                >
                  <div className="w-7 h-7 bg-[#e2125d] text-white font-bold rounded-lg flex items-center justify-center text-xs shrink-0 select-none">
                    বিকাশ
                  </div>
                  <span className="text-xs">বিকাশ পেমেন্ট</span>
                </div>

                {/* Nagad */}
                <div
                  onClick={() => setPaymentMethod('Nagad')}
                  className={`border-2 p-4 rounded-2xl cursor-pointer transition-all flex flex-col items-center justify-center text-center space-y-1.5 ${
                    paymentMethod === 'Nagad'
                      ? 'border-[#f26522] bg-[#f26522]/5 text-[#f26522] font-bold'
                      : 'border-zinc-200 hover:border-zinc-300 text-gray-600'
                  }`}
                  id="pay-card-nagad"
                >
                  <div className="w-7 h-7 bg-[#f26522] text-white font-bold rounded-lg flex items-center justify-center text-xs shrink-0 select-none">
                    নগদ
                  </div>
                  <span className="text-xs">নগদ পেমেন্ট</span>
                </div>

                {/* Rocket */}
                <div
                  onClick={() => setPaymentMethod('Rocket')}
                  className={`border-2 p-4 rounded-2xl cursor-pointer transition-all flex flex-col items-center justify-center text-center space-y-1.5 ${
                    paymentMethod === 'Rocket'
                      ? 'border-[#8c3494] bg-[#8c3494]/5 text-[#8c3494] font-bold'
                      : 'border-zinc-200 hover:border-zinc-300 text-gray-600'
                  }`}
                  id="pay-card-rocket"
                >
                  <div className="w-7 h-7 bg-[#8c3494] text-white font-bold rounded-lg flex items-center justify-center text-xs shrink-0 select-none">
                    রকেট
                  </div>
                  <span className="text-xs">রকেট পেমেন্ট</span>
                </div>
              </div>

              {/* Digital payment instructions */}
              {paymentMethod !== 'COD' && (
                <div className="bg-zinc-50 border border-zinc-200/80 p-4 rounded-2xl text-left space-y-3 animate-in fade-in duration-200">
                  <div className="text-xs space-y-1">
                    <p className="font-bold text-gray-800">পেমেন্ট করার নিয়মাবলী:</p>
                    <p className="text-gray-600">
                      ১. নিচে দেওয়া আমাদের {paymentMethod} পার্সোনাল নম্বরে মোট <span className="font-bold text-emerald-800">৳{grandTotal}</span> সেন্ড মানি করুন।
                    </p>
                    <p className="font-bold text-gray-800 pt-1">
                      {paymentMethod === 'bKash' && 'বিকাশ নম্বর: +8801608780378'}
                      {paymentMethod === 'Nagad' && 'নগদ নম্বর: +8801608780378'}
                      {paymentMethod === 'Rocket' && 'রকেট নম্বর: +8801518640078'}
                    </p>
                    <p className="text-gray-600">
                      ২. টাকা পাঠানোর পর নিচের ইনপুটে আপনার প্রেরক নম্বর ও ট্রানজেকশন আইডি দিন।
                    </p>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-3">
                    <div>
                      <label htmlFor="payPhone" className="block text-[11px] font-bold text-gray-700 mb-1">প্রেরক {paymentMethod} নম্বর</label>
                      <input
                        type="tel"
                        id="payPhone"
                        value={paymentPhone}
                        onChange={(e) => setPaymentPhone(e.target.value)}
                        placeholder="যেমন: 017XXXXXXXX"
                        className="w-full px-3 py-2.5 bg-white border border-zinc-200 rounded-xl text-xs font-mono focus-ring"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="payTrx" className="block text-[11px] font-bold text-gray-700 mb-1">ট্রানজেকশন আইডি (TrxID)</label>
                      <input
                        type="text"
                        id="payTrx"
                        value={transactionId}
                        onChange={(e) => setTransactionId(e.target.value)}
                        placeholder="যেমন: 8N48F89J"
                        className="w-full px-3 py-2.5 bg-white border border-zinc-200 rounded-xl text-xs font-mono uppercase focus-ring"
                        required
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Special Note */}
            <div className="text-left pt-2">
              <label htmlFor="specialNote" className="block text-xs font-bold text-gray-700 mb-1.5">বিশেষ কোনো নির্দেশনা থাকলে লিখুন (ঐচ্ছিক)</label>
              <textarea
                id="specialNote"
                value={specialNote}
                onChange={(e) => setSpecialNote(e.target.value)}
                placeholder="যেমন: বিকাল ৫ টার পর ডেলিভারি দিন অথবা কোনো বিশেষ নির্দেশনা।"
                className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl text-sm focus-ring h-16 resize-none"
              />
            </div>

          </div>

          {/* Checkout Summary Side */}
          <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-24">
            
            {/* Promo / Coupon Box */}
            <div className="bg-white p-5 rounded-3xl border border-zinc-200/80 shadow-sm text-left">
              <span className="block text-xs font-bold text-gray-700 mb-2 flex items-center gap-1.5">
                <Gift className="w-4 h-4 text-emerald-600" />
                কুপন কোড ব্যবহার করুন
              </span>
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  placeholder="যেমন: KHAN10"
                  className="flex-1 px-3 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl text-xs font-mono uppercase focus-ring"
                  disabled={couponApplied}
                />
                <button
                  type="button"
                  onClick={handleApplyCoupon}
                  className={`px-4 py-2.5 rounded-xl font-bold text-xs cursor-pointer focus:outline-none ${
                    couponApplied 
                      ? 'bg-emerald-100 text-emerald-700' 
                      : 'bg-emerald-950 text-white hover:bg-emerald-900'
                  }`}
                  disabled={couponApplied}
                  id="coupon-apply-btn"
                >
                  {couponApplied ? 'প্রযুক্ত' : 'প্রয়োগ'}
                </button>
              </div>

              {/* Special Suggestion */}
              {!couponApplied && (
                <div className="mt-2 text-[10px] text-emerald-700 font-semibold flex items-center space-x-1">
                  <Sparkles className="w-3.5 h-3.5 animate-spin" />
                  <span>প্রথম অর্ডারে ১০% ছাড় পেতে কুপন কোড "KHAN10" ব্যবহার করুন!</span>
                </div>
              )}

              {couponError && <span className="text-red-500 text-[11px] font-semibold block mt-1.5">{couponError}</span>}
              {couponApplied && (
                <span className="text-emerald-700 text-[11px] font-semibold block mt-1.5 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>কুপন কোড সফলভাবে প্রযুক্ত হয়েছে! ৳{couponDiscount} সাশ্রয় হয়েছে।</span>
                </span>
              )}
            </div>

            {/* Price Calculations Card */}
            <div className="bg-emerald-950 text-white p-6 sm:p-8 rounded-3xl border border-emerald-900 shadow-xl shadow-emerald-950/20 text-left space-y-6">
              <h3 className="text-base sm:text-lg font-bold border-b border-emerald-900 pb-3 flex items-center space-x-2">
                <ShoppingBag className="w-5 h-5 text-amber-400" />
                <span>অর্ডার সামারি (Live)</span>
              </h3>

              <div className="space-y-4">
                {/* Details Item */}
                <div className="flex justify-between items-start text-xs sm:text-sm">
                  <div>
                    <span className="block font-bold text-amber-400">{currentPkg.name}</span>
                    <span className="text-[11px] text-emerald-300 block mt-0.5">ওজন: {currentPkg.weight} × {quantity} টি</span>
                  </div>
                  <span className="font-mono font-bold text-white">৳{subtotal}</span>
                </div>

                {/* Delivery Charge */}
                <div className="flex justify-between items-center text-xs sm:text-sm">
                  <span className="text-gray-300">ডেলিভারি চার্জ (সারাদেশে)</span>
                  <span className="font-mono font-bold">৳{deliveryCharge}</span>
                </div>

                {/* Coupon discount */}
                {couponApplied && (
                  <div className="flex justify-between items-center text-xs sm:text-sm text-amber-400 font-semibold">
                    <span>বিশেষ কুপন ছাড়</span>
                    <span className="font-mono font-bold">-৳{couponDiscount}</span>
                  </div>
                )}

                <div className="border-t border-emerald-900 pt-4 flex justify-between items-baseline">
                  <span className="text-sm font-bold text-white">সর্বমোট মূল্য:</span>
                  <div className="text-right">
                    <span className="text-2xl sm:text-3xl font-black font-mono text-amber-400">৳{grandTotal}</span>
                  </div>
                </div>
              </div>

              {/* Order Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-4 rounded-2xl bg-gradient-to-r from-amber-500 via-amber-400 to-amber-600 text-emerald-950 font-black text-xs sm:text-sm uppercase tracking-wider shadow-lg transform hover:-translate-y-0.5 active:translate-y-0 transition-all flex items-center justify-center space-x-2 cursor-pointer focus:outline-none ${
                  isSubmitting ? 'opacity-85 cursor-not-allowed' : ''
                }`}
                id="submit-order-form-btn"
              >
                {isSubmitting ? (
                  <>
                    <RefreshCw className="w-5 h-5 animate-spin" />
                    <span>অর্ডার লোড হচ্ছে...</span>
                  </>
                ) : (
                  <>
                    <span>অর্ডার নিশ্চিত করুন (৳{grandTotal})</span>
                    <ArrowRight className="w-4.5 h-4.5 animate-pulse" />
                  </>
                )}
              </button>

              <p className="text-[10px] text-center text-emerald-300 font-semibold">
                ✓ অর্ডারের পর কোনো হিডেন চার্জ বা অতিরিক্ত খরচ নেই।
              </p>
            </div>

          </div>

        </form>

      </div>
    </section>
  );
}
