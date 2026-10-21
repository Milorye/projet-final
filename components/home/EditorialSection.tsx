import React from 'react';
import Image from 'next/image';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';

export function EditorialSection() {
  return (
    <section className="py-16 sm:py-28 bg-sand/15 border-t border-border-light">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Text block */}
          <div className="lg:col-span-5 order-2 lg:order-1 space-y-4 sm:space-y-6">
            <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.25em] text-taupe font-medium">
              Manifeste Esthétique
            </span>
            <h2 className="font-serif text-2xl xs:text-3xl sm:text-4xl md:text-5xl text-black leading-tight">
              Des essentiels qui définissent votre style.
            </h2>
            <p className="text-xs sm:text-base text-charcoal/90 font-light leading-relaxed">
              Chez MAISON MOYA, nous croyons en une mode affranchie de la frénésie des
              tendances éphémères. Nos silhouettes privilégient la rigueur de la coupe,
              l&apos;intelligence du tombé et la sensualité des matières nobles.
            </p>
            <p className="text-[11px] sm:text-sm text-taupe leading-relaxed">
              Chaque prototype est éprouvé en atelier afin d&apos;offrir une aisance absolue
              du matin au soir, sans jamais sacrifier la pureté de la ligne.
            </p>

            <div className="pt-2">
              <Button href="/a-propos" variant="outline" className="min-h-[46px] w-full sm:w-auto">
                Découvrir notre démarche
              </Button>
            </div>
          </div>

          {/* Photography block */}
          <div className="lg:col-span-7 order-1 lg:order-2 grid grid-cols-2 gap-3 sm:gap-6">
            <div className="relative aspect-[3/4] w-full overflow-hidden bg-sand/20 mt-4 sm:mt-8">
              <Image
                src="https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=1000&q=85"
                alt="Détail coupe tailleur et laine d’exception"
                fill
                sizes="(max-width: 1024px) 50vw, 30vw"
                className="object-cover object-center"
              />
            </div>
            <div className="relative aspect-[3/4] w-full overflow-hidden bg-sand/20">
              <Image
                src="https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=1000&q=85"
                alt="Travail du cuir et finitions artisanales"
                fill
                sizes="(max-width: 1024px) 50vw, 30vw"
                className="object-cover object-center"
              />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
