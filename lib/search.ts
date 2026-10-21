import { Product } from '@/types/product';
import { PRODUCTS } from './products';
import { normalizeString } from './utils';

export interface SearchResult {
  products: Product[];
  total: number;
  query: string;
}

export function searchProducts(query: string): SearchResult {
  const q = normalizeString(query);
  if (!q) {
    return {
      products: [],
      total: 0,
      query,
    };
  }

  const results = PRODUCTS.filter((product) => {
    const name = normalizeString(product.name);
    const category = normalizeString(product.categoryLabel);
    const description = normalizeString(product.description);
    const tags = product.tags.map(normalizeString).join(' ');
    const material = normalizeString(product.material || '');

    return (
      name.includes(q) ||
      category.includes(q) ||
      description.includes(q) ||
      tags.includes(q) ||
      material.includes(q)
    );
  });

  return {
    products: results,
    total: results.length,
    query,
  };
}

export const SUGGESTED_SEARCHES = [
  'Manteau cachemire',
  'Sac cabas cuir',
  'Robe en soie',
  'Bottines talon',
  'Ceinture cuir',
  'Pull col roulé',
  'Écharpe cachemire',
];
