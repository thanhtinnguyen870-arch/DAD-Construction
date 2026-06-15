import React, { useEffect, useMemo, useState } from 'react';
import { Eye, Search, Trash2, X } from 'lucide-react';
import api from '../../services/api';

const statusClass = {
  Mới: 'bg-yellow-100 text-yellow-800',
  'Đang tư vấn': 'bg-blue-100 text-blue-800',
  'Đã xử lý': 'bg-green-100 text-green-800',
};

const ConsultationsManage = () => {
  const [consultations, setConsultations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewData, setViewData] = useState(null);
  const [query, setQuery] = useState('');
  const [message, setMessage] = useState('');

  const fetchConsultations = async () => {
    setLoading(true);
    try {
      const { data } = await api.get('/consultations');
      setConsultations(data);
    } catch (_error) {
      setMessage('Không tải được danh sách tư vấn.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchConsultations();
  }, []);

  const filteredConsultations = useMemo(() => {
    const keyword = query.trim().toLowerCase();
    if (!keyword) return consultations;
    return consultations.filter((item) => `${item.fullName} ${item.phone} ${item.email} ${item.constructionType} ${item.message}`.toLowerCase().includes(keyword));
  }, [consultations, query]);

  const handleStatusChange = async (id, newStatus) => {
    try {
      const { data } = await api.put(`/consultations/${id}/status`, { status: newStatus });
      setConsultations((current) => current.map((item) => item._id === id ? data : item));
      setViewData((current) => current?._id === id ? data : current);
    } catch (_error) {
      setMessage('Không cập nhật được trạng thái.');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Bạn có chắc chắn muốn xóa yêu cầu này?')) return;
    try {
      await api.delete(`/consultations/${id}`);
      setConsultations((current) => current.filter((item) => item._id !== id));
      setViewData((current) => current?._id === id ? null : current);
    } catch (_error) {
      setMessage('Không xóa được yêu cầu.');
    }
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Yêu cầu tư vấn</h1>
        <p className="text-sm text-gray-500">Theo dõi, xử lý và lưu trữ thông tin khách hàng gửi từ website.</p>
      </div>

      {message && <div className="mb-4 rounded-sm border border-red-200 bg-red-50 p-3 text-sm font-medium text-red-700">{message}</div>}

      <div className="mb-8 overflow-hidden rounded-sm border border-gray-100 bg-white shadow-sm">
        <div className="border-b border-gray-100 bg-gray-50 p-4">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
            <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Tìm theo tên, SĐT, email..." className="w-full rounded-sm border border-gray-200 py-2 pl-10 pr-4 outline-none focus:ring-1 focus:ring-primary" />
          </div>
        </div>

        {loading ? (
          <div className="p-8 text-center text-gray-500">Đang tải dữ liệu...</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[860px] text-left text-sm">
              <thead className="border-b border-gray-100 text-gray-500">
                <tr>
                  <th className="p-4 font-medium">Khách hàng</th>
                  <th className="p-4 font-medium">Số điện thoại</th>
                  <th className="p-4 font-medium">Loại công trình</th>
                  <th className="p-4 font-medium">Ngày gửi</th>
                  <th className="p-4 font-medium">Trạng thái</th>
                  <th className="p-4 text-right font-medium">Thao tác</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredConsultations.map((item) => (
                  <tr key={item._id} className="hover:bg-gray-50">
                    <td className="p-4 font-medium text-gray-900">{item.fullName}</td>
                    <td className="p-4 text-gray-600">{item.phone}</td>
                    <td className="p-4 text-gray-600">{item.constructionType || 'Tư vấn xây dựng'}</td>
                    <td className="p-4 text-gray-600">{item.createdAt ? new Date(item.createdAt).toLocaleDateString('vi-VN') : ''}</td>
                    <td className="p-4">
                      <select value={item.status} onChange={(event) => handleStatusChange(item._id, event.target.value)} className={`rounded-full px-2 py-1 text-xs font-medium outline-none ${statusClass[item.status] || statusClass.Mới}`}>
                        <option value="Mới">Mới</option>
                        <option value="Đang tư vấn">Đang tư vấn</option>
                        <option value="Đã xử lý">Đã xử lý</option>
                      </select>
                    </td>
                    <td className="p-4">
                      <div className="flex justify-end gap-2">
                        <button onClick={() => setViewData(item)} className="rounded-sm p-2 text-blue-600 hover:bg-blue-50" title="Xem"><Eye size={18} /></button>
                        <button onClick={() => handleDelete(item._id)} className="rounded-sm p-2 text-red-600 hover:bg-red-50" title="Xóa"><Trash2 size={18} /></button>
                      </div>
                    </td>
                  </tr>
                ))}
                {!filteredConsultations.length && <tr><td colSpan="6" className="p-8 text-center text-gray-500">Chưa có yêu cầu tư vấn phù hợp.</td></tr>}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {viewData && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-sm bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-gray-100 bg-gray-50 p-6">
              <h2 className="text-xl font-bold text-gray-900">Chi tiết yêu cầu tư vấn</h2>
              <button onClick={() => setViewData(null)} className="text-gray-400 hover:text-gray-700"><X size={24} /></button>
            </div>
            <div className="space-y-6 p-6">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {[
                  ['Khách hàng', viewData.fullName],
                  ['Số điện thoại', viewData.phone],
                  ['Email', viewData.email || 'Không cung cấp'],
                  ['Địa chỉ', viewData.address || 'Không cung cấp'],
                  ['Loại công trình', viewData.constructionType || 'Tư vấn xây dựng'],
                  ['Ngân sách', viewData.budget || 'Chưa xác định'],
                  ['Diện tích đất', viewData.landArea || 'Chưa xác định'],
                  ['Ngày gửi', viewData.createdAt ? new Date(viewData.createdAt).toLocaleString('vi-VN') : ''],
                ].map(([label, value]) => (
                  <div key={label}>
                    <p className="mb-1 text-sm text-gray-500">{label}</p>
                    <p className="font-semibold text-gray-900">{value}</p>
                  </div>
                ))}
              </div>
              <div className="border-t border-gray-100 pt-4">
                <p className="mb-2 text-sm text-gray-500">Nội dung chi tiết</p>
                <div className="min-h-[100px] rounded-sm bg-gray-50 p-4 text-gray-700 whitespace-pre-wrap">{viewData.message || 'Không có nội dung tin nhắn.'}</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ConsultationsManage;
