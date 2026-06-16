import React, { useEffect } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, ArrowRight } from 'lucide-react';
import Header from './Header';


const Footer = () => {
  const currentYear = new Date().getFullYear();

  const navGroups = [
    {
      title: 'Dịch vụ',
      links: [
        { name: 'Thiết kế kiến trúc', path: '/dich-vu' },
        { name: 'Thiết kế nội thất', path: '/dich-vu' },
        { name: 'Thi công trọn gói', path: '/dich-vu' },
        { name: 'Cải tạo sửa chữa', path: '/dich-vu' },
      ],
    },
    {
      title: 'Khám phá',
      links: [
        { name: 'Dự án đã thực hiện', path: '/du-an' },
        { name: 'Mẫu nhà đẹp', path: '/mau-nha' },
        { name: 'Báo giá tham khảo', path: '/bao-gia' },
        { name: 'Giới thiệu công ty', path: '/gioi-thieu' },
      ],
    },
  ];

  const contactInfo = [
    { icon: <MapPin size={16} />, text: 'Đà Nẵng, Việt Nam' },
    { icon: <Phone size={16} />, text: '077 823 6311', href: 'tel:0778236311' },
    { icon: <Mail size={16} />, text: 'dadcons.arc@gmail.com', href: 'mailto:dadcons.arc@gmail.com' },
    { icon: <Clock size={16} />, text: 'Thứ 2–Thứ 7: 8:00 – 17:30' },
  ];

  return (
    <footer className="bg-secondary text-white">
      {/* CTA strip */}
      <div className="border-b border-white/10 bg-primary/10">
        <div className="container mx-auto flex flex-col items-center justify-between gap-4 px-4 py-6 sm:flex-row md:px-8">
          <p className="text-center text-lg font-semibold text-white sm:text-left">
            Sẵn sàng xây ngôi nhà mơ ước? Nhận tư vấn miễn phí ngay hôm nay.
          </p>
          <Link
            to="/lien-he"
            className="flex shrink-0 items-center gap-2 rounded-sm bg-primary px-7 py-3 font-bold text-white transition-all hover:-translate-y-0.5 hover:bg-yellow-600 hover:shadow-lg"
          >
            Liên hệ ngay <ArrowRight size={18} />
          </Link>
        </div>
      </div>

      {/* Main footer content */}
      <div className="container mx-auto grid grid-cols-1 gap-12 px-4 py-14 md:px-8 lg:grid-cols-[2fr_1fr_1fr_1.5fr]">
        {/* Brand column */}
        <div>
          <Link to="/" className="inline-block mb-5">
            <img src="/logo.jpg" alt="DAD Construction" className="h-14 w-auto rounded-sm object-contain brightness-0 invert" />
          </Link>
          <p className="mb-6 text-[15px] leading-relaxed text-gray-400">
            Chuyên thiết kế kiến trúc và thi công trọn gói nhà phố, biệt thự, nhà cấp 4 tại Đà Nẵng và miền Trung. Hơn 10 năm kinh nghiệm, 250+ công trình hoàn thiện.
          </p>
          <div className="flex items-center gap-3">
            <a
              href="https://www.facebook.com/dadcons.arc"
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-9 w-9 items-center justify-center rounded-sm bg-white/10 text-gray-400 transition-all hover:bg-primary hover:text-white"
              aria-label="Facebook DAD Construction"
            >
              <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
              </svg>
            </a>

            <a
              href="tel:0778236311"
              className="flex h-9 items-center gap-2 rounded-sm bg-white/10 px-4 text-sm font-semibold text-gray-300 transition-all hover:bg-primary hover:text-white"
            >
              <Phone size={15} />
              Gọi hotline
            </a>
          </div>
        </div>

        {/* Nav link groups */}
        {navGroups.map((group) => (
          <div key={group.title}>
            <h4 className="mb-5 text-sm font-bold uppercase tracking-widest text-primary">
              {group.title}
            </h4>
            <ul className="space-y-3">
              {group.links.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-[15px] text-gray-400 transition-colors hover:text-white"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}

        {/* Contact column */}
        <div>
          <h4 className="mb-5 text-sm font-bold uppercase tracking-widest text-primary">
            Thông tin liên hệ
          </h4>
          <ul className="space-y-4">
            {contactInfo.map((item) => (
              <li key={item.text} className="flex items-start gap-3">
                <span className="mt-0.5 shrink-0 text-primary">{item.icon}</span>
                {item.href ? (
                  <a href={item.href} className="text-[15px] text-gray-400 transition-colors hover:text-white">
                    {item.text}
                  </a>
                ) : (
                  <span className="text-[15px] text-gray-400">{item.text}</span>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="container mx-auto flex flex-col items-center justify-between gap-3 px-4 py-5 text-sm text-gray-500 sm:flex-row md:px-8">
          <p>© {currentYear} DAD Construction. All rights reserved.</p>
          <div className="flex gap-5">
            <Link to="/gioi-thieu" className="transition-colors hover:text-gray-300">Giới thiệu</Link>
            <Link to="/lien-he" className="transition-colors hover:text-gray-300">Liên hệ</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

const PublicLayout = () => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-grow">
        <motion.div
          key={location.pathname}
          className="fixed left-0 right-0 top-0 z-[60] h-0.5 bg-primary"
          initial={{ scaleX: 0, opacity: 0, transformOrigin: 'left' }}
          animate={{ scaleX: 1, opacity: [0, 1, 0] }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        />
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default PublicLayout;
