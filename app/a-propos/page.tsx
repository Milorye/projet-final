import React from 'react';
import type { Metadata } from 'next';
import Image from 'next/image';
import { Container } from '@/components/ui/Container';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { Button } from '@/components/ui/Button';

export const metadata: Metadata = {
  title: 'À Propos de la Maison',
  description:
    'L’histoire et la vision de MAISON MOYA : la recherche de la coupe juste, des matières d’exception et un artisanat contemporain pérenne.',
};

export default function AProposPage() {
  return (
    <div className="bg-ivory min-h-screen pb-24">
      {/* Hero Banner */}
      <div className="relative w-full h-[50vh] sm:h-[60vh] flex items-center justify-center overflow-hidden bg-sand/30">
        <Image
          src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=2000&q=90"
          alt="L’Atelier MAISON MOYA — Précision du geste et noblesse des matières"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center brightness-[0.88]"
        />
        <div className="absolute inset-0 bg-black/40" />

        <div className="relative z-10 max-w-3xl mx-auto px-4 text-center text-white">
          <p className="text-[10px] sm:text-xs uppercase tracking-[0.3em] text-sand mb-3 font-medium">
            La Démarche MAISON MOYA
          </p>
          <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl text-white font-normal mb-4">
            L’Art de la Retenue
          </h1>
          <p className="text-xs sm:text-base text-ivory/90 font-light max-w-xl mx-auto leading-relaxed">
            Une silhouette n’a pas besoin d’artifices superflus quand la coupe est
            irréprochable et la matière d’une noblesse absolue.
          </p>
        </div>
      </div>

      <Container className="pt-8">
        <Breadcrumbs items={[{ label: 'À propos' }]} />

        {/* Section 1: The Vision */}
        <div className="max-w-3xl mx-auto pt-8 pb-16 space-y-6 text-center">
          <span className="text-[11px] uppercase tracking-[0.25em] text-gold font-medium">
            Vision & Genèse
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-black">
            L’Élégance comme une seconde nature
          </h2>
          <p className="text-sm sm:text-base text-charcoal/90 font-light leading-relaxed">
            MAISON MOYA est née d’une conviction claire : le luxe véritable réside dans le
            confort souverain d’une pièce parfaitement construite, capable d’accompagner
            celle qui la porte sans jamais l’encombrer ni la déguiser.
          </p>
          <p className="text-xs sm:text-sm text-taupe leading-relaxed">
            À l&apos;opposé des cycles saisonniers effrénés, notre studio de création
            aborde chaque vêtement et chaque accessoire comme un objet d&apos;art
            appliqué, destiné à traverser les années avec une élégance immuable.
          </p>
        </div>

        {/* Section 2: Craftsmanship Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-12 border-y border-border-light">
          <div className="space-y-3">
            <span className="font-serif text-3xl text-gold font-light">01</span>
            <h3 className="font-serif text-xl text-black">
              Matières de Premier Choix
            </h3>
            <p className="text-xs text-taupe leading-relaxed font-light">
              Cachemires de grade A peignés à la main, laines vierges d&apos;alpage,
              twills de soie lourds et cuirs pleine fleur au tannage végétal issu de
              filières européennes tracées.
            </p>
          </div>

          <div className="space-y-3">
            <span className="font-serif text-3xl text-gold font-light">02</span>
            <h3 className="font-serif text-xl text-black">
              Rigueur Architecturale
            </h3>
            <p className="text-xs text-taupe leading-relaxed font-light">
              Des tombés nets, des boutonnières passepoilées à la main, des tranches de
              cuir lissées à chaud et des finitions intérieures cousues avec autant de soin
              que l&apos;endroit.
            </p>
          </div>

          <div className="space-y-3">
            <span className="font-serif text-3xl text-gold font-light">03</span>
            <h3 className="font-serif text-xl text-black">
              Pérennité du Vestiaire
            </h3>
            <p className="text-xs text-taupe leading-relaxed font-light">
              Créer des pièces indépendantes des tendances fugaces. Chaque patron est
              étudié pour se patiner avec grâce et conserver sa tenue au fil des décennies.
            </p>
          </div>
        </div>

        {/* Section 3: Dual Image Editorial */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-16 items-center">
          <div className="relative aspect-[4/5] w-full bg-sand/20 overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=1200&q=85"
              alt="Maison Moya — Porté du trench et allure contemporaine"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover object-center"
            />
          </div>
          <div className="space-y-6 md:pl-6">
            <span className="text-[11px] uppercase tracking-[0.2em] text-taupe font-medium">
              Savoir-Faire Partenaire
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl text-black">
              Des Ateliers d’Exception
            </h3>
            <p className="text-xs sm:text-sm text-charcoal/90 font-light leading-relaxed">
              Nous collaborons exclusivement avec des manufactures et des ateliers
              familiaux reconnus pour leur savoir-faire historique : tisseurs de soie à Lyon,
              ateliers de maroquinerie à Florence et Ubrique, et chausseurs dans les Marches
              italiennes.
            </p>
            <p className="text-xs sm:text-sm text-taupe leading-relaxed">
              Ce respect mutuel entre le geste artisanal et l&apos;intention créative
              confère à chaque création une âme singulière.
            </p>
            <div className="pt-2">
              <Button href="/boutique" variant="primary">
                Découvrir nos créations
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
