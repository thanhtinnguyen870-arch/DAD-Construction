import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Award, CheckCircle, ClipboardCheck, Hammer, HeartHandshake, Ruler, ShieldCheck, Sparkles, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SmoothImage } from '../components/ui/LoadingStates';

const fallbackImage = 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1400&q=85';
const heroImage = 'https://images.unsplash.com/photo-1600607688969-a5bfcd64bd15?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=85';
const teamImage = 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=85';
const detailImage = 'https://images.unsplash.com/photo-1600210492493-0946911123ea?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=85';

const About = () => {
  const fadeInUp = {
    initial: { opacity: 0, y: 32 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-80px' },
    transition: { duration: 0.55 },
  };

  const stats = [
    ['10+', 'năm kinh nghiệm'],
    ['250+', 'công trình bàn giao'],
    ['98%', 'khách hàng hài lòng'],
    ['5 năm', 'bảo hành kết cấu'],
  ];

  const values = [
    { icon: <ShieldCheck size={28} />, title: 'Chất lượng', desc: 'Vật tư đúng cam kết, thi công đúng kỹ thuật, nghiệm thu rõ từng giai đoạn.' },
    { icon: <ClipboardCheck size={28} />, title: 'Minh bạch', desc: 'Báo giá rõ hạng mục, hạn chế phát sinh và luôn có phương án thay thế phù hợp ngân sách.' },
    { icon: <Sparkles size={28} />, title: 'Thẩm mỹ', desc: 'Thiết kế hài hòa giữa công năng, ánh sáng, thông gió và dấu ấn riêng của gia chủ.' },
    { icon: <HeartHandshake size={28} />, title: 'Trách nhiệm', desc: 'Đồng hành sau bàn giao, phản hồi nhanh và bảo hành tận tâm.' },
  ];

  const process = [
    { icon: <Ruler size={24} />, title: 'Khảo sát & tư vấn', desc: 'Đo đạc hiện trạng, lắng nghe nhu cầu, ngân sách và thói quen sinh hoạt.' },
    { icon: <Sparkles size={24} />, title: 'Thiết kế giải pháp', desc: 'Đề xuất mặt bằng, phối cảnh, vật liệu và phương án tối ưu chi phí.' },
    { icon: <Hammer size={24} />, title: 'Thi công kiểm soát', desc: 'Quản lý tiến độ, chất lượng, an toàn và nghiệm thu từng phần.' },
    { icon: <Award size={24} />, title: 'Bàn giao & bảo hành', desc: 'Bàn giao hồ sơ, hướng dẫn sử dụng và chăm sóc công trình lâu dài.' },
  ];

  return (
    <div className="min-h-screen bg-white">
      <section className="relative min-h-[680px] overflow-hidden pt-24">
        <div className="absolute inset-0">
          <SmoothImage src={heroImage} fallbackSrc={fallbackImage} alt="DAD Construction" className="h-full w-full object-cover" eager />
          <div className="absolute inset-0 bg-gradient-to-r from-secondary/90 via-secondary/68 to-secondary/25" />
          <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-white to-transparent" />
        </div>

        <div className="container relative z-10 mx-auto grid min-h-[680px] grid-cols-1 items-center gap-12 px-4 py-20 md:px-8 lg:grid-cols-[1.05fr_0.95fr]">
          <motion.div initial={{ opacity: 0, y: 34 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="max-w-3xl text-white">
            <p className="mb-4 font-bold uppercase tracking-[0.28em] text-primary">Về DAD Construction</p>
            <h1 className="mb-6 text-3xl font-bold leading-[1.16] sm:text-4xl md:text-6xl">
              Kiến tạo tổ ấm bền vững từ bản vẽ đến bàn giao
            </h1>
            <p className="mb-8 max-w-2xl text-lg leading-relaxed text-white/85">
              DAD Construction đồng hành cùng gia chủ trong toàn bộ hành trình xây nhà: tư vấn, thiết kế, dự toán, thi công và bảo hành. Mỗi công trình được xem là một lời cam kết về chất lượng, thẩm mỹ và sự an tâm.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row">
              <Link to="/lien-he" className="inline-flex items-center justify-center gap-2 rounded-sm bg-primary px-7 py-4 text-lg font-semibold text-white transition-colors hover:bg-yellow-600">
                Bắt đầu tư vấn <ArrowRight size={20} />
              </Link>
              <Link to="/du-an" className="inline-flex items-center justify-center rounded-sm border border-white/30 bg-white/10 px-7 py-4 text-lg font-semibold text-white backdrop-blur-sm transition-colors hover:bg-white/20">
                Xem công trình
              </Link>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 44 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.75, delay: 0.1 }} className="hidden lg:block">
            <div className="border border-white/15 bg-white/10 p-5 shadow-2xl backdrop-blur-md">
              <div className="grid grid-cols-2 gap-4">
                {stats.map(([value, label]) => (
                  <div key={label} className="bg-white p-6">
                    <p className="text-4xl font-bold text-secondary">{value}</p>
                    <p className="mt-2 text-sm font-semibold uppercase tracking-wider text-gray-500">{label}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-20 md:px-8">
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <motion.div {...fadeInUp} className="relative">
            <div className="overflow-hidden rounded-sm shadow-2xl">
              <SmoothImage src={teamImage} fallbackSrc={fallbackImage} alt="Đội ngũ DAD" className="h-[520px] w-full object-cover" />
            </div>
            <div className="absolute -bottom-8 right-6 max-w-sm rounded-sm bg-secondary p-6 text-white shadow-xl">
              <div className="mb-3 flex items-center gap-3 text-primary">
                <Users size={28} />
                <span className="font-bold uppercase tracking-widest">Đội ngũ thực chiến</span>
              </div>
              <p className="text-white/80">Kiến trúc sư, kỹ sư và thợ thi công phối hợp trong cùng một quy trình kiểm soát chất lượng.</p>
            </div>
          </motion.div>

          <motion.div {...fadeInUp}>
            <p className="mb-3 font-bold uppercase tracking-widest text-primary">Câu chuyện thương hiệu</p>
            <h2 className="mb-6 text-3xl font-bold leading-[1.18] text-secondary md:text-5xl">
              Không chỉ xây nhà, DAD xây sự an tâm cho từng gia đình
            </h2>
            <div className="space-y-5 text-lg leading-relaxed text-gray-600">
              <p>
                Chúng tôi bắt đầu từ một niềm tin đơn giản: một ngôi nhà đẹp phải sống tốt trong từng ngày sử dụng. Vì vậy, mỗi thiết kế đều được cân nhắc từ ánh sáng, giá, công năng, thói quen sinh hoạt đến khả năng bảo trì lâu dài.
              </p>
              <p>
                Trong thi công, DAD ưu tiên sự minh bạch và kiểm soát. Gia chủ nắm rõ hạng mục, vật tư, tiến độ và chi phí trước khi triển khai, để quá trình xây nhà không còn là áp lực mà trở thành một hành trình có kế hoạch.
              </p>
            </div>
            <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
              {['Thiết kế sát nhu cầu', 'Dự toán rõ ràng', 'Thi công đúng kỹ thuật', 'Bảo hành có trách nhiệm'].map((item) => (
                <div key={item} className="flex items-center gap-3 rounded-sm border border-gray-100 bg-light p-4 font-semibold text-secondary">
                  <CheckCircle className="text-primary" size={22} />
                  {item}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <section className="bg-light py-20">
        <div className="container mx-auto px-4 md:px-8">
          <motion.div {...fadeInUp} className="mx-auto mb-12 max-w-3xl text-center">
            <p className="mb-3 font-bold uppercase tracking-widest text-primary">Giá trị cốt lõi</p>
            <h2 className="text-3xl font-bold text-secondary md:text-5xl">Những nguyên tắc DAD theo đuổi trong từng công trình</h2>
          </motion.div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {values.map((value) => (
              <motion.div key={value.title} {...fadeInUp} className="rounded-sm bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-sm bg-primary/10 text-primary">{value.icon}</div>
                <h3 className="mb-3 text-xl font-bold text-secondary">{value.title}</h3>
                <p className="leading-relaxed text-gray-600">{value.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-20 md:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_0.9fr] lg:items-center">
          <motion.div {...fadeInUp}>
            <p className="mb-3 font-bold uppercase tracking-widest text-primary">Quy trình làm việc</p>
            <h2 className="mb-8 text-3xl font-bold text-secondary md:text-5xl">Rõ ràng từ bước đầu, chắc chắn đến khi bàn giao</h2>
            <div className="space-y-5">
              {process.map((step, index) => (
                <div key={step.title} className="flex gap-5 rounded-sm border border-gray-100 bg-white p-5 shadow-sm">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-sm bg-secondary text-white">{step.icon}</div>
                  <div>
                    <p className="mb-1 text-sm font-bold uppercase tracking-widest text-primary">Bước {index + 1}</p>
                    <h3 className="mb-2 text-xl font-bold text-secondary">{step.title}</h3>
                    <p className="text-gray-600">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div {...fadeInUp} className="overflow-hidden rounded-sm shadow-2xl">
            <SmoothImage src={detailImage} fallbackSrc={fallbackImage} alt="Không gian sống hoàn thiện" className="h-[620px] w-full object-cover" />
          </motion.div>
        </div>
      </section>

      <section className="bg-secondary py-20 text-white">
        <div className="container mx-auto flex flex-col items-start justify-between gap-8 px-4 md:px-8 lg:flex-row lg:items-center">
          <div className="max-w-3xl">
            <p className="mb-3 font-bold uppercase tracking-widest text-primary">Sẵn sàng xây nhà?</p>
            <h2 className="mb-4 text-3xl font-bold md:text-5xl">Để DAD tư vấn phương án phù hợp với ngân sách của bạn</h2>
            <p className="text-lg text-white/75">Chúng tôi sẽ giúp bạn làm rõ nhu cầu, quy mô, chi phí và lộ trình thi công trước khi bắt đầu.</p>
          </div>
          <Link to="/bao-gia" className="inline-flex shrink-0 items-center gap-2 rounded-sm bg-primary px-8 py-4 text-lg font-bold text-white transition-colors hover:bg-yellow-600">
            Tính báo giá ngay <ArrowRight size={20} />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default About;
