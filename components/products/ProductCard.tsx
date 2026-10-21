'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Heart, Plus } from 'lucide-react';
import { Product } from '@/types/product';
import { formatPrice } from '@/lib/utils';
import { useFavorites } from '@/context/FavoritesContext';
import { useCart } from '@/context/CartContext';
import { Badge } from '@/components/ui/Badge';

interface ProductCardProps {
  product: Product;
  priority?: boolean;
}

export function ProductCard({ product, priority = false }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const { isFavorite, toggleFavorite } = useFavorites();
  const { addItem } = useCart();
  const favorited = isFavorite(product.slug);

  const primaryImage = product.images[0];
  const secondaryImage = product.images[1] || primaryImage;

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    // Default to first available size/color
    const defaultSize = product.availableSizes ? product.availableSizes[0] : undefined;
    const defaultColor = product.availableColors ? product.availableColors[0].name : undefined;

    addItem(product, defaultSize, defaultColor, 1);
  };

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(product.slug);
  };

  return (
    <div
      className="group relative flex flex-col"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Container with aspect ratio */}
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-sand/20">
        <Link
          href={`/produit/${product.slug}`}
          className="block w-full h-full"
          aria-label={`Voir ${product.name}`}
        >
          {/* Primary image */}
          <Image
            src={primaryImage.url}
            alt={primaryImage.alt || product.name}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            priority={priority}
            className={`object-cover object-center transition-all duration-700 ease-out ${
              isHovered && secondaryImage ? 'opacity-0 scale-105' : 'opacity-100 scale-100'
            }`}
          />

          {/* Secondary hover image (desktop) */}
          {secondaryImage && (
            <Image
              src={secondaryImage.url}
              alt={secondaryImage.alt || product.name}
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              className={`object-cover object-center transition-all duration-700 ease-out absolute inset-0 ${
                isHovered ? 'opacity-100 scale-105' : 'opacity-0 scale-100'
              }`}
            />
          )}
        </Link>

        {/* Badges */}
        <div className="absolute top-2 left-2 sm:top-2.5 sm:left-2.5 flex flex-col gap-1 pointer-events-none z-10">
          {product.isNew && (
            <Badge variant="dark" className="text-[9px] sm:text-[10px] px-2 py-0.5">
              Nouveau
            </Badge>
          )}
          {product.isBestseller && !product.isNew && (
            <Badge variant="gold" className="text-[9px] sm:text-[10px] px-2 py-0.5">
              Iconique
            </Badge>
          )}
        </div>

        {/* Wishlist Button - 40x40px touch area */}
        <button
          type="button"
          onClick={handleToggleFavorite}
          className={`absolute top-1.5 right-1.5 sm:top-2.5 sm:right-2.5 w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center rounded-full transition-colors duration-200 z-10 ${
            favorited
              ? 'bg-white text-black shadow-xs'
              : 'bg-white/85 text-charcoal hover:bg-white hover:text-black'
          }`}
          aria-label={favorited ? 'Retirer des favoris' : 'Ajouter aux favoris'}
        >
          <Heart
            className={`w-3.5 h-3.5 sm:w-4 sm:h-4 transition-transform duration-200 ${
              favorited ? 'fill-black scale-110' : ''
            }`}
          />
        </button>

        {/* Quick Add Overlay on hover (Desktop) */}
        <div className="hidden lg:block absolute bottom-0 inset-x-0 p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
          <button
            type="button"
            onClick={handleQuickAdd}
            className="w-full py-2.5 bg-white/95 backdrop-blur-xs text-black text-[11px] uppercase tracking-widest font-medium hover:bg-black hover:text-white transition-colors flex items-center justify-center gap-1.5 shadow-sm"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Ajout Rapide</span>
          </button>
        </div>
      </div>

      {/* Product Details */}
      <div className="pt-2 sm:pt-3 pb-1 flex flex-col flex-1">
        {/* Category & Color Swatches */}
        <div className="flex items-center justify-between gap-1 mb-1">
          <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.14em] text-taupe font-medium truncate">
            {product.categoryLabel}
          </span>

          {/* Color swatches */}
          {product.availableColors && product.availableColors.length > 0 && (
            <div className="flex items-center gap-1 shrink-0">
              {product.availableColors.slice(0, 3).map((color) => (
                <span
                  key={color.name}
                  title={color.name}
                  className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full border border-black/20"
                  style={{ backgroundColor: color.hex }}
                />
              ))}
              {product.availableColors.length > 3 && (
                <span className="text-[9px] text-taupe leading-none">
                  +{product.availableColors.length - 3}
                </span>
              )}
            </div>
          )}
        </div>

        {/* Name */}
        <h3 className="font-serif text-xs xs:text-sm sm:text-base text-black group-hover:text-gold transition-colors line-clamp-1">
          <Link href={`/produit/${product.slug}`}>{product.name}</Link>
        </h3>

        {/* Price */}
        <div className="mt-0.5 sm:mt-1 flex items-baseline gap-2">
          <span className="text-xs sm:text-sm font-medium text-charcoal">
            {formatPrice(product.price)}
          </span>
          {product.compareAtPrice && (
            <span className="text-[10px] sm:text-xs text-taupe line-through">
              {formatPrice(product.compareAtPrice)}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
