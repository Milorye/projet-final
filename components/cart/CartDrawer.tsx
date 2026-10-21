'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { X, Minus, Plus, Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { formatPrice } from '@/lib/utils';
import { Button } from '@/components/ui/Button';

export function CartDrawer() {
  const {
    items,
    isOpen,
    closeCart,
    updateQuantity,
    removeItem,
    subtotal,
    itemCount,
    shipping,
    total,
  } = useCart();

  // Escape key handler
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        closeCart();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, closeCart]);

  // Prevent body scrolling when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const freeShippingThreshold = 300;
  const missingForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);

  return (
    <div
      className="fixed inset-0 z-50 overflow-hidden"
      role="dialog"
      aria-modal="true"
      aria-labelledby="cart-title"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity duration-300"
        onClick={closeCart}
      />

      <div className="fixed inset-y-0 right-0 flex max-w-full pl-0 sm:pl-10">
        <div className="w-screen max-w-full sm:max-w-md bg-white shadow-2xl flex flex-col animate-fade-in">
          {/* Header */}
          <div className="px-5 py-4 border-b border-border-light flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <ShoppingBag className="w-4 h-4 text-black" />
              <h2 id="cart-title" className="font-serif text-base sm:text-lg tracking-wide text-black">
                Votre Sélection ({itemCount})
              </h2>
            </div>
            <button
              onClick={closeCart}
              className="w-11 h-11 flex items-center justify-center text-taupe hover:text-black transition-colors rounded-full -mr-2"
              aria-label="Fermer le panier"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Shipping incentive banner */}
          <div className="bg-sand/30 px-5 py-2.5 text-xs text-charcoal border-b border-border-light">
            {subtotal >= freeShippingThreshold ? (
              <span className="font-medium text-emerald-800">
                ✓ Livraison standard offerte pour votre commande
              </span>
            ) : (
              <span>
                Plus que{' '}
                <strong className="text-black">{formatPrice(missingForFreeShipping)}</strong>{' '}
                pour la livraison offerte
              </span>
            )}
          </div>

          {/* Cart items list */}
          <div className="flex-1 overflow-y-auto px-5 py-4 divide-y divide-border-light/60">
            {items.length === 0 ? (
              <div className="py-16 text-center flex flex-col items-center">
                <ShoppingBag className="w-10 h-10 text-sand mb-4 stroke-1" />
                <p className="font-serif text-xl text-black mb-2">Votre panier est vide</p>
                <p className="text-xs text-taupe max-w-xs mb-6">
                  Découvrez nos nouvelles créations façonnées avec une exigence intemporelle.
                </p>
                <Button variant="outline" size="sm" onClick={closeCart} href="/boutique" className="min-h-[44px]">
                  Explorer la boutique
                </Button>
              </div>
            ) : (
              items.map((item) => (
                <div key={item.id} className="py-4 flex gap-3.5 sm:gap-4">
                  {/* Thumbnail */}
                  <div className="relative w-18 h-24 sm:w-20 sm:h-26 shrink-0 bg-sand/20 overflow-hidden">
                    <Image
                      src={item.product.images[0]?.url || ''}
                      alt={item.product.images[0]?.alt || item.product.name}
                      fill
                      sizes="80px"
                      className="object-cover"
                    />
                  </div>

                  {/* Details */}
                  <div className="flex-1 flex flex-col justify-between min-w-0">
                    <div>
                      <div className="flex justify-between items-start gap-2">
                        <Link
                          href={`/produit/${item.product.slug}`}
                          onClick={closeCart}
                          className="font-serif text-xs sm:text-sm text-black hover:underline line-clamp-1"
                        >
                          {item.product.name}
                        </Link>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-taupe hover:text-black w-8 h-8 flex items-center justify-center transition-colors shrink-0 -mr-1"
                          aria-label={`Supprimer ${item.product.name}`}
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <p className="text-[11px] text-taupe mt-0.5 truncate">
                        {item.size && `Taille : ${item.size}`}
                        {item.size && item.color && ' · '}
                        {item.color && `Coloris : ${item.color}`}
                      </p>

                      <p className="text-xs font-medium text-black mt-1">
                        {formatPrice(item.unitPrice)}
                      </p>
                    </div>

                    {/* Quantity Selector with comfortable touch area */}
                    <div className="flex items-center justify-between pt-2">
                      <div className="inline-flex items-center border border-border-light h-8 sm:h-9">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-8 h-full flex items-center justify-center text-charcoal hover:bg-sand/30 transition-colors"
                          aria-label="Diminuer la quantité"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2 text-xs font-medium text-black min-w-6 text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-8 h-full flex items-center justify-center text-charcoal hover:bg-sand/30 transition-colors"
                          aria-label="Augmenter la quantité"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <span className="text-xs font-semibold text-black">
                        {formatPrice(item.unitPrice * item.quantity)}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer / Summary */}
          {items.length > 0 && (
            <div className="border-t border-border-light p-5 sm:p-6 bg-ivory/60 space-y-3">
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between text-taupe">
                  <span>Sous-total</span>
                  <span className="text-black font-medium">{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between text-taupe">
                  <span>Livraison estimée</span>
                  <span className="text-black font-medium">
                    {shipping === 0 ? 'Offerte' : formatPrice(shipping)}
                  </span>
                </div>
                <div className="flex justify-between text-sm font-semibold text-black pt-2 border-t border-border-light">
                  <span>Total TTC</span>
                  <span>{formatPrice(total)}</span>
                </div>
              </div>

              <div className="pt-2 space-y-2">
                <Button
                  variant="primary"
                  className="w-full min-h-[46px] flex items-center justify-center gap-2"
                  href="/panier"
                  onClick={closeCart}
                >
                  <span>Finaliser la commande</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Button>

                <Button
                  variant="outline"
                  size="sm"
                  className="w-full text-center min-h-[42px]"
                  href="/panier"
                  onClick={closeCart}
                >
                  Voir le panier détaillé
                </Button>
              </div>

              <p className="text-[10px] text-center text-taupe tracking-wide pt-1">
                Paiement sécurisé · Expédition discrète & soignée
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
