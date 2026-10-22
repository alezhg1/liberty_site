import React, { useState } from 'react';
import { Menu, X, MessageCircle, Shield } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleNavClick = (path: string) => {
    setIsMenuOpen(false);
    navigate(path);
  };

  const handleTelegramOrder = () => {
    window.open('https://t.me/ray0976', '_blank');
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#30301f]/60 backdrop-blur-xl border-b border-white/10">
        <div className="w-full px-6 lg:px-12 h-16 flex items-center justify-between">
          {/* Left: Burger Menu Button */}
          <motion.button
            whileTap={{ scale: 0.95 }}
            whileHover={{ scale: 1.02 }}
            onClick={() => setIsMenuOpen(true)}
            className="px-4 py-2 rounded-xl text-[#e6e8e6] bg-white/10 hover:bg-white/25 backdrop-blur-md border border-white/20 shadow-[inset_0_1px_1px_rgba(255,255,255,0.4)] transition-all duration-300 cursor-pointer flex items-center space-x-2 text-xs font-semibold uppercase tracking-wider"
          >
            <Menu className="w-4 h-4" />
            <span className="hidden sm:inline">Меню</span>
          </motion.button>

          {/* Center: Logo */}
          <Link
            to="/"
            className="absolute left-1/2 -translate-x-1/2 text-xl font-black tracking-widest text-[#e6e8e6] uppercase drop-shadow-md"
          >
            LIBERTY
          </Link>

          {/* Right: Order Button -> Telegram */}
          <motion.button
            whileTap={{ scale: 0.95 }}
            whileHover={{ scale: 1.02 }}
            onClick={handleTelegramOrder}
            className="flex items-center space-x-2 px-5 py-2.5 bg-white/10 hover:bg-white/25 text-white text-xs font-bold rounded-xl backdrop-blur-md border border-white/30 shadow-[inset_0_1px_1px_rgba(255,255,255,0.4),0_8px_32px_0_rgba(0,0,0,0.37)] transition-all duration-300 cursor-pointer"
          >
            <MessageCircle className="w-3.5 h-3.5 text-[#e6e8e6]" />
            <span>Заказать</span>
          </motion.button>
        </div>
      </header>

      {/* Burger Menu Drawer with Framer Motion slide animation */}
      <AnimatePresence>
        {isMenuOpen && (
          <div className="fixed inset-0 z-50 flex">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="absolute inset-0 bg-black/75 backdrop-blur-md"
              onClick={() => setIsMenuOpen(false)}
            />
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="relative w-80 bg-[#1f2017]/95 backdrop-blur-2xl border-r border-white/15 p-6 flex flex-col justify-between shadow-2xl z-10"
            >
              <div className="space-y-6">
                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                  <span className="text-lg font-black tracking-widest text-white uppercase">LIBERTY</span>
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setIsMenuOpen(false)}
                    className="p-2 rounded-xl bg-white/10 text-white hover:bg-white/20 backdrop-blur-md border border-white/20 transition cursor-pointer"
                  >
                    <X className="w-5 h-5" />
                  </motion.button>
                </div>

                <nav className="flex flex-col space-y-2.5 text-sm font-semibold">
                  <motion.button
                    whileTap={{ scale: 0.97 }}
                    onClick={() => handleNavClick('/')}
                    className="text-left px-4 py-3 rounded-xl bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border border-white/20 shadow-[inset_0_1px_1px_rgba(255,255,255,0.3)] transition flex items-center space-x-3 cursor-pointer"
                  >
                    <Shield className="w-4 h-4 text-white/80" />
                    <span>Главная / Каталог</span>
                  </motion.button>
                  <motion.button
                    whileTap={{ scale: 0.97 }}
                    onClick={() => {
                      setIsMenuOpen(false);
                      handleTelegramOrder();
                    }}
                    className="text-left px-4 py-3 rounded-xl bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border border-white/20 shadow-[inset_0_1px_1px_rgba(255,255,255,0.3)] transition flex items-center space-x-3 cursor-pointer"
                  >
                    <MessageCircle className="w-4 h-4 text-white/80" />
                    <span>Заказать</span>
                  </motion.button>
                </nav>
              </div>

              <div className="pt-6 border-t border-white/10 text-xs text-white/50 text-center">
                Liberty Tactical Apparel © 2026
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
