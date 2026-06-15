import React from 'react';
import { Link, Navigate, Outlet, useLocation } from 'react-router-dom';
import { FolderKanban, Home as HomeIcon, LayoutDashboard, LogOut, MessageSquare, Settings } from 'lucide-react';

const AdminLayout = () => {
  const isAuthenticated = Boolean(localStorage.getItem('adminToken'));
  const location = useLocation();

  if (!isAuthenticated) return <Navigate to="/admin/login" replace />;

  const menuItems = [
    { name: 'Dashboard', path: '/admin/dashboard', icon: <LayoutDashboard size={20} /> },
    { name: 'Dự án', path: '/admin/projects', icon: <FolderKanban size={20} /> },
    { name: 'Mẫu nhà', path: '/admin/house-models', icon: <HomeIcon size={20} /> },
    { name: 'Yêu cầu tư vấn', path: '/admin/consultations', icon: <MessageSquare size={20} /> },
    { name: 'Thông tin công ty', path: '/admin/company', icon: <Settings size={20} /> },
  ];

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    window.location.href = '/admin/login';
  };

  return (
    <div className="flex h-screen bg-gray-100 font-sans">
      <aside className="flex w-64 flex-col bg-secondary text-white shadow-2xl">
        <div className="border-b border-gray-800 p-6">
          <img src="/logo.jpg" alt="DAD Construction" className="h-10 w-auto object-contain" />
        </div>
        <nav className="flex flex-1 flex-col gap-2 overflow-y-auto px-4 py-6">
          {menuItems.map((item) => {
            const isActive = location.pathname.startsWith(item.path);
            return (
              <Link key={item.path} to={item.path} className={`flex items-center gap-3 rounded-sm px-4 py-3 transition-colors ${isActive ? 'bg-primary text-white' : 'text-gray-300 hover:bg-gray-800 hover:text-white'}`}>
                {item.icon}
                <span className="font-medium">{item.name}</span>
              </Link>
            );
          })}
        </nav>
        <div className="border-t border-gray-800 p-4">
          <button onClick={handleLogout} className="flex w-full items-center gap-3 rounded-sm px-4 py-3 text-left text-gray-300 transition-colors hover:bg-red-500/10 hover:text-red-400">
            <LogOut size={20} /> Đăng xuất
          </button>
        </div>
      </aside>

      <div className="flex flex-1 flex-col overflow-hidden">
        <header className="flex h-16 items-center justify-between border-b border-gray-200 bg-white px-8">
          <h2 className="text-xl font-bold text-gray-900">{menuItems.find((item) => location.pathname.startsWith(item.path))?.name || 'Admin'}</h2>
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary font-bold text-white">A</div>
            <span className="text-sm font-medium text-gray-700">Admin DAD</span>
          </div>
        </header>
        <main className="flex-1 overflow-y-auto overflow-x-hidden bg-gray-50 p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
