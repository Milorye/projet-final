import React from 'react';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { ProductGrid } from '@/components/products/ProductGrid';
import { getNewArrivals } from '@/lib/products';

export function NewArrivals() {
  const newProducts = getNewArrivals().slice(0, 4);

  return (
    <section className="py-20 sm:py-24 bg-ivory">
      <Container>
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 border-b border-border-light pb-6">
          <div>
            <p className="text-[11px] uppercase tracking-[0.25em] text-taupe font-medium mb-2">
              Dernières Créations
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl text-black">
              Nouveautés de Saison
            </h2>
          </div>
          <Button
            href="/boutique?filtre=nouveau"
            variant="ghost"
            className="mt-4 sm:mt-0 self-start sm:self-auto"
          >
            Voir toutes les nouveautés
          </Button>
        </div>

        {/* Products Grid */}
        <ProductGrid products={newProducts} columns={4} />
      </Container>
    </section>
  );
}
