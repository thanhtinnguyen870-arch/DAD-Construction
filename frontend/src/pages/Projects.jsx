import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Maximize, Clock, ChevronRight } from 'lucide-react';
import api from '../services/api';
import { CardGridSkeleton, SmoothImage } from '../components/ui/LoadingStates';

const fallbackImage = 'https://images.unsplash.com/photo-1600607688969-a5bfcd64bd15?ixlib=rb-4.0.3&auto=format&fit=crop&w=900&q=85';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const { data } = await api.get('/projects');
        setProjects(data);
      } catch (error) {
        console.error('Error fetching projects:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  return (
    <div className="pt-24 pb-16 bg-light min-h-screen">
      <div className="container mx-auto px-4 md:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-3xl font-bold text-secondary mb-6 sm:text-4xl md:text-5xl">Dự Án Đã Thực Hiện</h1>
          <p className="text-gray-600 text-lg">Khám phá các công trình tiêu biểu do DAD Construction thiết kế và thi công.</p>
        </div>

        {/* Filter - basic UI */}
        <div className="flex flex-wrap gap-4 justify-center mb-12">
          {['Tất cả', 'Nhà phố', 'Biệt thự', 'Nhà cấp 4', 'Đang thi công'].map((filter, i) => (
            <button key={i} className={`px-6 py-2 rounded-full font-medium transition-colors ${i === 0 ? 'bg-primary text-white' : 'bg-white text-gray-600 hover:bg-gray-100'}`}>
              {filter}
            </button>
          ))}
        </div>

        {loading ? (
          <CardGridSkeleton />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 content-fade-in">
            {projects.map((project) => (
              <div key={project._id} className="bg-white rounded-sm overflow-hidden shadow-lg group relative">
                <Link to={`/du-an/${project.slug}`} className="absolute inset-0 z-10">
                  <span className="sr-only">Xem chi tiết {project.title}</span>
                </Link>
                <div className="relative h-64 overflow-hidden bg-gray-200">
                  <SmoothImage src={project.thumbnail || fallbackImage} fallbackSrc={fallbackImage} alt={project.title} className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute top-4 right-4 bg-primary text-white text-xs font-bold px-3 py-1 rounded-sm z-20">
                    {project.status}
                  </div>
                </div>
                <div className="p-6 relative z-0">
                  <div className="text-sm text-gray-500 mb-2 font-medium">{project.category} • {project.location}</div>
                  <h3 className="text-xl font-bold text-secondary mb-4 group-hover:text-primary transition-colors line-clamp-1">{project.title}</h3>
                  <div className="flex items-center justify-between text-gray-600 text-sm mb-4">
                    <span className="flex items-center gap-1"><Maximize size={16} /> {project.area}</span>
                    <span className="flex items-center gap-1"><Clock size={16} /> {project.floors} Tầng</span>
                  </div>
                  <span className="inline-flex items-center gap-1 text-primary font-medium group-hover:text-secondary transition-colors">
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
