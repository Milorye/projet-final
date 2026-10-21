import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getAllProducts, getProductBySlug, getRelatedProducts } from '@/lib/products';
import { Container } from '@/components/ui/Container';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { ProductGallery } from '@/components/products/ProductGallery';
import { ProductInfo } from '@/components/products/ProductInfo';
import { RelatedProducts } from '@/components/products/RelatedProducts';

interface ProductPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const products = getAllProducts();
  return products.map((p) => ({
    slug: p.slug,
  }));
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    return {
      title: 'Pièce Non Trouvée',
    };
  }

  return {
    title: `${product.name} — ${product.categoryLabel}`,
    description: product.shortDescription,
    openGraph: {
      title: `${product.name} | MAISON MOYA`,
      description: product.shortDescription,
      images: [
        {
          url: product.images[0]?.url || '',
          alt: product.name,
        },
      ],
    },
  };
}

export default async function ProductDetailPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const related = getRelatedProducts(product.id, 4);

  return (
    <div className="py-8 sm:py-12 bg-ivory min-h-screen">
      <Container>
        {/* Breadcrumbs */}
        <Breadcrumbs
          items={[
            { label: 'Boutique', href: '/boutique' },
            {
              label: product.categoryLabel,
              href: `/boutique?category=${product.category}`,
            },
            { label: product.name },
          ]}
        />

        {/* Product presentation grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 pt-4 pb-16 items-start">
          {/* Gallery */}
          <div className="lg:col-span-7">
            <ProductGallery
              images={product.images}
              productName={product.name}
            />
          </div>

          {/* Product Purchase Panel */}
          <div className="lg:col-span-5 lg:sticky lg:top-28">
            <ProductInfo product={product} />
          </div>
        </div>

        {/* Related Items */}
        <RelatedProducts products={related} />
      </Container>
    </div>
  );
}
