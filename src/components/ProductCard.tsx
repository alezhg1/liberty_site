import React, { useState } from 'react';
import { Product } from '../mock/products';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShoppingCart, ChevronLeft, ChevronRight } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const navigate = useNavigate();
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const handlePrevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveImageIndex((prev) => (prev === 0 ? product.images.length - 1 : prev - 1));
  };

  const handleNextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveImageIndex((prev) => (prev === product.images.length - 1 ? 0 : prev + 1));
  };

  return (
    <motion.div
      onClick={() => navigate(`/product/${product.id}`)}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className="group rounded-3xl overflow-hidden cursor-pointer flex flex-col justify-between border border-white/20 bg-black/40 backdrop-blur-md shadow-2xl"
    >
      {/* Image Area with clean contrasting background (like reference image) */}
      <div className="relative aspect-square w-full bg-slate-100 overflow-hidden flex items-center justify-center">
        <img
          src={product.images[activeImageIndex]}
          alt={product.title}
          className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
          onError={(e) => {
            (e.target as HTMLImageElement).src = '/assets/trooper/12.gltf';
          }}
        />

        {/* Top-left Badge (like "РЕФЛЕКТИВ" in reference image) */}
        <div className="absolute top-4 left-4 bg-black text-white text-[10px] font-extrabold uppercase tracking-wider px-3 py-1.5 rounded-lg border border-white/20 shadow-md">
          {product.discount}
        </div>

        {/* Carousel Arrows on Hover */}
        {product.images.length > 1 && (
          <div className="absolute inset-x-2 top-1/2 -translate-y-1/2 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              onClick={handlePrevImage}
              className="p-1.5 rounded-full bg-black/70 text-white hover:bg-black border border-white/20"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={handleNextImage}
              className="p-1.5 rounded-full bg-black/70 text-white hover:bg-black border border-white/20"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      {/* Bottom Info Section with Dark Background */}
      <div className="relative bg-[#181915] p-6 flex flex-col justify-between space-y-4">
        {/* Floating Round Cart Button overlapping boundary */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            navigate(`/product/${product.id}`);
          }}
          className="absolute -top-6 right-6 w-12 h-12 rounded-full bg-white text-black hover:bg-slate-200 shadow-xl flex items-center justify-center transition border border-black/10 cursor-pointer group-hover:scale-110"
        >
          <ShoppingCart className="w-5 h-5 text-black" />
        </button>

        <div>
          <h3 className="text-sm font-black uppercase tracking-wide text-white line-clamp-1 pr-10">
            {product.title}
          </h3>
        </div>

        <div className="flex items-baseline space-x-3">
          <span className="text-lg font-black text-white">{product.price.toLocaleString()} ₽</span>
          <span className="text-xs text-white/50 line-through">{product.oldPrice.toLocaleString()} ₽</span>
        </div>
      </div>
    </motion.div>
  );
}
