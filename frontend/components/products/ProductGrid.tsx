import React from 'react';
import { Product } from '@/types/product';
import { ProductCard } from './ProductCard';
import { cn } from '@/lib/utils';

interface ProductGridProps {
  products: Product[];
  columns?: 2 | 3 | 4;
  className?: string;
  priorityCount?: number;
}

export function ProductGrid({
  products,
  columns = 4,
  className,
  priorityCount = 4,
}: ProductGridProps) {
  const columnClasses = {
    2: 'grid-cols-2',
    3: 'grid-cols-2 md:grid-cols-3',
    4: 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4',
  };

  return (
    <div
      className={cn(
        'grid gap-x-3 gap-y-6 sm:gap-x-6 sm:gap-y-10 lg:gap-x-8',
        columnClasses[columns],
        className
      )}
    >
      {products.map((product, index) => (
        <ProductCard
          key={product.id}
          product={product}
          priority={index < priorityCount}
        />
      ))}
    </div>
  );
}
