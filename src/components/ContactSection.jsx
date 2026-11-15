import React, { useState, useEffect } from 'react';

export default function ContactSection({ initialMessage, initialService }) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    location: '',
    service: 'Xây nhà trọn gói',
    message: ''
  });
  const [toastInfo, setToastInfo] = useState(null);

  useEffect(() => {
    if (initialMessage) {
      setFormData(prev => ({ ...prev, message: initialMessage }));
    }
  }, [initialMessage]);

  useEffect(() => {
    if (initialService) {
      setFormData(prev => ({ ...prev, service: initialService }));
    }
  }, [initialService]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const cleanPhone = formData.phone.replace(/[\s\.\-\(\)]/g, '');
    const phoneRegex = /^(0|84)(3|5|7|8|9)[0-9]{8}$/;

    if (!phoneRegex.test(cleanPhone)) {
      alert('Vui lòng nhập số điện thoại Việt Nam hợp lệ (10 chữ số, VD: 0905 123 456) để DAD liên hệ tư vấn.');
      return;
    }

    const inquiry = {
      id: 'DAD-' + Date.now(),
      name: formData.name.trim(),
      phone: cleanPhone,
      location: formData.location.trim() || 'Chưa cung cấp',
      service: formData.service,
      message: formData.message.trim(),
      createdAt: new Date().toLocaleString('vi-VN')
    };

    try {
      const stored = JSON.parse(localStorage.getItem('dad_inquiries') || '[]');
      stored.push(inquiry);
      localStorage.setItem('dad_inquiries', JSON.stringify(stored));
    } catch (err) {
      console.warn('Lỗi lưu inquiries:', err);
    }

    setToastInfo({
      title: `Cảm ơn ${formData.name} đã gửi yêu cầu!`,
      desc: `Chuyên viên của DAD Construction sẽ liên hệ qua số ${cleanPhone} trong vòng 30 phút để hỗ trợ bạn.`
    });

    setFormData({
      name: '',
      phone: '',
      location: '',
      service: 'Xây nhà trọn gói',
      message: ''
    });

    setTimeout(() => {
      setToastInfo(null);
    }, 8000);
  };

  return (
    <section id="lien-he" className="py-24 bg-[#fdfbf7] border-t border-amber-200/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* Company Info (5 Cols) */}
          <div className="col-span-1 lg:col-span-5 space-y-8">
            <div>
              <div className="inline-flex items-center gap-2 text-amber-900 font-bold text-xs uppercase tracking-widest mb-3 bg-amber-100/80 px-3.5 py-1.5 rounded-full border border-amber-300">
                <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                Kết nối với chúng tôi
              </div>
              <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                Bắt Đầu Kiến Tạo Ngôi Nhà Mơ Ước
              </h2>
              <p className="text-slate-600 mt-3 text-sm sm:text-base leading-relaxed">
                Đội ngũ Kỹ sư & Kiến trúc sư của <strong>Công ty TNHH Xây dựng và Kiến trúc DAD</strong> luôn sẵn sàng lắng nghe và tư vấn phương án tối ưu nhất cho bạn hoàn toàn miễn phí.
              </p>
            </div>

            {/* Contact Cards with Dynamic Artisan Badges */}
            <div className="space-y-4">
              {/* Card 1: Enterprise Name */}
              <div className="flex items-start gap-4 p-5 rounded-2xl bg-white border border-amber-200/70 shadow-sm hover:shadow-md hover:border-amber-400 hover:bg-amber-50/20 transition-all duration-300 group">
                <div className="relative w-14 h-14 rounded-2xl bg-gradient-to-br from-dad-800 to-dad-950 p-2.5 flex items-center justify-center shrink-0 shadow-md shadow-dad-950/20 border border-dad-600/40 group-hover:border-amber-400/50 transition-all duration-300">
                  <div className="absolute inset-0 rounded-2xl bg-amber-400/10 opacity-0 group-hover:opacity-100 transition-opacity blur-sm"></div>
                  {/* Geometric Architecture Insignia */}
                  <svg viewBox="0 0 120 120" className="w-8 h-8 fill-amber-400 group-hover:scale-110 transition-transform duration-500">
                    <path d="M60 8 L108 35 L60 62 L12 35 Z M60 22 L32 35 L60 50 L88 35 Z" opacity="0.95" />
                    <path d="M10 40 L57 67 L57 114 L10 87 Z M22 58 L22 78 L45 91 L45 71 Z" opacity="0.75" />
                    <path d="M63 67 L110 40 L110 87 L63 114 Z M75 71 L75 95 L98 82 L98 58 Z" opacity="0.85" />
                  </svg>
                  {/* Verified Studio Live Status Dot */}
                  <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-500 border-2 border-white"></span>
                  </span>
                </div>
                <div>
                  <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                    <span>Tên doanh nghiệp</span>
                    <span className="text-[9px] text-emerald-600 font-bold bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">Pháp lý chuẩn</span>
                  </div>
                  <div className="font-heading font-bold text-slate-900 text-sm sm:text-base mt-0.5 group-hover:text-dad-700 transition">
                    Công ty TNHH Xây dựng và Kiến trúc DAD
                  </div>
                  <div className="text-xs text-dad-700 font-medium mt-0.5">
                    DAD Construction® - Kiến tạo bền vững, Tạo dựng tương lai
                  </div>
                </div>
              </div>

              {/* Card 2: Hotline / Zalo (Live Pulsing Audio Waves & Ringing Receiver) */}
              <a 
                href="tel:0778236311" 
                className="flex items-start gap-4 p-5 rounded-2xl bg-white border border-amber-200/70 shadow-sm hover:shadow-lg hover:border-amber-400 hover:bg-amber-50/20 transition-all duration-300 group"
              >
                <div className="relative w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-400 via-amber-500 to-amber-600 p-2 flex items-center justify-center shrink-0 shadow-lg shadow-amber-500/30 border border-amber-300/60 group-hover:shadow-amber-500/50 transition-all duration-300">
                  {/* Sonic Wave Rings */}
                  <div className="absolute -inset-1 rounded-2xl bg-amber-400/40 animate-radar-wave"></div>
                  {/* Ringing Phone Icon with Micro-Animation */}
                  <div className="relative z-10 w-9 h-9 rounded-xl bg-slate-950 text-amber-400 flex items-center justify-center text-base animate-phone-ring shadow-inner">
                    <i className="fa-solid fa-phone-volume"></i>
                  </div>
                  {/* 24/7 Live Hotline Badge */}
                  <span className="absolute -bottom-1 -right-1 px-1.5 py-0.5 rounded-full bg-slate-950 border border-amber-400/50 text-[9px] font-black text-amber-400 uppercase tracking-tighter shadow">
                    24/7
                  </span>
                </div>
                <div>
                  <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                    <span>Hotline / Zalo tư vấn 24/7</span>
                    <span className="text-[9px] text-amber-700 font-bold bg-amber-100 px-1.5 py-0.5 rounded border border-amber-200">Trực tuyến</span>
                  </div>
                  <div className="font-heading font-extrabold text-dad-700 text-lg sm:text-xl mt-0.5 group-hover:text-amber-600 transition flex items-center gap-2">
                    <span>077 823 6311</span>
                    <i className="fa-solid fa-arrow-right text-xs opacity-0 group-hover:opacity-100 transform -translate-x-1 group-hover:translate-x-0 transition"></i>
                  </div>
                  <div className="text-xs text-slate-500">
                    Bấm để gọi trực tiếp cho Kiến trúc sư trưởng
                  </div>
                </div>
              </a>

              {/* Card 3: Office Address (Animated Floating Geo-Beacon & Target Radar) */}
              <div className="flex items-start gap-4 p-5 rounded-2xl bg-white border border-amber-200/70 shadow-sm hover:shadow-md hover:border-sky-400/60 hover:bg-sky-50/20 transition-all duration-300 group">
                <div className="relative w-14 h-14 rounded-2xl bg-gradient-to-br from-sky-900 via-dad-800 to-dad-950 p-2.5 flex items-center justify-center shrink-0 shadow-md shadow-sky-900/20 border border-sky-500/30 group-hover:border-sky-400/60 transition-all duration-300">
                  {/* Radar Wave at ground base */}
                  <div className="absolute inset-2 rounded-full border border-sky-400/40 animate-radar-wave"></div>
                  {/* Floating Map Pin */}
                  <div className="relative z-10 animate-float-smooth flex flex-col items-center">
                    <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-sky-500 to-blue-400 text-white flex items-center justify-center text-xs font-bold shadow-md shadow-sky-500/30">
                      <i className="fa-solid fa-location-dot"></i>
                    </div>
                    <span className="w-3 h-1 rounded-full bg-sky-400/40 blur-[1px] mt-0.5"></span>
                  </div>
                </div>
                <div>
                  <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                    <span>Địa chỉ văn phòng</span>
                    <span className="text-[9px] text-sky-700 font-bold bg-sky-100 px-1.5 py-0.5 rounded border border-sky-200">Trụ sở chính</span>
                  </div>
                  <div className="font-heading font-bold text-slate-900 text-sm sm:text-base mt-0.5 group-hover:text-dad-700 transition">
                    Xã Núi Thành, TP. Đà Nẵng
                  </div>
                  <div className="text-xs text-slate-500">
                    Thi công khắp khu vực Đà Nẵng, Núi Thành & miền Trung
                  </div>
                </div>
              </div>

              {/* Card 4: Email Address (Flying Paper Plane & Express Delivery) */}
              <a 
                href="mailto:dadcons.arc@gmail.com" 
                className="flex items-start gap-4 p-5 rounded-2xl bg-white border border-amber-200/70 shadow-sm hover:shadow-md hover:border-indigo-400/60 hover:bg-indigo-50/20 transition-all duration-300 group"
              >
                <div className="relative w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-950 via-dad-800 to-slate-950 p-2.5 flex items-center justify-center shrink-0 shadow-md shadow-indigo-950/20 border border-indigo-400/30 group-hover:border-indigo-400/60 transition-all duration-300">
                  <div className="absolute inset-0 rounded-2xl bg-indigo-500/10 opacity-0 group-hover:opacity-100 transition-opacity blur-sm"></div>
                  {/* Flying Blueprint Paper Plane */}
                  <div className="relative z-10 w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-dad-600 text-white flex items-center justify-center text-sm shadow-md group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300">
                    <i className="fa-solid fa-paper-plane text-xs text-amber-300 transform -rotate-12 group-hover:rotate-0 transition-transform"></i>
                  </div>
                  {/* Quick Response Tag */}
                  <span className="absolute -bottom-1 -right-1 px-1.5 py-0.5 rounded-full bg-dad-950 border border-indigo-400/40 text-[9px] font-bold text-slate-200">
                    &lt;30m
                  </span>
                </div>
                <div>
                  <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                    <span>Hòm thư điện tử</span>
                    <span className="text-[9px] text-indigo-700 font-bold bg-indigo-100 px-1.5 py-0.5 rounded border border-indigo-200">Phản hồi 30p</span>
                  </div>
                  <div className="font-heading font-bold text-slate-900 text-sm sm:text-base mt-0.5 group-hover:text-dad-700 transition">
                    dadcons.arc@gmail.com
                  </div>
                  <div className="text-xs text-slate-500">
                    Gửi yêu cầu báo giá hoặc bản vẽ hiện trạng đất
                  </div>
                </div>
              </a>
            </div>
          </div>

          {/* Contact Form (7 Cols) */}
          <div className="col-span-1 lg:col-span-7">
            <div className="bg-white border border-amber-200/70 rounded-3xl p-6 sm:p-10 shadow-sm">
              <h3 className="font-heading font-bold text-2xl text-slate-900 mb-2">Đăng Ký Tư Vấn & Nhận Báo Giá</h3>
              <p className="text-slate-600 text-xs sm:text-sm mb-6">Điền thông tin bên dưới, chuyên viên của DAD Construction sẽ liên hệ lại với bạn trong vòng 30 phút.</p>

              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase text-slate-700 mb-2">Họ và tên của bạn *</label>
                    <input 
                      type="text" 
                      name="name"
                      required 
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Nhập họ và tên..." 
                      className="w-full rounded-xl border border-slate-300 px-4 py-3 text-xs sm:text-sm focus:outline-none focus:border-dad-700 bg-slate-50/50"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase text-slate-700 mb-2">Số điện thoại liên hệ *</label>
                    <input 
                      type="tel" 
                      name="phone"
                      required 
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="VD: 0905 xxx xxx" 
                      className="w-full rounded-xl border border-slate-300 px-4 py-3 text-xs sm:text-sm focus:outline-none focus:border-dad-700 bg-slate-50/50"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase text-slate-700 mb-2">Khu vực xây dựng</label>
                    <input 
                      type="text" 
                      name="location"
                      value={formData.location}
                      onChange={handleChange}
                      placeholder="VD: Núi Thành, Hải Châu, Sơn Trà..." 
                      className="w-full rounded-xl border border-slate-300 px-4 py-3 text-xs sm:text-sm focus:outline-none focus:border-dad-700 bg-slate-50/50"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase text-slate-700 mb-2">Dịch vụ quan tâm</label>
                    <select 
                      name="service"
                      value={formData.service}
                      onChange={handleChange}
                      className="w-full rounded-xl border border-slate-300 px-4 py-3 text-xs sm:text-sm focus:outline-none focus:border-dad-700 bg-slate-50/50 font-medium"
                    >
                      <option value="Xây nhà trọn gói">Xây nhà trọn gói (Chìa khóa trao tay)</option>
                      <option value="Thiết kế kiến trúc & nội thất">Thiết kế kiến trúc & nội thất</option>
                      <option value="Thi công phần thô">Thi công phần thô</option>
                      <option value="Cải tạo sửa chữa">Cải tạo & nâng cấp công trình</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-slate-700 mb-2">Nhu cầu chi tiết (Diện tích đất, số tầng, ngân sách dự kiến...)</label>
                  <textarea 
                    name="message"
                    rows="4" 
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Chia sẻ thêm về mong muốn ngôi nhà của bạn..." 
                    className="w-full rounded-xl border border-slate-300 px-4 py-3 text-xs sm:text-sm focus:outline-none focus:border-dad-700 bg-slate-50/50"
                  ></textarea>
                </div>

                <button 
                  type="submit" 
                  className="w-full bg-dad-700 hover:bg-dad-800 text-white font-bold py-3.5 sm:py-4 rounded-xl shadow-lg shadow-dad-700/20 transition flex items-center justify-center gap-2 text-sm sm:text-base"
                >
                  <i className="fa-solid fa-paper-plane"></i>
                  <span>Gửi Yêu Cầu Tư Vấn Ngay</span>
                </button>
              </form>

              {/* Toast Notification */}
              {toastInfo && (
                <div className="mt-5 p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs sm:text-sm flex items-start gap-3 animate-fadeIn">
                  <i className="fa-solid fa-circle-check text-emerald-600 text-lg mt-0.5 shrink-0"></i>
                  <div>
                    <div className="font-bold text-sm">{toastInfo.title}</div>
                    <p className="text-xs mt-0.5">{toastInfo.desc}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

