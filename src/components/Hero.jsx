import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { projectsData } from '../data/projects';

export default function Hero() {
  const featuredProjects = projectsData.slice(0, 6);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  // Tự động xoay chuyển 3D từ phải sang trái liên tục mỗi 3.6 giây
  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % featuredProjects.length);
    }, 3600);

    return () => clearInterval(timer);
  }, [isPaused, featuredProjects.length]);

  // Hỗ trợ vuốt chạm cảm ứng mượt mà trên điện thoại
  const handleTouchStart = (e) => {
    setIsPaused(true);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    setIsPaused(false);
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    if (distance > 45) {
      // Vuốt sang trái -> chuyển ảnh kế tiếp
      setActiveIndex((prev) => (prev + 1) % featuredProjects.length);
    } else if (distance < -45) {
      // Vuốt sang phải -> chuyển ảnh trước
      setActiveIndex((prev) => (prev - 1 + featuredProjects.length) % featuredProjects.length);
    }
    setTouchStart(null);
    setTouchEnd(null);
  };

  // Tính toán vị trí 3D cho từng card (chạy từ phải sang trái)
  const getCardStyle = (index) => {
    const total = featuredProjects.length;
    const diff = (index - activeIndex + total) % total;

    if (diff === 0) {
      // CARD HIỆN TẠI (Ở CHÍNH GIỮA, NỔI BẬT NHẤT)
      return {
        transform: 'translate3d(0, 0, 0) scale(1) rotateY(0deg)',
        opacity: 1,
        zIndex: 30,
        pointerEvents: 'auto',
        filter: 'brightness(1)',
        transition: 'all 0.9s cubic-bezier(0.25, 1, 0.5, 1)'
      };
    } else if (diff === 1) {
      // CARD KẾ TIẾP (ĐANG TIẾN VÀO TỪ BÊN PHẢI VỚI GÓC NGHIÊNG 3D)
      return {
        transform: 'translate3d(18%, 0, -80px) scale(0.92) rotateY(-16deg)',
        opacity: 0.55,
        zIndex: 20,
        pointerEvents: 'none',
        filter: 'brightness(0.8) blur(0.5px)',
        transition: 'all 0.9s cubic-bezier(0.25, 1, 0.5, 1)'
      };
    } else if (diff === total - 1) {
      // CARD VỪA RỜI ĐI (LÙI DẦN VỀ BÊN TRÁI VỚI CHIỀU SÂU 3D)
      return {
        transform: 'translate3d(-18%, 0, -80px) scale(0.92) rotateY(16deg)',
        opacity: 0.35,
        zIndex: 10,
        pointerEvents: 'none',
        filter: 'brightness(0.65) blur(1px)',
        transition: 'all 0.9s cubic-bezier(0.25, 1, 0.5, 1)'
      };
    } else {
      // CÁC CARD ẨN NẰM PHÍA SAU
      return {
        transform: 'translate3d(40%, 0, -180px) scale(0.75) rotateY(-25deg)',
        opacity: 0,
        zIndex: 0,
        pointerEvents: 'none',
        transition: 'all 0.9s cubic-bezier(0.25, 1, 0.5, 1)'
      };
    }
  };

  return (
    <section id="trang-chu" className="relative min-h-[660px] flex items-center overflow-hidden">
      {/* Background Image with Light Tone Warm Blend */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=2075&q=85" 
          alt="Kiến trúc biệt thự hiện đại ngập tràn ánh sáng DAD" 
          className="w-full h-full object-cover object-center scale-105 transition-transform duration-1000"
        />
        {/* Warm light yellow & ivory-white ambient gradient overlay */}
        <div className="absolute inset-0 hero-gradient-light"></div>
        {/* Ambient Warm Golden Sunlight Spots */}
        <div className="absolute -top-20 -left-20 w-96 h-96 rounded-full bg-amber-200/40 blur-3xl pointer-events-none"></div>
        <div className="absolute top-1/3 right-10 w-[500px] h-[500px] rounded-full bg-amber-100/60 blur-3xl pointer-events-none"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-16 sm:py-20 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Main Headline & CTAs (Left 7 Cols) - Sang trọng trên nền sáng */}
          <div className="col-span-1 lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-amber-500/15 text-amber-900 border border-amber-300/80 text-xs font-bold backdrop-blur-sm shadow-sm">
              <span className="w-2 h-2 rounded-full bg-amber-500 animate-ping"></span>
              Công ty TNHH Xây dựng và Kiến trúc DAD
            </div>

            <h1 className="font-heading text-3xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 leading-tight">
              Kiến Tạo <span className="text-amber-600">Bền Vững</span><br />
              Tạo Dựng Tương Lai
            </h1>

            <p className="text-slate-700 text-sm sm:text-base lg:text-lg max-w-xl font-normal leading-relaxed">
              Tổng thầu thiết kế & thi công xây dựng trọn gói biệt thự, nhà phố hiện đại tại <strong className="text-slate-900 font-semibold">Đà Nẵng & Núi Thành</strong>. Minh bạch vật tư, chuẩn mực kỹ thuật, bàn giao đúng cam kết.
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 pt-2">
              <a 
                href="#du-toan" 
                className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold px-6 sm:px-7 py-3.5 sm:py-4 rounded-xl shadow-lg shadow-amber-500/25 transition transform hover:-translate-y-0.5 flex items-center justify-center gap-2 text-sm sm:text-base"
              >
                <span>Tính chi phí xây dựng</span>
                <i className="fa-solid fa-calculator"></i>
              </a>
              <a 
                href="#du-an" 
                className="bg-white hover:bg-slate-50 text-dad-700 font-bold px-5 sm:px-6 py-3.5 sm:py-4 rounded-xl border border-slate-200 shadow-md shadow-slate-200/60 transition flex items-center justify-center gap-2 text-sm sm:text-base"
              >
                <span>Xem 9 dự án tiêu biểu</span>
                <i className="fa-solid fa-arrow-right"></i>
              </a>
            </div>

            {/* Quick Commitments Badges */}
            <div className="pt-4 flex flex-wrap gap-4 sm:gap-6 border-t border-amber-200/80 text-xs sm:text-sm text-slate-700 font-medium">
              <div className="flex items-center gap-2">
                <i className="fa-solid fa-circle-check text-amber-600"></i>
                <span>Miễn phí 100% bản vẽ thiết kế</span>
              </div>
              <div className="flex items-center gap-2">
                <i className="fa-solid fa-circle-check text-amber-600"></i>
                <span>Bảo hành kết cấu 10 năm</span>
              </div>
              <div className="flex items-center gap-2">
                <i className="fa-solid fa-circle-check text-amber-600"></i>
                <span>Không phát sinh chi phí</span>
              </div>
            </div>
          </div>

          {/* Right Column: KHUNG DỰ ÁN 3D CHẠY TỪ PHẢI SANG TRÁI TỰ ĐỘNG, HÒA QUYỆN VỚI TONE SÁNG VÀNG NHẠT & TRẮNG */}
          <div className="col-span-1 lg:col-span-5">
            <div 
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
              className="relative w-full max-w-[460px] mx-auto perspective-1200 cursor-grab active:cursor-grabbing"
            >
              {/* Vầng sáng Ambient Glow vàng ấm dịu phía sau */}
              <div className="absolute -inset-4 bg-gradient-to-r from-amber-400/25 via-amber-200/35 to-yellow-300/25 rounded-3xl blur-2xl -z-10 pointer-events-none"></div>

              {/* Khung 3D Stage chứa các card chạy tự động từ phải sang trái */}
              <div className="relative aspect-[16/11] w-full transform-style-3d">
                {featuredProjects.map((project, index) => {
                  const style = getCardStyle(index);

                  return (
                    <Link
                      key={project.id}
                      to={`/du-an/${project.id}`}
                      style={style}
                      className="absolute inset-0 rounded-3xl overflow-hidden border border-white/80 shadow-2xl shadow-amber-950/15 backdrop-blur-xl bg-white/70 select-none cursor-pointer group"
                    >
                      {/* Ảnh công trình sắc nét */}
                      <img 
                        src={project.image} 
                        alt={project.title} 
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />

                      {/* Huy hiệu trên cùng bên trái: Danh mục & Năm */}
                      <div className="absolute top-3.5 left-3.5 flex items-center gap-2 z-10">
                        <span className="bg-dad-700/90 backdrop-blur-md text-white font-bold text-xs px-3.5 py-1.5 rounded-xl shadow-md border border-white/10">
                          {project.categoryName}
                        </span>
                        <span className="bg-amber-500 text-slate-950 font-extrabold text-xs px-3 py-1.5 rounded-xl shadow-md">
                          {project.year}
                        </span>
                      </div>

                      {/* Huy hiệu trên cùng bên phải: Diện tích */}
                      <div className="absolute top-3.5 right-3.5 z-10">
                        <span className="bg-slate-950/75 backdrop-blur-md text-amber-400 font-bold text-xs px-3 py-1.5 rounded-xl shadow-md border border-amber-400/30 flex items-center gap-1.5">
                          <i className="fa-solid fa-ruler-combined text-[11px]"></i>
                          <span>{project.area}</span>
                        </span>
                      </div>

                      {/* Gradient bóng mờ và Thông tin công trình ở đáy khung */}
                      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950/95 via-slate-950/60 to-transparent p-5 sm:p-6 text-white z-10">
                        <h3 className="font-heading font-extrabold text-lg sm:text-xl md:text-2xl text-white leading-snug drop-shadow mb-1.5 group-hover:text-amber-300 transition-colors line-clamp-1">
                          {project.title}
                        </h3>
                        <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-200">
                          <span className="flex items-center gap-1 text-amber-400 font-medium">
                            <i className="fa-solid fa-location-dot text-xs"></i>
                            <span className="text-slate-100">{project.location}</span>
                          </span>
                          <span className="text-slate-400">•</span>
                          <span className="text-slate-300">{project.scale}</span>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>

              {/* Chỉ số chuyển động thanh mảnh hài hòa bên dưới */}
              <div className="flex justify-center items-center gap-2 mt-4">
                {featuredProjects.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveIndex(idx)}
                    className={`h-1.5 rounded-full transition-all duration-500 ${
                      activeIndex === idx 
                        ? 'w-8 bg-amber-500 shadow-sm shadow-amber-500/50' 
                        : 'w-2 bg-amber-300/60 hover:bg-amber-400'
                    }`}
                    title={`Đến công trình ${idx + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
