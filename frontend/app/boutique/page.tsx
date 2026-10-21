import { Suspense } from 'react';
import type { Metadata } from 'next';
import { BoutiqueClient } from '@/components/products/BoutiqueClient';

export const metadata: Metadata = {
  title: 'Boutique en Ligne',
  description:
    'Découvrez l’ensemble du vestiaire MAISON MOYA : prêt-à-porter haute couture, maroquinerie d’art, souliers d’exception et soieries.',
};

export default function BoutiquePage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen py-24 text-center">
          <div className="inline-block w-6 h-6 border-2 border-black border-t-transparent rounded-full animate-spin" />
          <p className="text-xs uppercase tracking-widest text-taupe mt-4">
            Chargement de la boutique...
          </p>
        </div>
      }
    >
      <BoutiqueClient />
    </Suspense>
  );
}
