import React, { useEffect } from 'react';
import { Outlet, useLocation, useOutlet } from 'react-router-dom';
import { motion } from 'framer-motion';
import Header from './Header';



const PublicLayout = () => {
  const location = useLocation();
  const outlet = useOutlet();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-grow">
        <motion.div
          key={location.pathname}
          className="fixed left-0 right-0 top-[88px] z-40 h-0.5 bg-primary"
          initial={{ scaleX: 0, opacity: 0, transformOrigin: 'left' }}
          animate={{ scaleX: 1, opacity: [0, 1, 0] }}
          transition={{ duration: 0.55, ease: 'easeOut' }}
        />
        {outlet || <Outlet />}
      </main>
      <footer className="bg-secondary py-12 text-center text-white">
        <p>&copy; {new Date().getFullYear()} DAD Construction. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default PublicLayout;
