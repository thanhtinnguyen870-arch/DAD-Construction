import React, { useState } from 'react';
import { faqsData } from '../data/faqs';

export default function FaqAccordion() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFaq = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="hoi-dap" className="py-24 bg-[#fbf7ee] border-t border-amber-200/50">
      <div className="max-w-5xl mx-auto px-4 sm:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 text-amber-900 font-bold text-xs uppercase tracking-widest mb-3 bg-amber-100/80 px-3.5 py-1.5 rounded-full border border-amber-300">
            <span className="w-2 h-2 rounded-full bg-amber-500"></span>
            Giải Đáp Thắc Mắc
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">
            Câu Hỏi Thường Gặp Về Xây Nhà
          </h2>
          <p className="text-slate-600 mt-3 text-sm sm:text-base">
            Tổng hợp những thắc mắc phổ biến nhất của gia chủ khi chuẩn bị xây dựng nhà phố, biệt thự.
          </p>
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-4">
          {faqsData.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div 
                key={faq.id}
                className={`border rounded-2xl overflow-hidden transition-all ${
                  isOpen ? 'border-amber-400 bg-white shadow-md' : 'border-amber-200/70 bg-white/80 hover:bg-white'
                }`}
              >
                <button 
                  onClick={() => toggleFaq(index)}
                  className="w-full p-5 sm:p-6 text-left font-heading font-bold text-base sm:text-lg text-slate-900 flex justify-between items-center gap-4 hover:text-dad-700 transition"
                >
                  <span>{faq.question}</span>
                  <span className={`w-8 h-8 rounded-full bg-white border border-slate-200 flex items-center justify-center shrink-0 text-dad-700 text-xs transition-transform duration-300 ${
                    isOpen ? 'rotate-180' : 'rotate-0'
                  }`}>
                    <i className="fa-solid fa-chevron-down"></i>
                  </span>
                </button>
                {isOpen && (
                  <div 
                    className="px-5 sm:px-6 pb-6 pt-1 text-slate-600 text-sm sm:text-base leading-relaxed border-t border-slate-100/80 bg-white"
                    dangerouslySetInnerHTML={{ __html: faq.content }}
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

