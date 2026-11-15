import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <>
      {/* Top Bar */}
      <div className="bg-dad-900 text-slate-300 text-xs py-2 block border-b border-dad-800">
        <div className="max-w-7xl mx-auto px-3 sm:px-8 flex justify-between items-center text-[11px] sm:text-xs">
          <div className="flex items-center space-x-3 sm:space-x-6 truncate">
            <span className="flex items-center gap-1.5 sm:gap-2 truncate">
              <i className="fa-solid fa-location-dot text-amber-500 shrink-0"></i>
              <span className="truncate">Núi Thành, TP. Đà Nẵng</span>
            </span>
            <a href="mailto:dadcons.arc@gmail.com" className="hidden md:flex items-center gap-2 hover:text-white transition">
              <i className="fa-solid fa-envelope text-amber-500"></i>
              dadcons.arc@gmail.com
            </a>
          </div>
          <div className="flex items-center space-x-3 sm:space-x-6 shrink-0">
            <span className="text-slate-400 italic hidden lg:inline">"Kiến tạo bền vững - Tạo dựng tương lai"</span>
            <div className="flex items-center space-x-3 border-l border-dad-700 pl-3 sm:pl-6">
              <a href="https://facebook.com" target="_blank" rel="noreferrer" className="hover:text-amber-400 transition" title="Facebook"><i className="fa-brands fa-facebook-f"></i></a>
              <a href="https://zalo.me/0778236311" target="_blank" rel="noreferrer" className="hover:text-amber-400 transition" title="Zalo"><i className="fa-solid fa-comment-dots"></i></a>
              <a href="tel:0778236311" className="hover:text-amber-400 transition" title="Gọi Hotline"><i className="fa-solid fa-phone"></i></a>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <header id="navbar" className="sticky top-0 z-40 bg-white/95 backdrop-blur-md shadow-sm transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="flex justify-between items-center h-16 sm:h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2.5 sm:gap-3 group focus:outline-none">
              <div className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center shrink-0">
                <svg viewBox="0 0 120 120" className="w-full h-full fill-dad-700 group-hover:fill-dad-600 transition-colors">
                  <path d="M60 8 L108 35 L60 62 L12 35 Z M60 22 L32 35 L60 50 L88 35 Z" />
                  <path d="M10 40 L57 67 L57 114 L10 87 Z M22 58 L22 78 L45 91 L45 71 Z" />
                  <polygon points="18,68 48,85 48,77 18,60" />
                  <path d="M63 67 L110 40 L110 87 L63 114 Z M75 71 L75 95 L98 82 L98 58 Z" />
                </svg>
              </div>
              <div className="flex flex-col">
                <div className="flex items-start">
                  <span className="font-heading font-extrabold text-xl sm:text-3xl tracking-tight text-dad-700 leading-none">DAD</span>
                  <span className="text-[9px] sm:text-[10px] font-bold text-dad-700 ml-0.5 -mt-0.5">®</span>
                </div>
                <span className="font-heading font-bold text-[10px] sm:text-sm tracking-widest text-dad-700 uppercase leading-tight">Construction</span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-7 font-medium text-sm text-slate-700">
              <a href="/#trang-chu" className="hover:text-dad-700 transition py-2">Trang chủ</a>
              <a href="/#du-an" className="hover:text-dad-700 transition py-2">Dự án tiêu biểu</a>
              <a href="/#dich-vu" className="hover:text-dad-700 transition py-2">Dịch vụ</a>
              <a href="/#quy-trinh" className="hover:text-dad-700 transition py-2">Quy trình</a>
              <a href="/#du-toan" className="hover:text-dad-700 transition py-2">Dự toán chi phí</a>
              <a href="/#cam-nhan" className="hover:text-dad-700 transition py-2">Đánh giá</a>
              <a href="/#hoi-dap" className="hover:text-dad-700 transition py-2">Hỏi đáp</a>
              <a href="/#lien-he" className="hover:text-dad-700 transition py-2">Liên hệ</a>
            </nav>

            {/* CTA Button & Mobile Toggle */}
            <div className="flex items-center space-x-3">
              <a href="tel:0778236311" className="hidden sm:flex items-center gap-2.5 bg-dad-700 hover:bg-dad-800 text-white px-5 py-2.5 rounded-xl font-semibold text-sm shadow-md shadow-dad-700/20 transition transform hover:-translate-y-0.5">
                <i className="fa-solid fa-phone-volume animate-pulse text-amber-400"></i>
                <span>077 823 6311</span>
              </a>
              
              <button 
                onClick={toggleMobileMenu} 
                className="lg:hidden p-2.5 rounded-xl text-slate-700 hover:bg-slate-100 transition" 
                aria-label="Mở menu điều hướng"
              >
                <i className={`fa-solid ${mobileMenuOpen ? 'fa-xmark' : 'fa-bars'} text-xl`}></i>
              </button>
            </div>
          </div>

          {/* Mobile Drawer */}
          {mobileMenuOpen && (
            <div className="lg:hidden py-4 border-t border-slate-100 space-y-1.5 animate-fadeIn">
              <a href="/#trang-chu" onClick={closeMobileMenu} className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold text-slate-700 hover:bg-amber-50 hover:text-amber-800 transition">
                <i className="fa-solid fa-house text-amber-500 w-5"></i>
                <span>Trang chủ</span>
              </a>
              <a href="/#du-an" onClick={closeMobileMenu} className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold text-slate-700 hover:bg-amber-50 hover:text-amber-800 transition">
                <i className="fa-solid fa-building text-amber-500 w-5"></i>
                <span>Dự án tiêu biểu</span>
              </a>
              <a href="/#dich-vu" onClick={closeMobileMenu} className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold text-slate-700 hover:bg-amber-50 hover:text-amber-800 transition">
                <i className="fa-solid fa-layer-group text-amber-500 w-5"></i>
                <span>Dịch vụ</span>
              </a>
              <a href="/#quy-trinh" onClick={closeMobileMenu} className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold text-slate-700 hover:bg-amber-50 hover:text-amber-800 transition">
                <i className="fa-solid fa-list-ol text-amber-500 w-5"></i>
                <span>Quy trình</span>
              </a>
              <a href="/#du-toan" onClick={closeMobileMenu} className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold text-slate-700 hover:bg-amber-50 hover:text-amber-800 transition">
                <i className="fa-solid fa-calculator text-amber-500 w-5"></i>
                <span>Dự toán chi phí</span>
              </a>
              <a href="/#cam-nhan" onClick={closeMobileMenu} className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold text-slate-700 hover:bg-amber-50 hover:text-amber-800 transition">
                <i className="fa-solid fa-comments text-amber-500 w-5"></i>
                <span>Đánh giá khách hàng</span>
              </a>
              <a href="/#hoi-dap" onClick={closeMobileMenu} className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold text-slate-700 hover:bg-amber-50 hover:text-amber-800 transition">
                <i className="fa-solid fa-circle-question text-amber-500 w-5"></i>
                <span>Câu hỏi thường gặp</span>
              </a>
              <a href="/#lien-he" onClick={closeMobileMenu} className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold text-slate-700 hover:bg-amber-50 hover:text-amber-800 transition">
                <i className="fa-solid fa-envelope text-amber-500 w-5"></i>
                <span>Liên hệ báo giá</span>
              </a>
              <div className="pt-3 grid grid-cols-2 gap-2">
                <a href="tel:0778236311" className="flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-600 text-slate-950 py-3 rounded-xl font-bold text-xs sm:text-sm shadow-md">
                  <i className="fa-solid fa-phone"></i> Gọi hotline
                </a>
                <a href="https://zalo.me/0778236311" target="_blank" rel="noreferrer" className="flex items-center justify-center gap-2 bg-[#0068ff] hover:bg-blue-600 text-white py-3 rounded-xl font-bold text-xs sm:text-sm shadow-md">
                  <i className="fa-solid fa-comment-dots"></i> Chat Zalo
                </a>
              </div>
            </div>
          )}
        </div>
      </header>
    </>
  );
}
