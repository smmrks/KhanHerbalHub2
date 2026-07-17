import React from 'react';
import { 
  Heart, Star, Sparkles, Shield, Coffee, Calendar, Leaf, Award, Smile, Truck, Flame, Zap, Dumbbell, Activity
} from 'lucide-react';

export default function ProductBenefits() {
  const physicalBenefits = [
    {
      icon: Flame,
      title: 'টেস্টোস্টেরন ও ভাইটালিটি বুস্ট',
      subtitle: 'Natural Testosterone & Vitality',
      desc: 'হিমালয়ান শিলাজিত ও অশ্বগন্ধার শক্তিশালী প্রাকৃতিক গুণে পুরুষ হরমোন টেস্টোস্টেরনের নিঃসরণ বাড়িয়ে যৌবন ও সজীবতা দীর্ঘস্থায়ী করে।',
      badge: 'হরমোনাল ব্যালেন্স'
    },
    {
      icon: Sparkles,
      title: 'দাম্পত্য জীবনের অফুরন্ত স্ট্যামিনা',
      subtitle: 'Endless Marital Stamina',
      desc: 'মানসিক ক্লান্তি, স্নায়বিক অবসাদ ও শারীরিক নিষ্ক্রিয়তা দূর করে দাম্পত্য সম্পর্কে ফিরিয়ে আনে প্রাণবন্ত সতেজতা ও অফুরন্ত প্রাণশক্তি।',
      badge: 'সেরা কার্যকারিতা'
    },
    {
      icon: Activity,
      title: 'বীর্য ঘন ও প্রজনন ক্ষমতা বৃদ্ধি',
      subtitle: 'Sperm Quality & Reproduction',
      desc: 'তালমাখানা, আলকুশী বীজ ও খাঁটি সুন্দরবনের মধুর বিজ্ঞানসম্মত মিশ্রণ বীর্য ঘন করতে এবং স্পার্ম কাউন্ট ও প্রজনন ক্ষমতা বাড়াতে চমৎকার কাজ করে।',
      badge: 'প্রাকৃতিক সমাধান'
    },
    {
      icon: Zap,
      title: 'দ্রুত বীর্যপাত ও দুর্বলতা দূরীকরণ',
      subtitle: 'Combats Premature Weakness',
      desc: 'স্নায়ুতন্ত্রকে শান্ত ও শক্তিশালী করার মাধ্যমে শারীরিক ও স্নায়বিক শিথিলতা দূর করে এবং দীর্ঘক্ষণ শারীরিক সামর্থ্য বজায় রাখতে সাহায্য করে।',
      badge: 'ইনস্ট্যান্ট এনার্জি'
    },
    {
      icon: Dumbbell,
      title: 'পেশীর শক্তি ও প্রাকৃতিকভাবে সুগঠন',
      subtitle: 'Muscle Strength & Stamina',
      desc: 'খাঁটি ঘি, আখরোট ও বিভিন্ন প্রিমিয়াম বাদামের ক্যালোরি ও হেলদি ফ্যাট শরীরের জয়েন্টগুলোর সচলতা বাড়িয়ে পেশী মজবুত ও সুগঠিত করে।',
      badge: 'ফিটনেস ও বল'
    }
  ];

  const brandQualities = [
    {
      icon: Leaf,
      title: '১০০% প্রাকৃতিক ও অর্গানিক',
      desc: 'কোনো কৃত্রিম ফ্লেভার, কেমিক্যাল প্রিজারভেটিভ বা ক্ষতিকারক ওষুধের মিশ্রণ নেই। শতভাগ অরগানিক ও নিরাপদ ভেষজ।'
    },
    {
      icon: Award,
      title: 'সর্বোচ্চ প্রিমিয়াম কোয়ালিটি',
      desc: 'আমাদের প্রতিটি কাঁচামাল মান নিয়ন্ত্রণে কঠোরভাবে যাচাইকৃত এবং শতভাগ খাঁটি উপাদান নিশ্চিত করে প্রস্তুতকৃত।'
    },
    {
      icon: Sparkles,
      title: 'অর্ডারে তাজা প্রস্তুত',
      desc: 'কোনো বাসি বা অনেকদিনের পুরনো স্টক করা মিশ্রণ নয়, আমরা কাস্টমার অর্ডারের ভিত্তিতে একদম নতুন ও তাজা প্রস্তুত করি।'
    },
    {
      icon: Shield,
      title: 'হাইজিনিকভাবে প্যাকড',
      desc: 'সম্পূর্ণ ডাস্ট-ফ্রি ও আধুনিক ল্যাবরেটরি পরিবেশে হাইজিনিক গ্লাভস ও মাস্ক ব্যবহার করে প্রিমিয়াম গ্লাস জারে প্যাক করা হয়।'
    },
    {
      icon: Smile,
      title: 'হাজারো সন্তুষ্ট গ্রাহক',
      desc: 'প্রোডাক্টটি নিয়মিত সেবন করে শারীরিকভাবে চমৎকার সুফল পেয়ে শত শত কাস্টমার আমাদের ফেসবুক পেইজে পজিটিভ রিভিউ দিয়েছেন।'
    }
  ];

  return (
    <section id="benefits" className="py-20 bg-white scroll-mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-emerald-700 font-bold text-xs uppercase tracking-widest block">উপকারিতা ও গুণাবলী</span>
          <h2 className="text-3xl sm:text-4xl font-bold font-display text-gray-900 tracking-tight">
            খান প্রিমিয়াম এনার্জি ফুডের <span className="text-emerald-700">জাদুকরী শারীরিক ও দাম্পত্য উপকারিতা</span>
          </h2>
          <div className="w-16 h-1 bg-amber-500 mx-auto rounded-full mt-2" />
          <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
            এটি শুধু সাধারণ কোনো এনার্জি সাপ্লিমেন্ট নয়, বরং আপনার হারিয়ে যাওয়া শারীরিক শক্তি ও দাম্পত্য জীবনের পূর্ণাঙ্গ সুখ ও সতেজতা ফিরিয়ে আনার সম্পূর্ণ নিরাপদ ভেষজ সমাধান।
          </p>
        </div>

        {/* Sexual & Physical Health Benefits Header */}
        <div className="mb-10 text-center md:text-left">
          <h3 className="text-xl sm:text-2xl font-extrabold text-emerald-950 flex flex-col md:flex-row md:items-center gap-2.5 justify-center md:justify-start">
            <span className="w-2.5 h-6 bg-amber-500 rounded-full hidden md:inline-block"></span>
            ১. শারীরিক ও দাম্পত্য জীবনের ৫টি মূল উপকারিতা
          </h3>
          <p className="text-xs sm:text-sm text-gray-500 mt-1 md:pl-5">
            নিয়মিত খাঁটি মধু ও ২১টি ঔষধি ভেষজের সঠিক অনুপাত আপনার শরীরে যে আমূল পরিবর্তন আনবে:
          </p>
        </div>

        {/* Core Physical/Sexual Benefits Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6 mb-20">
          {physicalBenefits.map((b, idx) => {
            const Icon = b.icon;
            return (
              <div 
                key={idx} 
                className="relative bg-gradient-to-b from-emerald-50/20 to-zinc-50 hover:to-amber-50/20 p-6 rounded-2xl border border-zinc-100 hover:border-amber-300/40 transition-all duration-300 text-center flex flex-col items-center group shadow-sm hover:shadow-md hover:-translate-y-1"
                id={`physical-benefit-${idx}`}
              >
                {/* Custom Badge */}
                <span className="absolute top-3 right-3 text-[10px] font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded-full">
                  {b.badge}
                </span>

                <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-emerald-600 to-emerald-800 text-white flex items-center justify-center mb-5 group-hover:scale-110 transition-transform shadow-md shadow-emerald-900/10">
                  <Icon className="w-6 h-6" />
                </div>
                <h4 className="text-sm sm:text-base font-bold text-gray-900 mb-1 leading-snug">
                  {b.title}
                </h4>
                <p className="text-[10px] text-emerald-700 font-mono tracking-wider uppercase mb-3 font-semibold">
                  {b.subtitle}
                </p>
                <p className="text-gray-600 text-xs leading-relaxed">
                  {b.desc}
                </p>
              </div>
            );
          })}
        </div>

        {/* Brand & Safety Qualities Header */}
        <div className="mb-10 text-center md:text-left">
          <h3 className="text-xl sm:text-2xl font-extrabold text-emerald-950 flex flex-col md:flex-row md:items-center gap-2.5 justify-center md:justify-start">
            <span className="w-2.5 h-6 bg-amber-500 rounded-full hidden md:inline-block"></span>
            ২. আমাদের প্রোডাক্টের গুণগত শতভাগ নিরাপত্তা মান
          </h3>
          <p className="text-xs sm:text-sm text-gray-500 mt-1 md:pl-5">
            ভেজাল ও কেমিক্যালমুক্ত কোয়ালিটি নিশ্চিত করার জন্য আমাদের কঠোর পদক্ষেপসমূহ:
          </p>
        </div>

        {/* Purity & Service Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6">
          {brandQualities.map((b, idx) => {
            const Icon = b.icon;
            return (
              <div 
                key={idx} 
                className="bg-zinc-50 hover:bg-emerald-50/40 p-6 rounded-2xl border border-zinc-100 hover:border-emerald-200/50 transition-all duration-300 text-center flex flex-col items-center group shadow-sm hover:shadow-md"
                id={`brand-quality-${idx}`}
              >
                <div className="w-11 h-11 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                  <Icon className="w-5 h-5" />
                </div>
                <h4 className="text-sm sm:text-base font-bold text-gray-900 mb-2.5">
                  {b.title}
                </h4>
                <p className="text-gray-500 text-xs leading-relaxed">
                  {b.desc}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}

