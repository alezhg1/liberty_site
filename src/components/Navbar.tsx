import React from 'react';
import { MessageCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

interface NavbarProps {
  onOpenContact: () => void;
}

export function Navbar({ onOpenContact }: NavbarProps) {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#2d302e]/80 backdrop-blur-md border-b border-[#3a3f3c]">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link to="/" className="text-lg font-black tracking-widest text-[#e6e8e6] uppercase">
          LIBERTY
        </Link>

        <div className="flex items-center space-x-6">
          <span className="hidden sm:inline-flex items-center space-x-2 text-xs font-mono text-[#e6e8e6]/80">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>В наличии</span>
          </span>
          <button
            onClick={onOpenContact}
            className="flex items-center space-x-2 px-4 py-2 bg-[#b85a4b] hover:bg-[#a04e40] text-[#e6e8e6] text-xs font-bold rounded-lg transition"
          >
            <MessageCircle className="w-3.5 h-3.5" />
            <span>Написать</span>
          </button>
        </div>
      </div>
    </header>
  );
}
