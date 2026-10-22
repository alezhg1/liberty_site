import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { HomePage } from './pages/HomePage';
import { ProductPage } from './pages/ProductPage';
import { ContactModal } from './components/ContactModal';
import { Shield } from 'lucide-react';

export default function App() {
  const [isContactOpen, setIsContactOpen] = useState(false);

  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen bg-slate-950 text-slate-100 font-sans">
        <Navbar onOpenContact={() => setIsContactOpen(true)} />

        <main className="flex-1">
          <Routes>
            <Route path="/" element={<HomePage onOpenContact={() => setIsContactOpen(true)} />} />
            <Route path="/product/:id" element={<ProductPage />} />
          </Routes>
        </main>

        {/* Footer */}
        <footer className="bg-slate-900 border-t border-slate-800 py-12 px-4 sm:px-6 lg:px-8 mt-16">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
            <div className="flex items-center space-x-3">
              <div className="p-2.5 bg-indigo-600 rounded-xl text-white">
                <Shield className="w-5 h-5" />
              </div>
              <div>
                <span className="font-bold text-white tracking-wider uppercase block">LIBERTY SITE</span>
                <span className="text-xs text-slate-400">Тактическая одежда и экипировка</span>
              </div>
            </div>

            <div className="text-xs text-slate-500">
              © 2026 Liberty Site. Все права защищены. Разработано для суровых условий.
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
