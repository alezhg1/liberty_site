import React, { useState } from 'react';
import { Product } from '../mock/products';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Eye } from 'lucide-react';

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
      className="group bg-[#3a3f3c] rounded-2xl overflow-hidden cursor-pointer flex flex-col justify-between border border-[#2d302e]/60 shadow-lg"
    >
      <div className="relative aspect-square w-full bg-[#2d302e] overflow-hidden">
        <img
          src={product.images[activeImageIndex]}
          alt={product.title}
          className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500 opacity-95"
          onError={(e) => {
            (e.target as HTMLImageElement).src = '/assets/trooper/12.gltf';
          }}
        />

        <div className="absolute top-3 left-3 bg-[#b85a4b] text-[#e6e8e6] text-xs font-bold px-2.5 py-1 rounded-md">
          {product.discount}
        </div>

        {product.images.length > 1 && (
          <div className="absolute inset-x-2 top-1/2 -translate-y-1/2 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              onClick={handlePrevImage}
              className="p-1 rounded-full bg-[#2d302e]/80 text-[#e6e8e6] hover:bg-[#2d302e]"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={handleNextImage}
              className="p-1 rounded-full bg-[#2d302e]/80 text-[#e6e8e6] hover:bg-[#2d302e]"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      <div className="p-4 flex flex-col flex-1 justify-between space-y-3">
        <div>
          <h3 className="text-sm font-semibold text-[#e6e8e6] group-hover:text-white transition line-clamp-1">
            {product.title}
          </h3>
          <p className="text-xs text-[#e6e8e6]/70 mt-1 line-clamp-1">{product.description}</p>
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-[#2d302e]/40">
          <div>
            <span className="text-base font-bold text-[#e6e8e6]">{product.price.toLocaleString()} ₽</span>
            <span className="text-xs text-[#e6e8e6]/50 line-through ml-2">{product.oldPrice.toLocaleString()} ₽</span>
          </div>

          <span className="text-xs font-medium text-[#e6e8e6]/80 group-hover:text-white flex items-center space-x-1">
            <Eye className="w-3.5 h-3.5" />
            <span>Смотреть</span>
          </span>
        </div>
      </div>
    </motion.div>
  );
}
