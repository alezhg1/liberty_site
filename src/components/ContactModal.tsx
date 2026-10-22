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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <div className="relative w-full max-w-md bg-[#2d302e] border border-[#3a3f3c] rounded-2xl p-6 shadow-2xl text-[#e6e8e6]">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-lg bg-[#3a3f3c] text-[#e6e8e6]/70 hover:text-white transition"
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
                <p className="text-xs text-[#b85a4b] font-mono mt-1 bg-[#3a3f3c] p-2 rounded">
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
                  className="w-full px-3 py-2 bg-[#3a3f3c] border border-[#2d302e] rounded-lg text-[#e6e8e6] focus:outline-none focus:border-[#b85a4b]"
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
                  className="w-full px-3 py-2 bg-[#3a3f3c] border border-[#2d302e] rounded-lg text-[#e6e8e6] focus:outline-none focus:border-[#b85a4b]"
                />
              </div>

              <div>
                <label className="block text-[#e6e8e6]/70 mb-1">Размер</label>
                <select
                  value={formData.size}
                  onChange={(e) => setFormData({ ...formData, size: e.target.value })}
                  className="w-full px-3 py-2 bg-[#3a3f3c] border border-[#2d302e] rounded-lg text-[#e6e8e6] focus:outline-none focus:border-[#b85a4b]"
                >
                  {['XXS', 'XS', 'S', 'M', 'L', 'XL', '2XL', '3XL', '4XL', '5XL', '6XL'].map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-[#e6e8e6]/70 mb-1">Комментарий</label>
                <textarea
                  rows={2}
                  value={formData.comment}
                  onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
                  className="w-full px-3 py-2 bg-[#3a3f3c] border border-[#2d302e] rounded-lg text-[#e6e8e6] focus:outline-none focus:border-[#b85a4b] resize-none"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-[#b85a4b] hover:bg-[#a04e40] text-[#e6e8e6] text-xs font-bold rounded-lg transition flex items-center justify-center space-x-2 shadow-lg"
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
