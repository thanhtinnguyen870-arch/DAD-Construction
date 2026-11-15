import React, { useEffect } from 'react';
import { projectsData } from '../data/projects';

export default function ProjectModal({ projectId, onClose, onSelectProject, onRequestQuote }) {
  const currentIndex = projectsData.findIndex(p => p.id === projectId);
  const project = projectsData[currentIndex];

  useEffect(() => {
    if (!project) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowLeft') {
        navigate(-1);
      } else if (e.key === 'ArrowRight') {
        navigate(1);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto';
    };
  }, [projectId, currentIndex]);

  if (!project) return null;

  const navigate = (dir) => {
    const nextIndex = (currentIndex + dir + projectsData.length) % projectsData.length;
    onSelectProject(projectsData[nextIndex].id);
  };

  return (
    <div 
      className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="bg-white rounded-3xl max-w-4xl w-full overflow-hidden shadow-2xl border border-slate-100 relative animate-fadeIn">
        {/* Close Button */}
        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-slate-900/70 hover:bg-slate-900 text-white flex items-center justify-center transition" 
          title="Đóng"
        >
          <i className="fa-solid fa-xmark text-lg"></i>
        </button>

        <div className="grid grid-cols-1 md:grid-cols-12">
          {/* Modal Image Gallery */}
          <div className="col-span-1 md:col-span-7 bg-slate-900 relative min-h-[260px] sm:min-h-[420px] flex items-center justify-center overflow-hidden">
            <img 
              src={project.image} 
              alt={project.title} 
              className="w-full h-full object-cover"
            />
            <div className="absolute top-4 left-4 bg-dad-700 text-white text-xs font-bold px-3.5 py-1.5 rounded-lg shadow">
              {project.categoryName}
            </div>
            <div className="absolute bottom-4 left-4 bg-slate-900/80 backdrop-blur-sm text-slate-200 text-xs px-2.5 py-1 rounded-md font-semibold">
              {currentIndex + 1} / {projectsData.length}
            </div>

            {/* Navigation Arrows (Gọn gàng trong khung ảnh, không lấn vào khung thông tin) */}
            <button 
              onClick={() => navigate(-1)} 
              className="absolute left-3 top-1/2 -translate-y-1/2 z-10 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-slate-950/60 hover:bg-slate-950 text-white flex items-center justify-center shadow-lg transition backdrop-blur-sm" 
              title="Dự án trước"
            >
              <i className="fa-solid fa-chevron-left text-sm"></i>
            </button>
            <button 
              onClick={() => navigate(1)} 
              className="absolute right-3 top-1/2 -translate-y-1/2 z-10 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-slate-950/60 hover:bg-slate-950 text-white flex items-center justify-center shadow-lg transition backdrop-blur-sm" 
              title="Dự án kế tiếp"
            >
              <i className="fa-solid fa-chevron-right text-sm"></i>
            </button>
          </div>

          {/* Modal Details Column */}
          <div className="col-span-1 md:col-span-5 p-6 sm:p-8 flex flex-col justify-between">
            <div>
              <h3 className="font-heading font-extrabold text-xl sm:text-2xl text-slate-900 mb-2 leading-snug">
                {project.title}
              </h3>
              <p className="text-xs font-semibold text-dad-700 mb-3 flex items-center gap-1.5">
                <i className="fa-solid fa-location-dot text-amber-500"></i> {project.location}
              </p>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-5">
                {project.desc}
              </p>

              <div className="bg-slate-50 rounded-2xl p-4 space-y-2 border border-slate-100 text-xs">
                <div className="flex justify-between py-1 border-b border-slate-200/60">
                  <span className="text-slate-500">Chủ đầu tư:</span>
                  <span className="font-bold text-slate-800">{project.client}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-200/60">
                  <span className="text-slate-500">Diện tích sàn:</span>
                  <span className="font-bold text-slate-800">{project.area}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-200/60">
                  <span className="text-slate-500">Quy mô:</span>
                  <span className="font-bold text-slate-800">{project.scale}</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-slate-500">Hạng mục thực hiện:</span>
                  <span className="font-bold text-dad-700">{project.scope}</span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 flex flex-col gap-2.5">
              <button 
                onClick={() => onRequestQuote(project)}
                className="w-full bg-dad-700 hover:bg-dad-800 text-white font-bold py-3 rounded-xl text-center text-xs sm:text-sm transition flex items-center justify-center gap-2"
              >
                <i className="fa-solid fa-file-invoice-dollar"></i>
                <span>Yêu cầu báo giá mẫu tương tự</span>
              </button>
              
              {/* Prev/Next buttons below info */}
              <div className="flex justify-between items-center gap-2 pt-2 text-xs">
                <button 
                  onClick={() => navigate(-1)} 
                  className="flex-1 py-2 sm:py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold transition flex items-center justify-center gap-1.5"
                >
                  <i className="fa-solid fa-chevron-left text-[11px]"></i> <span>Dự án trước</span>
                </button>
                <button 
                  onClick={() => navigate(1)} 
                  className="flex-1 py-2 sm:py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold transition flex items-center justify-center gap-1.5"
                >
                  <span>Dự án sau</span> <i className="fa-solid fa-chevron-right text-[11px]"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

