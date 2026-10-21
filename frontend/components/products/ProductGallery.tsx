'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { ProductImage } from '@/types/product';

interface ProductGalleryProps {
  images: ProductImage[];
  productName: string;
}

export function ProductGallery({ images, productName }: ProductGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  if (!images || images.length === 0) {
    return (
      <div className="aspect-[3/4] bg-sand/20 flex items-center justify-center text-taupe text-xs">
        Image indisponible
      </div>
    );
  }

  const activeImage = images[activeIndex] || images[0];

  return (
    <div className="flex flex-col-reverse lg:flex-row gap-3 sm:gap-4">
      {/* Thumbnails (horizontal swipe on mobile, vertical stack on desktop) */}
      {images.length > 1 && (
        <div className="flex lg:flex-col gap-2.5 sm:gap-3 overflow-x-auto lg:overflow-y-auto shrink-0 pb-1 lg:pb-0 scroll-smooth">
          {images.map((img, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setActiveIndex(idx)}
              className={`relative w-14 h-18 sm:w-20 sm:h-26 shrink-0 bg-sand/20 overflow-hidden border transition-all ${
                activeIndex === idx
                  ? 'border-black ring-1 ring-black opacity-100'
                  : 'border-border-light/80 opacity-60 hover:opacity-100'
              }`}
              aria-label={`Afficher la vue ${idx + 1} de ${productName}`}
            >
              <Image
                src={img.url}
                alt={img.alt || `${productName} — vue ${idx + 1}`}
                fill
                sizes="80px"
                className="object-cover object-center"
              />
            </button>
          ))}
        </div>
      )}

      {/* Main Image */}
      <div className="relative aspect-[3/4] w-full bg-sand/20 overflow-hidden flex-1 shadow-xs">
        <Image
          src={activeImage.url}
          alt={activeImage.alt || productName}
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 55vw"
          className="object-cover object-center transition-all duration-300"
        />

        {/* Counter pill on mobile */}
        {images.length > 1 && (
          <div className="lg:hidden absolute bottom-2.5 right-2.5 px-2 py-0.5 bg-black/60 backdrop-blur-xs text-white text-[10px] tracking-widest font-medium rounded-full">
            {activeIndex + 1} / {images.length}
          </div>
        )}
      </div>
    </div>
  );
}
