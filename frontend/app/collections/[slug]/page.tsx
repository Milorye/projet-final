import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { Container } from '@/components/ui/Container';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { ProductGrid } from '@/components/products/ProductGrid';
import { getCollectionBySlug, getCollections } from '@/lib/collections';
import { getProductsByCollection } from '@/lib/products';
import { EmptyState } from '@/components/ui/EmptyState';

interface CollectionPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const collections = getCollections();
  return collections.map((col) => ({
    slug: col.slug,
  }));
}

export async function generateMetadata({
  params,
}: CollectionPageProps): Promise<Metadata> {
  const { slug } = await params;
  const collection = getCollectionBySlug(slug);

  if (!collection) {
    return {
      title: 'Collection Non Trouvée',
    };
  }

  return {
    title: `${collection.title} — Collection`,
    description: collection.description,
    openGraph: {
      title: `${collection.title} | MAISON MOYA`,
      description: collection.description,
      images: [
        {
          url: collection.heroImage.url,
          alt: collection.heroImage.alt,
        },
      ],
    },
  };
}

export default async function CollectionDetailPage({
  params,
}: CollectionPageProps) {
  const { slug } = await params;
  const collection = getCollectionBySlug(slug);

  if (!collection) {
    notFound();
  }

  const products = getProductsByCollection(slug);

  return (
    <div className="bg-ivory min-h-screen pb-20">
      {/* Editorial Banner */}
      <div className="relative w-full h-[45vh] sm:h-[55vh] flex items-center justify-center overflow-hidden bg-sand/30">
        <Image
          src={collection.heroImage.url}
          alt={collection.heroImage.alt}
          fill
          priority
          sizes="100vw"
          className="object-cover object-center brightness-[0.85]"
        />
        <div className="absolute inset-0 bg-black/35" />

        <div className="relative z-10 max-w-3xl mx-auto px-4 text-center text-white">
          <p className="text-[10px] sm:text-xs uppercase tracking-[0.3em] text-sand mb-2 font-medium">
            {collection.season || 'Collection'}
          </p>
          <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl text-white font-normal mb-3">
            {collection.title}
          </h1>
          <p className="text-xs sm:text-sm text-ivory/90 font-light max-w-lg mx-auto">
            {collection.subtitle}
          </p>
        </div>
      </div>

      <Container className="pt-8">
        {/* Breadcrumbs */}
        <Breadcrumbs
          items={[
            { label: 'Collections', href: '/collections' },
            { label: collection.title },
          ]}
        />

        {/* Narrative Block */}
        <div className="my-10 max-w-2xl mx-auto text-center space-y-4">
          <p className="text-xs sm:text-sm text-charcoal/90 font-light leading-relaxed">
            {collection.description}
          </p>
          {collection.editorialQuote && (
            <p className="font-serif italic text-base sm:text-lg text-black pt-2">
              « {collection.editorialQuote} »
            </p>
          )}
          <div className="w-12 h-[1px] bg-border-light mx-auto pt-2" />
        </div>

        {/* Product Count & Grid */}
        <div className="border-t border-border-light pt-8">
          <div className="flex items-center justify-between mb-8 text-xs text-taupe">
            <span>
              {products.length} création{products.length > 1 ? 's' : ''} dans cette sélection
            </span>
          </div>

          {products.length === 0 ? (
            <EmptyState
              title="Aucune création pour l’instant"
              description="Les pièces de cette collection sont actuellement en cours de préparation en atelier."
              actionLabel="Explorer la boutique"
              actionHref="/boutique"
            />
          ) : (
            <ProductGrid products={products} columns={4} />
          )}
        </div>
      </Container>
    </div>
  );
}
