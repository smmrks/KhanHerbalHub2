import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import WhyChooseUs from './components/WhyChooseUs';
import Reviews from './components/Reviews';
import TrustSection from './components/TrustSection';
import ProductBenefits from './components/ProductBenefits';
import Ingredients from './components/Ingredients';
import Packages from './components/Packages';
import ProductGallery from './components/ProductGallery';
import FAQ from './components/FAQ';
import CheckoutOrderForm from './components/CheckoutOrderForm';
import OrderSuccessModal from './components/OrderSuccessModal';
import PolicyPages from './components/PolicyPages';
import ContactSection from './components/ContactSection';
import AdminPanel from './components/AdminPanel';
import Footer from './components/Footer';
import { ViewTab } from './types';
import { ShieldCheck, MessageSquare, Phone, ArrowLeft, HelpCircle } from 'lucide-react';

export default function App() {
  const [currentView, setCurrentView] = useState<ViewTab>('home');
  const [selectedPackageId, setSelectedPackageId] = useState('pkg-250g');
  const [successOrder, setSuccessOrder] = useState<any | null>(null);

  // Smooth scroll handler
  const handleScrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Pre-fill package and scroll to checkout
  const handleSelectPackage = (packageId: string) => {
    setSelectedPackageId(packageId);
    handleScrollToSection('order');
  };

  // Scroll to top on view changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as any });
  }, [currentView]);

  return (
    <div className="min-h-screen bg-zinc-50 flex flex-col justify-between">
      
      {/* Dynamic SEO Title effect on View transition */}
      <Header 
        currentView={currentView} 
        setCurrentView={setCurrentView} 
        onScrollToSection={handleScrollToSection} 
      />

      <main className="flex-grow">
        {currentView === 'home' && (
          <div className="animate-in fade-in duration-300">
            {/* 1. Hero Section */}
            <Hero onOrderNowClick={() => handleScrollToSection('packages')} />

            {/* 2. Why Choose Us */}
            <WhyChooseUs />

            {/* 3. Customer Reviews */}
            <Reviews />

            {/* 4. Trust Section */}
            <TrustSection />

            {/* 5. Product Benefits Section */}
            <ProductBenefits />

            {/* 6. Ingredients Grid */}
            <Ingredients />

            {/* 7. Packages Pricing Grid */}
            <Packages onSelectPackage={handleSelectPackage} />

            {/* 8. Image Gallery */}
            <ProductGallery />

            {/* 9. FAQ Accordion */}
            <FAQ />

            {/* 10. Order / Checkout Form */}
            <CheckoutOrderForm 
              selectedPackageId={selectedPackageId} 
              onOrderSuccess={(order) => setSuccessOrder(order)} 
            />
          </div>
        )}

        {/* Contact View */}
        {currentView === 'contact' && (
          <ContactSection />
        )}

        {/* Privacy Policy View */}
        {currentView === 'privacy' && (
          <PolicyPages policyType="privacy" />
        )}

        {/* Refund Policy View */}
        {currentView === 'refund' && (
          <PolicyPages policyType="refund" />
        )}

        {/* Shipping Policy View */}
        {currentView === 'shipping' && (
          <PolicyPages policyType="shipping" />
        )}

        {/* Terms View */}
        {currentView === 'terms' && (
          <PolicyPages policyType="terms" />
        )}

        {/* FAQ Direct View */}
        {currentView === 'faq' && (
          <FAQ />
        )}

        {/* Admin Dashboard */}
        {currentView === 'admin' && (
          <AdminPanel />
        )}

        {/* Custom 404 Fallback Gate (defensive design) */}
        {!['home', 'contact', 'privacy', 'refund', 'shipping', 'terms', 'faq', 'admin'].includes(currentView) && (
          <div className="py-32 flex flex-col items-center justify-center text-center px-4 animate-in zoom-in-95">
            <div className="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center mb-6">
              <HelpCircle className="w-8 h-8" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-black font-display text-gray-900">৪0৪ - পৃষ্ঠাটি পাওয়া যায়নি</h1>
            <p className="text-gray-500 text-xs sm:text-sm mt-2 max-w-sm">
              দুঃখিত, আপনি যে লিংকটি খুঁজছেন তা এই মুহূর্তে উপলব্ধ নেই বা পরিবর্তন করা হয়েছে।
            </p>
            <button
              onClick={() => setCurrentView('home')}
              className="mt-6 flex items-center space-x-2 bg-emerald-950 hover:bg-emerald-900 text-white px-6 py-3 rounded-xl text-xs font-bold shadow-md transition-all cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>হোম পেজে ফিরে যান</span>
            </button>
          </div>
        )}
      </main>

      {/* Persistent floating conversion tools */}
      {currentView === 'home' && (
        <div className="fixed bottom-6 right-6 z-40 flex flex-col space-y-3 shrink-0">
          {/* Quick Call */}
          <a
            href="tel:+8801608780378"
            className="w-12 h-12 rounded-full bg-emerald-950 text-amber-400 border border-emerald-800 shadow-xl flex items-center justify-center hover:scale-105 transition-transform"
            title="Call Support"
            id="floating-call-btn"
          >
            <Phone className="w-5 h-5" />
          </a>
          {/* Floating WhatsApp with chat bubble */}
          <a
            href="https://wa.me/8801608780378"
            target="_blank"
            rel="noreferrer"
            className="w-12 h-12 rounded-full bg-green-600 text-white shadow-xl flex items-center justify-center hover:scale-105 transition-all hover:rotate-3 hover:shadow-green-500/20"
            title="WhatsApp Support"
            id="floating-wa-btn"
          >
            <MessageSquare className="w-5 h-5" />
          </a>
        </div>
      )}

      {/* Sticky Mobile Footer CTA Bar (Apple-style conversion psychology) */}
      {currentView === 'home' && !successOrder && (
        <div className="md:hidden fixed bottom-0 left-0 right-0 bg-emerald-950/95 backdrop-blur-md border-t border-emerald-900/60 p-3 z-40 flex items-center justify-between shadow-lg">
          <div className="text-left pl-2">
            <span className="text-[9px] text-emerald-300 block font-bold leading-none uppercase">পপুলার ৫০০গ্রাম</span>
            <span className="text-base font-black font-mono text-amber-400 leading-none block mt-1">৳১,৭৫০</span>
          </div>
          <button
            onClick={() => handleScrollToSection('packages')}
            className="bg-amber-500 text-emerald-950 px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider shadow-md hover:bg-amber-400 cursor-pointer focus:outline-none"
            id="sticky-mobile-order-btn"
          >
            এখনই অর্ডার করুন
          </button>
        </div>
      )}

      {/* Order Success Popup Dialog */}
      {successOrder && (
        <OrderSuccessModal 
          order={successOrder} 
          onClose={() => setSuccessOrder(null)} 
        />
      )}

      <Footer 
        setCurrentView={setCurrentView} 
        onScrollToSection={handleScrollToSection} 
      />

    </div>
  );
}
