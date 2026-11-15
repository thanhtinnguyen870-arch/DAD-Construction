import React from 'react';
import { processSteps } from '../data/services';

export default function Process() {
  return (
    <section id="quy-trinh" className="py-24 bg-[#fdfbf7] border-t border-amber-200/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-amber-900 font-bold text-xs uppercase tracking-widest mb-3 bg-amber-100/80 px-3.5 py-1.5 rounded-full border border-amber-300">
            <span className="w-2 h-2 rounded-full bg-amber-500"></span>
            Chuẩn mực từng bước
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">
            Quy Trình Thi Công 6 Bước Chuẩn
          </h2>
          <p className="text-slate-600 mt-4 text-sm sm:text-base leading-relaxed">
            Mọi khâu từ tiếp nhận đến bàn giao đều được DAD quản lý bài bản, bảo đảm tính minh bạch và an tâm tuyệt đối cho chủ nhà.
          </p>
        </div>

        {/* Process 6-card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {processSteps.map((step) => (
            <div 
              key={step.step}
              className="bg-[#fbf7ee]/75 border border-amber-200/70 rounded-3xl p-7 sm:p-8 hover:bg-white hover:border-amber-400 hover:shadow-xl transition-all duration-300 relative group flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-2xl bg-amber-500 text-slate-950 font-heading font-extrabold text-lg flex items-center justify-center mb-6 shadow-md shadow-amber-500/25 group-hover:scale-105 transition-transform">
                  {step.step}
                </div>
                <h3 className="font-heading font-bold text-lg sm:text-xl text-slate-900 mb-2.5">
                  {step.title}
                </h3>
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                  {step.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

