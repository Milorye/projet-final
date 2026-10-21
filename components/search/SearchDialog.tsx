'use client';

import React, { useState, useEffect, useRef, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Search, X, ArrowRight } from 'lucide-react';
import { searchProducts, SUGGESTED_SEARCHES } from '@/lib/search';
import { formatPrice } from '@/lib/utils';

interface SearchDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SearchDialog({ isOpen, onClose }: SearchDialogProps) {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
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

  // Derived results calculated directly during render
  const results = useMemo(() => {
    if (!query.trim()) return [];
    return searchProducts(query).products;
  }, [query]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    onClose();
    router.push(`/recherche?q=${encodeURIComponent(query.trim())}`);
  };

  const handleSelectSuggestion = (suggestion: string) => {
    setQuery(suggestion);
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-label="Recherche sur le site"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity duration-300"
        onClick={onClose}
      />

      <div className="min-h-full flex items-start justify-center pt-8 sm:pt-24 px-3 sm:px-4 pb-6">
        <div className="relative w-full max-w-2xl bg-white shadow-2xl rounded-none border border-border-light overflow-hidden z-10 animate-fade-in">
          {/* Search Header */}
          <form onSubmit={handleSubmit} className="relative border-b border-border-light flex items-center">
            <Search className="w-5 h-5 text-taupe ml-4 sm:ml-6 shrink-0" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Rechercher une pièce, une matière..."
              className="w-full py-4 sm:py-5 px-3 sm:px-4 text-xs sm:text-base bg-transparent text-black placeholder:text-taupe/70 focus:outline-hidden"
              aria-label="Champ de recherche"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery('')}
                className="p-2 text-taupe hover:text-black mr-1 text-[11px] sm:text-xs uppercase tracking-wider"
              >
                Effacer
              </button>
            )}
            <button
              type="button"
              onClick={onClose}
              className="w-11 h-11 flex items-center justify-center text-taupe hover:text-black mr-2 transition-colors shrink-0"
              aria-label="Fermer la recherche"
            >
              <X className="w-5 h-5" />
            </button>
          </form>

          {/* Dialog Content */}
          <div className="p-4 sm:p-6 max-h-[65vh] overflow-y-auto">
            {query.trim().length === 0 ? (
              <div>
                <p className="text-[10px] sm:text-[11px] uppercase tracking-widest text-taupe font-medium mb-3">
                  Recherches suggérées
                </p>
                <div className="flex flex-wrap gap-2">
                  {SUGGESTED_SEARCHES.map((item) => (
                    <button
                      key={item}
                      type="button"
                      onClick={() => handleSelectSuggestion(item)}
                      className="px-3 py-1.5 min-h-[36px] text-xs bg-ivory text-charcoal hover:bg-sand/40 border border-border-light transition-colors"
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>
            ) : results.length > 0 ? (
              <div className="space-y-4">
                <div className="flex items-center justify-between text-xs text-taupe pb-2 border-b border-border-light/60">
                  <span>{results.length} résultat{results.length > 1 ? 's' : ''}</span>
                  <button
                    onClick={handleSubmit}
                    className="inline-flex items-center gap-1 text-black font-medium hover:underline py-1"
                  >
                    <span>Voir tout</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>

                <div className="divide-y divide-border-light/60">
                  {results.slice(0, 5).map((product) => (
                    <Link
                      key={product.id}
                      href={`/produit/${product.slug}`}
                      onClick={onClose}
                      className="py-3 flex items-center gap-3 sm:gap-4 group hover:bg-ivory/50 px-2 -mx-2 transition-colors min-h-[56px]"
                    >
                      <div className="relative w-12 h-16 shrink-0 bg-sand/20 overflow-hidden">
                        <Image
                          src={product.images[0]?.url || ''}
                          alt={product.name}
                          fill
                          sizes="48px"
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-[9px] sm:text-[10px] uppercase tracking-wider text-taupe">
                          {product.categoryLabel}
                        </p>
                        <h4 className="font-serif text-xs sm:text-sm text-black group-hover:text-gold transition-colors truncate">
                          {product.name}
                        </h4>
                        <p className="text-xs text-charcoal font-medium mt-0.5">
                          {formatPrice(product.price)}
                        </p>
                      </div>
                      <ArrowRight className="w-4 h-4 text-taupe group-hover:text-black group-hover:translate-x-1 transition-all mr-1 shrink-0" />
                    </Link>
                  ))}
                </div>
              </div>
            ) : (
              <div className="py-6 sm:py-8 text-center">
                <p className="font-serif text-base sm:text-lg text-black mb-1">
                  Aucun résultat pour « {query} »
                </p>
                <p className="text-xs text-taupe max-w-sm mx-auto mb-4 font-light">
                  Vérifiez l’orthographe ou explorez notre sélection de pièces intemporelles.
                </p>
                <div className="flex justify-center gap-2">
                  <button
                    type="button"
                    onClick={() => setQuery('')}
                    className="text-xs text-black underline underline-offset-4 py-1"
                  >
                    Effacer la recherche
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Footer note */}
          <div className="bg-ivory/60 px-4 sm:px-6 py-2.5 text-[10px] text-taupe border-t border-border-light flex items-center justify-between">
            <span>Appuyez sur <kbd className="px-1 py-0.5 bg-white border border-border-light text-black">Entrée</kbd> pour afficher tout</span>
            <span className="hidden sm:inline"><kbd className="px-1 py-0.5 bg-white border border-border-light text-black">Échap</kbd> pour fermer</span>
          </div>
        </div>
      </div>
    </div>
  );
}
