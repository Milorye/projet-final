export type ProductCategory = 'vetements' | 'sacs' | 'chaussures' | 'accessoires';

export interface ProductColor {
  name: string;
  hex: string;
}

export interface ProductImage {
  url: string;
  alt: string;
}

export interface ProductVariant {
  id: string;
  sku: string;
  size?: string;
  color?: string;
  inStock: boolean;
  stockCount: number;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  shortDescription: string;
  description: string;
  price: number;
  compareAtPrice?: number;
  currency: string;
  category: ProductCategory;
  categoryLabel: string;
  collectionSlugs: string[];
  images: ProductImage[];
  availableSizes?: string[];
  availableColors?: ProductColor[];
  variants?: ProductVariant[];
  tags: string[];
  featured?: boolean;
  isNew?: boolean;
  isBestseller?: boolean;
  material?: string;
  careInstructions?: string[];
  reference: string;
  fit?: string;
  origin?: string;
}

export type SortOption = 'pertinence' | 'nouveautes' | 'prix-asc' | 'prix-desc';

export interface ProductFilterState {
  category?: ProductCategory;
  color?: string;
  size?: string;
  minPrice?: number;
  maxPrice?: number;
  sort?: SortOption;
  searchQuery?: string;
}
