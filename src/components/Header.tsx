import React, { useState, useEffect } from 'react';
import { Menu, X, Phone, MessageSquare, ShieldCheck, Award } from 'lucide-react';
import { ViewTab } from '../types';

interface HeaderProps {
  currentView: ViewTab;
  setCurrentView: (view: ViewTab) => void;
  onScrollToSection: (id: string) => void;
}

export default function Header({ currentView, setCurrentView, onScrollToSection }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavLink = (target: string, isSection: boolean) => {
    setIsMobileMenuOpen(false);
    if (isSection) {
      setCurrentView('home');
      // Small timeout to allow view to switch before scrolling
      setTimeout(() => {
        onScrollToSection(target);
      }, 100);
    } else {
      setCurrentView(target as ViewTab);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled || currentView !== 'home'
          ? 'bg-emerald-950/95 backdrop-blur-md shadow-md border-b border-emerald-900/40 py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Logo */}
          <button
            onClick={() => handleNavLink('home', false)}
            className="flex items-center space-x-2 text-left group focus:outline-none"
            id="header-logo-btn"
          >
            <div className="bg-amber-500 text-emerald-950 p-2 rounded-xl font-bold font-display shadow-lg group-hover:scale-105 transition-transform">
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

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-7" id="desktop-nav">
            <button
              onClick={() => handleNavLink('home', false)}
              className={`text-sm font-medium transition-colors cursor-pointer ${
                currentView === 'home' ? 'text-amber-400 font-semibold nav-dot' : 'text-gray-200 hover:text-white'
              }`}
            >
              হোম
            </button>
            <button
              onClick={() => handleNavLink('why-choose', true)}
              className="text-sm font-medium text-gray-200 hover:text-white transition-colors cursor-pointer"
            >
              উপকারিতা
            </button>
            <button
              onClick={() => handleNavLink('ingredients', true)}
              className="text-sm font-medium text-gray-200 hover:text-white transition-colors cursor-pointer"
            >
              উপাদানসমূহ
            </button>
            <button
              onClick={() => handleNavLink('packages', true)}
              className="text-sm font-medium text-gray-200 hover:text-white transition-colors cursor-pointer"
            >
              প্যাকেজসমূহ
            </button>
            <button
              onClick={() => handleNavLink('reviews', true)}
              className="text-sm font-medium text-gray-200 hover:text-white transition-colors cursor-pointer"
            >
              গ্রাহক মতামত
            </button>
            <button
              onClick={() => handleNavLink('faq', true)}
              className="text-sm font-medium text-gray-200 hover:text-white transition-colors cursor-pointer"
            >
              জিজ্ঞাসা
            </button>
            <button
              onClick={() => handleNavLink('contact', false)}
              className={`text-sm font-medium transition-colors cursor-pointer ${
                currentView === 'contact' ? 'text-amber-400 font-semibold nav-dot' : 'text-gray-200 hover:text-white'
              }`}
            >
              যোগাযোগ
            </button>
          </nav>

          {/* CTAs */}
          <div className="hidden md:flex items-center space-x-3">
            {/* Call button */}
            <a
              href="tel:+8801608780378"
              className="flex items-center space-x-1.5 bg-emerald-900/60 hover:bg-emerald-900 text-white px-3.5 py-2 rounded-full border border-emerald-800 text-xs font-semibold tracking-wide transition-all"
              id="header-call-btn"
            >
              <Phone className="w-3.5 h-3.5 text-amber-400" />
              <span>+8801608780378</span>
            </a>
            {/* WhatsApp button */}
            <a
              href="https://wa.me/8801608780378"
              target="_blank"
              rel="noreferrer"
              className="flex items-center space-x-1.5 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-full text-xs font-bold shadow-md shadow-green-900/20 hover:shadow-green-900/40 transition-all hover:-translate-y-0.5"
              id="header-whatsapp-btn"
            >
              <MessageSquare className="w-3.5 h-3.5 text-white" />
              <span>হোয়াটসঅ্যাপ অর্ডার</span>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden items-center space-x-2">
            <a
              href="tel:+8801608780378"
              className="p-2.5 bg-emerald-900/80 rounded-full text-amber-400 border border-emerald-800 md:hidden"
              aria-label="Call Hub"
              id="header-mobile-call-btn"
            >
              <Phone className="w-4 h-4" />
            </a>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2.5 bg-emerald-900/80 rounded-xl text-white border border-emerald-800 focus:outline-none"
              aria-label="Toggle Menu"
              id="header-menu-toggle-btn"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 right-0 bg-emerald-950/98 border-b border-emerald-900 shadow-xl overflow-hidden animate-in fade-in slide-in-from-top-4 duration-200">
          <div className="px-4 pt-3 pb-6 space-y-2">
            <button
              onClick={() => handleNavLink('home', false)}
              className={`w-full text-left py-3 px-4 rounded-xl text-sm font-medium block ${
                currentView === 'home' ? 'bg-emerald-900 text-amber-400 font-semibold' : 'text-gray-200 hover:bg-emerald-900/40'
              }`}
            >
              হোম পেজ
            </button>
            <button
              onClick={() => handleNavLink('why-choose', true)}
              className="w-full text-left py-3 px-4 rounded-xl text-sm font-medium text-gray-200 hover:bg-emerald-900/40 block"
            >
              কেন আমাদের বেছে নিবেন?
            </button>
            <button
              onClick={() => handleNavLink('ingredients', true)}
              className="w-full text-left py-3 px-4 rounded-xl text-sm font-medium text-gray-200 hover:bg-emerald-900/40 block"
            >
              উপাদান এবং গুণাগুণ
            </button>
            <button
              onClick={() => handleNavLink('packages', true)}
              className="w-full text-left py-3 px-4 rounded-xl text-sm font-medium text-gray-200 hover:bg-emerald-900/40 block"
            >
              প্যাকেজ এবং দাম
            </button>
            <button
              onClick={() => handleNavLink('reviews', true)}
              className="w-full text-left py-3 px-4 rounded-xl text-sm font-medium text-gray-200 hover:bg-emerald-900/40 block"
            >
              কাস্টমার রিভিউজ
            </button>
            <button
              onClick={() => handleNavLink('faq', true)}
              className="w-full text-left py-3 px-4 rounded-xl text-sm font-medium text-gray-200 hover:bg-emerald-900/40 block"
            >
              সচরাচর জিজ্ঞাসা (FAQ)
            </button>
            <button
              onClick={() => handleNavLink('contact', false)}
              className={`w-full text-left py-3 px-4 rounded-xl text-sm font-medium block ${
                currentView === 'contact' ? 'bg-emerald-900 text-amber-400 font-semibold' : 'text-gray-200 hover:bg-emerald-900/40'
              }`}
            >
              যোগাযোগ
            </button>

            <div className="pt-4 border-t border-emerald-900/60 grid grid-cols-2 gap-3">
              <a
                href="tel:+8801608780378"
                className="flex items-center justify-center space-x-2 bg-emerald-900/60 border border-emerald-800 text-white py-3 rounded-xl text-xs font-bold"
              >
                <Phone className="w-3.5 h-3.5 text-amber-400" />
                <span>সরাসরি কল</span>
              </a>
              <a
                href="https://wa.me/8801608780378"
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center space-x-2 bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl text-xs font-bold shadow-md shadow-green-950/20"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>হোয়াটসঅ্যাপ</span>
              </a>
            </div>
            
            <div className="mt-4 flex items-center justify-center space-x-6 text-[11px] text-emerald-400 font-medium">
              <span className="flex items-center space-x-1">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>১০০% নিরাপদ শপিং</span>
              </span>
              <span className="flex items-center space-x-1">
                <Award className="w-3.5 h-3.5" />
                <span>বিএসটিআই স্ট্যান্ডার্ড</span>
              </span>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
