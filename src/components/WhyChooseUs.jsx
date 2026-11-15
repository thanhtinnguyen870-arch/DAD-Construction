import React from 'react';

export default function WhyChooseUs() {
  const reasons = [
    {
      num: "01",
      title: "Minh Bạch 100% Vật Tư",
      desc: "Liệt kê rõ ràng chủng loại, thương hiệu từ sắt thép, xi măng đến từng loại gạch ốp lát. Khách hàng kiểm tra chứng chỉ xuất xưởng trước khi thi công."
    },
    {
      num: "02",
      title: "Kỹ Sư Giám Sát Độc Lập",
      desc: "Mỗi công trình luôn có 1 chỉ huy trưởng & kỹ sư an toàn túc trực tại hiện trường, quản lý nghiêm ngặt từng khâu đổ bê tông, đan sắt, xây tô."
    },
    {
      num: "03",
      title: "Hợp Đồng Cam Kết Không Phát Sinh",
      desc: "Dự toán chi tiết từng hạng mục ngay từ đầu. Cam kết bằng văn bản không phát sinh bất kỳ khoản phí nào ngoài phụ lục hợp đồng đã ký kết."
    },
    {
      num: "04",
      title: "Tiến Độ Chuẩn Xác Sơ Đồ GANTT",
      desc: "Lập bảng tiến độ chi tiết từng tuần. Cập nhật nhật ký công trình bằng hình ảnh và video hàng ngày qua nhóm Zalo riêng của chủ đầu tư."
    },
    {
      num: "05",
      title: "Bảo Hành Kết Cấu 10 Năm",
      desc: "DAD cam kết đồng hành lâu dài cùng ngôi nhà của bạn với chính sách bảo hành kết cấu 10 năm và bảo trì định kỳ 6 tháng/lần trong 2 năm đầu."
    },
    {
      num: "06",
      title: "Tối Ưu Phong Thủy & Ánh Sáng",
      desc: "Kiến trúc sư nghiên cứu kỹ hướng đất, hướng gió và tuổi gia chủ để đưa ra giải pháp lấy sáng tự nhiên, đối lưu không khí và vượng khí tài lộc."
    }
  ];

  return (
    <section className="py-14 sm:py-16 bg-architect-light border-y border-amber-200/70 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column: Brand Core */}
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-2 text-amber-900 font-bold text-xs uppercase tracking-widest bg-amber-100 px-3.5 py-1.5 rounded-full border border-amber-300">
              <span className="w-2 h-2 rounded-full bg-amber-500"></span>
              Giá trị cốt lõi của DAD
            </div>

            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 leading-tight">
              Vì Sao Khách Hàng <br />
              <span className="text-amber-600">Tin Chọn DAD Construction?</span>
            </h2>

            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Xây dựng một ngôi nhà không chỉ là gom gạch đá xi măng, mà là hiện thực hóa ước mơ cả đời của gia chủ. Tại <strong>DAD Construction®</strong>, chúng tôi đặt chữ <strong>TÂM & TÍN</strong> lên hàng đầu trong từng mối nối sắt, từng mẻ bê tông.
            </p>

            <div className="pt-2">
              <a href="#lien-he" className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold px-6 py-3.5 rounded-xl shadow-lg shadow-amber-500/20 transition transform hover:-translate-y-0.5 text-sm">
                <span>Gặp gỡ Kiến trúc sư trưởng</span>
                <i className="fa-solid fa-arrow-right"></i>
              </a>
            </div>
          </div>

          {/* Right Column: 6 Grid Highlights in Light Warm Aesthetic */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
            {reasons.map(item => (
              <div 
                key={item.num} 
                className="bg-white/95 border border-amber-200/80 rounded-2xl p-5 sm:p-6 shadow-sm hover:shadow-xl hover:border-amber-400 transition duration-300 group"
              >
                <div className="font-heading font-extrabold text-amber-600 text-xl sm:text-2xl mb-2 group-hover:scale-105 transition transform origin-left">
                  {item.num}
                </div>
                <h4 className="font-heading font-bold text-slate-900 text-base mb-1.5 group-hover:text-dad-700 transition">
                  {item.title}
                </h4>
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
