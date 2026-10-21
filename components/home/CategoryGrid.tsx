import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import { Container } from '@/components/ui/Container';

export function CategoryGrid() {
  const categories = [
    {
      title: 'Vêtements',
      subtitle: 'Tailleurs, manteaux & soies',
      href: '/boutique?category=vetements',
      image:
        'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=85',
      alt: 'Catégorie Vêtements — Manteaux et tailleurs de luxe',
    },
    {
      title: 'Maroquinerie',
      subtitle: 'Cuirs pleine fleur & cabas',
      href: '/boutique?category=sacs',
      image:
        'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=800&q=85',
      alt: 'Catégorie Maroquinerie — Sacs d’artisanat d’art',
    },
    {
      title: 'Souliers',
      subtitle: 'Bottines & lignes pures',
      href: '/boutique?category=chaussures',
      image:
        'https://images.unsplash.com/photo-1535043934128-cf0b28d52f95?auto=format&fit=crop&w=800&q=85',
      alt: 'Catégorie Souliers — Bottines et escarpins épurés',
    },
    {
      title: 'Accessoires',
      subtitle: 'Carrés de soie & ceintures',
      href: '/boutique?category=accessoires',
      image:
        'https://images.unsplash.com/photo-1601924994987-69e26d50dc26?auto=format&fit=crop&w=800&q=85',
      alt: 'Catégorie Accessoires — Écharpes et carrés de soie',
    },
  ];

  return (
    <section className="py-14 sm:py-20 lg:py-24 bg-ivory">
      <Container>
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-10 lg:mb-12 border-b border-border-light pb-4 sm:pb-6">
          <div>
            <p className="text-[10px] sm:text-[11px] uppercase tracking-[0.25em] text-taupe font-medium mb-1.5 sm:mb-2">
              L&apos;univers de la Maison
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-[2.75rem] leading-none text-black">
              Explorer par catégorie
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-taupe max-w-md mt-2 md:mt-0 font-light leading-relaxed">
            Une sélection minutieuse d&apos;étoffes rares et de savoir-faire d&apos;atelier
            dédiée à l&apos;élégance contemporaine.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 xs:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-5 lg:gap-6">
          {categories.map((cat) => (
            <Link
              key={cat.title}
              href={cat.href}
              className="group relative flex flex-col overflow-hidden rounded-[1.75rem] border border-border-light bg-white shadow-[0_14px_35px_rgba(34,33,31,0.04)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_22px_45px_rgba(34,33,31,0.08)]"
            >
              <div className="relative aspect-[4/5] w-full overflow-hidden rounded-t-[1.75rem]">
                <Image
                  src={cat.image}
                  alt={cat.alt}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent opacity-90 group-hover:opacity-100 transition-opacity" />
              </div>

              {/* Overlay Content */}
              <div className="absolute bottom-0 inset-x-0 p-4 sm:p-5 lg:p-6 text-white flex items-end justify-between gap-3">
                <div>
                  <h3 className="font-serif text-xl sm:text-2xl tracking-wide group-hover:text-sand transition-colors leading-none">
                    {cat.title}
                  </h3>
                  <p className="text-[11px] sm:text-xs text-sand/85 font-light mt-1.5">
                    {cat.subtitle}
                  </p>
                </div>
                <div className="w-9 h-9 rounded-full border border-white/35 flex items-center justify-center text-white group-hover:bg-white group-hover:text-black group-hover:border-white transition-all shrink-0 ml-2">
                  <ArrowUpRight className="w-4 h-4" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
