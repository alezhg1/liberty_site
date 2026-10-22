import React, { useState, useMemo } from 'react';
import { PRODUCTS } from '../mock/products';
import { ProductCard } from '../components/ProductCard';
import { Hero3D } from '../components/Hero3D';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowDown } from 'lucide-react';

interface HomePageProps {
  onOpenContact: () => void;
}

export function HomePage({ onOpenContact }: HomePageProps) {
  const [selectedTag, setSelectedTag] = useState<string>('все');

  const filteredProducts = useMemo(() => {
    return selectedTag === 'все'
      ? PRODUCTS
      : PRODUCTS.filter((p) => p.category === selectedTag);
  }, [selectedTag]);

  const scrollToCatalog = () => {
    window.scrollBy({ top: window.innerHeight, behavior: 'smooth' });
  };

  return (
    <div className="h-screen overflow-y-scroll snap-y snap-mandatory bg-[#2d302e] text-[#e6e8e6] font-sans selection:bg-[#b85a4b] selection:text-white">
      {/* Screen 1: Hero Section (100vh with Fullscreen 3D Background positioned bottom-right waist-up) */}
      <section className="h-screen snap-start relative w-full flex flex-col justify-end p-6 sm:p-12 lg:p-20 overflow-hidden">
        <Hero3D />

        <div className="relative z-10 max-w-2xl space-y-6 pb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-4"
          >
            <h1 className="text-4xl sm:text-6xl font-black tracking-tight uppercase leading-none text-[#e6e8e6]">
              LIBERTY <span className="text-[#b85a4b]">TACTICAL</span>
            </h1>
            <p className="text-sm sm:text-base text-[#e6e8e6]/80 max-w-lg leading-relaxed">
              Минималистичная тактическая одежда. Премиальные материалы, бескомпромиссная прочность и полевой функционал.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex items-center space-x-4"
          >
            <button
              onClick={scrollToCatalog}
              className="flex items-center space-x-2 px-6 py-3.5 bg-[#b85a4b] hover:bg-[#a04e40] text-[#e6e8e6] text-xs sm:text-sm font-bold rounded-xl shadow-lg transition cursor-pointer"
            >
              <span>Смотреть каталог</span>
              <ArrowDown className="w-4 h-4 animate-bounce" />
            </button>
            <button
              onClick={onOpenContact}
              className="px-6 py-3.5 bg-[#3a3f3c] hover:bg-[#454c48] text-[#e6e8e6] text-xs sm:text-sm font-semibold rounded-xl border border-[#2d302e] transition cursor-pointer"
            >
              Связаться
            </button>
          </motion.div>
        </div>
      </section>

      {/* Screen 2: Catalog Section (100vh snap-start) */}
      <section className="h-screen snap-start relative w-full flex flex-col p-6 sm:p-12 lg:p-20 overflow-y-auto bg-[#2d302e]">
        <div className="max-w-7xl mx-auto w-full space-y-8 flex-1 flex flex-col justify-center">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-[#3a3f3c] pb-4">
            <div>
              <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight">Каталог</h2>
            </div>

            <div className="flex flex-wrap items-center gap-1.5 bg-[#3a3f3c] p-1 rounded-xl border border-[#2d302e]">
              {[
                { id: 'все', label: 'Все' },
                { id: 'худи', label: 'Худи' },
                { id: 'свитшоты', label: 'Свитшоты' },
                { id: 'зип-худи', label: 'Зип-худи' },
                { id: 'футболки', label: 'Футболки' }
              ].map((tag) => (
                <button
                  key={tag.id}
                  onClick={() => setSelectedTag(tag.id)}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                    selectedTag === tag.id
                      ? 'bg-[#b85a4b] text-[#e6e8e6] shadow'
                      : 'text-[#e6e8e6]/70 hover:text-white hover:bg-[#2d302e]/50'
                  }`}
                >
                  {tag.label}
                </button>
              ))}
            </div>
          </div>

          <div className="flex-1 overflow-y-auto pb-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedTag}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>
    </div>
  );
}
