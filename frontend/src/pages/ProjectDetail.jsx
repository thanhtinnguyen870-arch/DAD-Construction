import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MapPin, Maximize, Layers, DollarSign, Calendar, ArrowLeft, ChevronRight, ChevronLeft } from 'lucide-react';
import api from '../services/api';
import { DetailSkeleton, SmoothImage } from '../components/ui/LoadingStates';

const fallbackImage = 'https://images.unsplash.com/photo-1600607688969-a5bfcd64bd15?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=85';

const ProjectDetail = () => {
  const { slug } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const { data } = await api.get(`/projects/slug/${slug}`);
        setProject(data);
      } catch (error) {
        console.error('Error fetching project:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProject();
  }, [slug]);

  if (loading) return <DetailSkeleton />;
  if (!project) return <div className="text-center py-40">Không tìm thấy dự án</div>;

  const allImages = project.thumbnail 
    ? [project.thumbnail, ...(project.images || [])] 
    : (project.images?.length ? project.images : [fallbackImage]);

  const nextImage = () => setCurrentImageIndex((prev) => (prev + 1) % allImages.length);
  const prevImage = () => setCurrentImageIndex((prev) => (prev - 1 + allImages.length) % allImages.length);

  return (
    <div className="pt-24 pb-16 bg-white min-h-screen">
      <div className="container mx-auto px-4 md:px-8">
        <Link to="/du-an" className="inline-flex items-center gap-2 text-gray-500 hover:text-primary mb-8 font-medium transition-colors">
          <ArrowLeft size={20} /> Quay lại danh sách
        </Link>
        
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Main Content */}
          <div className="lg:w-2/3">
            <h1 className="text-3xl md:text-5xl font-bold text-secondary mb-6">{project.title}</h1>
            <div className="relative w-full h-[400px] md:h-[600px] rounded-sm overflow-hidden mb-8 bg-gray-200 group">
              <SmoothImage src={allImages[currentImageIndex]} fallbackSrc={fallbackImage} alt={project.title} className="w-full h-full object-contain" eager />
              
              {allImages.length > 1 && (
                <>
                  <button onClick={prevImage} className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-primary text-white p-2 rounded-full opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-all z-10">
                    <ChevronLeft size={24} />
                  </button>
                  <button onClick={nextImage} className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-primary text-white p-2 rounded-full opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-all z-10">
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
              <h3 className="text-2xl font-bold text-secondary mb-4">Tổng Quan</h3>
              <p className="text-gray-600 mb-6">{project.description || project.shortDescription || 'Đang cập nhật thông tin chi tiết về dự án này. Đây là một trong những công trình tiêu biểu của DAD Construction.'}</p>
            </div>
          </div>
          
          {/* Sidebar */}
          <div className="lg:w-1/3">
            <div className="bg-light p-8 rounded-sm sticky top-32">
              <h3 className="text-xl font-bold text-secondary mb-6 border-b border-gray-200 pb-4">Thông Tin Dự án</h3>
              
              <ul className="space-y-6">
                <li className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-primary shadow-sm shrink-0">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Địa điểm</p>
                    <p className="font-semibold text-secondary">{project.location || 'Đang cập nhật'}</p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-primary shadow-sm shrink-0">
                    <Maximize size={20} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Diện tích</p>
                    <p className="font-semibold text-secondary">{project.area || 'Đang cập nhật'}</p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-primary shadow-sm shrink-0">
                    <Layers size={20} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Quy mô</p>
                    <p className="font-semibold text-secondary">{project.floors} Tầng</p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-primary shadow-sm shrink-0">
                    <DollarSign size={20} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Chi phí dự kiến</p>
                    <p className="font-semibold text-secondary">{project.estimatedCost || 'Liên hệ'}</p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-primary shadow-sm shrink-0">
                    <Calendar size={20} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Trạng thái</p>
                    <span className="px-3 py-1 bg-yellow-100 text-yellow-800 text-xs font-bold rounded-sm uppercase tracking-wider">{project.status}</span>
                  </div>
                </li>
              </ul>

              <div className="mt-8 pt-8 border-t border-gray-200">
                <Link to="/lien-he" className="w-full bg-secondary hover:bg-black text-white font-bold py-4 rounded-sm flex items-center justify-center transition-colors">
                  Nhận Tư Vấn Mẫu Này
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;
