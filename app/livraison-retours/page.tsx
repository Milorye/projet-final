import React from 'react';
import type { Metadata } from 'next';
import { Container } from '@/components/ui/Container';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { Truck, RotateCcw } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Livraison & Retours',
  description:
    'Modalités d’expédition discrète, délais indicatifs de livraison et procédure de retours sous 14 jours pour MAISON MOYA.',
};

export default function LivraisonRetoursPage() {
  return (
    <div className="py-12 bg-ivory min-h-screen">
      <Container size="sm">
        <Breadcrumbs items={[{ label: 'Livraison & Retours' }]} />

        {/* Heading */}
        <div className="border-b border-border-light pb-8 pt-4 mb-10">
          <p className="text-[11px] uppercase tracking-[0.25em] text-taupe font-medium mb-2">
            Service Clientèle
          </p>
          <h1 className="font-serif text-3xl sm:text-4xl text-black mb-3">
            Livraison & Retours
          </h1>
          <p className="text-xs sm:text-sm text-taupe font-light">
            Informations indicatives et configurables concernant l&apos;acheminement de vos
            commandes et nos modalités d&apos;échange.
          </p>
        </div>

        {/* Grid info cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12">
          <div className="p-6 bg-white border border-border-light space-y-2">
            <Truck className="w-5 h-5 text-black mb-1" />
            <h3 className="font-serif text-lg text-black">Livraison Standard</h3>
            <p className="text-xs text-charcoal/80 font-light leading-relaxed">
              Expédition sous 2 à 4 jours ouvrés. Offerte pour toute commande supérieure ou
              égale à 300 €. Forfait de 15 € pour les montants inférieurs.
            </p>
          </div>

          <div className="p-6 bg-white border border-border-light space-y-2">
            <RotateCcw className="w-5 h-5 text-black mb-1" />
            <h3 className="font-serif text-lg text-black">Retours sous 14 jours</h3>
            <p className="text-xs text-charcoal/80 font-light leading-relaxed">
              Vous disposez d&apos;un délai de rétractation de 14 jours francs à compter de
              la réception de votre colis pour effectuer un retour ou un échange.
            </p>
          </div>
        </div>

        {/* Detailed Sections */}
        <div className="space-y-10 text-xs sm:text-sm text-charcoal font-light leading-relaxed divide-y divide-border-light">
          <section className="space-y-3 pt-6">
            <h2 className="font-serif text-xl text-black font-normal">
              1. Préparation et Écrin d’Atelier
            </h2>
            <p>
              Toutes les pièces de la Maison font l&apos;objet d&apos;un contrôle qualité
              minutieux avant expédition. Les vêtements sont pliés sous papier de soie et
              les souliers et pièces de maroquinerie sont protégés dans leurs pochons en
              coton naturel siglés.
            </p>
          </section>

          <section className="space-y-3 pt-6">
            <h2 className="font-serif text-xl text-black font-normal">
              2. Zones et Délais Indicatifs
            </h2>
            <p>
              Les expéditions sont assurées par des transporteurs certifiés avec remise
              contre signature :
            </p>
            <ul className="list-disc list-inside space-y-1 text-xs text-taupe pl-2">
              <li>France métropolitaine et Monaco : 48 à 72 heures ouvrées.</li>
              <li>Union Européenne et Suisse : 3 à 5 jours ouvrés.</li>
              <li>International : 5 à 8 jours ouvrés selon les formalités douanières.</li>
            </ul>
          </section>

          <section className="space-y-3 pt-6">
            <h2 className="font-serif text-xl text-black font-normal">
              3. Modalités de Retour et Remboursement
            </h2>
            <p>
              Les articles doivent être retournés neufs, non portés, non lavés, dans leur
              état d&apos;origine et munis de l&apos;ensemble de leurs étiquettes intactes.
            </p>
            <p>
              Après réception et validation par nos ateliers, le remboursement est opéré
              sur le moyen de paiement utilisé lors de l&apos;achat sous un délai de 7 jours
              ouvrés.
            </p>
          </section>

          <section className="space-y-3 pt-6">
            <h2 className="font-serif text-xl text-black font-normal">
              4. Une question sur votre commande ?
            </h2>
            <p>
              Notre service clientèle est joignable du lundi au vendredi, de 9h à 18h par
              e-mail à l&apos;adresse suivante :{' '}
              <strong className="text-black font-medium">contact@maisonmoya.com</strong>.
            </p>
          </section>
        </div>
      </Container>
    </div>
  );
}
