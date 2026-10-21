'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useFavorites } from '@/context/FavoritesContext';
import { useCart } from '@/context/CartContext';
import { getAllProducts } from '@/lib/products';
import { Container } from '@/components/ui/Container';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { EmptyState } from '@/components/ui/EmptyState';
import { Button } from '@/components/ui/Button';
import { formatPrice } from '@/lib/utils';
import { Trash2, ShoppingBag, Heart } from 'lucide-react';

export default function FavorisPage() {
  const { favorites, toggleFavorite } = useFavorites();
  const { addItem } = useCart();
  const allProducts = getAllProducts();

  const favoriteProducts = allProducts.filter((p) => favorites.includes(p.slug));

  const handleQuickAdd = (product: (typeof allProducts)[0]) => {
    const defaultSize = product.availableSizes ? product.availableSizes[0] : undefined;
    const defaultColor = product.availableColors ? product.availableColors[0].name : undefined;
    addItem(product, defaultSize, defaultColor, 1);
  };

  return (
    <div className="py-8 sm:py-12 bg-ivory min-h-screen">
      <Container>
        <Breadcrumbs items={[{ label: 'Mes Favoris' }]} />

        {/* Heading */}
        <div className="border-b border-border-light pb-6 pt-4 mb-8">
          <p className="text-[11px] uppercase tracking-[0.25em] text-taupe font-medium mb-2">
            Votre Sélection Personnelle
          </p>
          <div className="flex items-center justify-between">
            <h1 className="font-serif text-3xl sm:text-4xl text-black">
              Pièces Enregistrées
            </h1>
            <span className="text-xs text-taupe">
              {favoriteProducts.length} article{favoriteProducts.length > 1 ? 's' : ''}
            </span>
          </div>
        </div>

        {favoriteProducts.length === 0 ? (
          <EmptyState
            icon={<Heart className="w-10 h-10 stroke-1" />}
            title="Votre carnet de favoris est vide"
            description="Explorez nos collections et enregistrez vos pièces de prédilection en cliquant sur l'icône cœur."
            actionLabel="Découvrir la boutique"
            actionHref="/boutique"
          />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {favoriteProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white border border-border-light/80 flex flex-col justify-between group overflow-hidden"
              >
                <div>
                  {/* Image */}
                  <Link
                    href={`/produit/${product.slug}`}
                    className="block relative aspect-[3/4] w-full bg-sand/20 overflow-hidden"
                  >
                    <Image
                      src={product.images[0]?.url || ''}
                      alt={product.name}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    />
                  </Link>

                  {/* Info */}
                  <div className="p-4 space-y-1">
                    <span className="text-[10px] uppercase tracking-wider text-taupe">
                      {product.categoryLabel}
                    </span>
                    <h3 className="font-serif text-base text-black group-hover:text-gold transition-colors line-clamp-1">
                      <Link href={`/produit/${product.slug}`}>{product.name}</Link>
                    </h3>
                    <p className="text-xs font-medium text-charcoal">
                      {formatPrice(product.price)}
                    </p>
                  </div>
                </div>

                {/* Actions */}
                <div className="p-4 pt-0 flex gap-2 border-t border-border-light/60 mt-3 pt-3">
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => handleQuickAdd(product)}
                    className="flex-1 flex items-center justify-center gap-1.5"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span>Ajouter</span>
                  </Button>
                  <button
                    type="button"
                    onClick={() => toggleFavorite(product.slug)}
                    className="p-2 border border-border-light hover:border-black text-taupe hover:text-black transition-colors"
                    aria-label={`Supprimer ${product.name} des favoris`}
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </Container>
    </div>
  );
}
