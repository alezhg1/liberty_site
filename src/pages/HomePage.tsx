import React, { useState, useMemo } from 'react';
import { PRODUCTS } from '../mock/products';
import { ProductCard } from '../components/ProductCard';
import { motion, AnimatePresence } from 'framer-motion';

export function HomePage() {
  const [selectedTag, setSelectedTag] = useState<string>('все');

  const filteredProducts = useMemo(() => {
    return selectedTag === 'все'
      ? PRODUCTS
      : PRODUCTS.filter((p) => p.category === selectedTag);
  }, [selectedTag]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="min-h-screen bg-[#30301f] text-[#e6e8e6] font-sans selection:bg-white/20 selection:text-white"
    >
      {/* Screen 1: Hero Section */}
      <section
        className="h-screen relative w-full overflow-hidden bg-cover bg-center"
        style={{ backgroundImage: 'url(/17926963403f0a.png)' }}
      >
        <div className="absolute inset-0 bg-black/20 backdrop-blur-[0.5px]" />
      </section>

      {/* Catalog Section */}
      <section id="catalog-section" className="min-h-screen relative w-full flex flex-col p-6 sm:p-12 lg:p-20 bg-[#30301f] space-y-10">
        <div className="max-w-7xl mx-auto w-full space-y-8 flex-1 flex flex-col justify-center">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
            <div>
              <h2 className="text-3xl font-black uppercase tracking-wider text-[#e6e8e6]">Каталог</h2>
            </div>

            <div className="flex flex-wrap items-center gap-1.5 p-1.5 rounded-2xl border border-white/25 bg-white/10 backdrop-blur-2xl shadow-[inset_0_1px_1px_rgba(255,255,255,0.4)]">
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
                  className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                    selectedTag === tag.id
                      ? 'bg-white/25 text-white shadow-[inset_0_1px_1px_rgba(255,255,255,0.5),0_8px_20px_rgba(0,0,0,0.3)] border border-white/35'
                      : 'text-[#e6e8e6]/80 hover:text-white hover:bg-white/15'
                  }`}
                >
                  {tag.label}
                </button>
              ))}
            </div>
          </div>

          <div className="pb-12">
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedTag}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
              >
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>
    </motion.div>
  );
}
