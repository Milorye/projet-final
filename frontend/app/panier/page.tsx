'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '@/context/CartContext';
import { Container } from '@/components/ui/Container';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { EmptyState } from '@/components/ui/EmptyState';
import { Button } from '@/components/ui/Button';
import { formatPrice } from '@/lib/utils';
import {
  Trash2,
  Minus,
  Plus,
  ShoppingBag,
  ShieldCheck,
  Truck,
  RotateCcw,
  ArrowRight,
  Info,
  X,
  Lock,
} from 'lucide-react';

export default function PanierPage() {
  const {
    items,
    updateQuantity,
    removeItem,
    clearCart,
    subtotal,
    shipping,
    total,
    itemCount,
  } = useCart();

  const [promoCode, setPromoCode] = useState('');
  const [promoNotice, setPromoNotice] = useState<string | null>(null);
  const [checkoutModalOpen, setCheckoutModalOpen] = useState(false);

  const freeShippingThreshold = 300;
  const missingForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!promoCode.trim()) return;
    setPromoNotice(
      'Démonstration front-end : les codes privilèges seront validés lors du raccordement au service de commandes.'
    );
  };

  return (
    <div className="py-6 sm:py-12 bg-ivory min-h-screen">
      <Container>
        <Breadcrumbs items={[{ label: 'Mon Panier' }]} />

        {/* Page Heading */}
        <div className="border-b border-border-light pb-4 sm:pb-6 pt-2 sm:pt-4 mb-6 sm:mb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-3 sm:gap-4">
          <div>
            <p className="text-[10px] sm:text-[11px] uppercase tracking-[0.25em] text-taupe font-medium mb-1">
              Commande
            </p>
            <h1 className="font-serif text-2xl xs:text-3xl sm:text-4xl text-black">
              Votre Panier d’Achat
            </h1>
          </div>
          {items.length > 0 && (
            <button
              type="button"
              onClick={clearCart}
              className="text-xs text-taupe hover:text-black underline underline-offset-4 self-start sm:self-auto py-1"
            >
              Vider le panier
            </button>
          )}
        </div>

        {items.length === 0 ? (
          <EmptyState
            icon={<ShoppingBag className="w-12 h-12 stroke-1" />}
            title="Votre panier est actuellement vide"
            description="Laissez-vous séduire par nos créations d'exception façonnées selon les plus hauts standards de la couture contemporaine."
            actionLabel="Explorer la boutique"
            actionHref="/boutique"
          />
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-start">
            {/* Cart Items Table */}
            <div className="lg:col-span-8 bg-white border border-border-light/80 p-4 sm:p-8 space-y-5 sm:space-y-6">
              {/* Shipping banner */}
              <div className="p-3 sm:p-3.5 bg-sand/25 border border-border-light text-xs text-charcoal flex items-center justify-between">
                <span>
                  {subtotal >= freeShippingThreshold ? (
                    <strong className="text-emerald-800">
                      ✓ Vous bénéficiez de la livraison standard offerte.
                    </strong>
                  ) : (
                    <span>
                      Plus que{' '}
                      <strong className="text-black font-semibold">
                        {formatPrice(missingForFreeShipping)}
                      </strong>{' '}
                      d&apos;achats pour profiter de la livraison offerte.
                    </span>
                  )}
                </span>
                <Truck className="w-4 h-4 text-taupe shrink-0 ml-2" />
              </div>

              {/* Items List */}
              <div className="divide-y divide-border-light">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="py-4 sm:py-6 first:pt-2 last:pb-2 flex flex-col sm:flex-row gap-4 sm:gap-5 items-start sm:items-center justify-between"
                  >
                    {/* Visual & Description */}
                    <div className="flex gap-3 sm:gap-4 items-center w-full sm:w-auto">
                      <div className="relative w-16 h-22 sm:w-20 sm:h-26 shrink-0 bg-sand/20 overflow-hidden">
                        <Image
                          src={item.product.images[0]?.url || ''}
                          alt={item.product.name}
                          fill
                          sizes="80px"
                          className="object-cover object-center"
                        />
                      </div>

                      <div className="space-y-0.5 sm:space-y-1 min-w-0 flex-1">
                        <span className="text-[9px] sm:text-[10px] uppercase tracking-wider text-taupe">
                          {item.product.categoryLabel}
                        </span>
                        <h3 className="font-serif text-sm sm:text-base text-black truncate">
                          <Link
                            href={`/produit/${item.product.slug}`}
                            className="hover:underline"
                          >
                            {item.product.name}
                          </Link>
                        </h3>
                        <p className="text-[11px] sm:text-xs text-taupe">
                          {item.size && `Taille : ${item.size}`}
                          {item.size && item.color && ' · '}
                          {item.color && `Coloris : ${item.color}`}
                        </p>
                        <p className="text-xs font-medium text-black pt-0.5 sm:pt-1">
                          {formatPrice(item.unitPrice)}
                        </p>
                      </div>
                    </div>

                    {/* Quantity & Line Total */}
                    <div className="flex items-center justify-between sm:justify-end gap-4 sm:gap-6 w-full sm:w-auto pt-3 sm:pt-0 border-t sm:border-t-0 border-border-light/60">
                      {/* Qty Counter with 36px touch targets */}
                      <div className="inline-flex items-center border border-border-light bg-white h-9">
                        <button
                          type="button"
                          onClick={() =>
                            updateQuantity(item.id, item.quantity - 1)
                          }
                          className="w-8 h-full flex items-center justify-center text-charcoal hover:bg-sand/30 transition-colors"
                          aria-label="Diminuer la quantité"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2 text-xs font-medium text-black min-w-6 text-center">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() =>
                            updateQuantity(item.id, item.quantity + 1)
                          }
                          className="w-8 h-full flex items-center justify-center text-charcoal hover:bg-sand/30 transition-colors"
                          aria-label="Augmenter la quantité"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      {/* Total price for line */}
                      <span className="font-medium text-xs sm:text-sm text-black min-w-16 sm:min-w-20 text-right">
                        {formatPrice(item.unitPrice * item.quantity)}
                      </span>

                      {/* Remove Button */}
                      <button
                        type="button"
                        onClick={() => removeItem(item.id)}
                        className="text-taupe hover:text-rose-700 w-9 h-9 flex items-center justify-center transition-colors"
                        aria-label={`Supprimer ${item.product.name}`}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Service Trust */}
              <div className="pt-4 sm:pt-6 border-t border-border-light grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-taupe">
                <div className="flex items-center gap-2">
                  <Truck className="w-4 h-4 text-black shrink-0" />
                  <span>Écrin soigné d’atelier</span>
                </div>
                <div className="flex items-center gap-2">
                  <RotateCcw className="w-4 h-4 text-black shrink-0" />
                  <span>Retours offerts sous 14 jours</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-black shrink-0" />
                  <span>Garantie authenticité</span>
                </div>
              </div>
            </div>

            {/* Order Summary Column */}
            <div className="lg:col-span-4 bg-white border border-border-light/80 p-5 sm:p-8 space-y-5 sm:space-y-6 lg:sticky lg:top-28">
              <h2 className="font-serif text-lg sm:text-xl text-black pb-3 sm:pb-4 border-b border-border-light">
                Récapitulatif ({itemCount} article{itemCount > 1 ? 's' : ''})
              </h2>

              <div className="space-y-3 text-xs">
                <div className="flex justify-between text-taupe">
                  <span>Sous-total HT</span>
                  <span className="text-black font-medium">
                    {formatPrice(subtotal * 0.8)}
                  </span>
                </div>
                <div className="flex justify-between text-taupe">
                  <span>TVA estimée (20 %)</span>
                  <span className="text-black font-medium">
                    {formatPrice(subtotal * 0.2)}
                  </span>
                </div>
                <div className="flex justify-between text-taupe">
                  <span>Frais de livraison</span>
                  <span className="text-black font-medium">
                    {shipping === 0 ? (
                      <span className="text-emerald-700">Offerts</span>
                    ) : (
                      formatPrice(shipping)
                    )}
                  </span>
                </div>

                <div className="pt-3 sm:pt-4 border-t border-border-light flex justify-between text-base font-semibold text-black">
                  <span>Total TTC</span>
                  <span>{formatPrice(total)}</span>
                </div>
              </div>

              {/* Promotional code input */}
              <form onSubmit={handleApplyPromo} className="space-y-2 pt-1">
                <label
                  htmlFor="promo-input"
                  className="block text-[10px] sm:text-[11px] uppercase tracking-wider text-taupe font-medium"
                >
                  Code privilège
                </label>
                <div className="flex gap-2">
                  <input
                    id="promo-input"
                    type="text"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    placeholder="Code avantage"
                    className="flex-1 px-3 py-2 min-h-[42px] text-xs border border-border-light bg-ivory focus:outline-hidden focus:border-black uppercase"
                  />
                  <Button type="submit" variant="outline" size="sm" className="min-h-[42px]">
                    Appliquer
                  </Button>
                </div>
                {promoNotice && (
                  <p className="text-[11px] text-taupe italic pt-1">{promoNotice}</p>
                )}
              </form>

              {/* Checkout CTA with 48px touch target */}
              <div className="pt-2 space-y-2.5">
                <Button
                  variant="primary"
                  className="w-full min-h-[48px] flex items-center justify-center gap-2"
                  onClick={() => setCheckoutModalOpen(true)}
                >
                  <Lock className="w-3.5 h-3.5" />
                  <span>Procéder au paiement</span>
                  <ArrowRight className="w-3.5 h-3.5 ml-1" />
                </Button>

                <Button
                  variant="ghost"
                  size="sm"
                  href="/boutique"
                  className="w-full text-center min-h-[40px]"
                >
                  Continuer vos achats
                </Button>
              </div>

              <div className="pt-1 text-center text-[10px] text-taupe tracking-wide">
                Transactions chiffrées SSL 256 bits · Expédition discrète
              </div>
            </div>
          </div>
        )}

        {/* Demonstrative Checkout Boundary Modal */}
        {checkoutModalOpen && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in"
            role="dialog"
            aria-modal="true"
            aria-labelledby="checkout-modal-title"
          >
            <div className="relative w-full max-w-lg bg-white border border-border-light p-5 sm:p-8 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
              <button
                onClick={() => setCheckoutModalOpen(false)}
                className="absolute top-3 right-3 sm:top-4 sm:right-4 w-10 h-10 flex items-center justify-center text-taupe hover:text-black"
                aria-label="Fermer la fenêtre"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-2 text-gold">
                <Info className="w-5 h-5 shrink-0" />
                <span className="text-xs uppercase tracking-widest font-semibold">
                  Information Déploiement & Intégration
                </span>
              </div>

              <h3 id="checkout-modal-title" className="font-serif text-xl sm:text-2xl text-black">
                Périmètre Démonstration Front-End
              </h3>

              <div className="text-xs sm:text-sm text-charcoal/90 space-y-3 font-light leading-relaxed">
                <p>
                  Vous avez initié la finalisation d&apos;une commande de{' '}
                  <strong className="font-semibold text-black">
                    {formatPrice(total)}
                  </strong>{' '}
                  comprenant {itemCount} article{itemCount > 1 ? 's' : ''}.
                </p>
                <p>
                  Conformément au cahier des charges de la phase frontend de{' '}
                  <strong>MAISON MOYA</strong>, le système de paiement réel et le
                  tunnel d&apos;authentification bancaire (Stripe / Apple Pay / Klarna)
                  seront raccordés lors du déploiement de l&apos;API backend.
                </p>
                <p className="bg-sand/30 p-3 border border-border-light text-[11px] text-charcoal">
                  ✓ Votre panier local reste conservé sur votre appareil. Aucune coordonnée
                  bancaire n&apos;a été requise ni transmise.
                </p>
              </div>

              <div className="pt-3 flex flex-col sm:flex-row gap-2.5">
                <Button
                  variant="primary"
                  className="flex-1 min-h-[44px]"
                  onClick={() => setCheckoutModalOpen(false)}
                >
                  Continuer la navigation
                </Button>
                <Button
                  variant="outline"
                  className="flex-1 min-h-[44px]"
                  href="/boutique"
                  onClick={() => setCheckoutModalOpen(false)}
                >
                  Explorer d&apos;autres pièces
                </Button>
              </div>
            </div>
          </div>
        )}
      </Container>
    </div>
  );
}
