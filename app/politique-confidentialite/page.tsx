import React from 'react';
import type { Metadata } from 'next';
import { Container } from '@/components/ui/Container';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';

export const metadata: Metadata = {
  title: 'Politique de Confidentialité & Mentions Légales',
  description:
    'Notice d’information relative au traitement des données personnelles et mentions légales pour la démonstration MAISON MOYA.',
};

export default function PolitiqueConfidentialitePage() {
  return (
    <div className="py-12 bg-ivory min-h-screen">
      <Container size="sm">
        <Breadcrumbs items={[{ label: 'Politique de Confidentialité' }]} />

        {/* Heading */}
        <div className="border-b border-border-light pb-8 pt-4 mb-10">
          <p className="text-[11px] uppercase tracking-[0.25em] text-taupe font-medium mb-2">
            Mentions Légales & Données
          </p>
          <h1 className="font-serif text-3xl sm:text-4xl text-black mb-3">
            Politique de Confidentialité
          </h1>
          <p className="text-xs sm:text-sm text-taupe font-light">
            Document indicatif rédigé dans le cadre de la démonstration front-end de la
            marque MAISON MOYA. À valider par un conseil juridique avant mise en production.
          </p>
        </div>

        {/* Disclaimer Alert */}
        <div className="p-4 bg-sand/30 border border-border-light text-xs text-charcoal mb-10 leading-relaxed">
          <strong className="font-semibold block mb-1">
            Note relative à l&apos;environnement de démonstration :
          </strong>
          Le présent site constitue une implémentation frontend autonome. Aucune donnée
          bancaire n&apos;est collectée, et les interactions liées au panier et aux
          favoris sont traitées exclusivement en mémoire locale (localStorage) sur votre
          navigateur.
        </div>

        {/* Legal sections */}
        <div className="space-y-8 text-xs sm:text-sm text-charcoal font-light leading-relaxed divide-y divide-border-light">
          <section className="space-y-2 pt-4">
            <h2 className="font-serif text-xl text-black font-normal">
              1. Responsable du Traitement
            </h2>
            <p>
              La marque <strong className="font-medium text-black">MAISON MOYA</strong> est
              une entité fictive créée à des fins de démonstration technique et
              stylistique. Tout contact relatif au projet peut être adressé via le
              référent technique ou l&apos;équipe de développement.
            </p>
          </section>

          <section className="space-y-2 pt-6">
            <h2 className="font-serif text-xl text-black font-normal">
              2. Données Stockées Localement
            </h2>
            <p>
              Pour permettre le bon fonctionnement de la navigation, le site utilise les
              mécanismes de stockage local de votre navigateur :
            </p>
            <ul className="list-disc list-inside space-y-1 text-xs text-taupe pl-2">
              <li>
                <code className="text-black bg-sand/30 px-1">maison_moya_cart_v1</code> :
                maintien des articles placés dans le panier d&apos;achat.
              </li>
              <li>
                <code className="text-black bg-sand/30 px-1">maison_moya_favorites_v1</code> :
                conservation de votre liste d&apos;envies.
              </li>
            </ul>
            <p className="text-xs text-taupe pt-1">
              Ces données demeurent sur votre appareil et peuvent être supprimées à tout
              instant en effaçant les données de navigation de votre navigateur.
            </p>
          </section>

          <section className="space-y-2 pt-6">
            <h2 className="font-serif text-xl text-black font-normal">
              3. Droits d’Accès et de Rectification
            </h2>
            <p>
              Conformément à la réglementation européenne (RGPD), toute personne conserve
              un droit d&apos;accès, de rectification et d&apos;effacement des données qui la
              concernent. Dans le cadre de ce frontend autonome, aucune base de données
              utilisateur distante n&apos;est encore connectée.
            </p>
          </section>

          <section className="space-y-2 pt-6">
            <h2 className="font-serif text-xl text-black font-normal">
              4. Cookies Tiers & Traceurs
            </h2>
            <p>
              Le site ne dépose aucun cookie publicitaire ou traceur comportemental
              commercial. Les polices de caractères et ressources visuelles sont servies
              de manière optimisée dans le respect des normes de performance web.
            </p>
          </section>
        </div>
      </Container>
    </div>
  );
}
