'use client';

import React from 'react';
import { ProductCategory } from '@/types/product';
import { X, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/Button';

interface ProductFiltersProps {
  selectedCategory?: ProductCategory;
  selectedColor?: string;
  selectedSize?: string;
  selectedPriceRange?: string; // 'all' | 'under-400' | '400-800' | 'over-800'
  onSelectCategory: (cat?: ProductCategory) => void;
  onSelectColor: (color?: string) => void;
  onSelectSize: (size?: string) => void;
  onSelectPriceRange: (range?: string) => void;
  onResetFilters: () => void;
  hasActiveFilters: boolean;
  totalCount: number;
  isOpenOnMobile?: boolean;
  onCloseMobile?: () => void;
}

const CATEGORIES: { label: string; value?: ProductCategory }[] = [
  { label: 'Tous les rayons', value: undefined },
  { label: 'Vêtements', value: 'vetements' },
  { label: 'Maroquinerie', value: 'sacs' },
  { label: 'Souliers', value: 'chaussures' },
  { label: 'Accessoires', value: 'accessoires' },
];

const COLORS = [
  { name: 'Noir Minéral', hex: '#22211F' },
  { name: 'Ivoire Chaud', hex: '#F8F6F1' },
  { name: 'Taupe Fumé', hex: '#A89B8B' },
  { name: 'Sable Clair', hex: '#DCD1C3' },
  { name: 'Caramel Doré', hex: '#A58A5C' },
];

const SIZES = ['XS', 'S', 'M', 'L', 'XL', '36', '37', '38', '39', '40', '41'];

const PRICE_RANGES = [
  { label: 'Tous les prix', value: 'all' },
  { label: 'Moins de 400 €', value: 'under-400' },
  { label: '400 € à 800 €', value: '400-800' },
  { label: 'Plus de 800 €', value: 'over-800' },
];

export function ProductFilters({
  selectedCategory,
  selectedColor,
  selectedSize,
  selectedPriceRange = 'all',
  onSelectCategory,
  onSelectColor,
  onSelectSize,
  onSelectPriceRange,
  onResetFilters,
  hasActiveFilters,
  totalCount,
  isOpenOnMobile,
  onCloseMobile,
}: ProductFiltersProps) {
  const content = (
    <div className="space-y-7">
      {/* Categories */}
      <div>
        <h4 className="text-[11px] uppercase tracking-[0.2em] font-semibold text-black mb-2">
          Catégorie
        </h4>
        <ul className="space-y-1 text-xs">
          {CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat.value;
            return (
              <li key={cat.label}>
                <button
                  type="button"
                  onClick={() => onSelectCategory(cat.value)}
                  className={`w-full text-left py-2 min-h-[40px] transition-colors flex items-center justify-between ${
                    isSelected
                      ? 'font-semibold text-black'
                      : 'text-taupe hover:text-black'
                  }`}
                >
                  <span>{cat.label}</span>
                  {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-black" />}
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Colors */}
      <div>
        <h4 className="text-[11px] uppercase tracking-[0.2em] font-semibold text-black mb-2.5">
          Couleur
        </h4>
        <div className="flex flex-wrap gap-2">
          {COLORS.map((col) => {
            const isSelected = selectedColor === col.name;
            return (
              <button
                key={col.name}
                type="button"
                onClick={() => onSelectColor(isSelected ? undefined : col.name)}
                className={`min-h-[40px] flex items-center gap-2 px-3 py-1.5 text-xs border transition-all ${
                  isSelected
                    ? 'border-black bg-ivory text-black font-medium ring-1 ring-black'
                    : 'border-border-light text-charcoal hover:border-black/40 bg-white'
                }`}
                title={col.name}
              >
                <span
                  className="w-3.5 h-3.5 rounded-full border border-black/20 shrink-0"
                  style={{ backgroundColor: col.hex }}
                />
                <span className="text-[11px]">{col.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Sizes */}
      <div>
        <h4 className="text-[11px] uppercase tracking-[0.2em] font-semibold text-black mb-2.5">
          Taille & Pointure
        </h4>
        <div className="grid grid-cols-4 gap-2">
          {SIZES.map((sz) => {
            const isSelected = selectedSize === sz;
            return (
              <button
                key={sz}
                type="button"
                onClick={() => onSelectSize(isSelected ? undefined : sz)}
                className={`min-h-[42px] flex items-center justify-center text-xs text-center border font-medium transition-all ${
                  isSelected
                    ? 'border-black bg-black text-white'
                    : 'border-border-light text-charcoal hover:border-black bg-white'
                }`}
              >
                {sz}
              </button>
            );
          })}
        </div>
      </div>

      {/* Price Ranges */}
      <div>
        <h4 className="text-[11px] uppercase tracking-[0.2em] font-semibold text-black mb-2">
          Fourchette de Prix
        </h4>
        <ul className="space-y-1 text-xs">
          {PRICE_RANGES.map((range) => {
            const isSelected = selectedPriceRange === range.value;
            return (
              <li key={range.value}>
                <button
                  type="button"
                  onClick={() => onSelectPriceRange(range.value)}
                  className={`w-full text-left py-2 min-h-[40px] transition-colors flex items-center justify-between ${
                    isSelected
                      ? 'font-semibold text-black'
                      : 'text-taupe hover:text-black'
                  }`}
                >
                  <span>{range.label}</span>
                  {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-black" />}
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Reset button if active */}
      {hasActiveFilters && (
        <div className="pt-2">
          <button
            type="button"
            onClick={onResetFilters}
            className="inline-flex items-center gap-2 text-xs text-charcoal hover:text-black transition-colors min-h-[44px]"
          >
            <RotateCcw className="w-3.5 h-3.5 text-taupe" />
            <span className="underline underline-offset-4">Réinitialiser tous les filtres</span>
          </button>
        </div>
      )}
    </div>
  );

  // Mobile Drawer
  if (isOpenOnMobile) {
    return (
      <div
        className="fixed inset-0 z-50 overflow-hidden lg:hidden"
        role="dialog"
        aria-modal="true"
        aria-label="Filtres du catalogue"
      >
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity duration-300"
          onClick={onCloseMobile}
        />
        <div className="fixed inset-y-0 right-0 max-w-full flex">
          <div className="w-[90vw] max-w-sm bg-white shadow-2xl flex flex-col justify-between animate-fade-in">
            <div className="px-5 py-4 border-b border-border-light flex items-center justify-between">
              <h3 className="font-serif text-lg text-black">
                Filtres ({totalCount})
              </h3>
              <button
                onClick={onCloseMobile}
                className="w-11 h-11 flex items-center justify-center text-taupe hover:text-black transition-colors -mr-2"
                aria-label="Fermer les filtres"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-5 overflow-y-auto flex-1">{content}</div>

            <div className="p-4 border-t border-border-light bg-ivory/80 flex gap-3">
              {hasActiveFilters && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={onResetFilters}
                  className="flex-1 min-h-[44px]"
                >
                  Effacer
                </Button>
              )}
              <Button
                variant="primary"
                size="sm"
                onClick={onCloseMobile}
                className="flex-1 min-h-[44px]"
              >
                Afficher ({totalCount})
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Desktop sidebar
  return <aside className="hidden lg:block w-64 shrink-0">{content}</aside>;
}
