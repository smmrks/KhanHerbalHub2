import React, { useState } from 'react';
import { Phone, MessageSquare, MapPin, Mail, Clock, Send, CheckCircle } from 'lucide-react';

export default function ContactSection() {
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [message, setMessage] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim() && contact.trim() && message.trim()) {
      setSuccess(true);
      setName('');
      setContact('');
      setMessage('');
      setTimeout(() => setSuccess(false), 5000);
    }
  };

  return (
    <section id="contact" className="py-24 bg-zinc-50 min-h-screen text-left">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-emerald-700 font-bold text-xs uppercase tracking-widest block">আমাদের সাথে যোগাযোগ</span>
          <h2 className="text-3xl sm:text-4xl font-bold font-display text-gray-900 tracking-tight">
            যেকোনো জিজ্ঞাসা বা <span className="text-emerald-700">পরামর্শে আমরা আছি আপনার পাশে</span>
          </h2>
          <div className="w-16 h-1 bg-amber-500 mx-auto rounded-full mt-2" />
          <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
            আমাদের পণ্য প্রস্তুত প্রণালী, পাইকারি সরবরাহ বা অন্য যেকোনো তথ্যের জন্য সরাসরি আমাদের ঠিকানায় চলে আসুন অথবা ফোন করুন।
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-stretch max-w-6xl mx-auto">
          
          {/* Left: Contact Coordinates & Form */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-3xl border border-zinc-200/80 shadow-sm flex flex-col justify-between space-y-8">
            
            {/* Contact Details Grid */}
            <div className="grid sm:grid-cols-2 gap-6">
              
              <div className="space-y-4 text-left">
                <div className="flex items-center space-x-2 text-emerald-800">
                  <div className="w-9 h-9 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
                    <Phone className="w-4.5 h-4.5" />
                  </div>
                  <h4 className="text-sm sm:text-base font-bold">সরাসরি কল করুন</h4>
                </div>
                <div className="text-xs sm:text-sm text-gray-600 pl-11">
                  <a href="tel:+8801608780378" className="block font-semibold hover:text-emerald-700 transition-colors font-mono">
                    +8801608780378
                  </a>
                  <span className="text-gray-400 block mt-0.5">কাস্টমার কেয়ার হেল্পলাইন</span>
                </div>
              </div>

              <div className="space-y-4 text-left">
                <div className="flex items-center space-x-2 text-emerald-800">
                  <div className="w-9 h-9 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
                    <MessageSquare className="w-4.5 h-4.5" />
                  </div>
                  <h4 className="text-sm sm:text-base font-bold">হোয়াটসঅ্যাপ চ্যাট</h4>
                </div>
                <div className="text-xs sm:text-sm text-gray-600 pl-11">
                  <a href="https://wa.me/8801608780378" target="_blank" rel="noreferrer" className="block font-semibold hover:text-emerald-700 transition-colors font-mono">
                    +8801608780378
                  </a>
                  <span className="text-gray-400 block mt-0.5">ইনস্ট্যান্ট অর্ডার ও সহায়তা</span>
                </div>
              </div>

              <div className="space-y-4 text-left">
                <div className="flex items-center space-x-2 text-emerald-800">
                  <div className="w-9 h-9 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
                    <MapPin className="w-4.5 h-4.5" />
                  </div>
                  <h4 className="text-sm sm:text-base font-bold">আমাদের ঠিকানা</h4>
                </div>
                <div className="text-xs sm:text-sm text-gray-600 pl-11 leading-relaxed">
                  <span>চন্দ্রা পল্লি বিদ্যুৎ, কালিয়াকৈর, গাজীপুর, ঢাকা, বাংলাদেশ।</span>
                </div>
              </div>

              <div className="space-y-4 text-left">
                <div className="flex items-center space-x-2 text-emerald-800">
                  <div className="w-9 h-9 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
                    <Clock className="w-4.5 h-4.5" />
                  </div>
                  <h4 className="text-sm sm:text-base font-bold">সাপোর্ট সময়সূচী</h4>
                </div>
                <div className="text-xs sm:text-sm text-gray-600 pl-11">
                  <span className="block font-semibold text-gray-800">সকাল ৯:০০ - রাত ১০:০০</span>
                  <span className="text-gray-400 block mt-0.5">সপ্তাহে ৭ দিন খোলা</span>
                </div>
              </div>

            </div>

            {/* Quick Contact Form */}
            <div className="border-t border-zinc-100 pt-6">
              <h3 className="text-sm sm:text-base font-bold text-gray-900 mb-4">আমাদের সরাসরি মেসেজ পাঠান</h3>
              
              {success && (
                <div className="mb-4 bg-emerald-50 border border-emerald-100 text-emerald-800 p-3.5 rounded-2xl flex items-center space-x-2 text-xs font-bold">
                  <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0" />
                  <span>আপনার মেসেজটি সফলভাবে পাঠানো হয়েছে। আমরা শিগগিরই আপনার সাথে যোগাযোগ করব।</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="text-left">
                    <label htmlFor="contactName" className="block text-[11px] font-bold text-gray-700 mb-1">আপনার নাম</label>
                    <input
                      type="text"
                      id="contactName"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="নাম লিখুন"
                      className="w-full px-3.5 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl text-xs focus-ring"
                      required
                    />
                  </div>
                  <div className="text-left">
                    <label htmlFor="contactPhone" className="block text-[11px] font-bold text-gray-700 mb-1">মোবাইল বা ইমেইল</label>
                    <input
                      type="text"
                      id="contactPhone"
                      value={contact}
                      onChange={(e) => setContact(e.target.value)}
                      placeholder="যোগাযোগের নম্বর/ইমেইল"
                      className="w-full px-3.5 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl text-xs focus-ring"
                      required
                    />
                  </div>
                </div>

                <div className="text-left">
                  <label htmlFor="contactMsg" className="block text-[11px] font-bold text-gray-700 mb-1">আপনার বার্তা/জিজ্ঞাসা</label>
                  <textarea
                    id="contactMsg"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="আপনার প্রশ্ন বা মতামত বিস্তারিত এখানে লিখুন..."
                    className="w-full px-3.5 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl text-xs focus-ring h-20 resize-none"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full sm:w-auto px-6 py-3 bg-emerald-950 hover:bg-emerald-900 text-white rounded-xl text-xs font-bold transition-colors flex items-center justify-center space-x-2 cursor-pointer focus:outline-none"
                  id="contact-submit-btn"
                >
                  <span>বার্তা পাঠান</span>
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>
            </div>

          </div>

          {/* Right: Interactive Map Frame */}
          <div className="lg:col-span-5 bg-white p-4 rounded-3xl border border-zinc-200/80 shadow-sm flex flex-col justify-between space-y-4">
            <div className="text-left">
              <span className="text-[10px] font-black text-emerald-700 uppercase tracking-widest block">গুগল ম্যাপ লোকেশন</span>
              <h3 className="text-base font-bold text-gray-900 mt-0.5">গাজীপুর চন্দ্রা হেড অফিস</h3>
            </div>
            
            {/* Real responsive iframe embed focused on Gazipur */}
            <div className="relative w-full flex-1 min-h-[300px] rounded-2xl overflow-hidden border border-zinc-200/60 shadow-inner bg-zinc-100">
              <iframe
                title="Khan Herbal Hub Map Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14569.213963406567!2d90.25547608226466!3d24.002821105151528!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755e3ea339be0d1%3A0xc3c6b2089db071fd!2sChandra%2C%20Kaliakair!5e0!3m2!1sen!2sbd!4v1700000000000!5m2!1sen!2sbd"
                className="absolute inset-0 w-full h-full border-0"
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

            <div className="text-xs text-gray-500 leading-snug p-2 flex items-start space-x-2">
              <MapPin className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
              <span>
                <strong>দিকনির্দেশনা:</strong> ঢাকা-টাঙ্গাইল মহাসড়কের চন্দ্রা মোড় থেকে বামে পল্লি বিদ্যুৎ অফিসের ঠিক বিপরীত পার্শ্বে আমাদের শোরুম ও ফ্যাক্টরি অবস্থিত।
              </span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
