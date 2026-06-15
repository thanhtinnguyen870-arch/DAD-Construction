import React from 'react';
import { motion } from 'framer-motion';
import { PenTool, Home as HomeIcon, HardHat, Wrench, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SmoothImage } from '../components/ui/LoadingStates';

const fallbackImage = 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=85';

const Services = () => {
  const services = [
    {
      id: 'thiet-ke-kien-truc',
      title: 'Thiết kế kiến trúc',
      icon: <PenTool size={48} />,
      desc: 'Cung cấp giải pháp thiết kế kiến trúc tối ưu công năng, ánh sáng, thông gió và thẩm mỹ, phù hợp với diện tích đất, nhu cầu sử dụng và ngân sách của gia chủ.',
      features: ['Lên ý tưởng thiết kế', 'Bản vẽ phối cảnh 3D', 'Bản vẽ kỹ thuật thi công', 'Hồ sơ xin phép xây dựng']
    },
    {
      id: 'thiet-ke-noi-that',
      title: 'Thiết kế nội thất',
      icon: <HomeIcon size={48} />,
      desc: 'Thiết kế nội thất hiện đại, tiện nghi, đồng bộ với kiến trúc tổng thể, giúp không gian sống đẹp hơn, tiện dụng hơn và thể hiện cá tính riêng của chủ nhà.',
      features: ['Bố trí mặt bằng nội thất', 'Thiết kế 3D các phòng', 'Bản vẽ chi tiết đóng đồ', 'Dự toán chi phí nội thất']
    },
    {
      id: 'thi-cong-tron-goi',
      title: 'Thi công trọn gói',
      icon: <HardHat size={48} />,
      desc: 'Đảm nhận toàn bộ quy trình thi công từ phần móng, phần thô, hoàn thiện đến bàn giao, giúp khách hàng tiết kiệm thời gian, kiểm soát chi phí và đảm bảo chất lượng công trình.',
      features: ['Thi công phần thô', 'Thi công hoàn thiện', 'Lắp đặt điện nước', 'Giám sát kỹ thuật 24/7']
    },
    {
      id: 'cai-tao-sua-chua',
      title: 'Cải tạo sửa chữa nhà',
      icon: <Wrench size={48} />,
      desc: 'Khảo sát hiện trạng, tư vấn phương án cải tạo, nâng cấp công năng và thẩm mỹ cho nhà cũ, nhà xuống cấp hoặc không còn phù hợp nhu cầu sử dụng.',
      features: ['Khảo sát & đánh giá', 'Lên phương án cải tạo', 'Xử lý chống thấm, nứt', 'Sơn sửa & nâng cấp']
    }
  ];

  return (
    <div className="pt-36 pb-16 bg-light min-h-screen">
      {/* Banner */}
      <div className="relative h-[300px] flex items-center justify-center mb-16">
        <div className="absolute inset-0">
          <SmoothImage src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80" fallbackSrc={fallbackImage} alt="Dịch vụ" className="w-full h-full object-cover" eager />
          <div className="absolute inset-0 bg-secondary/80"></div>
        </div>
        <div className="relative z-10 text-center text-white">
          <h1 className="text-3xl font-bold mb-4 sm:text-4xl md:text-5xl">Dịch Vụ Của Chúng Tôi</h1>
          <p className="text-lg text-gray-300">Giải pháp toàn diện cho tổ ấm của bạn</p>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-8">
        <div className="space-y-24 max-w-6xl mx-auto">
          {services.map((service, index) => (
            <motion.div 
              key={service.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className={`flex flex-col gap-12 ${index % 2 !== 0 ? 'md:flex-row-reverse' : 'md:flex-row'}`}
            >
              <div className="md:w-1/2">
                <div className="bg-white p-8 md:p-12 h-full rounded-sm shadow-sm border border-gray-100 flex flex-col justify-center relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-8 text-gray-100 transform translate-x-4 -translate-y-4 group-hover:scale-110 group-hover:text-primary/10 transition-transform duration-500 z-0">
                    {service.icon}
                  </div>
                  <div className="relative z-10">
                    <div className="text-primary mb-6">{service.icon}</div>
                    <h2 className="text-3xl font-bold text-secondary mb-4">{service.title}</h2>
                    <p className="text-gray-600 mb-8 leading-relaxed text-lg">{service.desc}</p>
                    
                    <h4 className="font-bold text-secondary mb-4">Chi tiết bao gồm:</h4>
                    <ul className="space-y-3 mb-8">
                      {service.features.map((feature, i) => (
                        <li key={i} className="flex items-center gap-3 text-gray-600">
                          <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                          {feature}
                        </li>
                      ))}
                    </ul>
                    
                    <Link to="/lien-he" className="inline-flex items-center gap-2 text-primary font-bold hover:text-yellow-600 transition-colors">
                      Yêu cầu tư vấn <ArrowRight size={18} />
                    </Link>
                  </div>
                </div>
              </div>
              
              <div className="md:w-1/2">
                <div className="h-full min-h-[400px] relative rounded-sm overflow-hidden shadow-xl">
                  <SmoothImage 
                    src={`https://images.unsplash.com/photo-${index === 0 ? '1600607688969-a5bfcd64bd15' : index === 1 ? '1600210492486-7124dd15c2b0' : index === 2 ? '1541888086225-ee5a71146604' : '1581578731548-c64695cc6952'}?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80`} 
                    fallbackSrc={fallbackImage}
                    alt={service.title} 
                    className="absolute inset-0 w-full h-full object-cover" 
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Services;
