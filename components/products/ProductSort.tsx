'use client';

import React from 'react';
import { SortOption } from '@/types/product';
import { ChevronDown } from 'lucide-react';

interface ProductSortProps {
  currentSort: SortOption;
  onSortChange: (sort: SortOption) => void;
}

const SORT_OPTIONS: { label: string; value: SortOption }[] = [
  { label: 'Pertinence', value: 'pertinence' },
  { label: 'Nouveautés', value: 'nouveautes' },
  { label: 'Prix croissant', value: 'prix-asc' },
  { label: 'Prix décroissant', value: 'prix-desc' },
];

export function ProductSort({ currentSort, onSortChange }: ProductSortProps) {
  return (
    <div className="relative inline-flex items-center">
      <label htmlFor="product-sort-select" className="sr-only">
        Trier par
      </label>
      <div className="relative">
        <select
          id="product-sort-select"
          value={currentSort}
          onChange={(e) => onSortChange(e.target.value as SortOption)}
          className="appearance-none bg-transparent py-2 pl-3 pr-8 text-xs font-medium text-black border border-border-light focus:outline-hidden focus:border-black cursor-pointer uppercase tracking-wider"
        >
          {SORT_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              Trier : {opt.label}
            </option>
          ))}
        </select>
        <ChevronDown className="w-3.5 h-3.5 text-taupe absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
      </div>
    </div>
  );
}
