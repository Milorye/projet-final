'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { X, ArrowRight, Heart, ShoppingBag } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useFavorites } from '@/context/FavoritesContext';

interface MobileNavigationProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileNavigation({ isOpen, onClose }: MobileNavigationProps) {
  const { itemCount } = useCart();
  const { favoritesCount } = useFavorites();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 overflow-hidden lg:hidden"
      role="dialog"
      aria-modal="true"
      aria-label="Menu principal"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity duration-300"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 left-0 max-w-full flex">
        <div className="w-[85vw] max-w-xs sm:max-w-sm bg-ivory shadow-2xl flex flex-col justify-between overflow-y-auto animate-fade-in">
          {/* Top section */}
          <div>
            {/* Header */}
            <div className="px-5 py-4 border-b border-border-light flex items-center justify-between">
              <span className="font-serif text-base tracking-[0.2em] uppercase font-medium text-black">
                MAISON MOYA
              </span>
              <button
                onClick={onClose}
                className="w-11 h-11 flex items-center justify-center text-taupe hover:text-black transition-colors rounded-full -mr-2"
                aria-label="Fermer le menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Main navigation links with 48px touch targets */}
            <nav className="px-5 py-4 space-y-1">
              {[
                { label: 'Accueil', href: '/' },
                { label: 'Boutique', href: '/boutique' },
                { label: 'Nouveautés', href: '/boutique?filtre=nouveau' },
                { label: 'Collections', href: '/collections' },
                { label: 'À propos', href: '/a-propos' },
              ].map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={onClose}
                  className="min-h-[48px] flex items-center justify-between py-2 font-serif text-lg sm:text-xl text-black hover:text-gold transition-colors border-b border-border-light/40"
                >
                  <span>{item.label}</span>
                  <ArrowRight className="w-4 h-4 text-taupe/60" />
                </Link>
              ))}
            </nav>

            {/* Categories shortcut */}
            <div className="px-5 py-2">
              <p className="text-[10px] uppercase tracking-widest text-taupe font-medium mb-3">
                Rayons
              </p>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <Link
                  href="/boutique?category=vetements"
                  onClick={onClose}
                  className="min-h-[44px] flex items-center justify-center p-2.5 bg-white border border-border-light text-charcoal hover:border-black transition-colors text-center"
                >
                  Vêtements
                </Link>
                <Link
                  href="/boutique?category=sacs"
                  onClick={onClose}
                  className="min-h-[44px] flex items-center justify-center p-2.5 bg-white border border-border-light text-charcoal hover:border-black transition-colors text-center"
                >
                  Maroquinerie
                </Link>
                <Link
                  href="/boutique?category=chaussures"
                  onClick={onClose}
                  className="min-h-[44px] flex items-center justify-center p-2.5 bg-white border border-border-light text-charcoal hover:border-black transition-colors text-center"
                >
                  Souliers
                </Link>
                <Link
                  href="/boutique?category=accessoires"
                  onClick={onClose}
                  className="min-h-[44px] flex items-center justify-center p-2.5 bg-white border border-border-light text-charcoal hover:border-black transition-colors text-center"
                >
                  Accessoires
                </Link>
              </div>
            </div>
          </div>

          {/* Bottom user utility links */}
          <div className="p-5 border-t border-border-light bg-white space-y-2">
            <Link
              href="/favoris"
              onClick={onClose}
              className="min-h-[44px] flex items-center justify-between text-xs text-charcoal hover:text-black py-2"
            >
              <div className="flex items-center gap-2.5">
                <Heart className="w-4 h-4 text-taupe" />
                <span>Mes Favoris</span>
              </div>
              {favoritesCount > 0 && (
                <span className="px-2 py-0.5 bg-sand/40 text-[10px] font-semibold">
                  {favoritesCount}
                </span>
              )}
            </Link>

            <Link
              href="/panier"
              onClick={onClose}
              className="min-h-[44px] flex items-center justify-between text-xs text-charcoal hover:text-black py-2"
            >
              <div className="flex items-center gap-2.5">
                <ShoppingBag className="w-4 h-4 text-taupe" />
                <span>Mon Panier</span>
              </div>
              {itemCount > 0 && (
                <span className="px-2 py-0.5 bg-black text-white text-[10px] font-semibold">
                  {itemCount}
                </span>
              )}
            </Link>

            <div className="pt-2 border-t border-border-light/60 flex items-center justify-between text-[11px] text-taupe">
              <Link href="/livraison-retours" onClick={onClose} className="hover:underline py-1">
                Livraison & Retours
              </Link>
              <Link href="/politique-confidentialite" onClick={onClose} className="hover:underline py-1">
                Confidentialité
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
