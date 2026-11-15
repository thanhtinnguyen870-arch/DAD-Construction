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
      <div className="bg-dad-900 text-slate-300 text-xs py-2.5 block border-b border-dad-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 flex justify-between items-center">
          <div className="flex items-center space-x-6">
            <span className="flex items-center gap-2">
              <i className="fa-solid fa-location-dot text-amber-500"></i>
              Xã Núi Thành, TP. Đà Nẵng
            </span>
            <a href="mailto:dadcons.arc@gmail.com" className="hidden sm:flex items-center gap-2 hover:text-white transition">
              <i className="fa-solid fa-envelope text-amber-500"></i>
              dadcons.arc@gmail.com
            </a>
          </div>
          <div className="flex items-center space-x-6">
            <span className="text-slate-400 italic hidden md:inline">"Kiến tạo bền vững - Tạo dựng tương lai"</span>
            <div className="flex items-center space-x-3 border-l border-dad-700 pl-4 sm:pl-6">
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
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 group focus:outline-none">
              <div className="w-12 h-12 flex items-center justify-center shrink-0">
                <svg viewBox="0 0 120 120" className="w-full h-full fill-dad-700 group-hover:fill-dad-600 transition-colors">
                  <path d="M60 8 L108 35 L60 62 L12 35 Z M60 22 L32 35 L60 50 L88 35 Z" />
                  <path d="M10 40 L57 67 L57 114 L10 87 Z M22 58 L22 78 L45 91 L45 71 Z" />
                  <polygon points="18,68 48,85 48,77 18,60" />
                  <path d="M63 67 L110 40 L110 87 L63 114 Z M75 71 L75 95 L98 82 L98 58 Z" />
                </svg>
              </div>
              <div className="flex flex-col">
                <div className="flex items-start">
                  <span className="font-heading font-extrabold text-2xl sm:text-3xl tracking-tight text-dad-700 leading-none">DAD</span>
                  <span className="text-[10px] font-bold text-dad-700 ml-0.5 -mt-0.5">®</span>
                </div>
                <span className="font-heading font-bold text-xs sm:text-sm tracking-widest text-dad-700 uppercase leading-tight">Construction</span>
                <span className="text-[9px] text-dad-600 font-medium tracking-tight hidden sm:inline-block">Kiến tạo bền vững - Tạo dựng tương lai</span>
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
            <div className="lg:hidden py-4 border-t border-slate-100 space-y-2">
              <a href="/#trang-chu" onClick={closeMobileMenu} className="block px-4 py-2.5 rounded-xl text-sm font-semibold text-slate-700 hover:bg-dad-50 hover:text-dad-700">Trang chủ</a>
              <a href="/#du-an" onClick={closeMobileMenu} className="block px-4 py-2.5 rounded-xl text-sm font-semibold text-slate-700 hover:bg-dad-50 hover:text-dad-700">Dự án tiêu biểu</a>
              <a href="/#dich-vu" onClick={closeMobileMenu} className="block px-4 py-2.5 rounded-xl text-sm font-semibold text-slate-700 hover:bg-dad-50 hover:text-dad-700">Dịch vụ</a>
              <a href="/#quy-trinh" onClick={closeMobileMenu} className="block px-4 py-2.5 rounded-xl text-sm font-semibold text-slate-700 hover:bg-dad-50 hover:text-dad-700">Quy trình</a>
              <a href="/#du-toan" onClick={closeMobileMenu} className="block px-4 py-2.5 rounded-xl text-sm font-semibold text-slate-700 hover:bg-dad-50 hover:text-dad-700">Dự toán chi phí</a>
              <a href="/#cam-nhan" onClick={closeMobileMenu} className="block px-4 py-2.5 rounded-xl text-sm font-semibold text-slate-700 hover:bg-dad-50 hover:text-dad-700">Đánh giá khách hàng</a>
              <a href="/#hoi-dap" onClick={closeMobileMenu} className="block px-4 py-2.5 rounded-xl text-sm font-semibold text-slate-700 hover:bg-dad-50 hover:text-dad-700">Câu hỏi thường gặp</a>
              <a href="/#lien-he" onClick={closeMobileMenu} className="block px-4 py-2.5 rounded-xl text-sm font-semibold text-slate-700 hover:bg-dad-50 hover:text-dad-700">Liên hệ báo giá</a>
              <div className="pt-2">
                <a href="tel:0778236311" className="w-full flex items-center justify-center gap-2 bg-dad-700 text-white py-3 rounded-xl font-bold text-sm">
                  <i className="fa-solid fa-phone text-amber-400"></i> Gọi hotline: 077 823 6311
                </a>
              </div>
            </div>
          )}
        </div>
      </header>
    </>
  );
}
