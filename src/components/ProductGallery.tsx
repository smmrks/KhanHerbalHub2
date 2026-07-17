import React, { useState } from 'react';
import { ZoomIn, X, ChevronLeft, ChevronRight, Eye, Sparkles } from 'lucide-react';

interface GalleryItem {
  id: string;
  url: string;
  title: string;
  category: string;
}

export default function ProductGallery() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [zoomActive, setZoomActive] = useState(false);

  const galleryImages: GalleryItem[] = [
    {
      id: 'gal-1',
      url: 'https://images.unsplash.com/photo-1617897903246-719242758050?auto=format&fit=crop&q=80&w=800',
      title: 'প্রিমিয়াম গ্লাস জার প্যাকেজিং',
      category: 'প্যাকেজিং'
    },
    {
      id: 'gal-2',
      url: 'https://images.unsplash.com/photo-1514733670139-4d87a1941d55?auto=format&fit=crop&q=80&w=800',
      title: 'তাজা ভেষজের গুণাগুণ',
      category: 'উপাদান'
    },
    {
      id: 'gal-3',
      url: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&q=80&w=800',
      title: 'সুন্দরবনের খাঁটি চাকের মধু',
      category: 'উপাদান'
    },
    {
      id: 'gal-4',
      url: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=800',
      title: 'সুস্থ ও এনার্জেটিক লাইফস্টাইল',
      category: 'লাইফস্টাইল'
    },
    {
      id: 'gal-5',
      url: 'https://images.unsplash.com/photo-1564049489314-60d154ff107d?auto=format&fit=crop&q=80&w=800',
      title: 'ভেষজ প্রক্রিয়াকরণ ল্যাব',
      category: 'প্রস্তুত প্রণালী'
    },
    {
      id: 'gal-6',
      url: 'https://images.unsplash.com/photo-1508061253366-f7da158b6d46?auto=format&fit=crop&q=80&w=800',
      title: 'প্রিমিয়াম বাদামের মিশ্রণ',
      category: 'উপাদান'
    }
  ];

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setZoomActive(false);
  };

  const closeLightbox = () => {
    setLightboxIndex(null);
    setZoomActive(false);
  };

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex + 1) % galleryImages.length);
      setZoomActive(false);
    }
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex - 1 + galleryImages.length) % galleryImages.length);
      setZoomActive(false);
    }
  };

  return (
    <section id="gallery" className="py-20 bg-zinc-50 scroll-mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-emerald-700 font-bold text-xs uppercase tracking-widest block">গ্যালারি</span>
          <h2 className="text-3xl sm:text-4xl font-bold font-display text-gray-900 tracking-tight">
            খান হারবাল হাব <span className="text-emerald-700">ফটো গ্যালারি</span>
          </h2>
          <div className="w-16 h-1 bg-amber-500 mx-auto rounded-full mt-2" />
          <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
            আমাদের পণ্য প্রস্তুতের হাইজিনিক পরিবেশ, প্রাকৃতিক উপাদানের বিশুদ্ধতা এবং আভিজাত্যপূর্ণ প্যাকেজিংয়ের এক ঝলক।
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
          {galleryImages.map((img, index) => (
            <div 
              key={img.id}
              onClick={() => openLightbox(index)}
              className="group relative rounded-3xl overflow-hidden aspect-square bg-zinc-200 cursor-pointer shadow-sm hover:shadow-md border border-zinc-200/40"
              id={`gallery-item-${img.id}`}
            >
              <img
                src={img.url}
                alt={img.title}
                loading="lazy"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
              />
              {/* Blur/Black Overlay on Hover */}
              <div className="absolute inset-0 bg-emerald-950/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4 md:p-6 text-left" />
              
              {/* Floating Icons */}
              <div className="absolute top-4 right-4 p-2 bg-white/90 backdrop-blur-md text-emerald-950 rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 shadow-md">
                <ZoomIn className="w-4 h-4" />
              </div>

              {/* Text metadata on Hover */}
              <div className="absolute inset-x-0 bottom-0 p-4 md:p-6 text-left transform translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300 z-10">
                <span className="inline-block bg-amber-500 text-emerald-950 text-[9px] font-black uppercase tracking-widest px-2.5 py-1 rounded-md mb-2">
                  {img.category}
                </span>
                <h4 className="text-white text-xs sm:text-sm font-bold tracking-wide">
                  {img.title}
                </h4>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Lightbox Modal */}
      {lightboxIndex !== null && (
        <div 
          onClick={closeLightbox}
          className="fixed inset-0 bg-black/95 backdrop-blur-md z-50 flex items-center justify-center p-4"
          id="lightbox-backdrop"
        >
          {/* Controls Box */}
          <div className="absolute top-4 right-4 flex items-center space-x-2 z-50">
            <button
              onClick={(e) => { e.stopPropagation(); setZoomActive(!zoomActive); }}
              className="p-3 bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors cursor-pointer"
              title="Zoom Toggle"
              id="lightbox-zoom-btn"
            >
              <Eye className="w-5 h-5" />
            </button>
            <button
              onClick={closeLightbox}
              className="p-3 bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors cursor-pointer"
              id="lightbox-close-btn"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Left Arrow */}
          <button
            onClick={prevImage}
            className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-white/10 hover:bg-white/20 text-white rounded-full transition-all focus:outline-none z-50"
            id="lightbox-prev-btn"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Large Image Frame */}
          <div className="relative max-w-4xl max-h-[80vh] flex flex-col items-center justify-center select-none">
            <img
              src={galleryImages[lightboxIndex].url}
              alt={galleryImages[lightboxIndex].title}
              referrerPolicy="no-referrer"
              className={`max-w-full max-h-[70vh] rounded-2xl object-contain transition-transform duration-300 shadow-2xl ${
                zoomActive ? 'scale-125 cursor-zoom-out' : 'scale-100'
              }`}
            />
            {/* Meta Title */}
            <div className="mt-4 text-center text-white space-y-1">
              <span className="text-xs text-amber-400 font-bold tracking-wider uppercase">
                {galleryImages[lightboxIndex].category}
              </span>
              <p className="text-sm font-bold tracking-wide">
                {galleryImages[lightboxIndex].title}
              </p>
            </div>
          </div>

          {/* Right Arrow */}
          <button
            onClick={nextImage}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-white/10 hover:bg-white/20 text-white rounded-full transition-all focus:outline-none z-50"
            id="lightbox-next-btn"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      )}

    </section>
  );
}
