import React from 'react';
import Image from 'next/image';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { getCollectionBySlug } from '@/lib/collections';

export function FeaturedCollection() {
  const collection = getCollectionBySlug('intemporels');

  if (!collection) return null;

  return (
    <section className="py-16 sm:py-28 bg-white border-y border-border-light overflow-hidden">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">
          {/* Visual Column */}
          <div className="lg:col-span-7 relative">
            <div className="relative aspect-[4/5] sm:aspect-[16/11] lg:aspect-[4/5] w-full overflow-hidden bg-sand/20">
              <Image
                src={collection.heroImage.url}
                alt={collection.heroImage.alt}
                fill
                sizes="(max-width: 1024px) 100vw, 60vw"
                className="object-cover object-center"
              />
            </div>
            {/* Editorial floating accent on tablet/desktop */}
            <div className="hidden sm:block absolute -bottom-6 -right-6 p-6 bg-ivory border border-border-light max-w-xs shadow-lg">
              <p className="text-[10px] uppercase tracking-[0.2em] text-taupe font-medium mb-1">
                Philosophie
              </p>
              <p className="font-serif italic text-sm text-charcoal">
                « {collection.editorialQuote} »
              </p>
            </div>
          </div>

          {/* Editorial Content Column */}
          <div className="lg:col-span-5 lg:pl-6 space-y-4 sm:space-y-6">
            <div className="space-y-1.5 sm:space-y-2">
              <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.25em] text-gold font-medium">
                Collection Présentée
              </span>
              <h2 className="font-serif text-2xl xs:text-3xl sm:text-4xl md:text-5xl text-black leading-tight">
                {collection.title}
              </h2>
              <p className="text-[11px] sm:text-xs uppercase tracking-wider text-taupe pt-0.5">
                {collection.subtitle}
              </p>
            </div>

            {/* Quote shown inline on mobile */}
            {collection.editorialQuote && (
              <blockquote className="sm:hidden border-l-2 border-gold pl-3 py-1 italic text-xs text-charcoal bg-sand/20">
                « {collection.editorialQuote} »
              </blockquote>
            )}

            <p className="text-xs sm:text-base text-charcoal/90 font-light leading-relaxed">
              {collection.description}
            </p>

            <div className="pt-2 sm:pt-4 flex flex-col sm:flex-row gap-3">
              <Button href={`/collections/${collection.slug}`} variant="primary" className="min-h-[46px]">
                Découvrir la collection
              </Button>
              <Button href="/collections" variant="outline" className="min-h-[46px]">
                Toutes les collections
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
