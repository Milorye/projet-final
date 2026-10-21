import { Suspense } from 'react';
import type { Metadata } from 'next';
import { RechercheClient } from '@/components/search/RechercheClient';

export const metadata: Metadata = {
  title: 'Recherche de Créations',
  description:
    'Recherchez une pièce, une coupe ou une matière d’exception au sein du catalogue MAISON MOYA.',
};

export default function RecherchePage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen py-24 text-center">
          <div className="inline-block w-6 h-6 border-2 border-black border-t-transparent rounded-full animate-spin" />
          <p className="text-xs uppercase tracking-widest text-taupe mt-4">
            Recherche en cours...
          </p>
        </div>
      }
    >
      <RechercheClient />
    </Suspense>
  );
}
