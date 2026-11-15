import React from 'react';
import { testimonialsData } from '../data/testimonials';

export default function Testimonials() {
  return (
    <section id="cam-nhan" className="py-24 bg-[#fdfbf7] border-t border-amber-200/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-amber-900 font-bold text-xs uppercase tracking-widest mb-3 bg-amber-100/80 px-3.5 py-1.5 rounded-full border border-amber-300">
            <span className="w-2 h-2 rounded-full bg-amber-500"></span>
            Khách Hàng Nói Gì Về DAD
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">
            Cảm Nhận Từ Những Ngôi Nhà Đã Bàn Giao
          </h2>
          <p className="text-slate-600 mt-4 text-sm sm:text-base leading-relaxed">
            Sự hài lòng và tín nhiệm của các gia chủ tại Đà Nẵng & miền Trung là thước đo chuẩn xác nhất cho chất lượng thi công và cái tâm của DAD Construction®.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonialsData.map(item => (
            <div 
              key={item.id}
              className="bg-white rounded-3xl p-8 border border-amber-200/70 shadow-sm hover:shadow-xl hover:border-amber-400 transition-all duration-300 flex flex-col justify-between relative group"
            >
              <div className="absolute -top-4 right-8 w-10 h-10 rounded-full bg-amber-500 text-slate-950 flex items-center justify-center font-serif text-xl shadow-md">
                <i className="fa-solid fa-quote-right text-sm"></i>
              </div>
              <div>
                {/* Rating Stars */}
                <div className="flex items-center gap-1 text-amber-400 mb-4 text-sm">
                  {[...Array(item.rating)].map((_, i) => (
                    <i key={i} className="fa-solid fa-star"></i>
                  ))}
                  <span className="text-xs font-bold text-slate-700 ml-2">5.0 / 5.0</span>
                </div>
                <p className="text-slate-700 text-sm leading-relaxed italic mb-6">
                  "{item.comment}"
                </p>
              </div>

              <div className="pt-6 border-t border-slate-100 flex items-center gap-4">
                <img 
                  src={item.avatar} 
                  alt={item.name} 
                  className="w-12 h-12 rounded-full object-cover border-2 border-dad-700"
                />
                <div>
                  <div className="font-heading font-bold text-slate-900 text-base">{item.name}</div>
                  <div className="text-xs text-slate-500 font-medium">{item.role}</div>
                  <div className="text-[11px] text-dad-700 font-semibold mt-0.5">{item.service}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Trust Bar / Key Commitments */}
        <div className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-4 p-6 sm:p-8 bg-white rounded-3xl border border-slate-200 shadow-sm text-center">
          <div className="p-3">
            <div className="font-heading font-extrabold text-2xl sm:text-3xl text-dad-700">100%</div>
            <div className="text-xs sm:text-sm font-semibold text-slate-800 mt-1">Bàn giao đúng hạn</div>
            <p className="text-[11px] text-slate-500 mt-0.5 hidden sm:block">Theo tiến độ GANTT từng tuần</p>
          </div>
          <div className="p-3 border-l border-slate-100">
            <div className="font-heading font-extrabold text-2xl sm:text-3xl text-amber-500">0 VNĐ</div>
            <div className="text-xs sm:text-sm font-semibold text-slate-800 mt-1">Chi phí phát sinh</div>
            <p className="text-[11px] text-slate-500 mt-0.5 hidden sm:block">Cam kết hợp đồng minh bạch</p>
          </div>
          <div className="p-3 border-l border-slate-100">
            <div className="font-heading font-extrabold text-2xl sm:text-3xl text-dad-700">10 Năm</div>
            <div className="text-xs sm:text-sm font-semibold text-slate-800 mt-1">Bảo hành kết cấu</div>
            <p className="text-[11px] text-slate-500 mt-0.5 hidden sm:block">Kiểm tra bảo dưỡng định kỳ</p>
          </div>
          <div className="p-3 border-l border-slate-100">
            <div className="font-heading font-extrabold text-2xl sm:text-3xl text-amber-500">30 Phút</div>
            <div className="text-xs sm:text-sm font-semibold text-slate-800 mt-1">Phản hồi khảo sát</div>
            <p className="text-[11px] text-slate-500 mt-0.5 hidden sm:block">Kiến trúc sư hỗ trợ tận nơi</p>
          </div>
        </div>
      </div>
    </section>
  );
}

