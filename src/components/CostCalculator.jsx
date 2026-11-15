import React, { useState, useMemo } from 'react';

export default function CostCalculator({ onPrefillQuote }) {
  const [calcType, setCalcType] = useState(1.0); // 1.0 nhà phố, 1.15 biệt thự
  const [calcPackage, setCalcPackage] = useState(6200000); // 6.2tr
  const [area, setArea] = useState(100);
  const [floors, setFloors] = useState(2);
  const [foundationCoeff, setFoundationCoeff] = useState(0.4);
  const [roofCoeff, setRoofCoeff] = useState(0.5);
  const [basementCoeff, setBasementCoeff] = useState(0);
  const [showCopyToast, setShowCopyToast] = useState(false);

  const calculations = useMemo(() => {
    const numArea = parseFloat(area) || 0;
    const numFloors = parseInt(floors) || 1;
    const foundationArea = numArea * foundationCoeff;
    const floorsArea = numArea * numFloors;
    const roofArea = numArea * roofCoeff;
    const basementArea = numArea * basementCoeff;

    const totalConvertedArea = Math.round(foundationArea + floorsArea + roofArea + basementArea);
    const totalCost = Math.round(totalConvertedArea * calcPackage * calcType);
    const roughCost = Math.round(totalCost * 0.58);
    const finishCost = totalCost - roughCost;

    return {
      foundationArea: Math.round(foundationArea),
      floorsArea: Math.round(floorsArea),
      roofArea: Math.round(roofArea),
      basementArea: Math.round(basementArea),
      totalConvertedArea,
      totalCost,
      roughCost,
      finishCost
    };
  }, [area, floors, foundationCoeff, roofCoeff, basementCoeff, calcPackage, calcType]);

  const handleCopy = () => {
    const text = `BẢNG DỰ TOÁN CHI PHÍ XÂY DỰNG - DAD CONSTRUCTION®\n` +
      `------------------------------------\n` +
      `• Diện tích sàn: ${area} m² x ${floors} tầng\n` +
      `• Tổng diện tích quy đổi: ${calculations.totalConvertedArea} m²\n` +
      `• Dự toán phần thô & nhân công (~58%): ${calculations.roughCost.toLocaleString('vi-VN')} đ\n` +
      `• Dự toán phần hoàn thiện (~42%): ${calculations.finishCost.toLocaleString('vi-VN')} đ\n` +
      `• TỔNG DỰ TOÁN TRỌN GÓI: ${calculations.totalCost.toLocaleString('vi-VN')} đ\n` +
      `------------------------------------\n` +
      `Hotline tư vấn DAD Construction: 077 823 6311 (Núi Thành, TP. Đà Nẵng)`;

    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(() => {
        triggerToast();
      });
    } else {
      triggerToast();
    }
  };

  const triggerToast = () => {
    setShowCopyToast(true);
    setTimeout(() => setShowCopyToast(false), 3500);
  };

  const handleSendToForm = () => {
    const summary = `Tôi vừa tính thử chi phí xây dựng trên website: Diện tích sàn ${area}m² x ${floors} tầng (Quy đổi: ${calculations.totalConvertedArea}m²). Dự kiến ngân sách trọn gói khoảng ${calculations.totalCost.toLocaleString('vi-VN')} đ. Nhờ DAD Construction tư vấn phương án và chi tiết vật tư giúp tôi.`;
    onPrefillQuote(summary);
  };

  return (
    <section id="du-toan" className="py-24 bg-gradient-to-b from-[#fbf7ee] via-[#fdfbf7] to-[#fbf7ee] border-t border-amber-200/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-amber-900 font-bold text-xs uppercase tracking-widest mb-3 bg-amber-100/80 px-3.5 py-1.5 rounded-full border border-amber-300">
            <span className="w-2 h-2 rounded-full bg-amber-500"></span>
            Minh bạch chi phí
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">
            Bảng Tính Chi Phí Xây Dựng
          </h2>
          <p className="text-slate-600 mt-4 text-sm sm:text-base leading-relaxed">
            Ước tính nhanh ngân sách thi công trọn gói tại khu vực Đà Nẵng, Núi Thành và lân cận dựa trên diện tích sàn và số tầng thực tế.
          </p>
        </div>

        {/* Calculator Main Box */}
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-amber-200/70 grid grid-cols-1 lg:grid-cols-12">
          {/* Controls Input (7 Cols) */}
          <div className="lg:col-span-7 p-5 sm:p-8 lg:p-10 space-y-5">
            <h3 className="font-heading font-bold text-lg sm:text-xl text-slate-900 mb-4 pb-3 border-b border-slate-100 flex items-center justify-between">
              <span>Thông Số Công Trình Của Bạn</span>
              <span className="text-xs font-normal text-slate-400">Đơn giá 2026</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase text-slate-700 mb-1.5">Loại hình công trình</label>
                <select 
                  value={calcType}
                  onChange={(e) => setCalcType(parseFloat(e.target.value))}
                  className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-xs sm:text-sm focus:outline-none focus:border-dad-700 bg-slate-50 font-medium"
                >
                  <option value={1.0}>Nhà phố hiện đại 1-2 mặt tiền</option>
                  <option value={1.15}>Biệt thự / Villa sân vườn (+15%)</option>
                  <option value={0.95}>Nhà cấp 4 mái Thái / Mái Nhật (-5%)</option>
                  <option value={1.05}>Tòa nhà văn phòng / Cafe (+5%)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-700 mb-1.5">Gói vật tư hoàn thiện</label>
                <select 
                  value={calcPackage}
                  onChange={(e) => setCalcPackage(parseFloat(e.target.value))}
                  className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-xs sm:text-sm focus:outline-none focus:border-dad-700 bg-slate-50 font-medium"
                >
                  <option value={6200000}>Gói Tiêu Chuẩn (6.200.000 đ/m²)</option>
                  <option value={6800000}>Gói Nâng Cao (6.800.000 đ/m²)</option>
                  <option value={7500000}>Gói Cao Cấp Luxury (7.500.000 đ/m²)</option>
                  <option value={3800000}>Chỉ thi công Phần Thô (3.800.000 đ/m²)</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-bold uppercase text-slate-700 mb-1.5">Diện tích sàn (m²)</label>
                <input 
                  type="number" 
                  value={area}
                  min={20}
                  max={1000}
                  onChange={(e) => setArea(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-xs sm:text-sm focus:outline-none focus:border-dad-700 bg-slate-50 font-semibold"
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase text-slate-700 mb-1.5">Số tầng nổi</label>
                <input 
                  type="number" 
                  value={floors}
                  min={1}
                  max={10}
                  onChange={(e) => setFloors(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-xs sm:text-sm focus:outline-none focus:border-dad-700 bg-slate-50 font-semibold"
                />
              </div>
              <div className="col-span-2 sm:col-span-1">
                <label className="block text-xs font-bold uppercase text-slate-700 mb-1.5">Loại móng</label>
                <select 
                  value={foundationCoeff}
                  onChange={(e) => setFoundationCoeff(parseFloat(e.target.value))}
                  className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-xs sm:text-sm focus:outline-none focus:border-dad-700 bg-slate-50 font-medium"
                >
                  <option value={0.4}>Móng cọc (40%)</option>
                  <option value={0.5}>Móng băng (50%)</option>
                  <option value={0.3}>Móng đơn (30%)</option>
                  <option value={0.65}>Móng bè (65%)</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase text-slate-700 mb-1.5">Kết cấu mái</label>
                <select 
                  value={roofCoeff}
                  onChange={(e) => setRoofCoeff(parseFloat(e.target.value))}
                  className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-xs sm:text-sm focus:outline-none focus:border-dad-700 bg-slate-50 font-medium"
                >
                  <option value={0.5}>Mái bê tông cốt thép (50%)</option>
                  <option value={0.7}>Mái Nhật / Mái Thái ngói (70%)</option>
                  <option value={0.3}>Mái Tôn chống nóng (30%)</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold uppercase text-slate-700 mb-1.5">Tầng hầm / Bán hầm</label>
                <select 
                  value={basementCoeff}
                  onChange={(e) => setBasementCoeff(parseFloat(e.target.value))}
                  className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-xs sm:text-sm focus:outline-none focus:border-dad-700 bg-slate-50 font-medium"
                >
                  <option value={0}>Không có tầng hầm (0%)</option>
                  <option value={1.5}>Tầng bán hầm sâu &lt; 1.5m (150%)</option>
                  <option value={1.7}>Tầng hầm sâu 1.5m - 2.0m (170%)</option>
                </select>
              </div>
            </div>

            <div className="pt-2 flex gap-3">
              <button 
                onClick={handleCopy}
                className="px-4 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl transition text-xs sm:text-sm flex items-center gap-1.5" 
                title="Sao chép bảng tính"
              >
                <i className="fa-solid fa-copy"></i>
                <span>Sao chép kết quả dự toán</span>
              </button>
            </div>
          </div>

          {/* Calculator Result Panel (5 Cols) */}
          <div className="lg:col-span-5 bg-dad-800 text-white p-5 sm:p-8 lg:p-10 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between border-b border-dad-600 pb-4 mb-5">
                <span className="text-xs uppercase tracking-wider text-slate-300 font-bold">Bảng bóc tách diện tích</span>
                <span className="bg-amber-500/20 text-amber-300 text-[11px] px-2.5 py-1 rounded-md font-semibold">Đà Nẵng & Miền Trung</span>
              </div>

              <div className="space-y-3 text-xs sm:text-sm">
                <div className="flex justify-between items-center">
                  <span className="text-slate-300">Diện tích móng:</span>
                  <span className="font-bold text-slate-100">{calculations.foundationArea} m²</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-300">Diện tích thân các tầng:</span>
                  <span className="font-bold text-slate-100">{calculations.floorsArea} m²</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-300">Diện tích mái:</span>
                  <span className="font-bold text-slate-100">{calculations.roofArea} m²</span>
                </div>
                {basementCoeff > 0 && (
                  <div className="flex justify-between items-center text-amber-300">
                    <span>Diện tích hầm quy đổi:</span>
                    <span className="font-bold">{calculations.basementArea} m²</span>
                  </div>
                )}
                <div className="flex justify-between items-center pt-2 border-t border-dad-700 text-slate-200 font-semibold">
                  <span>Tổng diện tích quy đổi:</span>
                  <span className="font-extrabold text-amber-400 text-base">{calculations.totalConvertedArea} m²</span>
                </div>
              </div>

              {/* Bóc tách chi phí sơ bộ */}
              <div className="mt-5 p-4 rounded-2xl bg-dad-900/60 border border-dad-700/60 space-y-2">
                <div className="text-[11px] uppercase tracking-wider text-slate-400 font-bold">Phân bổ ngân sách dự kiến</div>
                <div className="flex justify-between text-xs">
                  <span className="text-slate-300">• Thô & nhân công (~58%):</span>
                  <span className="font-semibold text-slate-200">{calculations.roughCost.toLocaleString('vi-VN')} đ</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-slate-300">• Hoàn thiện (~42%):</span>
                  <span className="font-semibold text-slate-200">{calculations.finishCost.toLocaleString('vi-VN')} đ</span>
                </div>
              </div>

              <div className="pt-4 mt-4 border-t border-dad-600">
                <div className="text-xs text-slate-300 mb-1">Tổng kinh phí dự kiến trọn gói:</div>
                <div className="font-heading font-extrabold text-2xl sm:text-3xl lg:text-4xl text-amber-400 break-words">
                  {calculations.totalCost.toLocaleString('vi-VN')} đ
                </div>
                <p className="text-[11px] text-slate-300 mt-2 italic leading-relaxed">
                  * Lưu ý: Đơn giá đã bao gồm miễn phí 100% hồ sơ thiết kế và xin phép xây dựng khi ký hợp đồng thi công trọn gói tại DAD Construction.
                </p>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-dad-600">
              <button 
                onClick={handleSendToForm}
                className="w-full bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold py-3.5 rounded-xl transition flex items-center justify-center gap-2 text-xs sm:text-sm"
              >
                <span>Nhận bảng dự toán chi tiết từng hạng mục</span>
                <i className="fa-solid fa-arrow-right"></i>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Copy Toast */}
      {showCopyToast && (
        <div className="fixed bottom-20 left-1/2 -translate-x-1/2 z-50 bg-slate-900 text-white px-5 py-3 rounded-2xl shadow-2xl text-xs sm:text-sm font-semibold flex items-center gap-2.5 transition-all animate-fadeIn">
          <i className="fa-solid fa-circle-check text-emerald-400 text-base"></i>
          <span>Đã sao chép bảng tính dự toán vào clipboard!</span>
        </div>
      )}
    </section>
  );
}

