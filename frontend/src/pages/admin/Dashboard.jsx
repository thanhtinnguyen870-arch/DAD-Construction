import React, { useEffect, useMemo, useState } from 'react';
import { FolderKanban, Home, MessageSquare, TrendingUp } from 'lucide-react';
import api from '../../services/api';

const Dashboard = () => {
  const [data, setData] = useState({ projects: [], models: [], consultations: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const [projects, models, consultations] = await Promise.all([
          api.get('/projects'),
          api.get('/house-models'),
          api.get('/consultations'),
        ]);
        setData({
          projects: projects.data || [],
          models: models.data || [],
          consultations: consultations.data || [],
        });
      } catch (_error) {
        setData({ projects: [], models: [], consultations: [] });
      } finally {
        setLoading(false);
      }
    };
    fetchDashboard();
  }, []);

  const stats = useMemo(() => [
    { title: 'Tổng dự án', value: data.projects.length, icon: <FolderKanban size={24} />, color: 'bg-blue-500' },
    { title: 'Mẫu nhà', value: data.models.length, icon: <Home size={24} />, color: 'bg-green-500' },
    { title: 'Yêu cầu mới', value: data.consultations.filter((item) => item.status === 'Mới').length, icon: <MessageSquare size={24} />, color: 'bg-yellow-500' },
  ], [data]);

  const recentConsultations = data.consultations.slice(0, 5);

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold text-gray-900">Tổng quan hệ thống</h1>

      <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.title} className="flex items-center justify-between rounded-sm border border-gray-100 bg-white p-6 shadow-sm">
            <div>
              <p className="mb-1 text-sm font-medium text-gray-500">{stat.title}</p>
              <h3 className="text-3xl font-bold text-gray-900">{loading ? '...' : stat.value}</h3>
            </div>
            <div className={`flex h-12 w-12 items-center justify-center rounded-full ${stat.color} text-white shadow-lg`}>{stat.icon}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        <div className="overflow-hidden rounded-sm border border-gray-100 bg-white shadow-sm">
          <div className="border-b border-gray-100 p-6">
            <h3 className="font-bold text-gray-900">Yêu cầu tư vấn mới nhất</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[560px] text-left text-sm">
              <thead className="bg-gray-50 text-xs uppercase tracking-wide text-gray-500">
                <tr>
                  <th className="p-4 font-medium">Khách hàng</th>
                  <th className="p-4 font-medium">SĐT</th>
                  <th className="p-4 font-medium">Nhu cầu</th>
                  <th className="p-4 font-medium">Trạng thái</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {recentConsultations.map((item) => (
                  <tr key={item._id} className="hover:bg-gray-50">
                    <td className="p-4 font-medium text-gray-900">{item.fullName}</td>
                    <td className="p-4 text-gray-600">{item.phone}</td>
                    <td className="p-4 text-gray-600">{item.constructionType || 'Tư vấn xây dựng'}</td>
                    <td className="p-4"><span className="rounded-full bg-yellow-100 px-2 py-1 text-xs font-medium text-yellow-800">{item.status}</span></td>
                  </tr>
                ))}
                {!recentConsultations.length && <tr><td colSpan="4" className="p-8 text-center text-gray-500">Chưa có yêu cầu tư vấn.</td></tr>}
              </tbody>
            </table>
          </div>
        </div>

        <div className="rounded-sm border border-gray-100 bg-white p-6 shadow-sm">
          <h3 className="mb-6 font-bold text-gray-900">Hoạt động gần đây</h3>
          <div className="space-y-5">
            {[
              `${data.projects.length} dự án đang được quản lý`,
              `${data.models.length} mẫu nhà sẵn sàng hiển thị`,
              `${data.consultations.length} yêu cầu tư vấn từ website`,
            ].map((text) => (
              <div key={text} className="flex gap-4">
                <div className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-500"><TrendingUp size={16} /></div>
                <p className="text-sm font-medium text-gray-800">{loading ? 'Đang tải dữ liệu...' : text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
