import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { HomePage } from './pages/HomePage';
import { ProductPage } from './pages/ProductPage';
import { ContactModal } from './components/ContactModal';

export default function App() {
  const [isContactOpen, setIsContactOpen] = useState(false);

  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen bg-[#30301f] text-[#e6e8e6] font-sans">
        <Navbar onOpenContact={() => setIsContactOpen(true)} />

        <main className="flex-1">
          <Routes>
            <Route path="/" element={<HomePage onOpenContact={() => setIsContactOpen(true)} />} />
            <Route path="/product/:id" element={<ProductPage />} />
          </Routes>
        </main>

        {/* Footer matching site color */}
        <footer className="bg-[#30301f] border-t border-white/10 py-12 px-6 lg:px-12">
          <div className="w-full flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
            <div className="text-lg font-black tracking-widest text-[#e6e8e6] uppercase">
              LIBERTY
            </div>

            <div className="text-xs text-[#e6e8e6]/60">
              © 2026 Liberty Site. Все права защищены.
            </div>
          </div>
        </footer>

        <ContactModal
          isOpen={isContactOpen}
          onClose={() => setIsContactOpen(false)}
        />
      </div>
    </BrowserRouter>
  );
}
