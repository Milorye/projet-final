import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { Container } from '@/components/ui/Container';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { Button } from '@/components/ui/Button';
import { getCollections } from '@/lib/collections';

export const metadata: Metadata = {
  title: 'Les Collections',
  description:
    'Parcourez les récits stylistiques de MAISON MOYA : Les Intemporels, L’Allure Soir, Maroquinerie d’Atelier et Cachemire & Laines Rares.',
};

export default function CollectionsPage() {
  const collections = getCollections();

  return (
    <div className="py-12 bg-ivory min-h-screen">
      <Container>
        <Breadcrumbs items={[{ label: 'Collections' }]} />

        {/* Page Heading */}
        <div className="border-b border-border-light pb-8 pt-4 mb-12 max-w-3xl">
          <p className="text-[11px] uppercase tracking-[0.25em] text-taupe font-medium mb-2">
            Récits & Esthétique
          </p>
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl text-black mb-4">
            Les Collections MAISON MOYA
          </h1>
          <p className="text-xs sm:text-sm text-taupe leading-relaxed font-light">
            Chaque collection constitue un chapitre thématique de notre garde-robe idéale,
            articulé autour d&apos;une réflexion sur la matière, la lumière et la structure.
          </p>
        </div>

        {/* Collections Editorial Grid */}
        <div className="space-y-16 sm:space-y-24">
          {collections.map((col, idx) => {
            const isReversed = idx % 2 === 1;

            return (
              <div
                key={col.id}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center border-b border-border-light/60 pb-16"
              >
                {/* Visual */}
                <div
                  className={`lg:col-span-7 ${
                    isReversed ? 'lg:order-2' : 'lg:order-1'
                  }`}
                >
                  <Link
                    href={`/collections/${col.slug}`}
                    className="block group relative aspect-[16/10] sm:aspect-[16/9] w-full overflow-hidden bg-sand/20"
                  >
                    <Image
                      src={col.heroImage.url}
                      alt={col.heroImage.alt}
                      fill
                      sizes="(max-width: 1024px) 100vw, 60vw"
                      className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
                  </Link>
                </div>

                {/* Content */}
                <div
                  className={`lg:col-span-5 ${
                    isReversed ? 'lg:order-1' : 'lg:order-2'
                  } space-y-4`}
                >
                  <span className="text-[10px] uppercase tracking-[0.2em] text-gold font-medium">
                    {col.season || 'Édition Spéciale'}
                  </span>
                  <h2 className="font-serif text-3xl sm:text-4xl text-black">
                    <Link
                      href={`/collections/${col.slug}`}
                      className="hover:text-gold transition-colors"
                    >
                      {col.title}
                    </Link>
                  </h2>
                  <p className="text-xs uppercase tracking-wider text-taupe">
                    {col.subtitle}
                  </p>
                  <p className="text-xs sm:text-sm text-charcoal/80 font-light leading-relaxed">
                    {col.description}
                  </p>
                  {col.editorialQuote && (
                    <blockquote className="border-l border-gold pl-4 italic text-xs text-taupe py-1">
                      « {col.editorialQuote} »
                    </blockquote>
                  )}
                  <div className="pt-2">
                    <Button href={`/collections/${col.slug}`} variant="primary">
                      Explorer la collection
                    </Button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </div>
  );
}
