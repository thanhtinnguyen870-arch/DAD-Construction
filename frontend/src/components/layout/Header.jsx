import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, PhoneCall, X } from 'lucide-react';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  // Scroll-aware styling
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    handleScroll(); // run on mount
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
  const isHomePage = location.pathname === '/';

  // On homepage: transparent at top, white when scrolled
  // On other pages: always white
  const headerBg = isHomePage && !isScrolled
    ? 'bg-transparent'
    : 'bg-white/97 shadow-md backdrop-blur-md';

  const logoVisible = isHomePage && !isScrolled ? 'brightness-0 invert' : '';
  const navTextColor = isHomePage && !isScrolled ? 'text-white' : 'text-gray-700';
  const navHoverColor = 'hover:text-primary';
  const activeColor = isHomePage && !isScrolled ? 'text-primary' : 'text-primary';
  const phoneColor = isHomePage && !isScrolled ? 'text-primary' : 'text-primary';

  return (
    <header
      className={`fixed top-0 z-50 w-full py-3 transition-all duration-300 ${headerBg}`}
    >
      <div className="container mx-auto flex items-center justify-between px-4 md:px-8">
        {/* Logo */}
        <Link
          to="/"
          className="flex shrink-0 items-center gap-2 mr-4 lg:mr-8 xl:mr-12"
          aria-label="DAD Construction - Trang chủ"
        >
          <img
            src="/logo.jpg"
            alt="DAD Construction"
            className={`h-12 w-auto rounded-sm object-contain transition-all duration-300 md:h-14 lg:h-16 ${logoVisible}`}
          />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-4 xl:gap-7 lg:flex" aria-label="Điều hướng chính">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={`relative px-1 py-2 text-[15px] font-semibold transition-colors duration-200 ${navHoverColor} ${
                isActive(link.path) ? activeColor : navTextColor
              }`}
            >
              {link.name}
              {isActive(link.path) && (
                <motion.span
                  layoutId="nav-underline"
                  className="absolute inset-x-1 -bottom-0.5 h-0.5 rounded-full bg-primary"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
            </Link>
          ))}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden items-center gap-4 lg:flex">
          <a
            href="tel:0778236311"
            className={`flex items-center gap-2 text-base font-bold transition-colors hover:text-yellow-600 ${phoneColor}`}
          >
            <PhoneCall size={20} />
            <span>077 823 6311</span>
          </a>
          <Link
            to="/lien-he"
            className="rounded-sm bg-primary px-6 py-2.5 text-[15px] font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-yellow-600 hover:shadow-lg"
          >
            Nhận tư vấn
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          className={`rounded-sm p-1 transition-colors lg:hidden ${
            isHomePage && !isScrolled ? 'text-white' : 'text-secondary'
          }`}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label={isMobileMenuOpen ? 'Đóng menu' : 'Mở menu'}
          aria-expanded={isMobileMenuOpen}
        >
          {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="overflow-hidden border-t border-gray-100 bg-white shadow-xl lg:hidden"
          >
            <div className="flex flex-col px-4 py-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex items-center rounded-sm px-3 py-3.5 text-lg font-semibold transition-colors hover:bg-light ${
                    isActive(link.path)
                      ? 'text-primary bg-primary/5'
                      : 'text-gray-800'
                  }`}
                >
                  {link.name}
                  {isActive(link.path) && (
                    <span className="ml-auto h-2 w-2 rounded-full bg-primary" />
                  )}
                </Link>
              ))}
              <div className="mt-4 border-t border-gray-100 pt-4 space-y-3">
                <a
                  href="tel:0778236311"
                  className="flex items-center gap-2 rounded-sm bg-primary/10 px-4 py-3 text-lg font-bold text-primary"
                >
                  <PhoneCall size={20} />
                  <span>077 823 6311</span>
                </a>
                <Link
                  to="/lien-he"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex w-full items-center justify-center rounded-sm bg-primary py-3 text-base font-semibold text-white transition-colors hover:bg-yellow-600"
                >
                  Nhận tư vấn miễn phí
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
