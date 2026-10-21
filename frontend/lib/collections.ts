import { Collection } from '@/types/collection';

export const COLLECTIONS: Collection[] = [
  {
    id: 'col-1',
    slug: 'intemporels',
    title: 'Les Intemporels',
    subtitle: 'Élégance permanente & coupes fondatrices',
    description:
      'Une sélection rigoureuse de pièces maîtresses conçues pour traverser les époques. Matières nobles, finitions sellier et lignes pures qui composent l’ossature de votre vestiaire contemporain.',
    editorialQuote: 'Le vêtement comme architecture silencieuse : chaque couture a sa raison d’être.',
    heroImage: {
      url: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1600&q=85',
      alt: 'Collection Les Intemporels — Silhouettes contemporaines en matières nobles',
    },
    featured: true,
    season: 'Permanent',
  },
  {
    id: 'col-2',
    slug: 'allure-soir',
    title: 'L’Allure Soir',
    subtitle: 'Drapés sculpturaux & matières précieuses',
    description:
      'Pour les heures crépusculaires, Maison Moya dévoile des soies lavées, des satins lourds et des velours mats dans une palette nocturne adoucie de reflets dorés discrets.',
    editorialQuote: 'L’art de la retenue pour une présence inoubliable.',
    heroImage: {
      url: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1600&q=85',
      alt: 'Collection L’Allure Soir — Drapés et tailleurs d’exception pour le soir',
    },
    featured: true,
    season: 'Automne / Hiver',
  },
  {
    id: 'col-3',
    slug: 'maroquinerie-fine',
    title: 'Maroquinerie d’Atelier',
    subtitle: 'Cuirs pleine fleur & lignes architecturales',
    description:
      'Chaque sac est conçu comme une sculpture portable. Tannage végétal, tranches lissées à la main et bijouterie en laiton brossé pour une tenue irréprochable au quotidien.',
    editorialQuote: 'La noblesse du cuir façonné avec la précision d’un orfèvre.',
    heroImage: {
      url: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=1600&q=85',
      alt: 'Collection Maroquinerie d’Atelier — Sacs en cuir pleine fleur façonnés à la main',
    },
    featured: true,
    season: 'Édition Permanente',
  },
  {
    id: 'col-4',
    slug: 'cachemire-laine',
    title: 'Cachemire & Laines Rares',
    subtitle: 'Douceur texturée & volumes enveloppants',
    description:
      'Tricotages aériens en cachemire de grade supérieur et laines vierges d’alpage. Des volumes amples pensés pour un confort absolu et une silhouette affirmée.',
    editorialQuote: 'Une caresse thermique dans les nuances de sable et de taupe.',
    heroImage: {
      url: 'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?auto=format&fit=crop&w=1600&q=85',
      alt: 'Collection Cachemire et Laines Rares — Pulls et écharpes de luxe',
    },
    featured: false,
    season: 'Hiver Contemporain',
  },
];

export function getCollections(): Collection[] {
  return COLLECTIONS;
}

export function getFeaturedCollections(): Collection[] {
  return COLLECTIONS.filter((c) => c.featured);
}

export function getCollectionBySlug(slug: string): Collection | undefined {
  return COLLECTIONS.find((c) => c.slug === slug);
}
