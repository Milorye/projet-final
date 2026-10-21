import { connectDatabase, disconnectDatabase } from '../config/db.js';
import Product from '../models/Product.js';

const productSeed = [
  {
    slug: 'manteau-long-cachemire-taupe',
    name: 'Manteau Long en Cachemire & Laine',
    shortDescription: 'Manteau croisé ceinturé à la coupe architecturale et tombé impeccable.',
    description:
      'Une pièce maîtresse taillée dans un mélange d’exception de cachemire et laine vierge d’alpage. Sa silhouette longue enveloppante, son revers tailleur généreux et sa ceinture amovible soulignent une allure raffinée sans contrainte.',
    price: 1250,
    currency: 'EUR',
    category: 'vetements',
    categoryLabel: 'Vêtements',
    collectionSlugs: ['intemporels', 'cachemire-laine'],
    images: [
      { url: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6', alt: 'Manteau long en cachemire taupe' },
      { url: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f', alt: 'Détail du manteau' },
    ],
    availableSizes: ['XS', 'S', 'M', 'L', 'XL'],
    availableColors: [{ name: 'Taupe Fumé', hex: '#A89B8B' }],
    tags: ['manteau', 'cachemire', 'hiver'],
    featured: true,
    isNew: true,
    isBestseller: true,
    material: '85% Laine vierge, 15% cachemire',
    careInstructions: ['Nettoyage à sec professionnel uniquement'],
    reference: 'MOYA-VET-001',
    fit: 'Coupe droite fluide.',
    origin: 'Porto, Portugal',
  },
  {
    slug: 'veste-tailleur-laine-froide',
    name: 'Veste Tailleur Ceinturée en Laine',
    shortDescription: 'Blazer d’inspiration masculine aux proportions féminisées avec précision.',
    description:
      'Structurée sans raideur, cette veste en laine froide offre une carrure épaulée nette et un tombé fluide. Boutons en corne véritable.',
    price: 680,
    currency: 'EUR',
    category: 'vetements',
    categoryLabel: 'Vêtements',
    collectionSlugs: ['intemporels', 'allure-soir'],
    images: [{ url: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea', alt: 'Veste tailleur' }],
    availableSizes: ['XS', 'S', 'M', 'L'],
    availableColors: [{ name: 'Noir Minéral', hex: '#22211F' }],
    tags: ['blazer', 'tailleur', 'laine'],
    featured: true,
    isNew: false,
    isBestseller: true,
    material: '100% Laine vierge',
    careInstructions: ['Nettoyage à sec délicat'],
    reference: 'MOYA-VET-002',
    fit: 'Légèrement ajustée à la taille.',
    origin: 'Milan, Italie',
  },
  {
    slug: 'sac-cabas-cuir-gris',
    name: 'Sac Cabas en Cuir Grainé',
    shortDescription: 'Forme structurée, poignées souples et finition raffinée.',
    description:
      'Un cabas minimaliste pensé pour les journées longues : grande ouverture, fermeture magnétique et couture invisible.',
    price: 540,
    currency: 'EUR',
    category: 'sacs',
    categoryLabel: 'Sacs',
    collectionSlugs: ['essentiels'],
    images: [{ url: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3', alt: 'Sac cabas en cuir' }],
    availableSizes: ['One Size'],
    availableColors: [{ name: 'Gris Anthracite', hex: '#5A5A5A' }],
    tags: ['sac', 'cuir', 'cabas'],
    featured: true,
    isNew: true,
    isBestseller: false,
    material: 'Cuir végétal grainé',
    careInstructions: ['Nettoyage avec chiffon doux'],
    reference: 'MOYA-SAC-001',
    fit: 'Format quotidien pratique.',
    origin: 'Florence, Italie',
  },
];

async function seedProducts() {
  await connectDatabase();
  await Product.deleteMany({});
  const created = await Product.insertMany(productSeed);
  console.log(`${created.length} produits ajoutés.`);
  await disconnectDatabase();
}

seedProducts().catch((error) => {
  console.error('Unable to seed products:', error);
  process.exit(1);
});
