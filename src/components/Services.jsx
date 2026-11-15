import React from 'react';
import { servicesData } from '../data/services';

export default function Services() {
  return (
    <section id="dich-vu" className="py-24 bg-[#fbf7ee] border-t border-amber-200/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-dad-700 font-bold text-xs uppercase tracking-widest mb-3 bg-dad-50 px-3.5 py-1.5 rounded-full border border-dad-200">
            <span className="w-2 h-2 rounded-full bg-dad-700"></span>
            Giải pháp xây dựng trọn gói
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">
            Dịch Vụ Chuyên Nghiệp Từ DAD
          </h2>
          <p className="text-slate-600 mt-4 text-sm sm:text-base leading-relaxed">
            Chúng tôi cung cấp hệ sinh thái dịch vụ xây dựng khép kín, từ phác thảo ý tưởng đến khi bàn giao chìa khóa trao tay cho gia chủ.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {servicesData.map(service => (
            <div 
              key={service.id} 
              className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200/80 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="w-14 h-14 rounded-2xl bg-dad-50 text-dad-700 group-hover:bg-dad-700 group-hover:text-white flex items-center justify-center text-2xl transition duration-300 shadow-sm">
                    <i className={service.icon}></i>
                  </div>
                  <span className="text-xs font-bold text-amber-600 bg-amber-50 px-3 py-1.5 rounded-lg border border-amber-200/60">
                    {service.tag}
                  </span>
                </div>

                <h3 className="font-heading font-extrabold text-xl sm:text-2xl text-slate-900 group-hover:text-dad-700 transition mb-3">
                  {service.title}
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed mb-6">
                  {service.desc}
                </p>

                <div className="space-y-2.5 pt-4 border-t border-slate-100">
                  {service.features.map((feat, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                      <i className="fa-solid fa-check text-dad-700 mt-1 shrink-0"></i>
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-8 mt-6">
                <a 
                  href="#lien-he" 
                  className="inline-flex items-center gap-2 font-bold text-dad-700 hover:text-amber-500 text-sm transition"
                >
                  <span>Nhận báo giá chi tiết</span>
                  <i className="fa-solid fa-arrow-right text-xs transform group-hover:translate-x-1 transition"></i>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

