import React, { useMemo, useState, useEffect } from 'react';
import { motion, useSpring, useTransform } from 'framer-motion';
import { Calculator, CheckCircle, ClipboardList, Home, Layers, Ruler, Send, ShieldCheck, Building2, Warehouse, PaintRoller, Check } from 'lucide-react';
import api from '../services/api';

const packages = {
  rough: {
    label: 'Thi công phần thô',
    description: 'Khung kết cấu, xây tô, điện nước âm tường và nhân công hoàn thiện.',
    minRate: 3600000,
    maxRate: 4300000,
  },
  standard: {
    label: 'Trọn gói tiêu chuẩn',
    description: 'Phần thô, hoàn thiện cơ bản, vật tư phổ thông khá và bàn giao sử dụng.',
    minRate: 5600000,
    maxRate: 6500000,
  },
  premium: {
    label: 'Trọn gói cao cấp',
    description: 'Hoàn thiện đẹp, vật tư cao cấp, kiểm soát chi tiết thẩm mỹ và công năng.',
    minRate: 6900000,
    maxRate: 8500000,
  },
};

const constructionTypesList = [
  { id: 'Nhà phố', label: 'Nhà phố', icon: Building2, coef: 1 },
  { id: 'Biệt thự', label: 'Biệt thự', icon: Home, coef: 1.18 },
  { id: 'Nhà cấp 4', label: 'Nhà cấp 4', icon: Warehouse, coef: 0.92 },
  { id: 'Cải tạo, sửa chữa', label: 'Cải tạo, sửa', icon: PaintRoller, coef: 0.7 },
];

const typeCoefficients = constructionTypesList.reduce((acc, curr) => {
  acc[curr.id] = curr.coef;
  return acc;
}, {});

const formatCurrency = (value) => new Intl.NumberFormat('vi-VN', {
  style: 'currency',
  currency: 'VND',
  maximumFractionDigits: 0,
}).format(value);

const AnimatedNumber = ({ value }) => {
  const spring = useSpring(value, { mass: 0.8, stiffness: 75, damping: 15 });
  const display = useTransform(spring, (current) =>
    new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
      maximumFractionDigits: 0,
    }).format(Math.round(current))
  );

  useEffect(() => {
    spring.set(value);
  }, [spring, value]);

  return <motion.span>{display}</motion.span>;
};

