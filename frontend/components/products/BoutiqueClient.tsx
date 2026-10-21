'use client';

import React, { useState, useMemo } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { ProductCategory, SortOption } from '@/types/product';
import { filterAndSortProducts } from '@/lib/products';
import { Container } from '@/components/ui/Container';
import { ProductGrid } from '@/components/products/ProductGrid';
import { ProductFilters } from '@/components/products/ProductFilters';
import { ProductSort } from '@/components/products/ProductSort';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { EmptyState } from '@/components/ui/EmptyState';
import { SlidersHorizontal, X } from 'lucide-react';

export function BoutiqueClient() {
  const searchParams = useSearchParams();
  const router = useRouter();

  // Read params as initial state
  const paramCategory = (searchParams.get('category') as ProductCategory) || undefined;
  const paramFilter = searchParams.get('filtre');
  const paramSort = (searchParams.get('sort') as SortOption) || 'pertinence';
  const paramColor = searchParams.get('color') || undefined;
  const paramSize = searchParams.get('size') || undefined;
  const paramPrice = searchParams.get('price') || 'all';

  const [category, setCategory] = useState<ProductCategory | undefined>(paramCategory);
  const [color, setColor] = useState<string | undefined>(paramColor);
  const [size, setSize] = useState<string | undefined>(paramSize);
  const [priceRange, setPriceRange] = useState<string>(paramPrice);
  const [sort, setSort] = useState<SortOption>(
    paramFilter === 'nouveau' ? 'nouveautes' : paramSort
  );
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  // Compute price bounds
  const priceBounds = useMemo(() => {
    if (priceRange === 'under-400') return { min: 0, max: 400 };
    if (priceRange === '400-800') return { min: 400, max: 800 };
    if (priceRange === 'over-800') return { min: 800, max: 999999 };
    return { min: undefined, max: undefined };
  }, [priceRange]);

  // Filtered products list
  const filteredProducts = useMemo(() => {
    return filterAndSortProducts({
      category,
      color,
      size,
      minPrice: priceBounds.min,
      maxPrice: priceBounds.max,
      sort,
    });
  }, [category, color, size, priceBounds, sort]);

  const hasActiveFilters = Boolean(
    category || color || size || priceRange !== 'all' || sort !== 'pertinence'
  );

  const handleResetFilters = () => {
    setCategory(undefined);
    setColor(undefined);
    setSize(undefined);
    setPriceRange('all');
    setSort('pertinence');
    router.push('/boutique');
  };

  const categoryTitles: Record<ProductCategory, string> = {
    vetements: 'Vêtements d’Élite',
    sacs: 'Maroquinerie Fine',
    chaussures: 'Souliers Contemporains',
    accessoires: 'Accessoires & Soieries',
  };

  const pageTitle = category ? categoryTitles[category] : 'La Boutique Complète';
  const pageDescription = category
    ? `Explorez notre sélection raffinée de ${categoryTitles[category].toLowerCase()}, confectionnée dans les ateliers les plus prestigieux.`
    : 'L’intégralité des créations MAISON MOYA. Des pièces de prêt-à-porter, de maroquinerie et de souliers sculptées pour une élégance pérenne.';

  return (
    <div className="py-6 sm:py-12 bg-ivory min-h-screen">
      <Container>
        {/* Breadcrumbs */}
        <Breadcrumbs
          items={[
            { label: 'Boutique', href: '/boutique' },
            ...(category
              ? [{ label: categoryTitles[category] }]
              : []),
          ]}
        />

        {/* Page Header */}
        <div className="border-b border-border-light pb-6 sm:pb-8 pt-2 sm:pt-4 mb-6 sm:mb-8">
          <div className="max-w-3xl">
            <h1 className="font-serif text-2xl xs:text-3xl sm:text-4xl md:text-5xl text-black mb-2 sm:mb-3">
              {pageTitle}
            </h1>
            <p className="text-xs sm:text-sm text-taupe leading-relaxed font-light">
              {pageDescription}
            </p>
          </div>
        </div>

        {/* Controls Bar (Mobile Filter Toggle, Active Pills, Sort) */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 mb-6 sm:mb-8 pb-3 sm:pb-4 border-b border-border-light/60">
          <div className="flex items-center justify-between sm:justify-start gap-3 w-full sm:w-auto">
            {/* Mobile filter button with 44px touch target */}
            <button
              type="button"
              onClick={() => setMobileFiltersOpen(true)}
              className="lg:hidden inline-flex items-center gap-2 px-4 min-h-[44px] text-xs font-medium uppercase tracking-wider bg-white border border-border-light text-black hover:border-black transition-colors"
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>Filtres</span>
              {hasActiveFilters && (
                <span className="w-2 h-2 rounded-full bg-gold" />
              )}
            </button>

            {/* Total items count */}
            <span className="text-xs text-taupe font-medium">
              {filteredProducts.length} pièce{filteredProducts.length > 1 ? 's' : ''}
            </span>

            {/* Sort on mobile placed beside or inside bar */}
            <div className="sm:hidden">
              <ProductSort currentSort={sort} onSortChange={setSort} />
            </div>
          </div>

          {/* Active Filter Pills (Horizontal swipeable on small viewports) */}
          <div className="flex items-center justify-between sm:justify-end gap-3 w-full sm:w-auto overflow-hidden">
            {hasActiveFilters && (
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 max-w-full text-xs shrink-0">
                {category && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 text-[11px] bg-sand/30 border border-border-light text-charcoal shrink-0">
                    <span>{category}</span>
                    <button onClick={() => setCategory(undefined)} className="hover:text-black p-0.5">
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}
                {color && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 text-[11px] bg-sand/30 border border-border-light text-charcoal shrink-0">
                    <span>{color}</span>
                    <button onClick={() => setColor(undefined)} className="hover:text-black p-0.5">
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}
                {size && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 text-[11px] bg-sand/30 border border-border-light text-charcoal shrink-0">
                    <span>Taille : {size}</span>
                    <button onClick={() => setSize(undefined)} className="hover:text-black p-0.5">
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}
                {priceRange !== 'all' && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 text-[11px] bg-sand/30 border border-border-light text-charcoal shrink-0">
                    <span>Prix filtré</span>
                    <button onClick={() => setPriceRange('all')} className="hover:text-black p-0.5">
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}
              </div>
            )}

            {/* Sort Dropdown (Desktop/Tablet) */}
            <div className="hidden sm:block">
              <ProductSort currentSort={sort} onSortChange={setSort} />
            </div>
          </div>
        </div>

        {/* Layout: Sidebar Filters + Main Product Grid */}
        <div className="flex gap-8 lg:gap-12 items-start">
          {/* Desktop Filters Sidebar */}
          <ProductFilters
            selectedCategory={category}
            selectedColor={color}
            selectedSize={size}
            selectedPriceRange={priceRange}
            onSelectCategory={setCategory}
            onSelectColor={setColor}
            onSelectSize={setSize}
            onSelectPriceRange={(range) => setPriceRange(range || 'all')}
            onResetFilters={handleResetFilters}
            hasActiveFilters={hasActiveFilters}
            totalCount={filteredProducts.length}
            isOpenOnMobile={false}
          />

          {/* Main Products Area */}
          <div className="flex-1 w-full min-w-0">
            {filteredProducts.length === 0 ? (
              <EmptyState
                title="Aucune pièce ne correspond à vos critères"
                description="Essayez de modifier ou de réinitialiser vos filtres pour découvrir d’autres créations de la Maison."
                actionLabel="Réinitialiser tous les filtres"
                onAction={handleResetFilters}
              />
            ) : (
              <ProductGrid products={filteredProducts} columns={3} />
            )}
          </div>
        </div>

        {/* Mobile Filter Modal */}
        <ProductFilters
          selectedCategory={category}
          selectedColor={color}
          selectedSize={size}
          selectedPriceRange={priceRange}
          onSelectCategory={setCategory}
          onSelectColor={setColor}
          onSelectSize={setSize}
          onSelectPriceRange={(range) => setPriceRange(range || 'all')}
          onResetFilters={handleResetFilters}
          hasActiveFilters={hasActiveFilters}
          totalCount={filteredProducts.length}
          isOpenOnMobile={mobileFiltersOpen}
          onCloseMobile={() => setMobileFiltersOpen(false)}
        />
      </Container>
    </div>
  );
}
