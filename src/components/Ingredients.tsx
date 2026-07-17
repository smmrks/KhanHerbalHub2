import React from 'react';
import { INGREDIENTS } from '../data';
import { Heart } from 'lucide-react';

export default function Ingredients() {
  return (
    <section id="ingredients" className="py-20 bg-zinc-50 scroll-mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-emerald-700 font-bold text-xs uppercase tracking-widest block">প্রাকৃতিক উপাদানসমূহ</span>
          <h2 className="text-3xl sm:text-4xl font-bold font-display text-gray-900 tracking-tight">
            ২১টি মহাশক্তিধর ও বিরল উপাদানের <span className="text-emerald-700">অনন্য বৈজ্ঞানিক অনুপাত</span>
          </h2>
          <div className="w-16 h-1 bg-amber-500 mx-auto rounded-full mt-2" />
          <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
            খান প্রিমিয়াম এনার্জি ফুডে প্রতিটি ভেষজ ল্যাবরেটরিতে পরিশোধনের পর সঠিক বৈজ্ঞানিক মাত্রায় মিশ্রিত করা হয়, যা মানবদেহের পুষ্টিঘাটতি পূরণে অত্যন্ত চমৎকার কাজ করে।
          </p>
        </div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {INGREDIENTS.map((ing, idx) => {
            return (
              <div 
                key={ing.id} 
                className="group bg-white rounded-3xl border border-zinc-100 shadow-sm overflow-hidden hover:shadow-lg hover:border-emerald-100 transition-all duration-300 flex flex-col h-full"
                id={`ing-card-${ing.id}`}
              >
                {/* Image Wrapper */}
                <div className="relative h-48 sm:h-52 overflow-hidden bg-zinc-100">
                  <img
                    src={ing.imageUrl}
                    alt={ing.name}
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                    referrerPolicy="no-referrer"
                    loading="lazy"
                  />
                  {/* Subtle vignette gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/40 via-transparent to-transparent pointer-events-none" />
                  
                  {/* Benefit Badge */}
                  <div className="absolute top-3 left-3 bg-emerald-950/90 text-amber-400 text-[10px] font-black border border-emerald-800/40 px-2.5 py-1.5 rounded-lg flex items-center space-x-1 shadow-md">
                    <Heart className="w-3 h-3 fill-amber-400" />
                    <span>{ing.benefit}</span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col flex-1 text-left">
                  <div className="mb-3">
                    <span className="text-[10px] font-mono font-bold tracking-wider text-emerald-600 uppercase block">
                      {ing.nameEn}
                    </span>
                    <h3 className="text-base sm:text-lg font-black text-gray-900 group-hover:text-emerald-700 transition-colors mt-0.5">
                      {ing.name}
                    </h3>
                  </div>
                  
                  <p className="text-gray-500 text-xs sm:text-sm leading-relaxed flex-1">
                    {ing.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
