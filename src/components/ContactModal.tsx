import React, { useState } from 'react';
import { X, Send, CheckCircle2 } from 'lucide-react';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  productTitle?: string;
}

export function ContactModal({ isOpen, onClose, productTitle }: ContactModalProps) {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    size: 'L',
    comment: productTitle ? `Товар: ${productTitle}` : ''
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md">
      <div className="relative w-full max-w-md bg-[#25261d]/80 backdrop-blur-2xl border border-white/20 rounded-3xl p-6 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.7)] text-[#e6e8e6]">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-xl bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-[#e6e8e6]/80 hover:text-white transition cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        {submitted ? (
          <div className="py-10 text-center space-y-3">
            <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
            <h3 className="text-lg font-bold">Заявка отправлена</h3>
            <p className="text-xs text-[#e6e8e6]/70">Менеджер свяжется с вами в ближайшее время.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <h3 className="text-lg font-bold uppercase tracking-wider">Связаться с менеджером</h3>
              {productTitle && (
                <p className="text-xs text-[#b85a4b] font-mono mt-2 bg-black/40 p-2.5 rounded-xl border border-white/10">
                  {productTitle}
                </p>
              )}
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-[#e6e8e6]/70 mb-1">Имя</label>
                <input
                  type="text"
                  required
                  placeholder="Иван"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 bg-black/40 border border-white/15 rounded-xl text-[#e6e8e6] focus:outline-none focus:border-[#b85a4b] backdrop-blur-md"
                />
              </div>

              <div>
                <label className="block text-[#e6e8e6]/70 mb-1">Телефон / Telegram</label>
                <input
                  type="text"
                  required
                  placeholder="+7 (999) 000-00-00"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-3 bg-black/40 border border-white/15 rounded-xl text-[#e6e8e6] focus:outline-none focus:border-[#b85a4b] backdrop-blur-md"
                />
              </div>

              <div>
                <label className="block text-[#e6e8e6]/70 mb-1">Размер</label>
                <select
                  value={formData.size}
                  onChange={(e) => setFormData({ ...formData, size: e.target.value })}
                  className="w-full px-4 py-3 bg-black/40 border border-white/15 rounded-xl text-[#e6e8e6] focus:outline-none focus:border-[#b85a4b] backdrop-blur-md"
                >
                  {['XXS', 'XS', 'S', 'M', 'L', 'XL', '2XL', '3XL', '4XL', '5XL', '6XL'].map((s) => (
                    <option key={s} value={s} className="bg-[#25261d] text-white">{s}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-[#e6e8e6]/70 mb-1">Комментарий</label>
                <textarea
                  rows={2}
                  value={formData.comment}
                  onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
                  className="w-full px-4 py-3 bg-black/40 border border-white/15 rounded-xl text-[#e6e8e6] focus:outline-none focus:border-[#b85a4b] backdrop-blur-md resize-none"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 bg-gradient-to-r from-[#b85a4b] to-[#d67262] hover:from-[#a04e40] hover:to-[#c06050] text-[#e6e8e6] text-xs font-bold rounded-xl backdrop-blur-md border border-white/30 shadow-[inset_0_1px_1px_rgba(255,255,255,0.5),0_8px_32px_0_rgba(184,90,75,0.4)] transition-all duration-300 flex items-center justify-center space-x-2 cursor-pointer"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Отправить</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
