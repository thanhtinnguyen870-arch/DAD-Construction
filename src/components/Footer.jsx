import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-dad-900 text-slate-300 pt-16 pb-12 border-t border-dad-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-dad-800">
          {/* Col 1: Brand */}
          <div className="col-span-1 md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white rounded-xl p-1.5 flex items-center justify-center shrink-0">
                <svg viewBox="0 0 120 120" className="w-full h-full fill-dad-700">
                  <path d="M60 8 L108 35 L60 62 L12 35 Z M60 22 L32 35 L60 50 L88 35 Z" />
                  <path d="M10 40 L57 67 L57 114 L10 87 Z M22 58 L22 78 L45 91 L45 71 Z" />
                  <polygon points="18,68 48,85 48,77 18,60" />
                  <path d="M63 67 L110 40 L110 87 L63 114 Z M75 71 L75 95 L98 82 L98 58 Z" />
                </svg>
              </div>
              <div>
                <div className="font-heading font-extrabold text-2xl text-white leading-none">
                  DAD <span className="text-amber-400">CONSTRUCTION</span>
                </div>
                <div className="text-xs text-amber-400 font-medium mt-1">
                  Kiến tạo bền vững - Tạo dựng tương lai
                </div>
              </div>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed max-w-md">
              <strong>Công ty TNHH Xây dựng và Kiến trúc DAD</strong> tự hào là đơn vị uy tín chuyên thiết kế và thi công trọn gói các công trình dân dụng, biệt thự, nhà phố hiện đại với chất lượng kỹ thuật và thẩm mỹ hàng đầu tại Đà Nẵng và miền Trung.
            </p>
            <div className="pt-2 flex items-center gap-3 text-sm">
              <a href="https://facebook.com" target="_blank" rel="noreferrer" className="w-9 h-9 rounded-lg bg-dad-800 hover:bg-dad-700 text-white flex items-center justify-center transition" title="Facebook"><i className="fa-brands fa-facebook-f"></i></a>
              <a href="https://zalo.me/0778236311" target="_blank" rel="noreferrer" className="w-9 h-9 rounded-lg bg-dad-800 hover:bg-dad-700 text-white flex items-center justify-center transition" title="Zalo"><i className="fa-solid fa-comment-dots"></i></a>
              <a href="tel:0778236311" className="w-9 h-9 rounded-lg bg-dad-800 hover:bg-dad-700 text-white flex items-center justify-center transition" title="Hotline"><i className="fa-solid fa-phone"></i></a>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="col-span-1 md:col-span-3 space-y-3">
            <h4 className="font-heading font-bold text-white text-base">Danh mục</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li><a href="/#trang-chu" className="hover:text-amber-400 transition">Trang chủ</a></li>
              <li><a href="/#du-an" className="hover:text-amber-400 transition">Dự án đã thực hiện</a></li>
              <li><a href="/#dich-vu" className="hover:text-amber-400 transition">Dịch vụ xây nhà trọn gói</a></li>
              <li><a href="/#quy-trinh" className="hover:text-amber-400 transition">Quy trình thi công</a></li>
              <li><a href="/#du-toan" className="hover:text-amber-400 transition">Bảng tính chi phí xây dựng</a></li>
              <li><a href="/#cam-nhan" className="hover:text-amber-400 transition">Cảm nhận khách hàng</a></li>
              <li><a href="/#hoi-dap" className="hover:text-amber-400 transition">Câu hỏi thường gặp</a></li>
              <li><a href="/#lien-he" className="hover:text-amber-400 transition">Liên hệ báo giá</a></li>
            </ul>
          </div>

          {/* Col 3: Contact Details */}
          <div className="col-span-1 md:col-span-4 space-y-3">
            <h4 className="font-heading font-bold text-white text-base">Thông tin liên hệ</h4>
            <ul className="space-y-3 text-sm text-slate-300">
              <li className="flex items-start gap-3">
                <i className="fa-solid fa-location-dot text-amber-400 mt-1 shrink-0"></i>
                <span>Địa chỉ: Xã Núi Thành, TP. Đà Nẵng</span>
              </li>
              <li className="flex items-center gap-3">
                <i className="fa-solid fa-phone text-amber-400 shrink-0"></i>
                <a href="tel:0778236311" className="font-bold text-white hover:text-amber-400 transition">077 823 6311</a>
              </li>
              <li className="flex items-center gap-3">
                <i className="fa-solid fa-envelope text-amber-400 shrink-0"></i>
                <a href="mailto:dadcons.arc@gmail.com" className="hover:text-amber-400 transition">dadcons.arc@gmail.com</a>
              </li>
              <li className="flex items-center gap-3">
                <i className="fa-solid fa-clock text-amber-400 shrink-0"></i>
                <span>Giờ làm việc: 7:30 - 18:00 (Thứ 2 - Thứ 7)</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row justify-between items-center text-xs text-slate-400 gap-4 text-center sm:text-left">
          <p>© 2026 Công ty TNHH Xây dựng và Kiến trúc DAD. Bảo lưu mọi quyền.</p>
          <p>Thiết kế tối ưu trải nghiệm người dùng • Tông màu chuẩn nhận diện DAD Construction®</p>
        </div>
      </div>
    </footer>
  );
}
