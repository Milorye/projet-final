import React from 'react';
import { Product } from '@/types/product';
import { ProductGrid } from './ProductGrid';

interface RelatedProductsProps {
  products: Product[];
}

export function RelatedProducts({ products }: RelatedProductsProps) {
  if (!products || products.length === 0) return null;

  return (
    <section className="pt-20 border-t border-border-light">
      <div className="mb-10 text-center max-w-xl mx-auto">
        <span className="text-[10px] uppercase tracking-[0.25em] text-taupe font-medium block mb-2">
          Suggestions de style
        </span>
        <h2 className="font-serif text-2xl sm:text-3xl text-black">
          Dans la même allure
        </h2>
      </div>

      <ProductGrid products={products} columns={4} />
    </section>
  );
}
