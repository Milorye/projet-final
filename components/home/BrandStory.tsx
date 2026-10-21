import React from 'react';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';

export function BrandStory() {
  return (
    <section className="py-20 sm:py-32 bg-ivory text-center">
      <Container size="sm" className="px-4">
        <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.3em] text-gold font-medium block mb-3 sm:mb-4">
          MAISON MOYA
        </span>

        <h2 className="font-serif text-2xl xs:text-3xl sm:text-4xl md:text-5xl text-black leading-snug mb-6 sm:mb-8 font-normal">
          « Donner au vêtement la force de l&apos;évidence, sans artifice ni tapage. »
        </h2>

        <div className="w-12 h-[1px] bg-taupe/40 mx-auto mb-6 sm:mb-8" />

        <p className="text-xs sm:text-base text-charcoal/90 font-light leading-relaxed max-w-xl mx-auto mb-8 sm:mb-10">
          Fondée sur l&apos;exigence de coupes parfaites et la sélection de matières
          nobles, MAISON MOYA propose un vestiaire pensé comme une collection
          d&apos;œuvres portables. Des volumes généreux mais maîtrisés, des finitions
          d&apos;atelier et un respect profond de ceux qui façonnent.
        </p>

        <Button href="/a-propos" variant="outline" className="min-h-[46px] w-full sm:w-auto">
          En savoir plus sur notre histoire
        </Button>
      </Container>
    </section>
  );
}
