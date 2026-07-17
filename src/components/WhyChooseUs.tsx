import React from 'react';
import { 
  Leaf, ShieldCheck, Zap, PackageCheck, EyeOff, HandCoins, CreditCard, RefreshCw, Headset, Award, Sparkles 
} from 'lucide-react';

export default function WhyChooseUs() {
  const points = [
    {
      icon: Leaf,
      title: '১০০% প্রাকৃতিক ও অর্গানিক',
      desc: 'সম্পূর্ণ প্রাকৃতিক ভেষজ উপাদানের সমন্বয়ে প্রস্তুত। কোনো প্রকার কৃত্রিম রং, রাসায়নিক বা প্রিজারভেটিভ ব্যবহার করা হয় না।',
      color: 'text-emerald-500',
      bgColor: 'bg-emerald-500/10'
    },
    {
      icon: Sparkles,
      title: 'প্রিমিয়াম কোয়ালিটি উপাদান',
      desc: 'সুন্দরবনের খাঁটি চাকের মধু, লাল কোরিয়ান জিনসেং ও অশ্বগন্ধাসহ সর্বোচ্চ গ্রেডের ২১টি বিরল ও দামি উপাদান দিয়ে তৈরি।',
      color: 'text-amber-500',
      bgColor: 'bg-amber-500/10'
    },
    {
      icon: ShieldCheck,
      title: 'কোনো ক্ষতিকর কেমিক্যাল নেই',
      desc: 'আমাদের মিশ্রণটি ল্যাব-টেস্টেড এবং শতভাগ রাসায়নিক মুক্ত। ফলে দীর্ঘমেয়াদেও শরীরের কোনো ক্ষতি বা পার্শ্বপ্রতিক্রিয়া হয় না।',
      color: 'text-blue-500',
      bgColor: 'bg-blue-500/10'
    },
    {
      icon: Zap,
      title: 'সুপার ফাস্ট ডেলিভারি',
      desc: 'গাজীপুর ও ঢাকার মধ্যে ২৪-৪৮ ঘণ্টার মধ্যে হোম ডেলিভারি এবং দেশের যেকোনো প্রান্তে সর্বোচ্চ ৩ কার্যদিবসের মধ্যে দ্রুত ডেলিভারি।',
      color: 'text-yellow-500',
      bgColor: 'bg-yellow-500/10'
    },
    {
      icon: PackageCheck,
      title: 'নিরাপদ ও আকর্ষণীয় জার',
      desc: 'খাদ্য-বান্ধব প্রিমিয়াম গ্লাস এবং এয়ার-টাইট মেটাল লিড জারে হাইজিনিকভাবে প্যাক করা, যা উপাদানের মান দীর্ঘকাল অক্ষুণ্ন রাখে।',
      color: 'text-purple-500',
      bgColor: 'bg-purple-500/10'
    },
    {
      icon: EyeOff,
      title: 'গোপনীয়তা শতভাগ সুরক্ষিত',
      desc: 'আমরা আপনার ব্যক্তিগত গোপনীয়তা রক্ষা করি। কুরিয়ার প্যাকেজের বাইরে প্রোডাক্টের স্পর্শকাতর বিবরণ বা নাম উল্লেখ করা হয় না।',
      color: 'text-indigo-500',
      bgColor: 'bg-indigo-500/10'
    },
    {
      icon: HandCoins,
      title: 'ক্যাশ অন ডেলিভারি (COD)',
      desc: 'অগ্রিম এক টাকাও দিতে হবে না! ডেলিভারিম্যানের থেকে প্রোডাক্টটি হাতে পেয়ে দেখে সন্তুষ্ট হয়ে টাকা পরিশোধ করার সুবিধা।',
      color: 'text-teal-500',
      bgColor: 'bg-teal-500/10'
    },
    {
      icon: CreditCard,
      title: 'নিরাপদ ডিজিটাল পেমেন্ট',
      desc: 'বিকাশ, নগদ বা রকেটের মাধ্যমে অত্যন্ত নিরাপদে পেমেন্ট করার সুবিধা। আমরা কোনো প্রকার অতিরিক্ত পেমেন্ট ফি চার্জ করি না।',
      color: 'text-pink-500',
      bgColor: 'bg-pink-500/10'
    },
    {
      icon: RefreshCw,
      title: 'টাকা ফেরত গ্যারান্টি (Refund)',
      desc: 'প্রোডাক্টের মান পছন্দ না হলে বা ভেঙে গেলে ৭ দিনের মধ্যে কোনো প্রশ্ন ছাড়াই ১০০% ফুল রিফান্ড বা প্রোডাক্ট পরিবর্তন।',
      color: 'text-red-500',
      bgColor: 'bg-red-500/10'
    },
    {
      icon: Headset,
      title: '২৪/৭ কাস্টমার সাপোর্ট',
      desc: 'অর্ডারের আগে কিংবা পরে যেকোনো তথ্য বা পরামর্শের জন্য আমাদের কাস্টমার রিলেশন টিম সবসময় আপনার সেবায় নিয়োজিত।',
      color: 'text-cyan-500',
      bgColor: 'bg-cyan-500/10'
    },
    {
      icon: Award,
      title: 'বিশ্বস্ত ও প্রশংসিত ব্র্যান্ড',
      desc: 'বাংলাদেশজুড়ে হাজার হাজার খুশি কাস্টমার ও নিয়মিত ক্রেতাদের ভালোবাসায় আমরা একটি নির্ভরযোগ্য হারবাল ব্র্যান্ড হিসেবে প্রতিষ্ঠিত।',
      color: 'text-orange-500',
      bgColor: 'bg-orange-500/10'
    }
  ];

  return (
    <section id="why-choose" className="py-20 bg-zinc-50 scroll-mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-emerald-700 font-bold text-xs uppercase tracking-widest block">কেন আমাদের বেছে নিবেন?</span>
          <h2 className="text-3xl sm:text-4xl font-bold font-display text-gray-900 tracking-tight">
            খান হারবাল হাব কেন <span className="text-emerald-700">সেরা এবং নিরাপদ?</span>
          </h2>
          <div className="w-16 h-1 bg-amber-500 mx-auto rounded-full mt-2" />
          <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
            বাজারে থাকা শত শত ভেজাল ও নিম্নমানের প্রোডাক্টের ভিড়ে কাস্টমারদের সর্বোচ্চ খাঁটি ও শতভাগ অরগানিক মান দিতে আমরা আপসহীন।
          </p>
        </div>

        {/* Grid layout */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {points.map((point, index) => {
            const IconComponent = point.icon;
            return (
              <div 
                key={index} 
                className="group relative bg-white p-6 md:p-8 rounded-2xl border border-zinc-100 shadow-sm hover:shadow-md hover:border-emerald-100 transition-all duration-300 hover:-translate-y-1"
                id={`why-card-${index}`}
              >
                {/* Visual Accent */}
                <div className="absolute top-0 left-0 right-0 h-1.5 rounded-t-2xl bg-transparent group-hover:bg-emerald-600/30 transition-all duration-300" />
                
                {/* Icon Circle */}
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${point.bgColor} ${point.color} group-hover:scale-110 transition-transform duration-300 mb-6`}>
                  <IconComponent className="w-6 h-6" />
                </div>

                {/* Content */}
                <h3 className="text-lg font-bold text-gray-900 group-hover:text-emerald-800 transition-colors mb-3">
                  {point.title}
                </h3>
                <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
                  {point.desc}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
