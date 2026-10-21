import React from 'react';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { ProductGrid } from '@/components/products/ProductGrid';
import { getBestsellerProducts } from '@/lib/products';

export function BestsellersSection() {
  const bestsellers = getBestsellerProducts().slice(0, 4);

  return (
    <section className="py-20 sm:py-24 bg-white border-t border-border-light">
      <Container>
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 border-b border-border-light pb-6">
          <div>
            <p className="text-[11px] uppercase tracking-[0.25em] text-taupe font-medium mb-2">
              Plébiscitées par notre communauté
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl text-black">
              Les Icônes de la Maison
            </h2>
          </div>
          <Button
            href="/boutique"
            variant="ghost"
            className="mt-4 sm:mt-0 self-start sm:self-auto"
          >
            Explorer toute la collection
          </Button>
        </div>

        {/* Grid */}
        <ProductGrid products={bestsellers} columns={4} />
      </Container>
    </section>
  );
}