const Pricing = () => {
  const [calculator, setCalculator] = useState({
    constructionType: 'Nhà phố',
    packageKey: 'standard',
    landWidth: 5,
    landLength: 16,
    landArea: 80,
    floors: 3,
  });
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    address: '',
    message: '',
  });
  const [status, setStatus] = useState({ type: '', message: '' });

  const estimate = useMemo(() => {
    const areaFromSize = (Number(calculator.landWidth) || 0) * (Number(calculator.landLength) || 0);
    const area = Math.max(Number(calculator.landArea) || areaFromSize || 0, 0);
    const floors = Math.max(Number(calculator.floors) || 1, 1);
    const coefficient = typeCoefficients[calculator.constructionType] || 1;
    const selectedPackage = packages[calculator.packageKey];
    const constructionArea = Math.round(area * floors * coefficient);
    const minCost = constructionArea * selectedPackage.minRate;
    const maxCost = constructionArea * selectedPackage.maxRate;
    const averageCost = Math.round((minCost + maxCost) / 2);

    return {
      constructionArea,
      minCost,
      maxCost,
      averageCost,
      selectedPackage,
    };
  }, [calculator]);

  const handleCalculatorChange = (event) => {
    const { name, value } = event.target;
    setCalculator((current) => {
      const next = { ...current, [name]: value };
      if (name === 'landWidth' || name === 'landLength') {
        const width = Number(name === 'landWidth' ? value : next.landWidth) || 0;
        const length = Number(name === 'landLength' ? value : next.landLength) || 0;
        next.landArea = width && length ? Number((width * length).toFixed(2)) : '';
      }
      return next;
    });
  };

  const handleFormChange = (event) => {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus({ type: 'loading', message: 'Đang gửi yêu cầu báo giá...' });

    const quoteSummary = [
      `Yêu cầu báo giá từ trang Báo giá`,
      `Loại công trình: ${calculator.constructionType}`,
      `Gói dịch vụ: ${estimate.selectedPackage.label}`,
      `Kích thước đất: ${calculator.landWidth}m x ${calculator.landLength}m`,
      `Diện tích đất: ${calculator.landArea}m2`,
      `Số tầng: ${calculator.floors}`,
      `Diện tích quy đổi: ${estimate.constructionArea}m2`,
      `Khoảng chi phí tham khảo: ${formatCurrency(estimate.minCost)} - ${formatCurrency(estimate.maxCost)}`,
      `Tổng giá dự kiến: ${formatCurrency(estimate.averageCost)}`,
      formData.message ? `Ghi chú: ${formData.message}` : '',
    ].filter(Boolean).join('\n');

    try {
      await api.post('/consultations', {
        fullName: formData.fullName,
        phone: formData.phone,
        email: formData.email,
        address: formData.address,
        constructionType: calculator.constructionType,
        landArea: `${calculator.landWidth}m x ${calculator.landLength}m (${calculator.landArea}m2)`,
        floors: Number(calculator.floors),
        budget: `${formatCurrency(estimate.averageCost)} (${formatCurrency(estimate.minCost)} - ${formatCurrency(estimate.maxCost)})`,
        message: quoteSummary,
      });
      setStatus({ type: 'success', message: 'Đã gửi yêu cầu. DAD sẽ liên hệ để bóc tách chi phí chi tiết hơn.' });
      setFormData({ fullName: '', phone: '', email: '', address: '', message: '' });
    } catch (_error) {
      setStatus({ type: 'error', message: 'Chưa gửi được yêu cầu. Vui lòng thử lại hoặc gọi hotline 077 823 6311.' });
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA] pb-24 pt-28">
      {/* Header Area */}
      <section className="container mx-auto px-4 md:px-8 mb-12">
        <div className="max-w-3xl mx-auto text-center">
          <motion.p 
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} 
            className="mb-4 text-sm font-bold uppercase tracking-widest text-primary"
          >
            Dự toán chi phí
          </motion.p>
          <motion.h1 
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="mb-6 text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-gray-900"
          >
            Báo giá xây dựng <br className="hidden md:block" /> tham khảo trực tuyến
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="text-lg text-gray-600 leading-relaxed max-w-2xl mx-auto"
          >
            Công cụ tương tác này giúp bạn phác thảo ngân sách nhanh chóng. Chi phí chính thức sẽ được DAD tối ưu sau khi trao đổi chi tiết và khảo sát thực tế.
          </motion.p>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 xl:grid-cols-[1fr_450px] gap-8 items-start relative">
          
          {/* Interactive Calculator Column */}
          <div className="space-y-10">
            {/* Step 1: Construction Type */}
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-5 flex items-center gap-2">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/20 text-primary text-sm">1</span> 
                Chọn loại công trình
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {constructionTypesList.map((type) => {
                  const Icon = type.icon;
                  const isSelected = calculator.constructionType === type.id;
                  return (
                    <motion.button
                      whileHover={{ y: -4 }}
                      whileTap={{ scale: 0.98 }}
                      key={type.id}
                      onClick={() => setCalculator((c) => ({ ...c, constructionType: type.id }))}
                      className={`relative p-5 rounded-2xl border-2 text-left transition-all overflow-hidden ${
                        isSelected 
                          ? 'border-primary bg-primary/5 shadow-md shadow-primary/10' 
                          : 'border-gray-200 bg-white hover:border-gray-300'
                      }`}
                    >
                      {isSelected && (
                        <div className="absolute top-3 right-3 text-primary">
                          <Check size={18} strokeWidth={3} />
                        </div>
                      )}
                      <Icon className={`mb-3 ${isSelected ? 'text-primary' : 'text-gray-400'}`} size={28} />
                      <p className={`font-semibold text-sm md:text-base ${isSelected ? 'text-gray-900' : 'text-gray-600'}`}>{type.label}</p>
                    </motion.button>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Dimensions */}
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-5 flex items-center gap-2">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/20 text-primary text-sm">2</span> 
                Thông số đất & Quy mô
              </h2>
              <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Inputs */}
                  <div className="space-y-1">
                    <label className="text-sm font-semibold text-gray-700 flex items-center gap-2 mb-1"><Ruler size={16} className="text-gray-400"/> Chiều ngang (m)</label>
                    <div className="relative">
                      <input name="landWidth" type="number" min="3" step="0.1" value={calculator.landWidth} onChange={handleCalculatorChange} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900 font-medium focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all" />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <label className="text-sm font-semibold text-gray-700 flex items-center gap-2 mb-1"><Home size={16} className="text-gray-400"/> Chiều dài (m)</label>
                    <div className="relative">
                      <input name="landLength" type="number" min="5" step="0.1" value={calculator.landLength} onChange={handleCalculatorChange} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900 font-medium focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all" />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <label className="text-sm font-semibold text-gray-700 flex items-center gap-2 mb-1"><Ruler size={16} className="text-gray-400"/> Diện tích đất (m2)</label>
                    <div className="relative">
                      <input name="landArea" type="number" min="20" value={calculator.landArea} onChange={handleCalculatorChange} className="w-full bg-gray-100 border border-transparent rounded-xl px-4 py-3 text-gray-700 font-medium outline-none" />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <label className="text-sm font-semibold text-gray-700 flex items-center gap-2 mb-1"><Layers size={16} className="text-gray-400"/> Số tầng</label>
                    <div className="relative">
                      <input name="floors" type="number" min="1" value={calculator.floors} onChange={handleCalculatorChange} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900 font-medium focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 3: Packages */}
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-5 flex items-center gap-2">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/20 text-primary text-sm">3</span> 
                Chọn gói dịch vụ
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {Object.entries(packages).map(([key, item]) => {
                  const isSelected = calculator.packageKey === key;
                  return (
                    <motion.button
                      whileHover={{ y: -4 }}
                      whileTap={{ scale: 0.98 }}
                      key={key}
                      onClick={() => setCalculator((current) => ({ ...current, packageKey: key }))}
                      className={`relative text-left p-6 rounded-2xl border-2 transition-all ${
                        isSelected 
                          ? 'border-primary bg-primary/5 shadow-md shadow-primary/10' 
                          : 'border-gray-200 bg-white hover:border-gray-300'
                      }`}
                    >
                      {isSelected && (
                        <div className="absolute top-4 right-4 text-primary">
                          <Check size={20} strokeWidth={3} />
                        </div>
                      )}
                      <ShieldCheck className={`mb-4 ${isSelected ? 'text-primary' : 'text-gray-400'}`} size={32} />
                      <h3 className={`mb-2 text-lg font-bold ${isSelected ? 'text-gray-900' : 'text-gray-700'}`}>{item.label}</h3>
                      <p className="mb-4 text-sm leading-relaxed text-gray-500 min-h-[60px]">{item.description}</p>
                      <div className="pt-4 border-t border-gray-100">
                        <p className={`text-sm font-bold ${isSelected ? 'text-primary' : 'text-gray-600'}`}>
                          {formatCurrency(item.minRate)}<br/>
                          <span className="text-xs font-normal text-gray-400">đến</span><br/>
                          {formatCurrency(item.maxRate)}/m2
                        </p>
                      </div>
                    </motion.button>
                  );
                })}
              </div>
            </div>

          </div>

          {/* Sticky Summary & Form Column */}
          <div className="xl:sticky xl:top-28 space-y-6">
            
            {/* Dark Mode Receipt Card */}
            <motion.div 
              layout
              className="bg-gray-900 rounded-3xl p-8 shadow-2xl shadow-gray-900/40 border border-gray-800 text-white relative overflow-hidden"
            >
              {/* Subtle gradient background decoration */}
              <div className="absolute -top-24 -right-24 w-48 h-48 bg-primary/20 rounded-full blur-3xl opacity-50 pointer-events-none"></div>
              
              <div className="relative z-10">
                <p className="text-xs font-bold uppercase tracking-widest text-primary mb-2">Bản nháp dự toán</p>
                <div className="flex items-baseline gap-2 mb-2">
                  <span className="text-4xl md:text-5xl font-black tracking-tight text-white">
                    <AnimatedNumber value={estimate.averageCost} />
                  </span>
                </div>
                <p className="text-sm text-gray-400 mb-8 border-b border-gray-800 pb-8">
                  Tổng chi phí trung bình ước tính. <br/>
                  (Khoảng: <AnimatedNumber value={estimate.minCost}/> - <AnimatedNumber value={estimate.maxCost}/>)
                </p>

                <div className="space-y-4">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-400">Kích thước đất</span>
                    <span className="font-semibold text-white">{calculator.landWidth}m x {calculator.landLength}m</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-400">Quy mô</span>
                    <span className="font-semibold text-white">{calculator.floors} Tầng</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-400">Diện tích quy đổi</span>
                    <span className="font-semibold text-primary px-2 py-1 bg-primary/10 rounded-md">{estimate.constructionArea}m2</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-400">Loại công trình</span>
                    <span className="font-semibold text-white">{calculator.constructionType}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-400">Gói chọn</span>
                    <span className="font-semibold text-white">{estimate.selectedPackage.label}</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Quick Contact Form */}
            <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-xl shadow-gray-200/50">
              <h3 className="text-xl font-bold text-gray-900 mb-2">Gửi yêu cầu chi tiết</h3>
              <p className="text-sm text-gray-500 mb-6">Nhận bản bóc tách vật tư chính xác hơn từ kỹ sư DAD.</p>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                {status.message && (
                  <div className={`p-3 rounded-xl text-sm font-medium ${status.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
                    {status.message}
                  </div>
                )}
                <div className="grid grid-cols-2 gap-4">
                  <input name="fullName" value={formData.fullName} onChange={handleFormChange} required placeholder="Họ và tên *" className="col-span-2 sm:col-span-1 w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all" />
                  <input name="phone" value={formData.phone} onChange={handleFormChange} required placeholder="Số điện thoại *" className="col-span-2 sm:col-span-1 w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all" />
                </div>
                <textarea name="message" value={formData.message} onChange={handleFormChange} rows={3} placeholder="Ghi chú thêm: Yêu cầu đặc biệt, ngân sách dự kiến..." className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all resize-none" />
                
                <button type="submit" disabled={status.type === 'loading'} className="w-full flex items-center justify-center gap-2 bg-primary hover:bg-yellow-600 text-white font-bold py-3.5 px-6 rounded-xl transition-all shadow-md shadow-primary/20 disabled:opacity-70 disabled:cursor-not-allowed">
                  Gửi yêu cầu ngay <Send size={18} />
                </button>
              </form>
            </div>
            
          </div>
        </div>
      </section>

      {/* Explanation Section */}
      <section className="container mx-auto px-4 md:px-8 mt-16">
        <div className="bg-white rounded-3xl p-8 md:p-12 border border-gray-100 shadow-sm max-w-4xl mx-auto">
           <div className="mb-8 flex items-center justify-center gap-3">
              <ClipboardList className="text-primary" size={32} />
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Quy trình bóc tách báo giá</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
              {[
                'Khảo sát hiện trạng đất, nền móng và điều kiện thi công khu vực.',
                'Tính diện tích xây dựng quy đổi theo số tầng và thiết kế.',
                'Chọn tiêu chuẩn vật tư phù hợp ngân sách mong muốn.',
                'Bóc tách chi tiết phần thô, điện nước, chống thấm, nhân công.',
                'Dự phòng rủi ro các hạng mục phát sinh theo hiện trạng.',
                'Chốt tiến độ, điều khoản bảo hành và lịch thanh toán rõ ràng.',
              ].map((item, i) => (
                <div key={i} className="flex gap-4">
                  <div className="mt-1 flex-shrink-0 w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                    <Check size={14} strokeWidth={3} />
                  </div>
                  <span className="text-gray-600 leading-relaxed">{item}</span>
                </div>
              ))}
            </div>
        </div>
      </section>

    </div>
  );
};

export default Pricing;
