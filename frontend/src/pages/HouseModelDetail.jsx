import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Maximize, Layers, DollarSign, Home as HomeIcon, CheckCircle, Ruler, ChevronLeft, ChevronRight } from 'lucide-react';
import api from '../services/api';
import { DetailSkeleton, SmoothImage } from '../components/ui/LoadingStates';
import fallbackHouseImage from '../assets/hero.png';
import fallbackHouseModels from '../data/fallbackHouseModels';

const HouseModelDetail = () => {
  const { slug } = useParams();
  const [model, setModel] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const fetchModel = async () => {
      const fallbackModel = fallbackHouseModels.find((item) => item.slug === slug);

      try {
        const { data } = await api.get(`/house-models/slug/${slug}`);
        setModel(data || fallbackModel || null);
      } catch (error) {
        console.error('Lỗi khi tải dữ liệu mẫu nhà:', error);
        setModel(fallbackModel || null);
      } finally {
        setLoading(false);
      }
    };
    fetchModel();
  }, [slug]);

  if (loading) return <DetailSkeleton />;
  if (!model) return <div className="text-center py-40">Không tìm thấy mẫu nhà này</div>;

  const thumbnail = model.thumbnail?.trim() || fallbackHouseImage;
  const allImages = thumbnail 
    ? [thumbnail, ...(model.images || [])] 
    : (model.images?.length ? model.images : [fallbackHouseImage]);

  const nextImage = () => setCurrentImageIndex((prev) => (prev + 1) % allImages.length);
  const prevImage = () => setCurrentImageIndex((prev) => (prev - 1 + allImages.length) % allImages.length);

  return (
    <div className="pt-24 pb-16 bg-white min-h-screen">
      <div className="container mx-auto px-4 md:px-8">
        <Link to="/mau-nha" className="inline-flex items-center gap-2 text-gray-500 hover:text-primary mb-8 font-medium transition-colors">
          <ArrowLeft size={20} /> Quay lại danh sách mẫu nhà
        </Link>
        
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Main Content */}
          <div className="lg:w-2/3">
            <h1 className="text-3xl md:text-5xl font-bold text-secondary mb-4">{model.title}</h1>
            <div className="flex gap-3 mb-8">
              <span className="px-3 py-1 bg-light text-gray-600 text-sm font-bold rounded-sm border border-gray-200">{model.type || 'Mẫu nhà'}</span>
              <span className="px-3 py-1 bg-primary/10 text-primary text-sm font-bold rounded-sm">{model.style || 'Hiện đại'}</span>
            </div>
            
            <div className="relative w-full h-[400px] md:h-[600px] rounded-sm overflow-hidden mb-8 shadow-md bg-gray-200 group">
              <SmoothImage src={allImages[currentImageIndex]} fallbackSrc={fallbackHouseImage} alt={model.title} className="w-full h-full object-cover" eager />
              
              {allImages.length > 1 && (
                <>
                  <button onClick={prevImage} className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-primary text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-all z-10">
                    <ChevronLeft size={24} />
                  </button>
                  <button onClick={nextImage} className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-primary text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-all z-10">
                    <ChevronRight size={24} />
                  </button>
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                    {allImages.map((_, idx) => (
                      <button 
                        key={idx} 
                        onClick={() => setCurrentImageIndex(idx)} 
                        className={`w-2.5 h-2.5 rounded-full transition-all shadow-sm ${idx === currentImageIndex ? 'bg-primary scale-125' : 'bg-white/70 hover:bg-white'}`} 
                      />
                    ))}
                  </div>
                </>
              )}
            </div>
            
            <div className="prose max-w-none prose-lg">
              <h3 className="text-2xl font-bold text-secondary mb-4 border-b pb-2">Tổng Quan Thiết Kế</h3>
              <p className="text-gray-600 mb-8 leading-relaxed">
                {model.description || 'Mẫu nhà này được thiết kế tối ưu hóa không gian, ánh sáng tự nhiên và công năng sử dụng, mang lại môi trường sống lý tưởng cho gia đình. Phối cảnh kiến trúc chú trọng vào sự hiện đại, sang trọng nhưng vẫn tiết kiệm chi phí thi công.'}
              </p>
              
              <h3 className="text-2xl font-bold text-secondary mb-4 border-b pb-2">Công Năng Sử Dụng</h3>
              <div className="bg-light p-6 rounded-sm border border-gray-100 mb-8">
                <p className="text-gray-700 whitespace-pre-wrap">
                  {model.functions || '- Tầng 1: Phòng khách, Phòng bếp + ăn, 1 Phòng ngủ, 1 WC chung.\n- Tầng 2: 2 Phòng ngủ (1 Master), 1 Phòng thờ, Sân phơi, Ban cùng.'}
                </p>
              </div>
            </div>
          </div>
          
          {/* Sidebar */}
          <div className="lg:w-1/3">
            <div className="bg-light p-8 rounded-sm shadow-sm border border-gray-100 sticky top-32">
              <h3 className="text-xl font-bold text-secondary mb-6 border-b border-gray-200 pb-4">Thông Số Kỹ Thuật</h3>
              
              <ul className="space-y-6">
                <li className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-primary shadow-sm shrink-0">
                    <Maximize size={20} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Diện tích xây dựng</p>
                    <p className="font-semibold text-secondary">{model.area || 'Đang cập nhật'}</p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-primary shadow-sm shrink-0">
                    <Ruler size={20} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Kích thước (Rộng x Dài)</p>
                    <p className="font-semibold text-secondary">{model.width || '5m'} x {model.length || '20m'}</p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-primary shadow-sm shrink-0">
                    <Layers size={20} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Quy mô</p>
                    <p className="font-semibold text-secondary">{model.floors ? `${model.floors} Tầng` : '1 Tầng'}</p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-primary shadow-sm shrink-0">
                    <HomeIcon size={20} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Số phòng ngủ</p>
                    <p className="font-semibold text-secondary">{model.bedrooms || '3'} Phòng</p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-primary shadow-sm shrink-0">
                    <DollarSign size={20} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Chi phí dự kiến hoàn thiện</p>
                    <p className="font-bold text-primary text-lg">{model.estimatedBuildCost || 'Liên hệ'}</p>
                  </div>
                </li>
              </ul>

              <div className="mt-8 pt-6 border-t border-gray-200">
                <Link to="/lien-he" className="w-full bg-secondary hover:bg-black text-white font-bold py-4 rounded-sm flex items-center justify-center gap-2 transition-colors">
                  <CheckCircle size={20} /> Đăng Ký Tư Vấn Mẫu Này
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HouseModelDetail;
