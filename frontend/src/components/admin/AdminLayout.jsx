import React, { useState } from 'react';
import { Link, Navigate, Outlet, useLocation } from 'react-router-dom';
import {
  FolderKanban,
  Home as HomeIcon,
  LayoutDashboard,
  LogOut,
  MessageSquare,
  Settings,
  Menu,
  X,
  ChevronRight,
} from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

const menuItems = [
  { name: 'Dashboard', path: '/admin/dashboard', icon: <LayoutDashboard size={20} /> },
  { name: 'Dự án', path: '/admin/projects', icon: <FolderKanban size={20} /> },
  { name: 'Mẫu nhà', path: '/admin/house-models', icon: <HomeIcon size={20} /> },
  { name: 'Yêu cầu tư vấn', path: '/admin/consultations', icon: <MessageSquare size={20} /> },
  { name: 'Thông tin công ty', path: '/admin/company', icon: <Settings size={20} /> },
];

const SidebarContent = ({ location, onLinkClick, onLogout }) => (
  <>
    {/* Logo */}
    <div className="border-b border-gray-800 p-5">
      <img src="/logo.jpg" alt="DAD Construction" className="h-10 w-auto rounded-sm object-contain brightness-0 invert" />
      <p className="mt-2 text-xs font-medium tracking-widest text-gray-500 uppercase">Admin Panel</p>
    </div>

    {/* Nav */}
    <nav className="flex flex-1 flex-col gap-1 overflow-y-auto px-3 py-5">
      {menuItems.map((item) => {
        const isActive = location.pathname.startsWith(item.path);
        return (
          <Link
            key={item.path}
            to={item.path}
            onClick={onLinkClick}
            className={`flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-all ${
              isActive
                ? 'bg-primary text-white shadow-md shadow-primary/25'
                : 'text-gray-400 hover:bg-gray-800 hover:text-white'
            }`}
          >
            {item.icon}
            <span>{item.name}</span>
            {isActive && <ChevronRight size={16} className="ml-auto opacity-70" />}
          </Link>
        );
      })}
    </nav>

    {/* Bottom actions */}
    <div className="border-t border-gray-800 p-3 space-y-1">
      <a
        href="/"
        target="_blank"
        rel="noopener noreferrer"
        className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-gray-400 transition-colors hover:bg-gray-800 hover:text-white"
      >
        <HomeIcon size={18} />
        Xem trang web
      </a>
      <button
        onClick={onLogout}
        className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-gray-400 transition-colors hover:bg-red-500/15 hover:text-red-400"
      >
        <LogOut size={18} />
        Đăng xuất
      </button>
    </div>
  </>
);

const AdminLayout = () => {
  const isAuthenticated = Boolean(localStorage.getItem('adminToken'));
  const location = useLocation();
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  if (!isAuthenticated) return <Navigate to="/admin/login" replace />;

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    window.location.href = '/admin/login';
  };

  const currentPageName = menuItems.find((item) => location.pathname.startsWith(item.path))?.name || 'Admin';

  return (
    <div className="flex h-screen bg-gray-100 font-sans">
      {/* Desktop Sidebar */}
      <aside className="hidden w-64 flex-col bg-[#111827] text-white shadow-2xl lg:flex">
        <SidebarContent location={location} onLogout={handleLogout} />
      </aside>

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {mobileSidebarOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
              onClick={() => setMobileSidebarOpen(false)}
            />
            {/* Drawer */}
            <motion.aside
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="fixed inset-y-0 left-0 z-50 flex w-72 flex-col bg-[#111827] text-white shadow-2xl lg:hidden"
            >
              <button
                onClick={() => setMobileSidebarOpen(false)}
                className="absolute right-4 top-4 rounded-lg p-2 text-gray-400 hover:bg-gray-800 hover:text-white"
                aria-label="Đóng menu"
              >
                <X size={20} />
              </button>
              <SidebarContent
                location={location}
                onLinkClick={() => setMobileSidebarOpen(false)}
                onLogout={handleLogout}
              />
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Main content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Top header */}
        <header className="flex h-16 items-center justify-between border-b border-gray-200 bg-white px-4 shadow-sm md:px-6">
          <div className="flex items-center gap-3">
            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileSidebarOpen(true)}
              className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-900 lg:hidden"
              aria-label="Mở menu"
            >
              <Menu size={22} />
            </button>
            <div>
              <h2 className="text-lg font-bold text-gray-900">{currentPageName}</h2>
              <p className="hidden text-xs text-gray-400 sm:block">DAD Construction — Quản trị hệ thống</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary font-bold text-sm text-white shadow-sm">
              A
            </div>
            <div className="hidden sm:block">
              <p className="text-sm font-semibold text-gray-800">Admin DAD</p>
              <p className="text-xs text-gray-400">Quản trị viên</p>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto overflow-x-hidden bg-gray-50 p-4 md:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
