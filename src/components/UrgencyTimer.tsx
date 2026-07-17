import React, { useState, useEffect } from 'react';
import { Clock, Flame, Sparkles } from 'lucide-react';

export default function UrgencyTimer() {
  const [timeLeft, setTimeLeft] = useState<number>(0);

  // Helper to convert English numbers to Bengali numbers
  const toBengaliNumber = (num: number): string => {
    const banglaDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
    const padded = num.toString().padStart(2, '0');
    return padded
      .split('')
      .map((digit) => {
        const d = parseInt(digit);
        return isNaN(d) ? digit : banglaDigits[d];
      })
      .join('');
  };

  useEffect(() => {
    const TIMER_DURATION_MS = 14 * 60 * 1000 + 45 * 1000; // 14 mins 45 secs
    const STORAGE_KEY = 'khh_checkout_timer_expiry';

    const getOrSetExpiry = () => {
      const now = Date.now();
      const storedExpiry = localStorage.getItem(STORAGE_KEY);
      
      if (storedExpiry) {
        const expiryTime = parseInt(storedExpiry, 10);
        // If expired or invalid, reset it
        if (isNaN(expiryTime) || expiryTime <= now) {
          const newExpiry = now + TIMER_DURATION_MS;
          localStorage.setItem(STORAGE_KEY, newExpiry.toString());
          return newExpiry;
        }
        return expiryTime;
      } else {
        const newExpiry = now + TIMER_DURATION_MS;
        localStorage.setItem(STORAGE_KEY, newExpiry.toString());
        return newExpiry;
      }
    };

    let expiryTime = getOrSetExpiry();

    const calculateTimeLeft = () => {
      const now = Date.now();
      let diff = expiryTime - now;

      if (diff <= 0) {
        // If hit zero, reset for another loop to maintain the urgency sensation
        expiryTime = now + TIMER_DURATION_MS;
        localStorage.setItem(STORAGE_KEY, expiryTime.toString());
        diff = TIMER_DURATION_MS;
      }

      return Math.floor(diff / 1000);
    };

    // Initial setup
    setTimeLeft(calculateTimeLeft());

    // Tick interval
    const interval = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  // Calculate percentage for progress bar (assuming 14m 45s total duration = 885 seconds)
  const totalSeconds = 14 * 60 + 45;
  const percentage = Math.max(0, Math.min(100, (timeLeft / totalSeconds) * 100));

  return (
    <div className="max-w-4xl mx-auto mb-8 bg-amber-500/10 border-2 border-amber-500/20 rounded-3xl p-5 sm:p-6 text-center shadow-md relative overflow-hidden animate-in fade-in duration-300">
      {/* Decorative ambient background sparkles */}
      <div className="absolute -top-10 -left-10 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />
      <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-red-500/5 rounded-full blur-2xl pointer-events-none" />

      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 relative z-10">
        {/* Urgent copy / title */}
        <div className="flex items-center space-x-3 text-left">
          <div className="w-12 h-12 rounded-2xl bg-amber-500 text-emerald-950 flex items-center justify-center shrink-0 shadow-lg shadow-amber-500/20 animate-pulse">
            <Flame className="w-6 h-6 animate-bounce" />
          </div>
          <div>
            <span className="inline-flex items-center space-x-1.5 bg-red-600 text-white text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider mb-1">
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
              <span>আজকের বিশেষ অফার</span>
            </span>
            <h3 className="text-sm sm:text-base font-black text-gray-900 leading-tight">
              অর্ডার করার জন্য আর মাত্র অল্প কিছুক্ষণ সময় বাকি আছে!
            </h3>
            <p className="text-gray-500 text-[11px] sm:text-xs mt-0.5">
              আজকের বিশেষ ডিসকাউন্ট ও অফারটি পেতে এখনই নিচের ফর্মটি পূরণ করুন।
            </p>
          </div>
        </div>

        {/* Dynamic Countdown Timer Display */}
        <div className="flex items-center space-x-2 shrink-0">
          
          {/* Minutes */}
          <div className="flex flex-col items-center">
            <div className="w-14 h-14 bg-emerald-950 text-white rounded-2xl flex items-center justify-center border border-emerald-900 shadow-md">
              <span className="text-2xl font-black font-mono tracking-tight text-amber-400">
                {toBengaliNumber(minutes)}
              </span>
            </div>
            <span className="text-[10px] font-bold text-emerald-800 mt-1">মিনিট</span>
          </div>

          <span className="text-2xl font-bold text-amber-600 animate-pulse pb-5">:</span>

          {/* Seconds */}
          <div className="flex flex-col items-center">
            <div className="w-14 h-14 bg-emerald-950 text-white rounded-2xl flex items-center justify-center border border-emerald-900 shadow-md">
              <span className="text-2xl font-black font-mono tracking-tight text-amber-400">
                {toBengaliNumber(seconds)}
              </span>
            </div>
            <span className="text-[10px] font-bold text-emerald-800 mt-1">সেকেন্ড</span>
          </div>

        </div>
      </div>

      {/* Progress Bar reflecting time ticking down */}
      <div className="mt-4 bg-zinc-200/80 rounded-full h-1.5 overflow-hidden border border-zinc-300/30">
        <div 
          className="bg-gradient-to-r from-amber-500 to-red-600 h-full rounded-full transition-all duration-1000 ease-linear shadow-sm"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
