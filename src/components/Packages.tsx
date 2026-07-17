import React from 'react';
import { PACKAGES } from '../data';
import { Check, Star, ShieldCheck, CreditCard, Sparkles } from 'lucide-react';

interface PackagesProps {
  onSelectPackage: (packageId: string) => void;
}

export default function Packages({ onSelectPackage }: PackagesProps) {
  return (
    <section id="packages" className="py-20 bg-white scroll-mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-emerald-700 font-bold text-xs uppercase tracking-widest block">প্যাকেজ এবং মূল্যতালিকা</span>
          <h2 className="text-3xl sm:text-4xl font-bold font-display text-gray-900 tracking-tight">
            আপনার পছন্দের <span className="text-emerald-700">সাশ্রয়ী প্যাকেজটি নির্বাচন করুন</span>
          </h2>
          <div className="w-16 h-1 bg-amber-500 mx-auto rounded-full mt-2" />
          <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
            কোনো প্রকার অগ্রিম পেমেন্ট ছাড়াই প্রোডাক্ট হাতে পেয়ে মূল্য পরিশোধের ক্যাশ অন ডেলিভারি সুবিধা। পরিবার ও নিজের সুস্থতায় এখনই অর্ডার করুন।
          </p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid lg:grid-cols-3 gap-8 items-stretch max-w-6xl mx-auto">
          {PACKAGES.map((pkg) => {
            const isPopular = pkg.popular;
            const isMega = pkg.id === 'pkg-1000g';
            
            return (
              <div
                key={pkg.id}
                className={`relative rounded-3xl p-8 flex flex-col justify-between transition-all duration-300 h-full ${
                  isPopular
                    ? 'bg-emerald-950 text-white border-2 border-amber-500 scale-105 shadow-xl shadow-emerald-950/20 gold-glow lg:z-10'
                    : isMega
                    ? 'bg-zinc-50 text-gray-900 border-2 border-amber-500/50 shadow-md'
                    : 'bg-zinc-50 text-gray-900 border border-zinc-200/80 shadow-sm'
                }`}
                id={`package-card-${pkg.id}`}
              >
                {/* Popular or Savings Badge */}
                {pkg.badge && (
                  <div className="absolute top-0 right-1/2 translate-x-1/2 -translate-y-1/2 bg-amber-500 text-emerald-950 text-xs font-black px-4 py-1.5 rounded-full uppercase tracking-wider shadow-md whitespace-nowrap flex items-center space-x-1">
                    <Sparkles className="w-3 h-3 text-emerald-950" />
                    <span>{pkg.badge}</span>
                  </div>
                )}

                {/* Card Title & Description */}
                <div>
                  <div className="text-center pb-6 border-b border-zinc-200/10">
                    <span className={`text-[11px] font-bold uppercase tracking-wider block mb-1 ${
                      isPopular ? 'text-amber-400' : 'text-emerald-700'
                    }`}>
                      {pkg.weight} প্যাক
                    </span>
                    <h3 className={`text-xl font-bold font-display ${isPopular ? 'text-white' : 'text-gray-900'}`}>
                      {pkg.name}
                    </h3>
                    <p className={`text-xs mt-2 leading-relaxed ${isPopular ? 'text-emerald-200/80' : 'text-gray-500'}`}>
                      {pkg.description}
                    </p>
                  </div>

                  {/* Pricing Details */}
                  <div className="text-center py-6">
                    <span className={`text-xs block line-through ${isPopular ? 'text-emerald-300/60' : 'text-gray-400'}`}>
                      পূর্বে মূল্য ছিল: ৳{pkg.originalPrice}
                    </span>
                    <div className="flex items-baseline justify-center space-x-1.5 mt-1.5">
                      <span className={`text-4xl font-black font-mono ${isPopular ? 'text-amber-400' : 'text-emerald-800'}`}>
                        ৳{pkg.price}
                      </span>
                      <span className={`text-xs font-bold ${isPopular ? 'text-emerald-300' : 'text-gray-500'}`}>
                        (ক্যাশ অন ডেলিভারি)
                      </span>
                    </div>
                    {/* Savings tag */}
                    <span className="inline-block bg-amber-500/10 border border-amber-500/20 text-amber-500 text-[10px] font-bold px-2.5 py-0.5 rounded-full mt-2">
                      সঞ্চয় {pkg.savings}!
                    </span>
                  </div>

                  {/* Features List */}
                  <ul className="space-y-3.5 mb-8 text-left">
                    {pkg.features.map((feat, idx) => (
                      <li key={idx} className="flex items-start space-x-2.5">
                        <div className={`p-0.5 rounded-full mt-0.5 ${
                          isPopular ? 'bg-amber-400/20 text-amber-400' : 'bg-emerald-100 text-emerald-700'
                        }`}>
                          <Check className="w-3.5 h-3.5" />
                        </div>
                        <span className={`text-xs font-medium ${isPopular ? 'text-emerald-100' : 'text-gray-600'}`}>
                          {feat}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* CTAs */}
                <div className="space-y-4">
                  <button
                    onClick={() => onSelectPackage(pkg.id)}
                    className={`w-full py-3.5 px-6 rounded-2xl font-black text-xs sm:text-sm tracking-wide transition-all shadow-md transform hover:-translate-y-0.5 cursor-pointer focus:outline-none ${
                      isPopular
                        ? 'bg-gradient-to-r from-amber-500 via-amber-400 to-amber-600 text-emerald-950 hover:from-amber-400 hover:to-amber-500 font-bold'
                        : 'bg-emerald-950 hover:bg-emerald-900 text-white'
                    }`}
                    id={`package-btn-${pkg.id}`}
                  >
                    এই প্যাকেজটি অর্ডার করুন
                  </button>

                  {/* Security Indicators under button */}
                  <div className={`flex items-center justify-center space-x-4 text-[10px] ${
                    isPopular ? 'text-emerald-300' : 'text-gray-400'
                  }`}>
                    <span className="flex items-center space-x-1">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      <span>ক্যাশ অন ডেলিভারি</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <CreditCard className="w-3.5 h-3.5" />
                      <span>অনলাইন পেমেন্ট</span>
                    </span>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
