'use client';

import React, { useState } from 'react';
import { Product } from '@/types/product';
import { formatPrice } from '@/lib/utils';
import { useCart } from '@/context/CartContext';
import { useFavorites } from '@/context/FavoritesContext';
import { Button } from '@/components/ui/Button';
import {
  Heart,
  Minus,
  Plus,
  ShieldCheck,
  Truck,
  RotateCcw,
  ChevronDown,
  AlertCircle,
  Check,
} from 'lucide-react';

interface ProductInfoProps {
  product: Product;
}

export function ProductInfo({ product }: ProductInfoProps) {
  const { addItem } = useCart();
  const { isFavorite, toggleFavorite } = useFavorites();

  const [selectedColor, setSelectedColor] = useState<string>(
    product.availableColors?.[0]?.name || ''
  );
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [quantity, setQuantity] = useState<number>(1);
  const [sizeError, setSizeError] = useState<boolean>(false);
  const [addedSuccess, setAddedSuccess] = useState<boolean>(false);

  // Accordion active states
  const [openAccordions, setOpenAccordions] = useState<Record<string, boolean>>({
    details: true,
    fit: false,
    care: false,
    shipping: false,
  });

  const toggleAccordion = (key: string) => {
    setOpenAccordions((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const hasSizes = product.availableSizes && product.availableSizes.length > 0;
  const isOneSize =
    hasSizes &&
    product.availableSizes?.length === 1 &&
    product.availableSizes[0].toLowerCase().includes('unique');

  const handleAddToCart = () => {
    if (hasSizes && !isOneSize && !selectedSize) {
      setSizeError(true);
      return;
    }

    setSizeError(false);
    const sizeToPass = isOneSize
      ? product.availableSizes?.[0]
      : selectedSize || undefined;

    addItem(product, sizeToPass, selectedColor || undefined, quantity);

    setAddedSuccess(true);
    setTimeout(() => setAddedSuccess(false), 2000);
  };

  const favorited = isFavorite(product.slug);

  return (
    <div className="space-y-5 sm:space-y-6">
      {/* Category & Reference */}
      <div className="flex items-center justify-between text-[10px] sm:text-[11px] uppercase tracking-[0.16em] sm:tracking-[0.2em] text-taupe">
        <span>{product.categoryLabel}</span>
        <span>Réf. {product.reference}</span>
      </div>

      {/* Title & Price */}
      <div>
        <h1 className="font-serif text-2xl xs:text-3xl sm:text-4xl text-black font-normal leading-tight">
          {product.name}
        </h1>
        <div className="mt-2.5 sm:mt-3 flex items-baseline gap-3">
          <span className="text-xl sm:text-2xl font-light text-charcoal">
            {formatPrice(product.price)}
          </span>
          {product.compareAtPrice && (
            <span className="text-sm text-taupe line-through">
              {formatPrice(product.compareAtPrice)}
            </span>
          )}
          <span className="text-[10px] sm:text-[11px] text-taupe">TVA incluse</span>
        </div>
      </div>

      {/* Short Description */}
      <p className="text-xs sm:text-sm text-charcoal/85 leading-relaxed font-light">
        {product.shortDescription}
      </p>

      <div className="h-[1px] bg-border-light my-3 sm:my-4" />

      {/* Color Selection */}
      {product.availableColors && product.availableColors.length > 0 && (
        <div className="space-y-2">
          <div className="flex justify-between text-xs">
            <span className="font-medium text-black">Coloris</span>
            <span className="text-taupe">{selectedColor}</span>
          </div>
          <div className="flex items-center gap-2">
            {product.availableColors.map((col) => (
              <button
                key={col.name}
                type="button"
                onClick={() => setSelectedColor(col.name)}
                className={`w-9 h-9 sm:w-8 sm:h-8 rounded-full border flex items-center justify-center transition-all ${
                  selectedColor === col.name
                    ? 'border-black ring-1 ring-black'
                    : 'border-transparent hover:border-black/30'
                }`}
                title={col.name}
                aria-label={`Choisir le coloris ${col.name}`}
              >
                <span
                  className="block w-6 h-6 rounded-full border border-black/10"
                  style={{ backgroundColor: col.hex }}
                />
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Size Selection */}
      {hasSizes && !isOneSize && (
        <div className="space-y-2 pt-1">
          <div className="flex justify-between items-center text-xs">
            <span className="font-medium text-black">
              Taille / Pointure <span className="text-rose-600">*</span>
            </span>
            <button
              type="button"
              onClick={() => toggleAccordion('fit')}
              className="text-taupe hover:text-black underline text-[11px] py-1"
            >
              Guide des tailles
            </button>
          </div>

          <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
            {product.availableSizes?.map((sz) => {
              const isSelected = selectedSize === sz;
              return (
                <button
                  key={sz}
                  type="button"
                  onClick={() => {
                    setSelectedSize(sz);
                    setSizeError(false);
                  }}
                  className={`min-h-[44px] flex items-center justify-center text-xs text-center border font-medium transition-all ${
                    isSelected
                      ? 'border-black bg-black text-white'
                      : 'border-border-light text-charcoal hover:border-black bg-white'
                  }`}
                >
                  {sz}
                </button>
              );
            })}
          </div>

          {sizeError && (
            <div className="flex items-center gap-1.5 text-xs text-rose-700 pt-1">
              <AlertCircle className="w-3.5 h-3.5 shrink-0" />
              <span>Veuillez sélectionner une taille avant d&apos;ajouter au panier.</span>
            </div>
          )}
        </div>
      )}

      {/* Quantity & Actions (Mobile Optimized) */}
      <div className="pt-2 space-y-3">
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Quantity selector with 44px touch targets */}
          <div className="inline-flex items-center border border-border-light bg-white h-12 shrink-0">
            <button
              type="button"
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              className="w-10 h-full flex items-center justify-center text-charcoal hover:bg-sand/20 transition-colors"
              aria-label="Diminuer la quantité"
            >
              <Minus className="w-3 h-3" />
            </button>
            <span className="px-2 text-xs font-medium text-black min-w-7 text-center">
              {quantity}
            </span>
            <button
              type="button"
              onClick={() => setQuantity((q) => q + 1)}
              className="w-10 h-full flex items-center justify-center text-charcoal hover:bg-sand/20 transition-colors"
              aria-label="Augmenter la quantité"
            >
              <Plus className="w-3 h-3" />
            </button>
          </div>

          {/* Add to Cart button */}
          <Button
            type="button"
            variant="primary"
            onClick={handleAddToCart}
            className="flex-1 h-12 text-[11px] sm:text-xs"
          >
            {addedSuccess ? (
              <span className="inline-flex items-center gap-1.5 text-emerald-300">
                <Check className="w-4 h-4" />
                <span>Ajouté</span>
              </span>
            ) : (
              <span>Ajouter au panier</span>
            )}
          </Button>

          {/* Wishlist toggle - 48x48px touch target */}
          <button
            type="button"
            onClick={() => toggleFavorite(product.slug)}
            className={`h-12 w-12 shrink-0 border flex items-center justify-center transition-colors ${
              favorited
                ? 'border-black bg-black text-white'
                : 'border-border-light bg-white text-charcoal hover:border-black'
            }`}
            aria-label={favorited ? 'Retirer des favoris' : 'Ajouter aux favoris'}
          >
            <Heart
              className={`w-4 h-4 ${favorited ? 'fill-white' : ''}`}
            />
          </button>
        </div>
      </div>

      {/* Service Highlights */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-3 pt-4 border-t border-border-light text-[11px] text-taupe">
        <div className="flex items-center gap-2">
          <Truck className="w-3.5 h-3.5 text-black shrink-0" />
          <span>Livraison offerte dès 300 €</span>
        </div>
        <div className="flex items-center gap-2">
          <RotateCcw className="w-3.5 h-3.5 text-black shrink-0" />
          <span>Retours sous 14 jours</span>
        </div>
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-3.5 h-3.5 text-black shrink-0" />
          <span>Confection d&apos;atelier</span>
        </div>
      </div>

      {/* Accordions */}
      <div className="border-t border-border-light divide-y divide-border-light pt-1">
        {/* Accordion 1: Details & Story */}
        <div className="py-3 sm:py-4">
          <button
            type="button"
            onClick={() => toggleAccordion('details')}
            className="w-full min-h-[44px] flex items-center justify-between text-left text-xs uppercase tracking-wider font-semibold text-black"
          >
            <span>Détails & Matières</span>
            <ChevronDown
              className={`w-4 h-4 text-taupe transition-transform duration-200 ${
                openAccordions.details ? 'rotate-180' : ''
              }`}
            />
          </button>
          {openAccordions.details && (
            <div className="pt-2 sm:pt-3 text-xs text-charcoal/90 space-y-2 animate-fade-in font-light leading-relaxed">
              <p>{product.description}</p>
              {product.material && (
                <p>
                  <strong className="font-medium text-black">Matière :</strong>{' '}
                  {product.material}
                </p>
              )}
              {product.origin && (
                <p>
                  <strong className="font-medium text-black">Confection :</strong>{' '}
                  {product.origin}
                </p>
              )}
            </div>
          )}
        </div>

        {/* Accordion 2: Size & Fit */}
        <div className="py-3 sm:py-4">
          <button
            type="button"
            onClick={() => toggleAccordion('fit')}
            className="w-full min-h-[44px] flex items-center justify-between text-left text-xs uppercase tracking-wider font-semibold text-black"
          >
            <span>Coupe & Conseils de Taille</span>
            <ChevronDown
              className={`w-4 h-4 text-taupe transition-transform duration-200 ${
                openAccordions.fit ? 'rotate-180' : ''
              }`}
            />
          </button>
          {openAccordions.fit && (
            <div className="pt-2 sm:pt-3 text-xs text-charcoal/90 space-y-2 animate-fade-in font-light leading-relaxed">
              <p>{product.fit || 'Coupe classique contemporaine. Prenez votre taille usuelle.'}</p>
              <div className="p-3 bg-sand/20 border border-border-light text-[11px] text-taupe mt-2">
                Besoin d&apos;un conseil personnalisé sur les mensurations ? Notre équipe
                d&apos;atelier se tient à votre disposition à contact@maisonmoya.com.
              </div>
            </div>
          )}
        </div>

        {/* Accordion 3: Care Instructions */}
        {product.careInstructions && product.careInstructions.length > 0 && (
          <div className="py-3 sm:py-4">
            <button
              type="button"
              onClick={() => toggleAccordion('care')}
              className="w-full min-h-[44px] flex items-center justify-between text-left text-xs uppercase tracking-wider font-semibold text-black"
            >
              <span>Entretien & Pérennité</span>
              <ChevronDown
                className={`w-4 h-4 text-taupe transition-transform duration-200 ${
                  openAccordions.care ? 'rotate-180' : ''
                }`}
              />
            </button>
            {openAccordions.care && (
              <ul className="pt-2 sm:pt-3 text-xs text-charcoal/90 space-y-1.5 list-disc list-inside animate-fade-in font-light leading-relaxed">
                {product.careInstructions.map((instruction, idx) => (
                  <li key={idx}>{instruction}</li>
                ))}
              </ul>
            )}
          </div>
        )}

        {/* Accordion 4: Shipping & Returns */}
        <div className="py-3 sm:py-4">
          <button
            type="button"
            onClick={() => toggleAccordion('shipping')}
            className="w-full min-h-[44px] flex items-center justify-between text-left text-xs uppercase tracking-wider font-semibold text-black"
          >
            <span>Livraison & Retours Discrets</span>
            <ChevronDown
              className={`w-4 h-4 text-taupe transition-transform duration-200 ${
                openAccordions.shipping ? 'rotate-180' : ''
              }`}
            />
          </button>
          {openAccordions.shipping && (
            <div className="pt-2 sm:pt-3 text-xs text-charcoal/90 space-y-2 animate-fade-in font-light leading-relaxed">
              <p>
                Chaque commande est préparée sous emballage soigné en coffret siglé
                fermé par ruban d&apos;atelier.
              </p>
              <p>
                Livraison standard sous 2 à 4 jours ouvrés. Retours simples et offerts
                depuis la France métropolitaine et l&apos;Union Européenne sous 14 jours.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
