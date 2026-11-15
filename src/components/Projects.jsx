import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { projectsData } from '../data/projects';

export default function Projects() {
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');

  const filterButtons = [
    { key: 'all', label: 'Tất cả công trình (9)' },
    { key: 'biet-thu', label: 'Biệt thự & Villa (3)' },
    { key: 'nha-pho', label: 'Nhà phố hiện đại (3)' },
    { key: 'noi-that', label: 'Nội thất cao cấp (2)' },
    { key: 'thuong-mai', label: 'Thương mại & Cafe (1)' }
  ];

  const filteredProjects = useMemo(() => {
    const q = search.trim().toLowerCase();
    return projectsData.filter(project => {
      const matchCategory = (filter === 'all') || (project.category === filter);
      const matchSearch = (!q) || 
        project.title.toLowerCase().includes(q) ||
        project.location.toLowerCase().includes(q) ||
        project.categoryName.toLowerCase().includes(q) ||
        project.scope.toLowerCase().includes(q);
      return matchCategory && matchSearch;
    });
  }, [filter, search]);

  const resetFilters = () => {
    setFilter('all');
    setSearch('');
  };

  return (
    <section id="du-an" className="pt-16 pb-12 sm:pt-20 sm:pb-14 bg-gradient-to-b from-[#fdfbf7] via-white to-[#fbf7ee] border-t border-amber-200/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 text-amber-900 font-bold text-xs uppercase tracking-widest mb-3 bg-amber-100/80 px-3.5 py-1.5 rounded-full border border-amber-300">
              <span className="w-2 h-2 rounded-full bg-amber-500"></span>
              Tác phẩm kiến trúc của DAD
            </div>
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">
              Dự Án Đã Thực Hiện
            </h2>
          </div>
          <p className="text-slate-600 max-w-md text-sm sm:text-base">
            Mỗi công trình là một dấu ấn riêng biệt, kết tinh giữa tâm huyết của đội ngũ kiến trúc sư DAD và mong muốn của gia chủ.
          </p>
        </div>

        {/* Filter Buttons & Search Box */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10 pb-2">
          <div className="flex flex-wrap items-center gap-2.5">
            {filterButtons.map(btn => (
              <button
                key={btn.key}
                onClick={() => setFilter(btn.key)}
                className={`px-4 sm:px-5 py-2.5 rounded-xl font-semibold text-xs sm:text-sm transition ${
                  filter === btn.key
                    ? 'bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/25'
                    : 'bg-white text-slate-700 hover:bg-amber-50 hover:text-amber-800 border border-amber-200/60 shadow-xs'
                }`}
              >
                {btn.label}
              </button>
            ))}
          </div>

          {/* Instant Search Input */}
          <div className="relative min-w-[240px]">
            <i className="fa-solid fa-magnifying-glass absolute left-3.5 top-1/2 -translate-y-1/2 text-amber-600/60 text-xs"></i>
            <input 
              type="text" 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Tìm kiếm công trình, khu vực..." 
              className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-amber-200 text-xs sm:text-sm focus:outline-none focus:border-amber-500 bg-white shadow-xs font-medium"
            />
            {search && (
              <button 
                onClick={() => setSearch('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs"
              >
                <i className="fa-solid fa-circle-xmark"></i>
              </button>
            )}
          </div>
        </div>

        {/* Projects Grid */}
        {filteredProjects.length === 0 ? (
          <div className="col-span-full py-16 text-center">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 text-2xl">
              <i className="fa-solid fa-magnifying-glass"></i>
            </div>
            <h4 className="font-heading font-bold text-slate-700 text-lg">Không tìm thấy công trình phù hợp</h4>
            <p className="text-slate-500 text-sm mt-1">Vui lòng thử tìm kiếm bằng từ khóa khác hoặc bấm hiển thị tất cả.</p>
            <button 
              onClick={resetFilters} 
              className="mt-4 px-4 py-2 bg-dad-700 text-white rounded-xl text-xs font-semibold hover:bg-dad-800 transition"
            >
              Xem tất cả 9 công trình
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map(project => (
              <Link 
                key={project.id}
                to={`/du-an/${project.id}`}
                className="group bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="relative overflow-hidden aspect-[4/3] bg-slate-200">
                    <img 
                      src={project.image} 
                      alt={project.title} 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                    
                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-dad-900/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <span className="bg-white text-dad-800 font-bold text-xs px-4 py-2.5 rounded-xl shadow-lg flex items-center gap-2 transform translate-y-2 group-hover:translate-y-0 transition">
                        <span>Xem chi tiết công trình</span>
                        <i className="fa-solid fa-arrow-right"></i>
                      </span>
                    </div>

                    {/* Category & Area Tags */}
                    <div className="absolute top-3 left-3 bg-dad-700/90 backdrop-blur-sm text-white text-[11px] font-semibold px-3 py-1 rounded-lg">
                      {project.categoryName}
                    </div>
                    <div className="absolute bottom-3 right-3 bg-slate-900/75 backdrop-blur-sm text-amber-400 text-[11px] font-bold px-2.5 py-1 rounded-md">
                      <i className="fa-solid fa-ruler-combined mr-1"></i> {project.area}
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="flex items-center gap-1.5 text-xs text-slate-500 mb-2">
                      <i className="fa-solid fa-location-dot text-dad-600"></i>
                      <span>{project.location}</span>
                    </div>
                    <h3 className="font-heading font-bold text-lg text-slate-900 group-hover:text-dad-700 transition mb-2">
                      {project.title}
                    </h3>
                    <p className="text-slate-600 text-xs leading-relaxed line-clamp-2">
                      {project.desc}
                    </p>
                  </div>
                </div>

                <div className="px-6 py-3.5 bg-slate-50 border-t border-slate-100 flex justify-between items-center text-xs">
                  <span className="font-semibold text-dad-700">{project.scope}</span>
                  <span className="text-slate-400 font-medium">Hoàn thành {project.year}</span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
