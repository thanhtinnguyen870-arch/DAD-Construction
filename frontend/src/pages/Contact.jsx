import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send } from 'lucide-react';
import api from '../services/api';

const Contact = () => {
  const [formData, setFormData] = useState({
    fullName: '', phone: '', email: '', constructionType: 'Nhà phố', message: ''
  });
  const [status, setStatus] = useState({ type: '', msg: '' });

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ type: 'loading', msg: 'Đang gửi...' });
    try {
      await api.post('/consultations', formData);
      setStatus({ type: 'success', msg: 'Cảm ơn bạn! Đội ngũ tư vấn sẽ liên hệ sớm nhất.' });
      setFormData({ fullName: '', phone: '', email: '', constructionType: 'Nhà phố', message: '' });
    } catch (_error) {
      setStatus({ type: 'error', msg: 'Có lỗi xảy ra, vui lòng thử lại sau.' });
    }
  };

  return (
    <div className="pt-24 pb-16 bg-light min-h-screen">
      <div className="container mx-auto px-4 md:px-8">
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <h1 className="mx-auto mb-6 max-w-xs text-2xl font-bold text-secondary sm:max-w-none sm:text-4xl md:text-5xl">Liên Hệ Với Chúng Tôi</h1>
          <p className="mx-auto max-w-xs text-base text-gray-600 sm:max-w-sm sm:text-lg">Để lại thông tin, đội ngũ kiến trúc sư của DAD Construction sẽ tư vấn phương án tối ưu nhất cho bạn.</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-12 max-w-6xl mx-auto">
          {/* Contact Info */}
          <div className="lg:w-1/3 space-y-8">
            <div className="bg-white p-8 rounded-sm shadow-sm">
              <h3 className="text-2xl font-bold text-secondary mb-6">Thông Tin Liên Hệ</h3>
              <ul className="space-y-6">
                <li className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-light flex items-center justify-center text-primary shrink-0">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <p className="font-bold text-secondary mb-1">Địa chỉ văn phòng</p>
                    <p className="text-gray-600">Đà Nẵng, Việt Nam</p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-light flex items-center justify-center text-primary shrink-0">
                    <Phone size={24} />
                  </div>
                  <div>
                    <p className="font-bold text-secondary mb-1">Hotline tư vấn 24/7</p>
                    <p className="text-gray-600">077 823 6311</p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-light flex items-center justify-center text-primary shrink-0">
                    <Mail size={24} />
                  </div>
                  <div>
                    <p className="font-bold text-secondary mb-1">Email</p>
                    <p className="text-gray-600">dadcons.arc@gmail.com</p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-light flex items-center justify-center text-primary shrink-0">
                    <Clock size={24} />
                  </div>
                  <div>
                    <p className="font-bold text-secondary mb-1">Giờ làm việc</p>
                    <p className="text-gray-600">Thứ 2 - Thứ 7: 8:00 - 17:30</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:w-2/3">
            <form onSubmit={handleSubmit} className="bg-white p-8 md:p-12 rounded-sm shadow-sm border border-gray-100">
              <h3 className="text-2xl font-bold text-secondary mb-8">Gửi Yêu Cầu Tư Vấn</h3>
              
              {status.msg && (
                <div className={`p-4 mb-6 rounded-sm font-medium ${status.type === 'success' ? 'bg-green-50 text-green-700 border border-green-200' : status.type === 'error' ? 'bg-red-50 text-red-700 border border-red-200' : 'bg-blue-50 text-blue-700 border border-blue-200'}`}>
                  {status.msg}
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Họ và tên *</label>
                  <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} required className="w-full px-4 py-3 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all" placeholder="Ngập tên của bạn" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Số điện thoại *</label>
                  <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required className="w-full px-4 py-3 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all" placeholder="Nhập số điện thoại" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <input type="email" name="email" value={formData.email} onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all" placeholder="Nhập email (không bắt buộc)" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Loại công trình</label>
                  <select name="constructionType" value={formData.constructionType} onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all">
                    <option value="Nhà phố">Nhà phố</option>
                    <option value="Biệt thự">Biệt thự</option>
                    <option value="Nhà cấp 4">Nhà cấp 4</option>
                    <option value="Cải tạo, sửa chữa">Cải tạo, sửa chữa</option>
                  </select>
                </div>
              </div>
              <div className="mb-8">
                <label className="block text-sm font-medium text-gray-700 mb-2">Nội dung cần tư vấn</label>
                <textarea name="message" value={formData.message} onChange={handleChange} rows="4" className="w-full px-4 py-3 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all" placeholder="Vd: Tôi có mảnh đất 5x20m, muốn xây nhà phố 3 tầng hiện đại..."></textarea>
              </div>
              
              <button type="submit" disabled={status.type === 'loading'} className="w-full md:w-auto bg-primary hover:bg-yellow-600 text-white font-bold py-4 px-10 rounded-sm flex items-center justify-center gap-2 transition-colors disabled:opacity-70">
                Gửi Yêu Cầu <Send size={20} />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
