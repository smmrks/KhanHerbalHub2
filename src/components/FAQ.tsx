import React, { useState } from 'react';
import { FAQS } from '../data';
import { ChevronDown, ChevronUp, HelpCircle, PhoneCall, MessageCircle } from 'lucide-react';

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-20 bg-white scroll-mt-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <span className="text-emerald-700 font-bold text-xs uppercase tracking-widest block">সাধারণ জিজ্ঞাসা</span>
          <h2 className="text-3xl sm:text-4xl font-bold font-display text-gray-900 tracking-tight">
            সচরাচর <span className="text-emerald-700">জিজ্ঞাসিত প্রশ্নসমূহ</span>
          </h2>
          <div className="w-16 h-1 bg-amber-500 mx-auto rounded-full mt-2" />
          <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
            আমাদের পণ্য, ডেলিভারি প্রক্রিয়া এবং সেবা সম্পর্কিত গ্রাহকদের সাধারণ কিছু প্রশ্নের সহজ উত্তর।
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-4">
          {FAQS.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div 
                key={index}
                className="bg-zinc-50 border border-zinc-200/60 rounded-2xl overflow-hidden transition-all duration-300"
                id={`faq-accordion-${index}`}
              >
                <button
                  onClick={() => toggleAccordion(index)}
                  className="w-full py-4.5 px-6 flex items-center justify-between text-left focus:outline-none focus:bg-zinc-100/50 cursor-pointer"
                  id={`faq-accordion-btn-${index}`}
                >
                  <div className="flex items-center space-x-3.5 pr-4">
                    <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
                      <HelpCircle className="w-4.5 h-4.5" />
                    </div>
                    <span className="text-sm sm:text-base font-bold text-gray-900 leading-snug">
                      {faq.question}
                    </span>
                  </div>
                  <div className={`text-gray-500 shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
                    <ChevronDown className="w-5 h-5" />
                  </div>
                </button>

                {/* Smooth transition content */}
                <div 
                  className={`transition-all duration-300 ease-in-out overflow-hidden ${
                    isOpen ? 'max-h-[500px] border-t border-zinc-200/40 opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <div className="p-6 text-gray-600 text-xs sm:text-sm leading-relaxed text-left">
                    {faq.answer}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Help CTA Box */}
        <div className="mt-16 bg-emerald-950 text-white rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="text-left space-y-2">
            <h3 className="text-lg sm:text-xl font-bold font-display">আপনার মনে কি এখনো কোনো প্রশ্ন আছে?</h3>
            <p className="text-xs sm:text-sm text-emerald-200/80">
              আমাদের প্রোডাক্ট বিশেষজ্ঞ টিম সরাসরি ফোনে কথা বলে আপনার যেকোনো স্বাস্থ্য বিষয়ক পরামর্শ দিতে প্রস্তুত।
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto shrink-0">
            <a
              href="tel:+8801608780378"
              className="flex items-center justify-center space-x-2 bg-amber-500 hover:bg-amber-400 text-emerald-950 px-5 py-3 rounded-2xl text-xs font-bold transition-colors"
            >
              <PhoneCall className="w-4 h-4" />
              <span>কল করুন: +8801608780378</span>
            </a>
            <a
              href="https://wa.me/8801608780378"
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-center space-x-2 bg-emerald-900 border border-emerald-800 text-white px-5 py-3 rounded-2xl text-xs font-bold transition-all hover:bg-emerald-800"
            >
              <MessageCircle className="w-4 h-4 text-green-400" />
              <span>সরাসরি হোয়াটসঅ্যাপ</span>
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}
