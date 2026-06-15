import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle, ChevronRight, Clock, HardHat, Home as HomeIcon, Maximize, PenTool, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SmoothImage } from '../components/ui/LoadingStates';

const Home = () => {
  const fadeInUp = {
    initial: { opacity: 0, y: 40 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-100px' },
    transition: { duration: 0.6 },
  };

  const featuredProjects = [
    {
      title: 'Biệt thự sân vườn hiện đại 2 tầng',
      meta: 'Biệt thự • Đà Nẵng',
      area: '250m²',
      time: '5 tháng',
      image: 'https://images.unsplash.com/photo-1600607688969-a5bfcd64bd15?ixlib=rb-4.0.3&auto=format&fit=crop&w=900&q=85',
    },
    {
      title: 'Nhà phố hiện đại mặt tiền 5m',
      meta: 'Nhà phố • Quảng Nam',
      area: '180m²',
      time: '4 tháng',
      image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=900&q=85',
    },
    {
      title: 'Nhà cấp 4 mái Nhật tiện nghi',
      meta: 'Nhà cấp 4 • Huế',
      area: '140m²',
      time: '3 tháng',
      image: 'https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?ixlib=rb-4.0.3&auto=format&fit=crop&w=900&q=85',
    },
  ];

  const fallbackProjectImage = 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=900&q=85';
  const heroImage = 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=85';
  const heroFallbackImage = 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=85';
  const teamImage = 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=85';
  const ctaImage = 'https://images.unsplash.com/photo-1541888086225-ee5a71146604?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=85';

  return (
    <div className="w-full">
      <section className="relative flex h-screen min-h-[600px] items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <SmoothImage
            src={heroImage}
            fallbackSrc={heroFallbackImage}
            alt="Biệt thự hiện đại"
            className="h-full w-full object-cover object-center"
            eager
          />
          <div className="absolute inset-0 bg-gradient-to-r from-secondary/80 via-secondary/58 to-secondary/72" />
          <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-secondary/85 via-secondary/35 to-transparent" />
        </div>

        <div className="container relative z-10 mx-auto mt-16 px-4 text-center text-white md:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="mx-auto max-w-4xl">
            <h1 className="mb-7 text-3xl font-bold leading-[1.18] drop-shadow-[0_4px_18px_rgba(0,0,0,0.45)] sm:text-4xl md:text-6xl md:leading-[1.14] lg:text-7xl lg:leading-[1.12]">
              Thiết Kế & Thi Công
              <span className="mt-3 block text-primary md:mt-4">Nhà Ở Trọn Gói</span>
            </h1>
            <p className="mx-auto mb-10 max-w-3xl text-base text-white/90 drop-shadow-[0_2px_12px_rgba(0,0,0,0.55)] md:text-xl">
              Chúng tôi đồng hành cùng bạn từ ý tưởng, thiết kế, xin phép xây dựng đến thi công hoàn thiện, mang đến không gian sống hiện đại, tối ưu chi phí và bền vững theo thời gian.
            </p>
            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <Link to="/du-an" className="flex items-center justify-center gap-2 rounded-sm bg-primary px-6 py-4 text-base font-semibold text-white shadow-[0_12px_35px_rgba(0,0,0,0.25)] transition-colors hover:bg-yellow-600 sm:px-8 sm:text-lg">
                Xem dự án đã thi công <ArrowRight size={20} />
              </Link>
              <Link to="/bao-gia" className="flex items-center justify-center rounded-sm border border-white/35 bg-secondary/35 px-6 py-4 text-base font-semibold text-white shadow-[0_12px_35px_rgba(0,0,0,0.2)] backdrop-blur-md transition-colors hover:bg-secondary/50 sm:px-8 sm:text-lg">
                Nhận báo giá miễn phí
              </Link>
            </div>
          </motion.div>
        </div>

        <div className="absolute bottom-0 z-20 hidden w-full border-t border-white/10 bg-secondary/80 py-6 backdrop-blur-md md:block">
          <div className="container mx-auto flex divide-x divide-white/20 px-8">
            {[
              ['10+', 'Năm kinh nghiệm'],
              ['250+', 'Công trình hoàn thiện'],
              ['98%', 'Khách hàng hài lòng'],
              ['5 năm', 'Bảo hành kết cấu'],
            ].map(([value, label]) => (
              <div key={label} className="flex-1 px-4 text-center">
                <h3 className="mb-1 text-4xl font-bold text-primary">{value}</h3>
                <p className="text-gray-300">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-light py-24">
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex flex-col items-center gap-16 lg:flex-row">
            <motion.div {...fadeInUp} className="lg:w-1/2">
              <h4 className="mb-2 font-bold uppercase tracking-widest text-primary">Về DAD Construction</h4>
              <h2 className="mb-6 text-3xl font-bold leading-[1.18] text-secondary md:text-5xl">Kiến tạo không gian sống bền vững và thẩm mỹ</h2>
              <p className="mb-6 text-lg text-gray-600">
                Chúng tôi là đơn vị chuyên thiết kế, thi công nhà phố, biệt thự, nhà cấp 4 và công trình dân dụng trọn gói. Với đội ngũ kiến trúc sư, kỹ sư và thợ thi công giàu kinh nghiệm, DAD luôn đặt chất lượng, tiến độ và sự hài lòng của khách hàng lên hàng đầu.
              </p>
              <ul className="mb-8 space-y-4">
                {[
                  'Báo giá minh bạch, không phát sinh',
                  'Vật tư chính hãng, rõ nguồn gốc',
                  'Giám sát kỹ thuật chặt chẽ 24/7',
                  'Bảo hành tận tâm, nhanh chóng',
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3 font-medium text-gray-700">
                    <CheckCircle className="text-primary" size={24} />
                    {item}
                  </li>
                ))}
              </ul>
              <Link to="/gioi-thieu" className="inline-flex items-center gap-2 border-b-2 border-secondary pb-1 font-bold text-secondary transition-colors hover:border-primary hover:text-primary">
                Tìm hiểu thêm về chúng tôi <ChevronRight size={20} />
              </Link>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: '-100px' }} transition={{ duration: 0.8 }} className="relative lg:w-1/2">
              <div className="relative overflow-hidden rounded-sm shadow-2xl">
                <SmoothImage src={teamImage} fallbackSrc={heroFallbackImage} alt="Đội ngũ kỹ sư" className="h-auto w-full object-cover" />
              </div>
              <div className="absolute -bottom-8 -left-8 hidden max-w-xs rounded-sm bg-white p-8 shadow-xl md:block">
                <h3 className="mb-2 text-2xl font-bold text-secondary">Uy Tín & Chất Lượng</h3>
                <p className="text-gray-600">Khẳng định thương hiệu qua từng công trình hoàn mỹ.</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="bg-white py-24">
        <div className="container mx-auto px-4 md:px-8">
          <div className="mx-auto mb-16 max-w-3xl text-center">
            <h4 className="mb-2 font-bold uppercase tracking-widest text-primary">Dịch vụ của chúng tôi</h4>
            <h2 className="mb-6 text-3xl font-bold text-secondary md:text-5xl">Giải pháp xây dựng toàn diện</h2>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[
              { icon: <PenTool size={40} />, title: 'Thiết kế kiến trúc', desc: 'Giải pháp thiết kế tối ưu công năng, ánh sáng và thẩm mỹ.' },
              { icon: <HomeIcon size={40} />, title: 'Thiết kế nội thất', desc: 'Không gian sống tiện nghi, đồng bộ và đậm chất cá nhân.' },
              { icon: <HardHat size={40} />, title: 'Thi công trọn gói', desc: 'Từ phần thô đến hoàn thiện, tiết kiệm thời gian và chi phí.' },
            ].map((service) => (
              <motion.div key={service.title} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="group rounded-sm bg-light p-10 transition-colors duration-300 hover:bg-secondary">
                <div className="mb-6 text-primary transition-colors duration-300 group-hover:text-white">{service.icon}</div>
                <h3 className="mb-4 text-2xl font-bold text-secondary transition-colors duration-300 group-hover:text-white">{service.title}</h3>
                <p className="mb-6 text-gray-600 transition-colors duration-300 group-hover:text-gray-300">{service.desc}</p>
                <Link to="/dich-vu" className="inline-flex items-center gap-2 font-bold text-primary transition-colors group-hover:text-white">
                  Xem chi tiết <ArrowRight size={16} />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-light py-24">
        <div className="container mx-auto px-4 md:px-8">
          <div className="mb-12 flex flex-col items-end justify-between md:flex-row">
            <div className="max-w-2xl">
              <h4 className="mb-2 font-bold uppercase tracking-widest text-primary">Dự án nổi bật</h4>
              <h2 className="text-3xl font-bold text-secondary md:text-5xl">Công trình tiêu biểu</h2>
            </div>
            <Link to="/du-an" className="hidden items-center gap-2 border-b-2 border-secondary pb-1 font-bold text-secondary transition-colors hover:border-primary hover:text-primary md:inline-flex">
              Xem tất cả dự án <ArrowRight size={20} />
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {featuredProjects.map((project) => (
              <motion.div key={project.title} {...fadeInUp} className="group overflow-hidden rounded-sm bg-white shadow-lg relative">
                <Link to="/du-an" className="absolute inset-0 z-10">
                  <span className="sr-only">Xem chi tiết {project.title}</span>
                </Link>
                <div className="relative h-64 overflow-hidden bg-gray-200">
                  <SmoothImage src={project.image} fallbackSrc={fallbackProjectImage} alt={project.title} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
                    <div className="absolute right-4 top-4 rounded-sm bg-primary px-3 py-1 text-xs font-bold text-white z-20">Đã hoàn thành</div>
                </div>
                <div className="p-6 relative z-0">
                  <div className="mb-2 text-sm font-medium text-gray-500">{project.meta}</div>
                  <h3 className="mb-4 text-xl font-bold text-secondary transition-colors group-hover:text-primary">{project.title}</h3>
                  <div className="mb-4 flex items-center justify-between text-sm text-gray-600">
                    <span className="flex items-center gap-1"><Maximize size={16} /> {project.area}</span>
                    <span className="flex items-center gap-1"><Clock size={16} /> {project.time}</span>
                  </div>
                  <span className="inline-flex items-center gap-1 font-medium text-primary transition-colors group-hover:text-secondary">
                    Xem chi tiết <ChevronRight size={16} />
                  </span>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-8 text-center md:hidden">
            <Link to="/du-an" className="inline-flex items-center gap-2 border-b-2 border-secondary pb-1 font-bold text-secondary transition-colors hover:border-primary hover:text-primary">
              Xem tất cả dự án <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-secondary py-24">
        <div className="absolute inset-0 z-0 opacity-20">
          <SmoothImage src={ctaImage} fallbackSrc={heroFallbackImage} alt="Nền liên hệ" className="h-full w-full object-cover" />
        </div>
        <div className="container relative z-10 mx-auto px-4 text-center md:px-8">
          <motion.div {...fadeInUp} className="mx-auto max-w-3xl">
            <h2 className="mb-6 text-3xl font-bold text-white sm:text-4xl md:text-5xl">Bạn đang có ý định xây nhà?</h2>
            <p className="mb-10 text-xl text-gray-300">
              Hãy để đội ngũ kiến trúc sư và kỹ sư của DAD Construction tư vấn miễn phí phương án thiết kế, chi phí xây dựng và lộ trình thi công phù hợp nhất với ngân sách của bạn.
            </p>
            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <Link to="/lien-he" className="inline-flex items-center justify-center gap-2 rounded-sm bg-primary px-8 py-4 text-lg font-semibold text-white transition-colors hover:bg-yellow-600">
                Đăng ký tư vấn ngay
              </Link>
              <a href="tel:0778236311" className="inline-flex items-center justify-center gap-2 rounded-sm border border-white/30 bg-white/10 px-8 py-4 text-lg font-semibold text-white backdrop-blur-sm transition-colors hover:bg-white/20">
                <Phone size={20} /> Gọi Hotline: 077 823 6311
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;
