import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, Mail, ArrowRight, Eye, EyeOff, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import api from '../../services/api';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const { data } = await api.post('/auth/login', { email, password });
      localStorage.setItem('adminToken', data.token);
      navigate('/admin/dashboard');
    } catch (_error) {
      setError('Email hoặc mật khẩu không chính xác. Vui lòng thử lại.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-secondary">
      {/* Background decoration */}
      <div className="absolute inset-0 z-0">
        <div className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/3 blur-3xl" />
      </div>

      <div className="relative z-10 flex min-h-screen items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          {/* Card */}
          <div className="overflow-hidden rounded-2xl border border-white/10 bg-white shadow-2xl">
            {/* Header */}
            <div className="border-b border-gray-100 bg-gray-50 p-8 text-center">
              <img
                src="/logo.jpg"
                alt="DAD Construction"
                className="mx-auto mb-4 h-16 w-auto rounded-sm object-contain"
              />
              <h1 className="text-xl font-bold text-secondary">Hệ thống quản trị</h1>
              <p className="mt-1 text-sm text-gray-500">DAD Construction Admin Panel</p>
            </div>

            {/* Form */}
            <div className="p-8">
              {/* Error message */}
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-5 flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-4"
                >
                  <AlertCircle size={18} className="mt-0.5 shrink-0 text-red-500" />
                  <p className="text-sm font-medium text-red-700">{error}</p>
                </motion.div>
              )}

              <form onSubmit={handleLogin} className="space-y-5">
                {/* Email field */}
                <div>
                  <label htmlFor="login-email" className="mb-1.5 block text-sm font-semibold text-gray-700">
                    Email đăng nhập
                  </label>
                  <div className="relative">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-gray-400">
                      <Mail size={17} />
                    </div>
                    <input
                      id="login-email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      autoComplete="email"
                      className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3 pl-10 pr-4 text-gray-900 transition-all placeholder:text-gray-400 focus:border-primary focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20"
                      placeholder="admin@dadcons.com"
                    />
                  </div>
                </div>

                {/* Password field */}
                <div>
                  <label htmlFor="login-password" className="mb-1.5 block text-sm font-semibold text-gray-700">
                    Mật khẩu
                  </label>
                  <div className="relative">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-gray-400">
                      <Lock size={17} />
                    </div>
                    <input
                      id="login-password"
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      autoComplete="current-password"
                      className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3 pl-10 pr-12 text-gray-900 transition-all placeholder:text-gray-400 focus:border-primary focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20"
                      placeholder="••••••••"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 flex items-center px-3.5 text-gray-400 transition-colors hover:text-gray-600"
                      aria-label={showPassword ? 'Ẩn mật khẩu' : 'Hiện mật khẩu'}
                    >
                      {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
                    </button>
                  </div>
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={loading}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-3.5 font-bold text-white shadow-md shadow-primary/20 transition-all hover:bg-yellow-600 hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {loading ? (
                    <>
                      <div className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                      Đang xác thực...
                    </>
                  ) : (
                    <>
                      Đăng Nhập <ArrowRight size={18} />
                    </>
                  )}
                </button>
              </form>

              <p className="mt-6 text-center text-xs text-gray-400">
                Dành riêng cho nhân viên DAD Construction
              </p>
            </div>
          </div>

          <p className="mt-5 text-center text-xs text-gray-500">
            Quay lại{' '}
            <a href="/" className="font-semibold text-primary hover:underline">
              Trang chủ
            </a>
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;
