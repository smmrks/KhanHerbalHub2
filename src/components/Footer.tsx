import React, { useState } from 'react';
import { 
  Phone, MessageSquare, MapPin, ShieldCheck, Mail, Sparkles, 
  Facebook, Youtube, Instagram, ArrowRight, CreditCard, Clock, CheckCircle 
} from 'lucide-react';
import { ViewTab } from '../types';

interface FooterProps {
  setCurrentView: (view: ViewTab) => void;
  onScrollToSection: (id: string) => void;
}

export default function Footer({ setCurrentView, onScrollToSection }: FooterProps) {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim() && email.includes('@')) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 4000);
    }
  };

  const handleNavLink = (target: string, isSection: boolean) => {
    if (isSection) {
      setCurrentView('home');
      setTimeout(() => {
        onScrollToSection(target);
      }, 100);
    } else {
      setCurrentView(target as ViewTab);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-emerald-950 text-white border-t border-emerald-900 pt-16 pb-8 text-left relative overflow-hidden">
      {/* Glow backgrounds */}
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-emerald-900/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-0 left-0 w-80 h-80 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Top grid: Brand, Links, Policies, Newsletter */}
        <div className="grid md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-12 border-b border-emerald-900/60">
          
          {/* Col 1: Brand details */}
          <div className="lg:col-span-4 space-y-5">
            <button
              onClick={() => handleNavLink('home', false)}
              className="flex items-center space-x-2 text-left group focus:outline-none"
              id="footer-logo-btn"
            >
              <div className="bg-amber-500 text-emerald-950 p-2.5 rounded-xl font-bold font-display shadow-lg">
                KHH
              </div>
              <div>
                <span className="block font-display text-lg font-bold text-white tracking-wide leading-none">
                  KHAN HERBAL HUB
                </span>
                <span className="text-[10px] text-emerald-300 font-medium tracking-widest block uppercase mt-0.5">
                  ১০০% খাঁটি ও ভেষজ উপাদান
                </span>
              </div>
            </button>
            <p className="text-gray-300 text-xs sm:text-sm leading-relaxed max-w-sm">
              খান হারবাল হাব একটি নির্ভরযোগ্য বাংলাদেশী ভেষজ ও অরগানিক পণ্য উৎপাদনকারী প্রতিষ্ঠান। আমরা প্রাকৃতিকভাবে সংগৃহীত উপাদানগুলোর সর্বোচ্চ বিশুদ্ধতা বজায় রেখে গ্রাহকদের সুস্বাস্থ্য নিশ্চিত করতে প্রতিশ্রুতিবদ্ধ।
            </p>

            {/* Social handles */}
            <div className="flex space-x-3 pt-2">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-xl bg-emerald-900/80 border border-emerald-800 flex items-center justify-center text-white hover:bg-amber-500 hover:text-emerald-950 transition-all hover:-translate-y-0.5"
                aria-label="Facebook"
                id="footer-social-fb"
              >
                <Facebook className="w-4.5 h-4.5" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-xl bg-emerald-900/80 border border-emerald-800 flex items-center justify-center text-white hover:bg-amber-500 hover:text-emerald-950 transition-all hover:-translate-y-0.5"
                aria-label="YouTube"
                id="footer-social-yt"
              >
                <Youtube className="w-4.5 h-4.5" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-xl bg-emerald-900/80 border border-emerald-800 flex items-center justify-center text-white hover:bg-amber-500 hover:text-emerald-950 transition-all hover:-translate-y-0.5"
                aria-label="Instagram"
                id="footer-social-ig"
              >
                <Instagram className="w-4.5 h-4.5" />
              </a>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-sm font-bold tracking-wider text-amber-400 uppercase">দ্রুত লিঙ্কসমূহ</h4>
            <ul className="space-y-2.5 text-xs sm:text-sm text-gray-300">
              <li>
                <button onClick={() => handleNavLink('home', false)} className="hover:text-white transition-colors cursor-pointer text-left">
                  হোম পেজ
                </button>
              </li>
              <li>
                <button onClick={() => handleNavLink('why-choose', true)} className="hover:text-white transition-colors cursor-pointer text-left">
                  কেন আমরা সেরা?
                </button>
              </li>
              <li>
                <button onClick={() => handleNavLink('ingredients', true)} className="hover:text-white transition-colors cursor-pointer text-left">
                  ভেষজ উপাদানসমূহ
                </button>
              </li>
              <li>
                <button onClick={() => handleNavLink('packages', true)} className="hover:text-white transition-colors cursor-pointer text-left">
                  প্যাকেজ এবং দাম
                </button>
              </li>
              <li>
                <button onClick={() => handleNavLink('reviews', true)} className="hover:text-white transition-colors cursor-pointer text-left">
                  গ্রাহকদের মতামত
                </button>
              </li>
              <li>
                <button onClick={() => handleNavLink('faq', true)} className="hover:text-white transition-colors cursor-pointer text-left">
                  সচরাচর জিজ্ঞাসা
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Legal Policy Links */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-sm font-bold tracking-wider text-amber-400 uppercase">নীতিমালা ও শর্তাবলী</h4>
            <ul className="space-y-2.5 text-xs sm:text-sm text-gray-300 font-medium">
              <li>
                <button onClick={() => handleNavLink('privacy', false)} className="hover:text-white transition-colors cursor-pointer text-left">
                  গোপনীয়তা নীতি (Privacy Policy)
                </button>
              </li>
              <li>
                <button onClick={() => handleNavLink('refund', false)} className="hover:text-white transition-colors cursor-pointer text-left">
                  রিফান্ড পলিসি (Refund Policy)
                </button>
              </li>
              <li>
                <button onClick={() => handleNavLink('shipping', false)} className="hover:text-white transition-colors cursor-pointer text-left">
                  শিপিং পলিসি (Shipping Policy)
                </button>
              </li>
              <li>
                <button onClick={() => handleNavLink('terms', false)} className="hover:text-white transition-colors cursor-pointer text-left">
                  শর্তাবলী (Terms & Conditions)
                </button>
              </li>
              <li>
                <button onClick={() => handleNavLink('faq', false)} className="hover:text-white transition-colors cursor-pointer text-left">
                  সহায়তা কেন্দ্র (FAQ)
                </button>
              </li>
              <li>
                <button onClick={() => handleNavLink('admin', false)} className="hover:text-amber-400 transition-colors cursor-pointer text-left font-bold text-emerald-400 flex items-center space-x-1">
                  <span>অর্ডার ট্র্যাকার (Admin)</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Newsletter */}
          <div className="lg:col-span-4 space-y-4">
            <h4 className="text-sm font-bold tracking-wider text-amber-400 uppercase">হেলথ টিপস ও অফার সাবস্ক্রিপশন</h4>
            <p className="text-gray-300 text-xs leading-relaxed">
              আপনার ইমেইল দিয়ে রাখুন, আমাদের নতুন ভেষজ হেলথ টিপস ও আকর্ষনীয় কুপন ছাড়ের অফার সবার আগে আপনার ঠিকানায় পৌঁছে দেওয়া হবে।
            </p>

            <form onSubmit={handleSubscribe} className="space-y-2.5">
              <div className="flex">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="আপনার ইমেইল লিখুন"
                  className="flex-1 px-3.5 py-2.5 bg-emerald-900/60 border border-emerald-800 text-white rounded-l-xl text-xs focus:outline-none focus:ring-1 focus:ring-amber-500"
                  required
                  disabled={subscribed}
                />
                <button
                  type="submit"
                  className="bg-amber-500 hover:bg-amber-400 text-emerald-950 px-4 rounded-r-xl font-bold text-xs flex items-center justify-center cursor-pointer disabled:opacity-50"
                  disabled={subscribed}
                  id="footer-subscribe-btn"
                >
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              {subscribed && (
                <div className="text-[11px] text-emerald-300 font-bold flex items-center space-x-1 animate-in fade-in duration-200">
                  <CheckCircle className="w-3.5 h-3.5" />
                  <span>সাবস্ক্রিপশন সফল হয়েছে! ধন্যবাদ।</span>
                </div>
              )}
            </form>

            {/* Verification Seal */}
            <div className="bg-emerald-900/40 border border-emerald-800/40 p-3.5 rounded-2xl flex items-center space-x-2.5 max-w-sm">
              <ShieldCheck className="w-8 h-8 text-amber-500 shrink-0" />
              <div className="text-[10px]">
                <span className="block font-bold text-white">১০০% ভেরিফাইড ব্র্যান্ড</span>
                <span className="text-gray-300 block">আপনার ব্যক্তিগত ডেটা সম্পূর্ণ নিরাপদ ও এনক্রিপ্টেড।</span>
              </div>
            </div>

          </div>

        </div>

        {/* Middle part: Payment options list */}
        <div className="py-6 border-b border-emerald-900/60 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-2 text-xs text-gray-400">
            <CreditCard className="w-4 h-4 text-emerald-400" />
            <span>আমাদের পেমেন্ট মেথডসমূহ:</span>
          </div>
          <div className="flex flex-wrap gap-2.5 justify-center">
            <span className="bg-emerald-900/60 border border-emerald-800 px-3 py-1.5 rounded-lg text-[10px] font-black text-[#e2125d] font-mono">bKash</span>
            <span className="bg-emerald-900/60 border border-emerald-800 px-3 py-1.5 rounded-lg text-[10px] font-black text-[#f26522] font-mono">Nagad</span>
            <span className="bg-emerald-900/60 border border-emerald-800 px-3 py-1.5 rounded-lg text-[10px] font-black text-[#8c3494] font-mono">Rocket</span>
            <span className="bg-emerald-900/60 border border-emerald-800 px-3 py-1.5 rounded-lg text-[10px] font-black text-emerald-300 font-mono">Cash On Delivery</span>
          </div>
        </div>

        {/* Bottom part: Copyright */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-400 text-center gap-4">
          <p>© ২০২৬ খান হারবাল হাব। সর্বস্বত্ব সংরক্ষিত।</p>
          <div className="flex space-x-4">
            <button onClick={() => handleNavLink('privacy', false)} className="hover:text-white transition-colors cursor-pointer">গোপনীয়তা নীতি</button>
            <span>•</span>
            <button onClick={() => handleNavLink('terms', false)} className="hover:text-white transition-colors cursor-pointer">শর্তাবলী</button>
            <span>•</span>
            <button onClick={() => handleNavLink('refund', false)} className="hover:text-white transition-colors cursor-pointer">রিফান্ড পলিসি</button>
          </div>
          <p className="text-[10px] text-emerald-400 font-medium">Developed by KHH Digital Team</p>
        </div>

      </div>
    </footer>
  );
}
