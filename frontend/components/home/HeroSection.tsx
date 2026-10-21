import React from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/Button';

export function HeroSection() {
  return (
    <section className="relative w-full min-h-[78vh] sm:min-h-[88vh] flex items-center justify-center overflow-hidden bg-sand/20">
      {/* Background Image with optimized focal point for both mobile and desktop */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=2000&q=90"
          alt="Campagne MAISON MOYA — Élégance contemporaine et silhouettes intemporelles"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[50%_20%] sm:object-center brightness-[0.90] scale-[1.04]"
        />
        {/* Subtle gradient overlay to ensure text contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/30 to-black/35" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center text-white pt-16 pb-20 sm:pt-24 sm:pb-24">
        <p className="text-[10px] sm:text-xs uppercase tracking-[0.25em] sm:tracking-[0.32em] text-sand/95 font-medium mb-3 sm:mb-5 animate-fade-in">
          Édition Permanente & Nouveautés
        </p>

        <h1 className="font-serif text-4xl xs:text-5xl sm:text-6xl md:text-7xl lg:text-[6.2rem] font-normal tracking-[-0.04em] leading-[0.95] sm:leading-[0.92] mb-4 sm:mb-6 drop-shadow-[0_8px_22px_rgba(0,0,0,0.28)]">
          L&apos;élégance, sans effort.
        </h1>

        <p className="font-sans text-sm sm:text-base md:text-lg text-ivory/95 max-w-2xl mx-auto font-light leading-relaxed mb-8 sm:mb-10 drop-shadow-[0_6px_18px_rgba(0,0,0,0.18)] px-2">
          Des pièces choisies pour traverser les saisons avec allure. Une esthétique
          épurée façonnée dans des étoffes d&apos;exception.
        </p>

        {/* Action CTAs: stacked on mobile, row on tablet/desktop */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 max-w-sm sm:max-w-none mx-auto w-full">
          <Button
            href="/boutique"
            variant="secondary"
            size="lg"
            className="w-full sm:w-auto min-w-[210px] min-h-[52px] text-[10px] sm:text-[11px]"
          >
            Découvrir la boutique
          </Button>
          <Button
            href="/collections"
            variant="outline"
            size="lg"
            className="w-full sm:w-auto min-w-[210px] min-h-[52px] border-white/70 text-white hover:bg-white hover:text-black hover:border-white text-[10px] sm:text-[11px]"
          >
            Explorer les collections
          </Button>
        </div>
      </div>

      {/* Discreet bottom scroll indicator */}
      <div className="hidden sm:flex absolute bottom-5 left-1/2 -translate-x-1/2 text-white/60 flex-col items-center gap-2 pointer-events-none">
        <span className="text-[9px] uppercase tracking-[0.2em]">Défiler</span>
        <div className="w-[1px] h-5 bg-white/40 animate-pulse" />
      </div>
    </section>
  );
}
