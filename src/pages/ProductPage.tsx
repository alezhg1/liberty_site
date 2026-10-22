import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { PRODUCTS } from '../mock/products';
import { ContactModal } from '../components/ContactModal';
import { ArrowLeft, MessageCircle } from 'lucide-react';

export function ProductPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [isContactOpen, setIsContactOpen] = useState(false);

  const product = PRODUCTS.find((p) => p.id === id) || PRODUCTS[0];
  const [selectedImage, setSelectedImage] = useState(product.images[0]);
  const [selectedFabricType, setSelectedFabricType] = useState<'insulated' | 'lightweight'>('insulated');

  return (
    <div className="min-h-screen bg-[#2d302e] text-[#e6e8e6] py-16 px-6 lg:px-12">
      <div className="max-w-6xl mx-auto space-y-8 pt-6">
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center space-x-2 text-xs font-semibold text-[#e6e8e6]/70 hover:text-white transition bg-[#3a3f3c] px-3.5 py-2 rounded-lg border border-[#2d302e]"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Назад</span>
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 bg-[#3a3f3c] border border-[#2d302e] rounded-2xl p-6 lg:p-8 shadow-2xl">
          <div className="lg:col-span-7 flex flex-col sm:flex-row gap-4">
            <div className="flex sm:flex-col gap-2.5 overflow-x-auto sm:overflow-y-auto max-h-[460px] shrink-0">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(img)}
                  className={`w-16 h-16 rounded-xl overflow-hidden border transition-all shrink-0 bg-[#2d302e] cursor-pointer ${
                    selectedImage === img ? 'border-[#b85a4b] scale-105' : 'border-[#2d302e] opacity-60 hover:opacity-100'
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

            <div className="flex-1 relative aspect-square bg-[#2d302e] rounded-xl overflow-hidden border border-[#2d302e]">
              <img
                src={selectedImage}
                alt={product.title}
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/assets/trooper/12.gltf';
                }}
              />
              <div className="absolute top-3 left-3 bg-[#b85a4b] text-white font-bold text-xs px-2.5 py-1 rounded">
                {product.discount}
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <h1 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-white">
                {product.title}
              </h1>

              <div className="flex items-baseline space-x-3 pt-2">
                <span className="text-2xl sm:text-3xl font-black text-white">{product.price.toLocaleString()} ₽</span>
                <span className="text-sm text-[#e6e8e6]/50 line-through">{product.oldPrice.toLocaleString()} ₽</span>
                <span className="px-2 py-0.5 bg-[#b85a4b]/20 text-[#b85a4b] font-bold text-xs rounded">
                  {product.discount}
                </span>
              </div>

              <p className="text-xs sm:text-sm text-[#e6e8e6]/80 leading-relaxed">{product.description}</p>
            </div>

            <div className="space-y-3 pt-4 border-t border-[#2d302e]">
              <button
                onClick={() => setIsContactOpen(true)}
                className="w-full py-3.5 bg-[#b85a4b] hover:bg-[#a04e40] text-[#e6e8e6] font-bold text-sm rounded-xl shadow-lg transition flex items-center justify-center space-x-2 cursor-pointer"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Написать</span>
              </button>
            </div>
          </div>
        </div>

        <div className="bg-[#3a3f3c] border border-[#2d302e] rounded-2xl p-6 sm:p-8 space-y-6">
          <h2 className="text-lg font-bold uppercase tracking-wider border-b border-[#2d302e] pb-3">
            Характеристики
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div className="bg-[#2d302e] p-4 rounded-xl border border-[#3a3f3c] space-y-1">
              <span className="text-[#e6e8e6]/60 uppercase tracking-wider">Артикул</span>
              <div className="font-mono font-bold text-white text-sm">{product.sku}</div>
            </div>

            <div className="bg-[#2d302e] p-4 rounded-xl border border-[#3a3f3c] space-y-1">
              <span className="text-[#e6e8e6]/60 uppercase tracking-wider">Размерный ряд</span>
              <div className="font-bold text-white text-sm">{product.sizeRange}</div>
            </div>

            <div className="bg-[#2d302e] p-4 rounded-xl border border-[#3a3f3c] space-y-1">
              <span className="text-[#e6e8e6]/60 uppercase tracking-wider">Комплектация</span>
              <div className="text-[#e6e8e6]/80">{product.packageContents}</div>
            </div>
          </div>

          <div className="space-y-3 pt-3 border-t border-[#2d302e]">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider">Состав ткани</span>
              <div className="flex items-center space-x-1 bg-[#2d302e] p-1 rounded-lg border border-[#3a3f3c]">
                <button
                  onClick={() => setSelectedFabricType('insulated')}
                  className={`px-3 py-1 rounded text-xs font-semibold transition cursor-pointer ${
                    selectedFabricType === 'insulated' ? 'bg-[#b85a4b] text-white' : 'text-[#e6e8e6]/60 hover:text-white'
                  }`}
                >
                  Утепленный
                </button>
                <button
                  onClick={() => setSelectedFabricType('lightweight')}
                  className={`px-3 py-1 rounded text-xs font-semibold transition cursor-pointer ${
                    selectedFabricType === 'lightweight' ? 'bg-[#b85a4b] text-white' : 'text-[#e6e8e6]/60 hover:text-white'
                  }`}
                >
                  Без утеплителя
                </button>
              </div>
            </div>

            <div className="bg-[#2d302e] p-4 rounded-xl border border-[#3a3f3c] text-xs text-[#e6e8e6]/80 leading-relaxed">
              {selectedFabricType === 'insulated' ? product.fabricComposition.insulated : product.fabricComposition.lightweight}
            </div>
          </div>

          <div className="space-y-2 pt-3 border-t border-[#2d302e]">
            <span className="text-xs font-bold uppercase tracking-wider">Доставка</span>
            <p className="text-xs text-[#e6e8e6]/80 bg-[#2d302e] p-4 rounded-xl border border-[#3a3f3c] leading-relaxed">
              {product.deliveryInfo}
            </p>
          </div>
        </div>
      </div>

      <ContactModal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
        productTitle={product.title}
      />
    </div>
  );
}
