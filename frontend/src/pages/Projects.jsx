import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Maximize, Layers, ChevronRight, FolderOpen } from 'lucide-react';
import api from '../services/api';
import { CardGridSkeleton, SmoothImage } from '../components/ui/LoadingStates';

const fallbackImage = 'https://images.unsplash.com/photo-1600607688969-a5bfcd64bd15?ixlib=rb-4.0.3&auto=format&fit=crop&w=900&q=85';

const fallbackProjects = [
  {
    _id: 'f1',
    slug: '#',
    title: 'Biệt thự sân vườn hiện đại 2 tầng',
    category: 'Biệt thự',
    location: 'Đà Nẵng',
    area: '250m²',
    floors: 2,
    status: 'Đã hoàn thành',
    thumbnail: 'https://images.unsplash.com/photo-1600607688969-a5bfcd64bd15?ixlib=rb-4.0.3&auto=format&fit=crop&w=900&q=85',
  },
  {
    _id: 'f2',
    slug: '#',
    title: 'Nhà phố hiện đại mặt tiền 5m',
    category: 'Nhà phố',
    location: 'Quảng Nam',
    area: '180m²',
    floors: 3,
    status: 'Đã hoàn thành',
    thumbnail: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=900&q=85',
  },
  {
    _id: 'f3',
    slug: '#',
    title: 'Nhà cấp 4 mái Nhật tiện nghi',
    category: 'Nhà cấp 4',
    location: 'Huế',
    area: '140m²',
    floors: 1,
    status: 'Đã hoàn thành',
    thumbnail: 'https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?ixlib=rb-4.0.3&auto=format&fit=crop&w=900&q=85',
  },
  {
    _id: 'f4',
    slug: '#',
    title: 'Nhà phố thương mại 4 tầng',
    category: 'Nhà phố',
    location: 'Đà Nẵng',
    area: '200m²',
    floors: 4,
    status: 'Đã hoàn thành',
    thumbnail: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=900&q=85',
  },
  {
    _id: 'f5',
    slug: '#',
    title: 'Biệt thự phong cách tân cổ điển',
    category: 'Biệt thự',
    location: 'Đà Nẵng',
    area: '320m²',
    floors: 2,
    status: 'Đang thi công',
    thumbnail: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=900&q=85',
  },
  {
    _id: 'f6',
    slug: '#',
    title: 'Cải tạo nhà cũ thành không gian hiện đại',
    category: 'Cải tạo',
    location: 'Quảng Ngãi',
    area: '90m²',
    floors: 2,
    status: 'Đã hoàn thành',
    thumbnail: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=900&q=85',
  },
];

const filterOptions = ['Tất cả', 'Nhà phố', 'Biệt thự', 'Nhà cấp 4', 'Đang thi công'];

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('Tất cả');

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const { data } = await api.get('/projects');
        setProjects(Array.isArray(data) && data.length > 0 ? data : fallbackProjects);
      } catch (error) {
        console.error('Error fetching projects:', error);
        setProjects(fallbackProjects);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  const filteredProjects = filter === 'Tất cả'
    ? projects
    : filter === 'Đang thi công'
      ? projects.filter((p) => p.status === 'Đang thi công')
      : projects.filter((p) => p.category?.trim().toLowerCase() === filter.trim().toLowerCase());

  const statusStyles = {
    'Đã hoàn thành': 'bg-green-500',
    'Đang thi công': 'bg-yellow-500',
  };

  return (
    <div className="min-h-screen bg-light pt-36 pb-16">
      <div className="container mx-auto px-4 md:px-8">
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <h1 className="mb-4 text-3xl font-bold text-secondary sm:text-4xl md:text-5xl">
            Dự Án Đã Thực Hiện
          </h1>
          <p className="text-lg text-gray-600">
            Khám phá các công trình tiêu biểu do DAD Construction thiết kế và thi công.
          </p>
        </div>

        {/* Filter chips */}
        <div className="mb-12 flex flex-wrap justify-center gap-3">
          {filterOptions.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`rounded-full px-5 py-2 text-sm font-semibold transition-all duration-200 ${
                filter === f
                  ? 'bg-primary text-white shadow-md shadow-primary/25 scale-105'
                  : 'border border-gray-200 bg-white text-gray-600 hover:border-primary/40 hover:text-primary'
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {loading ? (
          <CardGridSkeleton />
        ) : filteredProjects.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-gray-400">
            <FolderOpen size={56} className="mb-4 opacity-40" />
            <p className="text-lg font-semibold">Không tìm thấy dự án</p>
            <p className="mt-1 text-sm">Thử chọn danh mục khác hoặc xem tất cả</p>
            <button
              onClick={() => setFilter('Tất cả')}
              className="mt-5 rounded-sm bg-primary px-6 py-2.5 text-sm font-semibold text-white hover:bg-yellow-600"
            >
              Xem tất cả dự án
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 content-fade-in">
            {filteredProjects.map((project) => (
              <div key={project._id} className="group relative overflow-hidden rounded-sm bg-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                <Link
                  to={`/du-an/${project.slug}`}
                  className="absolute inset-0 z-10"
                  aria-label={`Xem chi tiết ${project.title}`}
                >
                  <span className="sr-only">Xem chi tiết {project.title}</span>
                </Link>
                <div className="relative h-64 overflow-hidden bg-gray-200">
                  <SmoothImage
                    src={project.thumbnail || fallbackImage}
                    fallbackSrc={fallbackImage}
                    alt={project.title}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div
                    className={`absolute right-4 top-4 z-20 rounded-sm px-3 py-1 text-xs font-bold text-white ${statusStyles[project.status] || 'bg-gray-500'}`}
                  >
                    {project.status}
                  </div>
                </div>
                <div className="relative z-0 p-6">
                  <div className="mb-2 text-sm font-medium text-gray-500">
                    {project.category} {project.location ? `• ${project.location}` : ''}
                  </div>
                  <h3 className="mb-4 line-clamp-1 text-xl font-bold text-secondary transition-colors group-hover:text-primary">
                    {project.title}
                  </h3>
                  <div className="mb-4 flex items-center justify-between text-sm text-gray-600">
                    <span className="flex items-center gap-1.5">
                      <Maximize size={15} className="text-primary" />
                      {project.area || 'N/A'}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Layers size={15} className="text-primary" />
                      {project.floors ? `${project.floors} tầng` : '—'}
                    </span>
                  </div>
                  <span className="inline-flex items-center gap-1 font-semibold text-primary transition-colors group-hover:text-secondary">
                    Xem chi tiết <ChevronRight size={16} />
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Projects;
