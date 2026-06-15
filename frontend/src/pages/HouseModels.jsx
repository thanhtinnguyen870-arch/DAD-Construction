import React, { useState, useEffect } from 'react';
import { Maximize, DollarSign, ChevronRight, Layers } from 'lucide-react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import { CardGridSkeleton, SmoothImage } from '../components/ui/LoadingStates';
import fallbackHouseImage from '../assets/hero.png';
import fallbackHouseModels from '../data/fallbackHouseModels';

const HouseModels = () => {
  const [models, setModels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('Tất cả');

  useEffect(() => {
    const fetchModels = async () => {
      try {
        const { data } = await api.get('/house-models');
        setModels(Array.isArray(data) && data.length ? data : fallbackHouseModels);
      } catch (error) {
        console.error('Lỗi khi tải dữ liệu mẫu nhà:', error);
        setModels(fallbackHouseModels);
      } finally {
        setLoading(false);
      }
    };
    fetchModels();
  }, []);

  const filterOptions = ['Tất cả', 'Biệt thự', 'Nhà mái thái', 'Nhà cấp 4', 'Nhà phố'];

  const filteredModels = filter === 'Tất cả' 
    ? models 
    : models.filter(m => m.type?.toLowerCase() === filter.toLowerCase());

  return (
    <div className="pt-24 pb-16 bg-light min-h-screen">
      <div className="container mx-auto px-4 md:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h1 className="text-3xl font-bold text-secondary mb-6 sm:text-4xl md:text-5xl">Mẫu Nhà Đẹp Tham Khảo</h1>
          <p className="text-gray-600 text-lg">Bộ sưu tập các mẫu thiết kế nhà phố, biệt thự, nhà cấp 4 được ưa chuộng nhất hiện nay.</p>
        </div>

        {/* Filter */}
        <div className="flex flex-wrap gap-4 justify-center mb-12">
          {filterOptions.map((f, i) => (
            <button 
              key={i} 
              onClick={() => setFilter(f)}
              className={`px-6 py-2 rounded-full font-medium transition-colors ${filter === f ? 'bg-primary text-white shadow-md' : 'bg-white text-gray-600 hover:bg-gray-100 shadow-sm border border-gray-100'}`}
            >
              {f}
            </button>
          ))}
        </div>

        {loading ? (
          <CardGridSkeleton />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 content-fade-in">
            {filteredModels.map((model) => {
              const thumbnail = model.thumbnail?.trim() || fallbackHouseImage;

              return (
              <div key={model._id} className="bg-white rounded-sm overflow-hidden shadow-lg group">
                <Link to={`/mau-nha/${model.slug}`} className="block relative h-64 overflow-hidden bg-gray-200">
                  <SmoothImage 
                    src={thumbnail}
                    fallbackSrc={fallbackHouseImage}
                    alt={model.title} 
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700" 
                  />
                  <div className="absolute top-4 right-4 bg-secondary text-white text-xs font-bold px-3 py-1 rounded-sm shadow-md">
                    {model.type}
                  </div>
                </Link>
                
                <div className="p-6">
                  <Link to={`/mau-nha/${model.slug}`}>
                    <h3 className="text-xl font-bold text-secondary mb-4 group-hover:text-primary transition-colors line-clamp-1">{model.title}</h3>
                  </Link>
                  
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="flex items-center gap-2 text-gray-600">
                      <div className="w-8 h-8 rounded-full bg-light flex items-center justify-center text-primary shrink-0"><Maximize size={16} /></div>
                      <span className="text-sm font-medium">{model.area || 'Đang cập nhật'}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <div className="w-8 h-8 rounded-full bg-light flex items-center justify-center text-primary shrink-0"><Layers size={16} /></div>
                      <span className="text-sm font-medium">{model.floors ? `${model.floors} Tầng` : '1 Tầng'}</span>
                    </div>
                    <div className="col-span-2 flex items-center gap-2 text-gray-800">
                      <div className="w-8 h-8 rounded-full bg-light flex items-center justify-center text-primary shrink-0"><DollarSign size={16} /></div>
                      <span className="text-sm">Giá hoàn thiện: <span className="font-bold text-primary">{model.estimatedBuildCost || 'Liên hệ'}</span></span>
                    </div>
                  </div>
                  
                  <div className="border-t border-gray-100 pt-4 flex justify-between items-center">
                    <Link to="/lien-he" className="text-gray-500 hover:text-secondary text-sm font-medium transition-colors">
                      Nhận bản vẽ
                    </Link>
                    <Link to="/lien-he" className="inline-flex items-center gap-1 text-primary font-bold hover:text-yellow-600 transition-colors">
                      Báo giá chi tiết <ChevronRight size={16} />
                    </Link>
                  </div>
                </div>
              </div>
              );
            })}
            
            {filteredModels.length === 0 && (
              <div className="col-span-full text-center py-16 text-gray-500">
                Không tìm thấy mẫu nhà nào thuộc danh mục "{filter}".
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default HouseModels;
