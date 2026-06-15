import { useEffect, useState } from 'react';
import { Save } from 'lucide-react';
import api from '../../services/api';

const defaultInfo = {
  companyName: 'DAD Construction',
  slogan: 'Kiến tạo tổ ấm - Nâng tầm không gian sống',
  phone: '0778236311',
  email: 'dadcons.arc@gmail.com',
  address: '',
  facebook: '',
  zalo: '',
  googleMap: '',
  aboutShort: '',
  aboutFull: '',
  logo: '',
};

const CompanyManage = () => {
  const [formData, setFormData] = useState(defaultInfo);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchInfo = async () => {
      try {
        const { data } = await api.get('/company-info');
        setFormData({ ...defaultInfo, ...data });
      } catch (_error) {
        setFormData(defaultInfo);
      } finally {
        setLoading(false);
      }
    };
    fetchInfo();
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSaving(true);
    setMessage('');
    try {
      const { data } = await api.put('/company-info', formData);
      setFormData({ ...defaultInfo, ...data });
      setMessage('Đã lưu thông tin công ty.');
    } catch (_error) {
      setMessage('Không lưu được thông tin công ty.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="p-8 text-center text-gray-500">Đang tải dữ liệu...</div>;

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Thông tin công ty</h1>
        <p className="text-sm text-gray-500">Cập nhật dữ liệu liên hệ, giới thiệu và liên kết hiển thị trên website.</p>
      </div>

      {message && <div className="mb-4 rounded-sm border border-primary/30 bg-primary/10 p-3 text-sm font-medium text-secondary">{message}</div>}

      <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-5 rounded-sm border border-gray-100 bg-white p-6 shadow-sm md:grid-cols-2">
        {[
          ['companyName', 'Tên công ty'],
          ['slogan', 'Slogan'],
          ['phone', 'Hotline'],
          ['email', 'Email'],
          ['address', 'Địa chỉ'],
          ['logo', 'Logo URL'],
          ['facebook', 'Facebook'],
          ['zalo', 'Zalo'],
          ['googleMap', 'Google Map URL'],
        ].map(([name, label]) => (
          <label key={name}>
            <span className="mb-1 block text-sm font-medium text-gray-700">{label}</span>
            <input name={name} value={formData[name] || ''} onChange={handleChange} className="w-full rounded-sm border border-gray-300 p-3 outline-none focus:ring-1 focus:ring-primary" />
          </label>
        ))}

        <label className="md:col-span-2">
          <span className="mb-1 block text-sm font-medium text-gray-700">Giới thiệu ngắn</span>
          <textarea name="aboutShort" value={formData.aboutShort || ''} onChange={handleChange} rows={4} className="w-full rounded-sm border border-gray-300 p-3 outline-none focus:ring-1 focus:ring-primary" />
        </label>

        <label className="md:col-span-2">
          <span className="mb-1 block text-sm font-medium text-gray-700">Giới thiệu đầy đủ</span>
          <textarea name="aboutFull" value={formData.aboutFull || ''} onChange={handleChange} rows={8} className="w-full rounded-sm border border-gray-300 p-3 outline-none focus:ring-1 focus:ring-primary" />
        </label>

        <div className="flex justify-end border-t border-gray-100 pt-5 md:col-span-2">
          <button type="submit" disabled={saving} className="inline-flex items-center gap-2 rounded-sm bg-primary px-5 py-2 font-semibold text-white hover:bg-yellow-600 disabled:opacity-70">
            <Save size={18} /> {saving ? 'Đang lưu...' : 'Lưu thông tin'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CompanyManage;
