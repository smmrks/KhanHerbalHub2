import React, { useState, useEffect, useRef } from 'react';
import { Star, ShieldCheck, ChevronLeft, ChevronRight, ThumbsUp, Quote } from 'lucide-react';
import { REVIEWS } from '../data';

export default function Reviews() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const autoSlideInterval = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!isHovered) {
      autoSlideInterval.current = setInterval(() => {
        setActiveIndex((prev) => (prev + 1) % REVIEWS.length);
      }, 5000);
    } else {
      if (autoSlideInterval.current) {
        clearInterval(autoSlideInterval.current);
      }
    }

    return () => {
      if (autoSlideInterval.current) {
        clearInterval(autoSlideInterval.current);
      }
    };
  }, [isHovered]);

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + REVIEWS.length) % REVIEWS.length);
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % REVIEWS.length);
  };

  return (
    <section id="reviews" className="py-20 bg-emerald-950 text-white overflow-hidden scroll-mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* Ambient Glows */}
        <div className="absolute top-10 right-10 w-48 h-48 rounded-full bg-emerald-500/5 blur-2xl" />
        <div className="absolute bottom-10 left-10 w-48 h-48 rounded-full bg-amber-500/5 blur-2xl" />

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-amber-400 font-bold text-xs uppercase tracking-widest block">কাস্টমারদের মুখ থেকে শুনুন</span>
          <h2 className="text-3xl sm:text-4xl font-bold font-display text-white tracking-tight">
            শতভাগ সন্তুষ্ট <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-300">হাজারো গ্রাহকদের মতামত</span>
          </h2>
          <div className="w-16 h-1 bg-amber-500 mx-auto rounded-full mt-2" />
          <p className="text-emerald-200/80 text-sm sm:text-base leading-relaxed">
            আমরা শুধু বিক্রি করায় বিশ্বাস করি না, গ্রাহকদের সর্বোচ্চ স্বাস্থ্য উপকারিতা নিশ্চিত করাই আমাদের প্রধান উদ্দেশ্য।
          </p>
        </div>

        {/* Trust Stats Box */}
        <div className="max-w-xl mx-auto mb-12 bg-emerald-900/40 border border-emerald-800/40 p-6 rounded-3xl flex flex-col sm:flex-row items-center justify-around text-center gap-6 shadow-lg">
          <div>
            <span className="text-3xl font-black font-mono text-amber-400 block">৪.৯ ★</span>
            <span className="text-xs text-gray-300 block mt-1">গড় রেটিং (১৮৫০+ রিভিউ)</span>
          </div>
          <div className="hidden sm:block w-px h-10 bg-emerald-800/80" />
          <div>
            <span className="text-3xl font-black font-mono text-amber-400 block">৯৮.৫%</span>
            <span className="text-xs text-gray-300 block mt-1">গ্রাহক সন্তুষ্টির হার</span>
          </div>
          <div className="hidden sm:block w-px h-10 bg-emerald-800/80" />
          <div>
            <span className="text-3xl font-black font-mono text-amber-400 block">১০০%</span>
            <span className="text-xs text-gray-300 block mt-1">প্রাকৃতিক উপাদানের নিশ্চয়তা</span>
          </div>
        </div>

        {/* Carousel Container */}
        <div 
          className="max-w-4xl mx-auto relative px-4"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Slides */}
          <div className="relative min-h-[320px] md:min-h-[260px] flex items-center justify-center">
            {REVIEWS.map((review, idx) => {
              const isActive = idx === activeIndex;
              return (
                <div
                  key={review.id}
                  className={`absolute inset-0 transition-all duration-500 ease-in-out ${
                    isActive 
                      ? 'opacity-100 scale-100 translate-x-0 z-20 pointer-events-auto' 
                      : 'opacity-0 scale-95 translate-x-12 z-0 pointer-events-none'
                  }`}
                  id={`review-slide-${idx}`}
                >
                  <div className="bg-emerald-900/40 backdrop-blur-md border border-emerald-800/60 p-6 md:p-10 rounded-3xl shadow-xl flex flex-col md:flex-row gap-6 md:gap-8 items-start relative overflow-hidden">
                    {/* Background Quote Mark */}
                    <Quote className="absolute right-6 top-6 w-24 h-24 text-emerald-800/20 pointer-events-none" />

                    {/* Customer Photo and Identity */}
                    <div className="flex md:flex-col items-center md:items-center text-center shrink-0 w-full md:w-44 gap-4">
                      <div className="relative">
                        <img
                          src={review.avatarUrl}
                          alt={review.name}
                          className="w-16 h-16 md:w-20 md:h-20 rounded-full object-cover border-2 border-amber-500 p-0.5 shadow-md shadow-emerald-950"
                          referrerPolicy="no-referrer"
                        />
                        {review.verified && (
                          <div className="absolute -bottom-1 -right-1 bg-amber-500 text-emerald-950 p-1 rounded-full shadow-lg">
                            <ShieldCheck className="w-3.5 h-3.5" />
                          </div>
                        )}
                      </div>
                      
                      <div className="text-left md:text-center">
                        <h4 className="text-base font-bold text-white flex items-center justify-start md:justify-center gap-1">
                          {review.name}
                        </h4>
                        <span className="text-xs text-emerald-300 block mt-0.5">{review.location}</span>
                        <div className="flex mt-1.5 md:justify-center">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star
                              key={i}
                              className={`w-3.5 h-3.5 ${
                                i < review.rating ? 'text-amber-400 fill-amber-400' : 'text-gray-600'
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Review text content */}
                    <div className="flex-1 space-y-4 text-left">
                      <p className="text-gray-200 text-sm sm:text-base leading-relaxed italic">
                        "{review.text}"
                      </p>
                      
                      <div className="flex flex-wrap items-center gap-3 pt-3 border-t border-emerald-800/40 text-xs text-gray-400">
                        <span className="bg-emerald-800/50 px-2.5 py-1 rounded-full text-emerald-300 font-semibold text-[10px]">
                          ক্রয়কৃত: {review.variant}
                        </span>
                        <span>ক্রয়ের তারিখ: {review.date}</span>
                        <span className="flex items-center gap-1 text-emerald-400">
                          <ThumbsUp className="w-3.5 h-3.5" />
                          <span>ভেরিফাইড কাস্টমার</span>
                        </span>
                      </div>
                    </div>

                  </div>
                </div>
              );
            })}
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={handlePrev}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 md:-translate-x-8 bg-emerald-900 border border-emerald-800 text-white p-2.5 rounded-full shadow-lg hover:bg-amber-500 hover:text-emerald-950 transition-colors focus:outline-none z-30"
            aria-label="Previous Review"
            id="review-prev-btn"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          
          <button
            onClick={handleNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 md:translate-x-8 bg-emerald-900 border border-emerald-800 text-white p-2.5 rounded-full shadow-lg hover:bg-amber-500 hover:text-emerald-950 transition-colors focus:outline-none z-30"
            aria-label="Next Review"
            id="review-next-btn"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Indicators */}
          <div className="flex justify-center space-x-2 mt-8">
            {REVIEWS.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActiveIndex(idx)}
                className={`h-2 rounded-full transition-all focus:outline-none ${
                  idx === activeIndex ? 'w-6 bg-amber-500' : 'w-2 bg-emerald-800'
                }`}
                aria-label={`Go to slide ${idx + 1}`}
                id={`review-dot-${idx}`}
              />
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}
