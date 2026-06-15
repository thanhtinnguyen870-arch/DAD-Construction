import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import PublicLayout from './components/layout/PublicLayout';
import { PageLoader } from './components/ui/LoadingStates';

// Lazy load Public Pages
const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const Projects = lazy(() => import('./pages/Projects'));
const ProjectDetail = lazy(() => import('./pages/ProjectDetail'));
const Services = lazy(() => import('./pages/Services'));
const HouseModels = lazy(() => import('./pages/HouseModels'));
const HouseModelDetail = lazy(() => import('./pages/HouseModelDetail'));
const Pricing = lazy(() => import('./pages/Pricing'));
const Contact = lazy(() => import('./pages/Contact'));

// Lazy load Admin Pages
const AdminLayout = lazy(() => import('./components/admin/AdminLayout'));
const Login = lazy(() => import('./pages/admin/Login'));
const Dashboard = lazy(() => import('./pages/admin/Dashboard'));
const ProjectsManage = lazy(() => import('./pages/admin/ProjectsManage'));
const ConsultationsManage = lazy(() => import('./pages/admin/ConsultationsManage'));
const HouseModelsManage = lazy(() => import('./pages/admin/HouseModelsManage'));
const CompanyManage = lazy(() => import('./pages/admin/CompanyManage'));

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<PageLoader label="Đang tải dữ liệu..." />}>
        <Routes>
        {/* Public Routes */}
        <Route path="/" element={<PublicLayout />}>
          <Route index element={<Home />} />
          <Route path="gioi-thieu" element={<About />} />
          <Route path="du-an" element={<Projects />} />
          <Route path="du-an/:slug" element={<ProjectDetail />} />
          <Route path="dich-vu" element={<Services />} />
          <Route path="mau-nha" element={<HouseModels />} />
          <Route path="mau-nha/:slug" element={<HouseModelDetail />} />
          <Route path="bao-gia" element={<Pricing />} />
          <Route path="tin-tuc" element={<Navigate to="/bao-gia" replace />} />
          <Route path="lien-he" element={<Contact />} />
        </Route>
        
        {/* Admin Routes */}
        <Route path="/admin/login" element={<Login />} />
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Navigate to="/admin/dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="projects" element={<ProjectsManage />} />
          <Route path="house-models" element={<HouseModelsManage />} />
          <Route path="blogs" element={<Navigate to="/admin/dashboard" replace />} />
          <Route path="consultations" element={<ConsultationsManage />} />
          <Route path="company" element={<CompanyManage />} />
        </Route>
      </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
