import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { projectsData } from '../data/projects';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import FloatingActions from '../components/FloatingActions';

export default function ProjectDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const project = projectsData.find(p => p.id === parseInt(id));

  const [activeImgIndex, setActiveImgIndex] = useState(0);
  const [galleryTouchStart, setGalleryTouchStart] = useState(null);
  const [galleryTouchEnd, setGalleryTouchEnd] = useState(null);
  const [inquiryName, setInquiryName] = useState('');
  const [inquiryPhone, setInquiryPhone] = useState('');
  const [inquiryMessage, setInquiryMessage] = useState('');
  const [toastMessage, setToastMessage] = useState('');

  // Scroll to top on load or ID change
  useEffect(() => {
    window.scrollTo(0, 0);
    setActiveImgIndex(0);
    if (project) {
      setInquiryMessage(`Tôi rất ấn tượng với công trình "${project.title}" (${project.scale} - ${project.area} tại ${project.location}). Nhờ DAD Construction tư vấn thiết kế và báo giá thi công giải pháp tương tự cho gia đình tôi.`);
    }
  }, [id, project]);

  // Keyboard navigation for gallery photos
  useEffect(() => {
    if (!project || !project.gallery) return;

    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft') {
        prevImage();
      } else if (e.key === 'ArrowRight') {
        nextImage();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [project, activeImgIndex]);

  if (!project) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col justify-between">
        <Navbar />
        <div className="max-w-4xl mx-auto px-4 py-28 text-center">
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-slate-100 flex items-center justify-center text-3xl text-slate-400">
            <i className="fa-solid fa-triangle-exclamation"></i>
          </div>
          <h2 className="font-heading font-extrabold text-2xl text-slate-800 mb-3">Không tìm thấy thông tin dự án</h2>
          <p className="text-slate-600 text-sm mb-6">Công trình bạn tìm kiếm có thể đã được cập nhật hoặc không tồn tại.</p>
          <Link to="/" className="inline-flex items-center gap-2 bg-dad-700 hover:bg-dad-800 text-white font-bold px-6 py-3 rounded-xl transition text-sm">
            <i className="fa-solid fa-arrow-left"></i> Quay lại trang chủ
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const gallery = project.gallery || [{ url: project.image, caption: project.title }];

  const nextImage = () => {
    setActiveImgIndex((prev) => (prev + 1) % gallery.length);
  };

  const prevImage = () => {
    setActiveImgIndex((prev) => (prev - 1 + gallery.length) % gallery.length);
  };

  const handleConsultSubmit = (e) => {
    e.preventDefault();
    const phoneRegex = /^(0|84)(3|5|7|8|9)[0-9]{8}$/;
    const cleanPhone = inquiryPhone.replace(/[\s\.\-\(\)]/g, '');

    if (!phoneRegex.test(cleanPhone)) {
      alert('Vui lòng nhập số điện thoại Việt Nam hợp lệ (10 chữ số, VD: 0905 123 456).');
      return;
    }

    const lead = {
      id: 'DAD-PROJECT-' + Date.now(),
      projectName: project.title,
      projectId: project.id,
      name: inquiryName.trim(),
      phone: cleanPhone,
      message: inquiryMessage.trim(),
      createdAt: new Date().toLocaleString('vi-VN')
    };

    try {
      const stored = JSON.parse(localStorage.getItem('dad_inquiries') || '[]');
      stored.push(lead);
      localStorage.setItem('dad_inquiries', JSON.stringify(stored));
    } catch (err) {
      console.warn(err);
    }

    setToastMessage(`Cảm ơn ${inquiryName}! DAD Construction đã tiếp nhận yêu cầu và sẽ gọi lại cho bạn qua số ${cleanPhone} trong 30 phút.`);
    setInquiryName('');
    setInquiryPhone('');

    setTimeout(() => {
      setToastMessage('');
    }, 7000);
  };

  // Other related projects
  const relatedProjects = projectsData
    .filter(p => p.id !== project.id)
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col selection:bg-dad-700 selection:text-white">
      <Navbar />

      <main className="flex-grow py-8 sm:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          
          {/* Breadcrumbs & Back Button */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-8 text-xs sm:text-sm">
            <nav className="flex items-center space-x-2 text-slate-500 font-medium">
              <Link to="/" className="hover:text-dad-700 transition flex items-center gap-1.5">
                <i className="fa-solid fa-house text-xs"></i>
                <span>Trang chủ</span>
              </Link>
              <span>/</span>
              <a href="/#du-an" className="hover:text-dad-700 transition">Dự án đã thực hiện</a>
              <span>/</span>
              <span className="text-slate-900 font-bold truncate max-w-[200px] sm:max-w-xs">{project.title}</span>
            </nav>

            <button 
              onClick={() => navigate(-1)} 
              className="inline-flex items-center gap-2 text-slate-600 hover:text-dad-700 font-semibold px-4 py-2 rounded-xl bg-white border border-slate-200/80 shadow-sm transition hover:shadow"
            >
              <i className="fa-solid fa-arrow-left text-xs"></i>
              <span>Quay lại</span>
            </button>
          </div>

          {/* Project Title Header Banner */}
          <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/80 shadow-sm mb-10">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
              <div>
                <div className="flex flex-wrap items-center gap-2.5 mb-3">
                  <span className="bg-dad-700 text-white text-xs font-bold px-3.5 py-1 rounded-lg">
                    {project.categoryName}
                  </span>
                  <span className="bg-amber-100 text-amber-900 text-xs font-bold px-3 py-1 rounded-lg">
                    Năm hoàn thành: {project.year}
                  </span>
                  <span className="bg-slate-100 text-slate-700 text-xs font-semibold px-3 py-1 rounded-lg">
                    <i className="fa-solid fa-ruler-combined text-dad-700 mr-1"></i> {project.area}
                  </span>
                </div>
                <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 leading-tight">
                  {project.title}
                </h1>
                <p className="text-slate-500 text-sm sm:text-base mt-2 flex items-center gap-2">
                  <i className="fa-solid fa-location-dot text-amber-500"></i>
                  <span>{project.location}</span>
                  <span className="text-slate-300">•</span>
                  <span className="text-slate-600 font-medium">Chủ đầu tư: {project.client}</span>
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3 shrink-0">
                <a 
                  href="#dang-ky-tu-van" 
                  className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold px-6 py-3.5 rounded-xl shadow-md transition flex items-center gap-2 text-sm"
                >
                  <i className="fa-solid fa-file-invoice-dollar"></i>
                  <span>Nhận báo giá mẫu này</span>
                </a>
                <a 
                  href="tel:0778236311" 
                  className="bg-dad-700 hover:bg-dad-800 text-white font-bold px-5 py-3.5 rounded-xl shadow-md transition flex items-center gap-2 text-sm"
                >
                  <i className="fa-solid fa-phone"></i>
                  <span>077 823 6311</span>
                </a>
              </div>
            </div>
          </div>

          {/* MAIN PHOTO GALLERY WITH SLIDER & ARROWS */}
          <section className="bg-white rounded-3xl p-4 sm:p-8 border border-slate-200/80 shadow-sm mb-12">
            <div className="flex items-center justify-between mb-4 px-2">
              <div className="flex items-center gap-2">
                <i className="fa-solid fa-images text-dad-700 text-lg"></i>
                <h2 className="font-heading font-bold text-xl sm:text-2xl text-slate-900">
                  Bộ Sưu Tập Hình Ảnh Chi Tiết
                </h2>
              </div>
              <div className="text-xs sm:text-sm font-semibold text-slate-500 bg-slate-100 px-3 py-1.5 rounded-xl">
                Ảnh {activeImgIndex + 1} / {gallery.length}
              </div>
            </div>

            {/* Big Main Image Container với hỗ trợ vuốt chạm trên Mobile */}
            <div 
              onTouchStart={(e) => setGalleryTouchStart(e.targetTouches[0].clientX)}
              onTouchMove={(e) => setGalleryTouchEnd(e.targetTouches[0].clientX)}
              onTouchEnd={() => {
                if (!galleryTouchStart || !galleryTouchEnd) return;
                const diff = galleryTouchStart - galleryTouchEnd;
                if (diff > 40) nextImage();
                else if (diff < -40) prevImage();
                setGalleryTouchStart(null);
                setGalleryTouchEnd(null);
              }}
              className="relative aspect-[16/9] sm:aspect-[21/10] rounded-2xl overflow-hidden bg-slate-950 group select-none cursor-grab active:cursor-grabbing"
            >
              <img 
                src={gallery[activeImgIndex]?.url} 
                alt={gallery[activeImgIndex]?.caption || project.title} 
                className="w-full h-full object-cover transition-opacity duration-300"
              />

              {/* Navigation Arrow: PREVIOUS */}
              <button 
                onClick={prevImage}
                className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-20 w-9 h-9 sm:w-12 sm:h-12 rounded-full bg-slate-950/70 hover:bg-slate-950 text-white flex items-center justify-center text-sm sm:text-lg shadow-2xl transition-transform hover:scale-110 backdrop-blur-md border border-white/20"
                title="Ảnh trước (Bấm phím mũi tên trái)"
              >
                <i className="fa-solid fa-chevron-left"></i>
              </button>

              {/* Navigation Arrow: NEXT */}
              <button 
                onClick={nextImage}
                className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-20 w-9 h-9 sm:w-12 sm:h-12 rounded-full bg-slate-950/70 hover:bg-slate-950 text-white flex items-center justify-center text-sm sm:text-lg shadow-2xl transition-transform hover:scale-110 backdrop-blur-md border border-white/20"
                title="Ảnh sau (Bấm phím mũi tên phải)"
              >
                <i className="fa-solid fa-chevron-right"></i>
              </button>

              {/* Image Caption Overlay */}
              <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-slate-950/90 via-slate-950/50 to-transparent p-3.5 sm:p-6 text-white flex flex-col sm:flex-row sm:items-end justify-between gap-1.5">
                <div>
                  <div className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-amber-400">Góc nhìn công trình</div>
                  <div className="font-heading font-bold text-sm sm:text-lg line-clamp-1">
                    {gallery[activeImgIndex]?.caption || project.title}
                  </div>
                </div>
                <div className="text-xs text-slate-300 hidden sm:block">
                  Dùng phím <kbd className="px-1.5 py-0.5 rounded bg-white/20 font-mono text-[11px]">←</kbd> <kbd className="px-1.5 py-0.5 rounded bg-white/20 font-mono text-[11px]">→</kbd> để chuyển ảnh
                </div>
              </div>
            </div>

            {/* Thumbnail Strip: Cuộn ngang mượt mà trên Mobile */}
            <div className="flex overflow-x-auto pb-2 gap-2 sm:grid sm:grid-cols-6 sm:overflow-visible mt-3.5">
              {gallery.map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImgIndex(idx)}
                  className={`shrink-0 w-20 sm:w-auto relative aspect-[4/3] rounded-xl overflow-hidden transition-all duration-200 ${
                    activeImgIndex === idx 
                      ? 'ring-3 ring-amber-500 scale-95 shadow-md' 
                      : 'opacity-70 hover:opacity-100'
                  }`}
                >
                  <img 
                    src={item.url} 
                    alt={item.caption} 
                    className="w-full h-full object-cover" 
                  />
                  <div className="absolute inset-0 bg-black/10"></div>
                </button>
              ))}
            </div>
          </section>

          {/* TWO COLUMN DETAILS: SPECS & ARCHITECTURAL STORY */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start mb-14">
            
            {/* Left Column: Full Architectural Story (7 Cols) */}
            <div className="lg:col-span-7 space-y-8">
              <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/80 shadow-sm space-y-6">
                <div className="border-b border-slate-100 pb-4">
                  <span className="text-xs font-bold uppercase text-dad-700 tracking-wider">Hồ sơ thiết kế & thi công</span>
                  <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
                    Ý Tưởng Kiến Trúc & Giải Pháp Thực Tế
                  </h2>
                </div>

                <div className="space-y-4 text-slate-700 text-sm sm:text-base leading-relaxed">
                  {project.fullStory ? (
                    project.fullStory.map((paragraph, i) => (
                      <p key={i}>{paragraph}</p>
                    ))
                  ) : (
                    <p>{project.desc}</p>
                  )}
                </div>

                {/* Highlights List */}
                {project.features && (
                  <div className="pt-6 border-t border-slate-100">
                    <h3 className="font-heading font-bold text-slate-900 text-lg mb-4 flex items-center gap-2">
                      <i className="fa-solid fa-circle-check text-amber-500"></i>
                      <span>Đặc Điểm Kỹ Thuật Nổi Bật</span>
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                      {project.features.map((feat, idx) => (
                        <div key={idx} className="flex items-start gap-3 p-3.5 rounded-2xl bg-slate-50 border border-slate-200/70 text-xs sm:text-sm text-slate-700">
                          <i className="fa-solid fa-check text-dad-700 mt-1 shrink-0"></i>
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Right Column: Technical Specs Card & Quick Consult (5 Cols) */}
            <div className="lg:col-span-5 space-y-8">
              {/* Technical Specifications */}
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm space-y-5">
                <h3 className="font-heading font-bold text-xl text-slate-900 border-b border-slate-100 pb-3 flex items-center gap-2">
                  <i className="fa-solid fa-list-check text-dad-700"></i>
                  <span>Thông Số Kỹ Thuật Công Trình</span>
                </h3>

                <div className="divide-y divide-slate-100 text-xs sm:text-sm">
                  <div className="py-2.5 flex justify-between items-start gap-4">
                    <span className="text-slate-500 font-medium shrink-0">Chủ đầu tư:</span>
                    <span className="font-bold text-slate-900 text-right">{project.client}</span>
                  </div>
                  <div className="py-2.5 flex justify-between items-start gap-4">
                    <span className="text-slate-500 font-medium shrink-0">Địa điểm:</span>
                    <span className="font-semibold text-slate-800 text-right">{project.location}</span>
                  </div>
                  <div className="py-2.5 flex justify-between items-start gap-4">
                    <span className="text-slate-500 font-medium shrink-0">Diện tích xây dựng:</span>
                    <span className="font-bold text-dad-700 text-right">{project.area}</span>
                  </div>
                  <div className="py-2.5 flex justify-between items-start gap-4">
                    <span className="text-slate-500 font-medium shrink-0">Quy mô công trình:</span>
                    <span className="font-semibold text-slate-900 text-right">{project.scale}</span>
                  </div>
                  <div className="py-2.5 flex justify-between items-start gap-4">
                    <span className="text-slate-500 font-medium shrink-0">Phong cách kiến trúc:</span>
                    <span className="font-semibold text-slate-800 text-right">{project.style || 'Hiện đại'}</span>
                  </div>
                  <div className="py-2.5 flex justify-between items-start gap-4">
                    <span className="text-slate-500 font-medium shrink-0">Thời gian thi công:</span>
                    <span className="font-semibold text-slate-800 text-right">{project.constructionTime || '5.0 tháng'}</span>
                  </div>
                  <div className="py-2.5 flex justify-between items-start gap-4">
                    <span className="text-slate-500 font-medium shrink-0">Hạng mục thực hiện:</span>
                    <span className="font-bold text-dad-700 text-right">{project.scope}</span>
                  </div>
                  <div className="py-2.5 flex justify-between items-start gap-4">
                    <span className="text-slate-500 font-medium shrink-0">Đơn vị tổng thầu:</span>
                    <span className="font-bold text-amber-600 text-right">DAD Construction®</span>
                  </div>
                </div>

                <div className="pt-2">
                  <div className="p-4 rounded-2xl bg-dad-50 border border-dad-200/80 text-xs text-dad-800 space-y-1.5">
                    <div className="font-bold flex items-center gap-1.5">
                      <i className="fa-solid fa-shield-halved text-dad-700"></i>
                      <span>Cam kết từ Tổng thầu DAD:</span>
                    </div>
                    <p className="text-slate-600">
                      Bảo hành 10 năm kết cấu, kiểm tra định kỳ miễn phí và cam kết không phát sinh bất kỳ khoản phí nào ngoài hợp đồng.
                    </p>
                  </div>
                </div>
              </div>

              {/* Consultation Form for This Project */}
              <div id="dang-ky-tu-van" className="bg-dad-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl space-y-5">
                <div>
                  <span className="text-xs uppercase font-bold text-amber-400 tracking-wider">Đăng ký tư vấn trực tiếp</span>
                  <h3 className="font-heading font-extrabold text-xl text-white mt-1">
                    Nhận Bản Vẽ & Báo Giá Công Trình Tương Tự
                  </h3>
                  <p className="text-xs text-slate-300 mt-1">
                    Kỹ sư trưởng của DAD sẽ gửi hồ sơ thiết kế mẫu và dự toán sơ bộ cho mảnh đất của bạn trong 30 phút.
                  </p>
                </div>

                <form onSubmit={handleConsultSubmit} className="space-y-3.5">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Họ và tên của bạn *</label>
                    <input 
                      type="text" 
                      required 
                      value={inquiryName}
                      onChange={(e) => setInquiryName(e.target.value)}
                      placeholder="Nhập họ và tên..." 
                      className="w-full rounded-xl bg-dad-800 border border-dad-700 px-4 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-amber-400"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Số điện thoại liên hệ *</label>
                    <input 
                      type="tel" 
                      required 
                      value={inquiryPhone}
                      onChange={(e) => setInquiryPhone(e.target.value)}
                      placeholder="VD: 0905 xxx xxx" 
                      className="w-full rounded-xl bg-dad-800 border border-dad-700 px-4 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-amber-400"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Nội dung mong muốn</label>
                    <textarea 
                      rows="3" 
                      value={inquiryMessage}
                      onChange={(e) => setInquiryMessage(e.target.value)}
                      className="w-full rounded-xl bg-dad-800 border border-dad-700 px-4 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-amber-400"
                    ></textarea>
                  </div>

                  <button 
                    type="submit" 
                    className="w-full bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold py-3.5 rounded-xl shadow-lg transition flex items-center justify-center gap-2 text-xs sm:text-sm"
                  >
                    <i className="fa-solid fa-paper-plane"></i>
                    <span>Gửi Yêu Cầu Cho Kiến Trúc Sư</span>
                  </button>
                </form>

                {toastMessage && (
                  <div className="p-4 rounded-xl bg-emerald-500/20 border border-emerald-400 text-emerald-300 text-xs animate-fadeIn">
                    <div className="font-bold flex items-center gap-2">
                      <i className="fa-solid fa-circle-check text-emerald-400"></i>
                      <span>Gửi yêu cầu thành công!</span>
                    </div>
                    <p className="mt-1">{toastMessage}</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* RELATED PROJECTS CAROUSEL */}
          <section className="pt-10 border-t border-slate-200">
            <div className="flex items-center justify-between mb-8">
              <div>
                <span className="text-xs font-bold uppercase text-dad-700 tracking-wider">Khám phá thêm</span>
                <h3 className="font-heading font-extrabold text-2xl sm:text-3xl text-slate-900 mt-1">
                  Các Công Trình Tiêu Biểu Khác
                </h3>
              </div>
              <Link 
                to="/#du-an" 
                className="text-xs sm:text-sm font-bold text-dad-700 hover:text-amber-500 transition flex items-center gap-1.5"
              >
                <span>Xem tất cả</span>
                <i className="fa-solid fa-arrow-right text-xs"></i>
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedProjects.map(rel => (
                <Link 
                  key={rel.id} 
                  to={`/du-an/${rel.id}`}
                  className="group bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    <div className="relative overflow-hidden aspect-[4/3] bg-slate-200">
                      <img 
                        src={rel.image} 
                        alt={rel.title} 
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute top-3 left-3 bg-dad-700/90 text-white text-[11px] font-semibold px-3 py-1 rounded-lg">
                        {rel.categoryName}
                      </div>
                      <div className="absolute bottom-3 right-3 bg-slate-900/75 text-amber-400 text-[11px] font-bold px-2.5 py-1 rounded-md">
                        {rel.area}
                      </div>
                    </div>
                    <div className="p-5">
                      <h4 className="font-heading font-bold text-base text-slate-900 group-hover:text-dad-700 transition line-clamp-1 mb-1.5">
                        {rel.title}
                      </h4>
                      <p className="text-slate-500 text-xs flex items-center gap-1 mb-2">
                        <i className="fa-solid fa-location-dot text-amber-500"></i> {rel.location}
                      </p>
                      <p className="text-slate-600 text-xs line-clamp-2 leading-relaxed">
                        {rel.desc}
                      </p>
                    </div>
                  </div>
                  <div className="px-5 py-3 bg-slate-50 border-t border-slate-100 flex justify-between items-center text-xs">
                    <span className="font-semibold text-dad-700">{rel.scope}</span>
                    <span className="text-slate-400 font-medium">Hoàn thành {rel.year}</span>
                  </div>
                </Link>
              ))}
            </div>
          </section>

        </div>
      </main>

      <Footer />
      <FloatingActions />
    </div>
  );
}

