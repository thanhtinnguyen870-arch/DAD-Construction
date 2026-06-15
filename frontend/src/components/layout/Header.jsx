import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, PhoneCall, X } from 'lucide-react';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Trang chủ', path: '/' },
    { name: 'Giới thiệu', path: '/gioi-thieu' },
    { name: 'Dịch vụ', path: '/dich-vu' },
    { name: 'Dự án', path: '/du-an' },
    { name: 'Mẫu nhà', path: '/mau-nha' },
    { name: 'Báo giá', path: '/bao-gia' },
    { name: 'Liên hệ', path: '/lien-he' },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <header className="fixed top-0 z-50 w-full bg-white/95 py-3 shadow-md backdrop-blur-md">
      <div className="container mx-auto flex items-center justify-between px-4 md:px-8">
        <Link to="/" className="flex items-center gap-2 rounded-sm">
          <img src="/logo.jpg" alt="DAD Construction" className="h-16 w-auto rounded-sm object-contain" />
        </Link>

        <nav className="hidden items-center gap-8 lg:flex">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={`relative px-1 py-2 text-lg font-semibold transition-colors duration-200 hover:text-primary ${
                isActive(link.path) ? 'text-primary' : 'text-gray-700'
              }`}
            >
              {link.name}
              {isActive(link.path) && (
                <motion.span
                  layoutId="public-nav-active"
                  className="absolute inset-x-1 -bottom-0.5 h-0.5 rounded-full bg-primary"
                  transition={{ type: 'spring', stiffness: 420, damping: 34 }}
                />
              )}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-5 lg:flex">
          <a href="tel:0778236311" className="flex items-center gap-2 text-lg font-bold text-primary">
            <PhoneCall size={22} />
            <span>077 823 6311</span>
          </a>
          <Link to="/lien-he" className="rounded-sm bg-primary px-7 py-3 text-lg font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-yellow-600 hover:shadow-md">
            Nhận tư vấn
          </Link>
        </div>

        <button
          className="text-secondary lg:hidden"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Mở menu"
        >
          {isMobileMenuOpen ? <X size={30} /> : <Menu size={30} />}
        </button>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute left-0 top-full flex w-full flex-col gap-4 bg-white px-4 py-4 shadow-lg lg:hidden"
          >
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`text-xl font-semibold ${isActive(link.path) ? 'text-primary' : 'text-gray-800'}`}
              >
                {link.name}
              </Link>
            ))}
            <hr className="my-2" />
            <a href="tel:0778236311" className="flex items-center gap-2 text-lg font-bold text-primary">
              <PhoneCall size={22} />
              <span>077 823 6311</span>
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
