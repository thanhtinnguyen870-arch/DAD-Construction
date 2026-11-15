import React, { useState, useEffect } from 'react';

export default function FloatingActions() {
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 350) {
        setShowBackToTop(true);
      } else {
        setShowBackToTop(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-center gap-3.5">
      {/* Back To Top (Chỉ hiện khi cuộn trang) */}
      {showBackToTop && (
        <button 
          onClick={scrollToTop}
          className="w-10 h-10 rounded-full bg-white/90 hover:bg-white text-slate-700 shadow-lg border border-amber-200/80 transition-all duration-300 flex items-center justify-center text-xs backdrop-blur-sm transform hover:-translate-y-1 hover:shadow-xl group" 
          title="Lên đầu trang"
        >
          <i className="fa-solid fa-chevron-up group-hover:text-amber-600 transition-colors"></i>
        </button>
      )}

      {/* Nút tròn Zalo (Chỉ icon) */}
      <a 
        href="https://zalo.me/0778236311" 
        target="_blank" 
        rel="noreferrer"
        className="relative group w-12 sm:w-14 h-12 sm:h-14 rounded-full bg-[#0068ff] hover:bg-[#0052cc] text-white shadow-xl shadow-blue-600/30 flex items-center justify-center transition-all duration-300 transform hover:scale-110 active:scale-95" 
        title="Chat Zalo: 077 823 6311"
      >
        {/* Zalo Icon Vector */}
        <svg viewBox="0 0 100 100" className="w-7 sm:w-8 h-7 sm:h-8" fill="none">
          <rect width="100" height="100" rx="24" fill="#0068ff" />
          <path 
            d="M50,15 C30.67,15 15,29.33 15,47 C15,57.17 19.86,66.1 27.56,72.01 C26.86,76.04 24.81,81.37 22.74,84.5 C22.35,85.1 22.8,85.88 23.49,85.83 C29.49,85.37 36.8,82.6 41.08,79.82 C43.99,80.66 47.04,81.11 50.19,81.11 C69.52,81.11 85.19,66.78 85.19,49.11 C85.19,31.44 69.52,15 50,15 Z" 
            fill="#ffffff" 
          />
          <text 
            x="50" 
            y="54" 
            fontSize="19" 
            fontWeight="900" 
            fontFamily="Arial, Helvetica, sans-serif" 
            textAnchor="middle" 
            fill="#0068ff"
          >
            Zalo
          </text>
        </svg>

        {/* Hover Tooltip */}
        <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-slate-900/90 backdrop-blur-sm text-white text-xs font-semibold px-3 py-1.5 rounded-xl whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-lg border border-slate-700/50">
          Chat Zalo
        </span>
      </a>

      {/* Nút tròn Điện thoại / Hotline (Chỉ icon) */}
      <a 
        href="tel:0778236311" 
        className="relative group w-12 sm:w-14 h-12 sm:h-14 rounded-full bg-gradient-to-br from-amber-400 via-amber-500 to-amber-600 text-slate-950 shadow-2xl shadow-amber-500/40 flex items-center justify-center transition-all duration-300 transform hover:scale-110 active:scale-95" 
        title="Gọi ngay: 077 823 6311"
      >
        {/* Pulsing Aura */}
        <span className="absolute -inset-1.5 rounded-full bg-amber-400/40 animate-ping opacity-70 pointer-events-none"></span>

        {/* Phone Receiver Icon */}
        <span className="relative z-10 text-lg sm:text-xl text-slate-950 animate-phone-ring">
          <i className="fa-solid fa-phone-volume"></i>
        </span>

        {/* Hover Tooltip */}
        <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-slate-950/95 backdrop-blur-sm text-amber-400 text-xs font-bold px-3 py-1.5 rounded-xl whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-lg border border-amber-500/30">
          077 823 6311
        </span>
      </a>
    </div>
  );
}
