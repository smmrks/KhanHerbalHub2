import React from 'react';
import { 
  ShieldCheck, HelpCircle, Truck, PackageCheck, Verified, Heart, Award, Star, ThumbsUp, Lock
} from 'lucide-react';

export default function TrustSection() {
  const stats = [
    { value: '২৫,০০০+', label: 'সন্তুষ্ট কাস্টমার', sub: 'সারাদেশে বিশ্বস্ত গ্রাহক' },
    { value: '৩০,০০০+', label: 'অর্ডার ডেলিভারি', sub: 'সাফল্যের সাথে সম্পন্ন' },
    { value: '১৮,৫০০+', label: 'পজিটিভ রিভিউ', sub: 'ফেসবুক ও ওয়েবসাইটে' },
    { value: '৯৮.৫%', label: 'সন্তুষ্টির হার', sub: 'গ্রাহকদের অনন্য অভিজ্ঞতা' }
  ];

  const badges = [
    { icon: ShieldCheck, title: '১০০% টাকা ফেরত গ্যারান্টি', desc: 'মান নিয়ে অসন্তুষ্ট হলে ৭ দিনের মধ্যে পূর্ণ অর্থ ফেরত।' },
    { icon: Truck, title: 'দ্রুততম ক্যাশ অন ডেলিভারি', desc: 'সারা বাংলাদেশে নির্ভরযোগ্য কুরিয়ারে ক্যাশ অন ডেলিভারি।' },
    { icon: Verified, title: 'ভেরিফাইড ও রেজিস্টার্ড ব্যবসা', desc: 'খান হারবাল হাব একটি সরকার অনুমোদিত বৈধ ব্যবসায়িক প্রতিষ্ঠান।' },
    { icon: Lock, title: 'সুরক্ষিত পেমেন্ট গেটওয়ে', desc: 'বিকাশ, নগদ ও রকেটে সম্পূর্ণ নিরাপদ ও সুরক্ষিত উপায়ে লেনদেন।' },
    { icon: PackageCheck, title: 'হাইজিনিক নিরাপদ প্যাকেজিং', desc: 'সম্পূর্ণ জীবাণুমুক্ত পরিবেশে প্রিমিয়াম গ্লাস জারে বায়ুশূন্য প্যাকিং।' },
    { icon: Heart, title: 'শতভাগ কাস্টমার প্রাইভেসি', desc: 'প্যাকেজিংয়ের উপরে কোনো গোপন বা স্পর্শকাতর পণ্যের নাম লেখা থাকবে না।' }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-zinc-50 to-emerald-50/20 scroll-mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Animated Statistics Banner */}
        <div className="bg-emerald-950 rounded-3xl p-8 md:p-12 text-white shadow-xl shadow-emerald-950/20 mb-16 relative overflow-hidden">
          {/* Decorative lights */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl" />

          <div className="relative z-10 text-center max-w-3xl mx-auto mb-10">
            <span className="text-amber-400 font-bold text-xs uppercase tracking-widest">খান হারবাল হাব পরিসংখ্যান</span>
            <h3 className="text-2xl md:text-3xl font-bold font-display mt-2">
              আমাদের সততা এবং বিশ্বস্ততার কিছু বাস্তব চিত্র
            </h3>
            <p className="text-emerald-200/80 text-xs sm:text-sm mt-2">
              আমরা কোনো চটকদার বিজ্ঞাপনে বিশ্বাসী নই, আমাদের সেবার গুণগত মানই আমাদের পরিচয় বহন করে।
            </p>
          </div>

          <div className="relative z-10 grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {stats.map((stat, idx) => (
              <div 
                key={idx} 
                className="bg-emerald-900/40 border border-emerald-800/40 p-5 rounded-2xl text-center transform hover:scale-105 transition-transform duration-300"
                id={`stat-box-${idx}`}
              >
                <span className="block font-display text-2xl md:text-4xl font-black text-amber-400 font-mono tracking-tight leading-none mb-2">
                  {stat.value}
                </span>
                <span className="block text-sm md:text-base font-bold text-white">
                  {stat.label}
                </span>
                <span className="block text-[10px] md:text-xs text-emerald-300 mt-1">
                  {stat.sub}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Brand Guarantees Grid */}
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-4">
          <span className="text-emerald-700 font-bold text-xs uppercase tracking-widest block">আমাদের প্রতিশ্রুতি</span>
          <h2 className="text-2xl sm:text-3xl font-bold font-display text-gray-900 tracking-tight">
            কাস্টমারদের জন্য সর্বোচ্চ <span className="text-emerald-700">সুরক্ষা ও সেবা নিশ্চয়তা</span>
          </h2>
          <div className="w-12 h-1 bg-amber-500 mx-auto rounded-full mt-2" />
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {badges.map((badge, idx) => {
            const Icon = badge.icon;
            return (
              <div 
                key={idx} 
                className="bg-white p-6 rounded-2xl border border-zinc-100 shadow-sm hover:shadow-md hover:border-emerald-100/50 flex space-x-4 items-start transition-all"
                id={`trust-badge-${idx}`}
              >
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
                  <Icon className="w-5 h-5" />
                </div>
                <div className="text-left">
                  <h4 className="text-sm sm:text-base font-bold text-gray-900 mb-1.5">{badge.title}</h4>
                  <p className="text-gray-500 text-xs sm:text-sm leading-relaxed">{badge.desc}</p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
