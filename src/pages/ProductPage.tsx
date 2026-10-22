import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { PRODUCTS } from '../mock/products';
import { ContactModal } from '../components/ContactModal';
import { ArrowLeft, MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';

export function ProductPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [isContactOpen, setIsContactOpen] = useState(false);

  const product = PRODUCTS.find((p) => p.id === id) || PRODUCTS[0];
  const [selectedImage, setSelectedImage] = useState(product.images[0]);
  const [selectedFabricType, setSelectedFabricType] = useState<'insulated' | 'lightweight'>('insulated');

  const handleTelegramOrder = () => {
    window.open('https://t.me/ray0976', '_blank');
  };

  const currentFabric = selectedFabricType === 'insulated' ? product.fabricComposition.insulated : product.fabricComposition.lightweight;

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="min-h-screen bg-[#30301f] text-[#e6e8e6] py-20 px-6 lg:px-12"
    >
      <div className="max-w-6xl mx-auto space-y-8 pt-6">
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center space-x-2 text-xs font-semibold text-[#e6e8e6]/90 hover:text-white transition bg-white/10 hover:bg-white/25 backdrop-blur-md border border-white/20 shadow-[inset_0_1px_1px_rgba(255,255,255,0.4)] px-4 py-2.5 rounded-xl cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Назад</span>
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 border border-white/25 bg-white/5 backdrop-blur-2xl shadow-[inset_0_1px_1px_rgba(255,255,255,0.3),0_20px_50px_rgba(0,0,0,0.5)] rounded-3xl p-6 lg:p-10">
          <div className="lg:col-span-7 flex flex-col sm:flex-row gap-4">
            {/* Vertical thumbnails without horizontal scrollbar */}
            <div className="flex sm:flex-col gap-3 overflow-y-auto max-h-[480px] shrink-0 pr-1">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(img)}
                  className={`w-16 h-16 rounded-xl overflow-hidden border transition-all shrink-0 bg-black/60 cursor-pointer ${
                    selectedImage === img ? 'border-white scale-105 shadow-md' : 'border-white/15 opacity-60 hover:opacity-100'
                  }`}
                >
                  <img
                    src={img}
                    alt={`Thumb ${idx}`}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = '/assets/trooper/12.gltf';
                    }}
                  />
                </button>
              ))}
            </div>

            <div className="flex-1 relative aspect-square bg-black/60 rounded-2xl overflow-hidden border border-white/20">
              <img
                src={selectedImage}
                alt={product.title}
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/assets/trooper/12.gltf';
                }}
              />
              <div className="absolute top-4 left-4 bg-black text-white font-extrabold text-[10px] uppercase tracking-wider px-3 py-1.5 rounded-lg border border-white/20 shadow-lg">
                {product.discount}
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <h1 className="text-2xl sm:text-4xl font-black uppercase tracking-tight text-white">
                {product.title}
              </h1>

              <div className="flex items-baseline space-x-4 pt-2">
                <span className="text-3xl font-black text-white">{product.price.toLocaleString()} ₽</span>
                <span className="text-sm text-[#e6e8e6]/50 line-through">{product.oldPrice.toLocaleString()} ₽</span>
                <span className="px-2.5 py-1 bg-white/10 backdrop-blur-md text-white font-bold text-xs rounded-lg border border-white/20">
                  {product.discount}
                </span>
              </div>

              {/* Combined Description including all characteristics */}
              <div className="space-y-4 pt-2 text-sm text-[#e6e8e6]/90 leading-relaxed bg-black/30 p-5 rounded-2xl border border-white/10">
                <p>{product.description}</p>

                {/* Fabric type switcher */}
                <div className="pt-2 border-t border-white/10">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-white">Состав ткани:</span>
                    <div className="flex items-center space-x-1 bg-black/40 p-1 rounded-lg border border-white/10">
                      <button
                        onClick={() => setSelectedFabricType('insulated')}
                        className={`px-3 py-1 rounded text-xs font-semibold transition cursor-pointer ${
                          selectedFabricType === 'insulated' ? 'bg-white/25 text-white border border-white/30' : 'text-[#e6e8e6]/70 hover:text-white'
                        }`}
                      >
                        Утепленный
                      </button>
                      <button
                        onClick={() => setSelectedFabricType('lightweight')}
                        className={`px-3 py-1 rounded text-xs font-semibold transition cursor-pointer ${
                          selectedFabricType === 'lightweight' ? 'bg-white/25 text-white border border-white/30' : 'text-[#e6e8e6]/70 hover:text-white'
                        }`}
                      >
                        Без утеплителя
                      </button>
                    </div>
                  </div>
                  <p className="text-xs text-[#e6e8e6]/80">{currentFabric}</p>
                </div>

                <div className="pt-2 border-t border-white/10 space-y-1.5 text-xs text-[#e6e8e6]/80">
                  <p><strong className="text-white">Размерный ряд:</strong> {product.sizeRange}</p>
                  <p><strong className="text-white">Комплектация:</strong> {product.packageContents}</p>
                  <p><strong className="text-white">Доставка:</strong> {product.deliveryInfo}</p>
                </div>
              </div>
            </div>

            <div className="space-y-4 pt-4 border-t border-white/10">
              <button
                onClick={handleTelegramOrder}
                className="w-full py-4 bg-white/15 hover:bg-white/25 text-white font-bold text-sm rounded-xl backdrop-blur-md border border-white/30 shadow-[inset_0_1px_1px_rgba(255,255,255,0.5),0_8px_32px_0_rgba(0,0,0,0.37)] transition-all duration-300 flex items-center justify-center space-x-2 cursor-pointer"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Заказать</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <ContactModal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
        productTitle={product.title}
      />
    </motion.div>
  );
}
