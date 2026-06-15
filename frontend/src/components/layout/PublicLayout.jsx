import React, { useEffect } from 'react';
import { Outlet, useLocation, useOutlet } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Header from './Header';

const pageTransition = {
  initial: { opacity: 0, y: 14 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 },
};

const PublicLayout = () => {
  const location = useLocation();
  const outlet = useOutlet();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <AnimatePresence mode="wait" initial={false}>
        <motion.main
          key={location.pathname}
          variants={pageTransition}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
          className="flex-grow will-change-transform"
        >
          <motion.div
            className="fixed left-0 right-0 top-[88px] z-40 h-0.5 bg-primary"
            initial={{ scaleX: 0, opacity: 0, transformOrigin: 'left' }}
            animate={{ scaleX: 1, opacity: [0, 1, 0] }}
            transition={{ duration: 0.55, ease: 'easeOut' }}
          />
          {outlet || <Outlet />}
        </motion.main>
      </AnimatePresence>
      <footer className="bg-secondary py-12 text-center text-white">
        <p>&copy; {new Date().getFullYear()} DAD Construction. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default PublicLayout;
