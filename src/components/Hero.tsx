import React, { useState, useEffect } from 'react';
import { ShieldCheck, Truck, Lock, Award, Heart, Sparkles, MessageSquare, ArrowRight, Clock } from 'lucide-react';

interface HeroProps {
  onOrderNowClick: () => void;
}

export default function Hero({ onOrderNowClick }: HeroProps) {
  // Countdown Timer: set to end at the end of the current day
  const [timeLeft, setTimeLeft] = useState({ hours: 14, minutes: 45, seconds: 30 });

  useEffect(() => {
    const calculateTime = () => {
      const now = new Date();
      const endOfDay = new Date();
      endOfDay.setHours(23, 59, 59, 999);
      
      const diff = endOfDay.getTime() - now.getTime();
      
      if (diff > 0) {
        const hours = Math.floor(diff / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
        setTimeLeft({ hours, minutes, seconds });
      } else {
        // Reset countdown for the next day
        setTimeLeft({ hours: 23, minutes: 59, seconds: 59 });
      }
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen pt-28 pb-16 flex items-center overflow-hidden bg-gradient-to-b from-brand-dark via-emerald-950 to-brand-green/40 text-white">
      {/* Dynamic Ambient Background Lights */}
      <div className="absolute top-1/4 left-10 w-72 h-72 rounded-full bg-emerald-500/10 blur-3xl animate-pulse pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 rounded-full bg-amber-500/5 blur-3xl animate-pulse pointer-events-none" />
      
      {/* Fine grid overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.015)_0%,transparent_80%)] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Hero Left Content */}
          <div className="lg:col-span-7 flex flex-col justify-center space-y-6 md:space-y-8 z-10 text-left">
            
            {/* Promo Tag */}
            <div className="inline-flex items-center space-x-2 bg-amber-500/10 border border-amber-500/20 px-3.5 py-1.5 rounded-full w-fit self-start">
              <Sparkles className="w-4 h-4 text-amber-400 animate-spin" />
              <span className="text-xs font-semibold text-amber-300 tracking-wider">
                ৭ম বর্ষপূর্তি উপলক্ষে স্পেশাল ৪২% ফ্ল্যাট ডিসকাউন্ট!
              </span>
            </div>

            {/* Headline */}
            <div className="space-y-4">
              <h1 className="text-4xl sm:text-5xl xl:text-6xl font-bold font-display leading-tight tracking-tight text-white">
                প্রকৃতির খাঁটি ছোঁয়ায় <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-emerald-300 to-amber-500">
                  প্রাণশক্তি ও তারুণ্য
                </span> <br />
                ফিরিয়ে আনুন চিরতরে!
              </h1>
              <p className="text-gray-300 text-sm sm:text-base max-w-2xl leading-relaxed">
                কোনো কেমিক্যাল বা পার্শ্বপ্রতিক্রিয়া ছাড়া সুন্দরবনের খাঁটি মধু, কোরিয়ান জিনসেং ও অশ্বগন্ধাসহ ২১টি বিরল ভেষজের ঐশ্বরিক মিশ্রণে তৈরি প্রিমিয়াম এনার্জি ফুড। আপনার ক্লান্তি ও অলসতা দূর করে ফিরিয়ে আনবে অফুরন্ত দৈহিক বল।
              </p>
            </div>

            {/* Pricing Card & Offer */}
            <div className="glass-panel-dark rounded-2xl p-5 md:p-6 border border-emerald-800/60 max-w-lg shadow-xl shadow-emerald-950/40 relative">
              <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-4 bg-gradient-to-r from-amber-500 to-amber-600 text-emerald-950 text-xs font-black px-3.5 py-1.5 rounded-full uppercase shadow-md flex items-center space-x-1">
                <Clock className="w-3.5 h-3.5 animate-bounce" />
                <span>আজকের মেগা অফার</span>
              </div>

              <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
                {/* Prices */}
                <div>
                  <span className="text-xs text-gray-400 block line-through">পূর্বে দাম ছিল: ৳১,৫০০</span>
                  <div className="flex items-baseline space-x-2 mt-1">
                    <span className="text-3xl font-black font-mono text-amber-400">৳৮৯০</span>
                    <span className="text-sm font-semibold text-emerald-400">(২৫০ গ্রাম হিরো প্যাক)</span>
                  </div>
                  <span className="text-[11px] text-emerald-300 block mt-1">✓ ৪২% ফেস্টিভ্যাল ডিসকাউন্ট ও সারাদেশে কুরিয়ার ডেলিভারি!</span>
                </div>

                {/* Live Countdown Timer */}
                <div className="border-t sm:border-t-0 sm:border-l border-emerald-800/60 pt-4 sm:pt-0 sm:pl-6 flex flex-col justify-center">
                  <span className="text-xs text-amber-300 font-semibold mb-2 block flex items-center gap-1">
                    <span className="inline-block w-2 h-2 rounded-full bg-red-500 animate-ping" />
                    ডিসকাউন্ট অফার শেষ হতে বাকি:
                  </span>
                  <div className="flex space-x-1.5 text-center">
                    <div className="bg-emerald-900/80 border border-emerald-800/40 px-2.5 py-1.5 rounded-lg min-w-[48px]">
                      <span className="block font-mono text-lg font-black text-white leading-none">
                        {String(timeLeft.hours).padStart(2, '0')}
                      </span>
                      <span className="text-[9px] text-gray-300 block mt-1">ঘণ্টা</span>
                    </div>
                    <span className="text-lg font-bold text-amber-400 align-middle pt-1">:</span>
                    <div className="bg-emerald-900/80 border border-emerald-800/40 px-2.5 py-1.5 rounded-lg min-w-[48px]">
                      <span className="block font-mono text-lg font-black text-white leading-none">
                        {String(timeLeft.minutes).padStart(2, '0')}
                      </span>
                      <span className="text-[9px] text-gray-300 block mt-1">মিনিট</span>
                    </div>
                    <span className="text-lg font-bold text-amber-400 align-middle pt-1">:</span>
                    <div className="bg-emerald-900/80 border border-emerald-800/40 px-2.5 py-1.5 rounded-lg min-w-[48px]">
                      <span className="block font-mono text-lg font-black text-white leading-none">
                        {String(timeLeft.seconds).padStart(2, '0')}
                      </span>
                      <span className="text-[9px] text-gray-300 block mt-1">সেকেন্ড</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 max-w-lg">
              <button
                onClick={onOrderNowClick}
                className="flex-1 flex items-center justify-center space-x-2 bg-gradient-to-r from-amber-500 via-amber-400 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-emerald-950 font-black py-4 px-8 rounded-2xl shadow-xl shadow-amber-500/10 hover:shadow-amber-500/20 transform hover:-translate-y-0.5 active:translate-y-0 transition-all text-base cursor-pointer focus:outline-none"
                id="hero-order-now-btn"
              >
                <span>অর্ডার করুন (ক্যাশ অন ডেলিভারি)</span>
                <ArrowRight className="w-5 h-5 font-bold animate-pulse" />
              </button>
              
              <a
                href="https://wa.me/8801608780378"
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center space-x-2 bg-transparent hover:bg-white/5 text-white border-2 border-emerald-700 hover:border-white py-4 px-6 rounded-2xl text-sm font-bold transition-all"
                id="hero-whatsapp-btn"
              >
                <MessageSquare className="w-4.5 h-4.5 text-green-400" />
                <span>হোয়াটসঅ্যাপে অর্ডার</span>
              </a>
            </div>

            {/* Bullet Trust Badges */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2 border-t border-emerald-900/40 max-w-xl text-xs text-gray-300">
              <div className="flex items-center space-x-1.5">
                <ShieldCheck className="w-4 h-4 text-amber-400" />
                <span>১০০% প্রাকৃতিকভাবে প্রস্তুত</span>
              </div>
              <div className="flex items-center space-x-1.5">
                <Award className="w-4 h-4 text-amber-400" />
                <span>৭ দিনের রিফান্ড পলিসি</span>
              </div>
              <div className="flex items-center space-x-1.5">
                <Truck className="w-4 h-4 text-amber-400" />
                <span>সারাদেশে হোম ডেলিভারি</span>
              </div>
              <div className="flex items-center space-x-1.5">
                <Lock className="w-4 h-4 text-amber-400" />
                <span>নিরাপদ পেমেন্ট ব্যবস্থা</span>
              </div>
            </div>

          </div>

          {/* Hero Right Product Visual */}
          <div className="lg:col-span-5 relative flex justify-center items-center h-full min-h-[380px] lg:min-h-[500px]">
            {/* Animated Glow backplate */}
            <div className="absolute w-64 h-64 md:w-80 md:h-80 bg-gradient-to-tr from-amber-500 to-emerald-400 rounded-full blur-[100px] opacity-25 animate-pulse" />

            {/* floating particles */}
            <div className="absolute top-10 left-10 w-2.5 h-2.5 bg-amber-400 rounded-full animate-bounce delay-100 opacity-60" />
            <div className="absolute bottom-20 left-20 w-3 h-3 bg-emerald-400 rounded-full animate-ping delay-500 opacity-30" />
            <div className="absolute top-1/2 right-12 w-2 h-2 bg-yellow-300 rounded-full animate-bounce delay-300 opacity-50" />

            {/* Main Product Frame */}
            <div className="relative z-10 p-4 w-full max-w-[340px] md:max-w-[400px] aspect-square flex items-center justify-center">
              {/* Luxury Glass Frame */}
              <div className="absolute inset-0 rounded-[2.5rem] bg-gradient-to-tr from-white/10 to-white/5 border border-white/10 shadow-2xl backdrop-blur-md transform rotate-3 scale-95" />
              <div className="absolute inset-0 rounded-[2.5rem] bg-gradient-to-br from-white/5 to-white/0 border border-white/5 shadow-inner transform -rotate-2" />
              
              {/* Product Image */}
              <div className="relative z-20 w-[82%] h-[82%] rounded-[2rem] overflow-hidden shadow-2xl border border-white/10 group">
                <img
                  src="https://images.unsplash.com/photo-1590157133100-8564273c88d6?auto=format&fit=crop&q=80&w=600"
                  alt="Khan Herbal Hub Premium Product"
                  className="w-full h-full object-cover transform hover:scale-105 transition-all duration-700"
                  referrerPolicy="no-referrer"
                />
                
                {/* Realistic Floating Ingredient Cards */}
                <div className="absolute bottom-4 left-4 right-4 bg-emerald-950/85 backdrop-blur-md border border-emerald-800/50 p-3.5 rounded-2xl flex items-center space-x-3 shadow-lg transform translate-y-1 hover:translate-y-0 transition-transform">
                  <div className="w-10 h-10 rounded-lg overflow-hidden shrink-0 border border-amber-500/20 bg-emerald-900 flex items-center justify-center">
                    <img
                      src="https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&q=80&w=100"
                      alt="Honey"
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div>
                    <span className="block text-xs font-black text-amber-400">সুন্দরবনের খাঁটি মধু</span>
                    <span className="text-[10px] text-gray-300 block">উপাদান হিসেবে ব্যবহৃত</span>
                  </div>
                  <div className="ml-auto bg-amber-500 text-emerald-950 p-1 rounded-full">
                    <Heart className="w-3 h-3 fill-emerald-950" />
                  </div>
                </div>

                {/* Top Badge on product */}
                <div className="absolute top-4 right-4 bg-emerald-950/90 text-white text-[10px] font-black border border-emerald-700/50 px-2.5 py-1.5 rounded-lg flex items-center space-x-1 shadow-lg">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>১০০% অর্গানিক</span>
                </div>
              </div>
            </div>

            {/* floating badge behind */}
            <div className="absolute -bottom-4 right-0 lg:-right-4 z-20 bg-amber-500 text-emerald-950 px-4 py-3 rounded-2xl shadow-xl font-display text-center border border-amber-400 rotate-6 hover:rotate-0 transition-all">
              <span className="block text-xs font-bold uppercase tracking-wider">ডেলিভারি চার্জ</span>
              <span className="block text-xl font-black leading-none font-mono mt-0.5">৳০.০০</span>
              <span className="text-[9px] font-semibold block mt-1">৫০০গ্রাম+ অর্ডারে ফ্রি</span>
            </div>

          </div>

        </div>
      </div>
      
      {/* Scroll Down Indicator */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-10 flex flex-col items-center space-y-1 cursor-pointer opacity-70 hover:opacity-100 transition-opacity">
        <span className="text-[10px] tracking-widest text-emerald-300 font-semibold uppercase">আরো জানুন</span>
        <div className="w-5 h-8 border-2 border-emerald-700 rounded-full p-1 flex justify-center">
          <div className="w-1.5 h-1.5 bg-amber-400 rounded-full animate-bounce" />
        </div>
      </div>
    </section>
  );
}
