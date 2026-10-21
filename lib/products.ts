import { Product, ProductCategory, ProductFilterState } from '@/types/product';
import { normalizeString } from './utils';

export const PRODUCTS: Product[] = [
  // ==================== VÊTEMENTS ====================
  {
    id: 'prod-1',
    slug: 'manteau-long-cachemire-taupe',
    name: 'Manteau Long en Cachemire & Laine',
    shortDescription: 'Manteau croisé ceinturé à la coupe architecturale et tombé impeccable.',
    description:
      'Une pièce maîtresse taillée dans un mélange d’exception de cachemire et laine vierge d’alpage. Sa silhouette longue enveloppante, son revers tailleur généreux et sa ceinture amovible soulignent une allure raffinée sans contrainte. Doublure en cupro soyeux.',
    price: 1250,
    currency: 'EUR',
    category: 'vetements',
    categoryLabel: 'Vêtements',
    collectionSlugs: ['intemporels', 'cachemire-laine'],
    images: [
      {
        url: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=1200&q=85',
        alt: 'Manteau long en cachemire taupe porté dans une ambiance urbaine feutrée',
      },
      {
        url: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1200&q=85',
        alt: 'Détail de la boutonnière en corne et de la texture du cachemire',
      },
    ],
    availableSizes: ['XS', 'S', 'M', 'L', 'XL'],
    availableColors: [
      { name: 'Taupe Fumé', hex: '#A89B8B' },
      { name: 'Noir Minéral', hex: '#22211F' },
      { name: 'Sable Clair', hex: '#DCD1C3' },
    ],
    tags: ['manteau', 'cachemire', 'hiver', 'tailleur'],
    featured: true,
    isNew: true,
    isBestseller: true,
    material: '85% Laine Vierge peignée, 15% Cachemire mongol. Doublure 100% Cupro respirant.',
    careInstructions: [
      'Nettoyage à sec professionnel uniquement',
      'Repassage doux à la vapeur sur l’envers',
      'Conserver sur un cintre en bois large',
    ],
    reference: 'MOYA-VET-001',
    fit: 'Coupe droite fluide. Prenez votre taille habituelle pour un porté légèrement décontracté.',
    origin: 'Atelier de confection à Porto, Portugal',
  },
  {
    id: 'prod-2',
    slug: 'veste-tailleur-laine-froide',
    name: 'Veste Tailleur Ceinturée en Laine',
    shortDescription: 'Blazer d’inspiration masculine aux proportions féminisées avec précision.',
    description:
      'Structurée sans raideur, cette veste en laine froide offre une carrure épaulée nette et un tombé fluide. Boutons en corne véritable, fentes arrière discrètes et poches passepoilées. Se porte seule ou sur une blouse en soie.',
    price: 680,
    currency: 'EUR',
    category: 'vetements',
    categoryLabel: 'Vêtements',
    collectionSlugs: ['intemporels', 'allure-soir'],
    images: [
      {
        url: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=1200&q=85',
        alt: 'Veste tailleur en laine froide portée avec pantalon coordonné',
      },
      {
        url: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1200&q=85',
        alt: 'Gros plan sur le revers cranté et la boutonnière artisanale',
      },
    ],
    availableSizes: ['XS', 'S', 'M', 'L'],
    availableColors: [
      { name: 'Noir Minéral', hex: '#22211F' },
      { name: 'Ivoire Chaud', hex: '#F8F6F1' },
    ],
    tags: ['blazer', 'tailleur', 'laine', 'soir'],
    featured: true,
    isNew: false,
    isBestseller: true,
    material: '100% Laine vierge d’origine responsable (Super 120s).',
    careInstructions: [
      'Nettoyage à sec délicat',
      'Ne pas laver en machine',
      'Suspendre à l’air libre après usage',
    ],
    reference: 'MOYA-VET-002',
    fit: 'Légèrement ajustée à la taille avec épaules structurées.',
    origin: 'Atelier de Milan, Italie',
  },
  {
    id: 'prod-3',
    slug: 'robe-chemise-soie-plissee',
    name: 'Robe Chemise Plissée en Crêpe de Soie',
    shortDescription: 'Fluidité aérienne et plissé permanent pour une démarche ondoyante.',
    description:
      'Confectionnée dans un crêpe de soie lourd au toucher sablé inimitable. Le col officier minimaliste contraste avec la jupe plissée soleil qui réagit au moindre mouvement. Ceinture amovible à boucle dorée brossée.',
    price: 790,
    currency: 'EUR',
    category: 'vetements',
    categoryLabel: 'Vêtements',
    collectionSlugs: ['allure-soir', 'intemporels'],
    images: [
      {
        url: 'https://images.unsplash.com/photo-1502716119720-b23a93e5fe1b?auto=format&fit=crop&w=1200&q=85',
        alt: 'Robe en soie plissée dans une lumière naturelle diffuse',
      },
      {
        url: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1200&q=85',
        alt: 'Détail du plissé soleil artisanal et du crêpe de soie',
      },
    ],
    availableSizes: ['XS', 'S', 'M', 'L'],
    availableColors: [
      { name: 'Ivoire Chaud', hex: '#F8F6F1' },
      { name: 'Noir Minéral', hex: '#22211F' },
      { name: 'Taupe Fumé', hex: '#A89B8B' },
    ],
    tags: ['robe', 'soie', 'plisse', 'cocktail', 'soir'],
    featured: false,
    isNew: true,
    isBestseller: false,
    material: '100% Crêpe de soie de mûrier 18 mommes.',
    careInstructions: [
      'Lavage à la main à l’eau tiède avec lessive spéciale soie ou nettoyage à sec',
      'Ne pas tordre',
      'Séchage à plat à l’ombre',
    ],
    reference: 'MOYA-VET-003',
    fit: 'Coupe midi ample avec taille modulable par ceinture.',
    origin: 'Lyon, France',
  },
  {
    id: 'prod-4',
    slug: 'pantalon-droit-gabardine-ivoire',
    name: 'Pantalon Droit en Gabardine de Coton & Laine',
    shortDescription: 'Ligne droite architecturée à pli marquant et taille haute flatteuse.',
    description:
      'Un tombé franc et francophone qui élance la silhouette. Réalisé dans une gabardine dense et résistante aux faux plis. Deux poches coupées sur les hanches et poches arrière invisibles.',
    price: 390,
    currency: 'EUR',
    category: 'vetements',
    categoryLabel: 'Vêtements',
    collectionSlugs: ['intemporels'],
    images: [
      {
        url: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1200&q=85',
        alt: 'Pantalon droit gabardine ivoire avec pull coordonné',
      },
      {
        url: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=1200&q=85',
        alt: 'Vue rapprochée des finitions ceinture et pli de repassage',
      },
    ],
    availableSizes: ['34', '36', '38', '40', '42'],
    availableColors: [
      { name: 'Ivoire Chaud', hex: '#F8F6F1' },
      { name: 'Sable Clair', hex: '#DCD1C3' },
      { name: 'Noir Minéral', hex: '#22211F' },
    ],
    tags: ['pantalon', 'gabardine', 'tailleur', 'taille-haute'],
    featured: false,
    isNew: false,
    isBestseller: true,
    material: '60% Coton biologique peigné, 40% Laine vierge.',
    careInstructions: [
      'Lavage cycle délicat 30°C ou pressing',
      'Repassage sur fer moyen avec pattemouille',
    ],
    reference: 'MOYA-VET-004',
    fit: 'Taille haute, jambe droite et longue pour couvrir le coup-de-pied.',
    origin: 'Porto, Portugal',
  },
  {
    id: 'prod-5',
    slug: 'pull-col-roule-cachemire-sable',
    name: 'Pull Col Roulé en Cachemire Pur 4 Fils',
    shortDescription: 'Un cocon de douceur extrême au col montant sans serrement.',
    description:
      'Tricoté en jauge fine et dense à partir de fibres de cachemire blanc de grade A sélectionnées dans les steppes mongoles. Bords côtes soignés aux poignets et à la base.',
    price: 490,
    currency: 'EUR',
    category: 'vetements',
    categoryLabel: 'Vêtements',
    collectionSlugs: ['cachemire-laine', 'intemporels'],
    images: [
      {
        url: 'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?auto=format&fit=crop&w=1200&q=85',
        alt: 'Pull col roulé en cachemire sable porté sur fond épuré',
      },
      {
        url: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=1200&q=85',
        alt: 'Détail de la maille cachemire et du col tubulaire',
      },
    ],
    availableSizes: ['XS', 'S', 'M', 'L', 'XL'],
    availableColors: [
      { name: 'Sable Clair', hex: '#DCD1C3' },
      { name: 'Taupe Fumé', hex: '#A89B8B' },
      { name: 'Noir Minéral', hex: '#22211F' },
    ],
    tags: ['pull', 'col-roule', 'cachemire', 'maille'],
    featured: true,
    isNew: true,
    isBestseller: false,
    material: '100% Cachemire peigné d’origine certifiée éthique.',
    careInstructions: [
      'Lavage à la main à froid avec shampoing pour cachemire',
      'Essorer délicatement dans une serviette éponge',
      'Sécher à plat à l’abri du soleil direct',
    ],
    reference: 'MOYA-VET-005',
    fit: 'Coupe droite intemporelle, emmanchures confortables.',
    origin: 'Biella, Italie',
  },
  {
    id: 'prod-6',
    slug: 'trench-minimaliste-double-boutonnage',
    name: 'Trench Épuré en Gabardine Déperlante',
    shortDescription: 'Le classique réinterprété sans superflu, col montant ou rabattu.',
    description:
      'Une réinterprétation moderne du trenchcoat d’atelier. Les éléments superflus ont été épurés pour ne conserver que la force de la ligne : boutonnage sous patte, bavolet asymétrique discret et ceinture large à passants ton sur ton.',
    price: 890,
    currency: 'EUR',
    category: 'vetements',
    categoryLabel: 'Vêtements',
    collectionSlugs: ['intemporels'],
    images: [
      {
        url: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=1200&q=85',
        alt: 'Trench minimaliste porté dans les rues de Paris',
      },
      {
        url: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1200&q=85',
        alt: 'Détail de la patte de serrage des manches et du tissu technique',
      },
    ],
    availableSizes: ['XS', 'S', 'M', 'L'],
    availableColors: [
      { name: 'Sable Chaud', hex: '#DCD1C3' },
      { name: 'Noir Minéral', hex: '#22211F' },
    ],
    tags: ['trench', 'manteau', 'impermeable', 'intemporel'],
    featured: false,
    isNew: false,
    isBestseller: true,
    material: '100% Coton peigné tissé dense avec traitement déperlant écologique sans fluorocarbures.',
    careInstructions: [
      'Nettoyage à sec spécialisé pour matières imperméabilisées',
      'Repassage doux pour réactiver l’apprêt déperlant',
    ],
    reference: 'MOYA-VET-006',
    fit: 'Coupe oversize structurée. Descend à mi-mollet.',
    origin: 'Royaume-Uni',
  },

  // ==================== MAROQUINERIE (SACS) ====================
  {
    id: 'prod-7',
    slug: 'sac-cabas-structure-cuir-graine',
    name: 'Le Cabas « Sculptura » en Cuir Pleine Fleur',
    shortDescription: 'Volume généreux et géométrie assurée pour accueillir tous vos essentiels.',
    description:
      'Façonné dans un cuir de veau grainé au tannage végétal issu des tanneries toscanes. Ses tranches teintées à la main en plusieurs passes témoignent de l’exigence de notre atelier. Poche intérieure zippée et mousqueton porte-clés.',
    price: 950,
    currency: 'EUR',
    category: 'sacs',
    categoryLabel: 'Maroquinerie',
    collectionSlugs: ['maroquinerie-fine', 'intemporels'],
    images: [
      {
        url: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=1200&q=85',
        alt: 'Sac cabas sculpté en cuir grainé disposé sur un socle en pierre calcaire',
      },
      {
        url: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=1200&q=85',
        alt: 'Détail des poignées rondes doublées cuir et du marquage à chaud doré',
      },
    ],
    availableSizes: ['Taille Unique (L 38 x H 30 x P 15 cm)'],
    availableColors: [
      { name: 'Noir Minéral', hex: '#22211F' },
      { name: 'Taupe Fumé', hex: '#A89B8B' },
      { name: 'Caramel Doré', hex: '#A58A5C' },
    ],
    tags: ['sac', 'cabas', 'cuir', 'maroquinerie'],
    featured: true,
    isNew: false,
    isBestseller: true,
    material: 'Cuir de veau pleine fleur grainé certifié LWG Gold. Doublure agneau velours.',
    careInstructions: [
      'Nourrir avec une crème de soin neutre une à deux fois par an',
      'Protéger de l’eau stagnante et de la lumière solaire prolongée',
      'Ranger dans son pochon en coton biologique fourni',
    ],
    reference: 'MOYA-SAC-001',
    origin: 'Atelier de Florence, Italie',
  },
  {
    id: 'prod-8',
    slug: 'sac-seau-cuir-lisse-caramel',
    name: 'Le Seau « Arceau » en Cuir Box',
    shortDescription: 'Lignes épurées et fermeture par cordon coulissant en cuir lisse.',
    description:
      'Une silhouette circulaire pure inspirée des amphores méditerranéennes. Le cuir box patiné à la main développera au fil des saisons une patine unique et personnelle. Bandoulière ajustable pour un porté épaule ou croisé.',
    price: 720,
    currency: 'EUR',
    category: 'sacs',
    categoryLabel: 'Maroquinerie',
    collectionSlugs: ['maroquinerie-fine'],
    images: [
      {
        url: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=1200&q=85',
        alt: 'Sac seau caramel porté en bandoulière',
      },
      {
        url: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=1200&q=85',
        alt: 'Détail de la boucle en laiton brossé et du cuir box ciré',
      },
    ],
    availableSizes: ['Taille Unique (Diamètre 20 x H 24 cm)'],
    availableColors: [
      { name: 'Caramel Doré', hex: '#A58A5C' },
      { name: 'Noir Minéral', hex: '#22211F' },
    ],
    tags: ['sac', 'seau', 'cuir-box', 'bandouliere'],
    featured: false,
    isNew: true,
    isBestseller: false,
    material: 'Cuir de vachette lisse tannage semi-végétal. Métallerie laiton massif finition or mat.',
    careInstructions: [
      'Cirer délicatement avec un chiffon doux non pelucheux',
      'Éviter le contact prolongé avec des textiles clairs lors des premiers ports',
    ],
    reference: 'MOYA-SAC-002',
    origin: 'Atelier d’Ubrique, Espagne',
  },
  {
    id: 'prod-9',
    slug: 'pochette-soir-cuir-noir-or',
    name: 'La Pochette « Eclipse » Cuir Nappa & Bijou',
    shortDescription: 'Élégance nocturne, fermoir magnétique invisible et chaîne escamotable.',
    description:
      'Conçue pour accompagner vos soirées avec une discrétion absolue. Le cuir nappa ultra souple offre une prise en main d’une sensorialité rare. Intérieur compartimenté avec fentes pour cartes de crédit intégrées.',
    price: 540,
    currency: 'EUR',
    category: 'sacs',
    categoryLabel: 'Maroquinerie',
    collectionSlugs: ['allure-soir', 'maroquinerie-fine'],
    images: [
      {
        url: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=1200&q=85',
        alt: 'Pochette de soirée noire tenue à la main',
      },
      {
        url: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=1200&q=85',
        alt: 'Gros plan sur le fermoir invisible et la dorure discrète',
      },
    ],
    availableSizes: ['Taille Unique (L 26 x H 14 x P 4 cm)'],
    availableColors: [
      { name: 'Noir Minéral', hex: '#22211F' },
      { name: 'Ivoire Chaud', hex: '#F8F6F1' },
    ],
    tags: ['pochette', 'soir', 'cuir-nappa', 'bijou'],
    featured: false,
    isNew: false,
    isBestseller: true,
    material: 'Cuir nappa d’agneau plongé. Chaîne gourmette en laiton galvanisé or fin 0,5 micron.',
    careInstructions: ['Nettoyer avec une chamoisine sèche uniquement'],
    reference: 'MOYA-SAC-003',
    origin: 'Atelier de Florence, Italie',
  },
  {
    id: 'prod-10',
    slug: 'sac-bandouliere-trapeze-ivoire',
    name: 'Le Bandoulière « Géométrie » Ivoire',
    shortDescription: 'Lignes trapézoïdales nettes et rabat asymétrique singulier.',
    description:
      'Un équilibre parfait entre modernisme graphique et classicisme bourgeois. Le ton ivoire chaleureux apporte de la luminosité à toutes les tenues d’hiver comme d’été.',
    price: 810,
    currency: 'EUR',
    category: 'sacs',
    categoryLabel: 'Maroquinerie',
    collectionSlugs: ['maroquinerie-fine', 'intemporels'],
    images: [
      {
        url: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=1200&q=85',
        alt: 'Sac bandoulière trapèze ivoire posé sur un meuble design',
      },
      {
        url: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=1200&q=85',
        alt: 'Détail de la tranche lissée à chaud et de la bandoulière amovible',
      },
    ],
    availableSizes: ['Taille Unique (L 24 x H 18 x P 8 cm)'],
    availableColors: [
      { name: 'Ivoire Chaud', hex: '#F8F6F1' },
      { name: 'Taupe Fumé', hex: '#A89B8B' },
      { name: 'Noir Minéral', hex: '#22211F' },
    ],
    tags: ['sac', 'bandouliere', 'trapeze', 'ivoire'],
    featured: true,
    isNew: true,
    isBestseller: false,
    material: 'Cuir de veau satiné résistant aux rayures. Doublure suédée microfibre.',
    careInstructions: ['Imperméabiliser avant premier usage avec un spray incolore certifié pour cuir'],
    reference: 'MOYA-SAC-004',
    origin: 'Ubrique, Espagne',
  },

  // ==================== SOULIERS ====================
  {
    id: 'prod-11',
    slug: 'bottines-cuir-epurees-talon-bloc',
    name: 'Bottines « Élancée » en Cuir Lisse Talon 55mm',
    shortDescription: 'Tige haute seconde peau et cambrure ergonomique étudiée pour la marche.',
    description:
      'La quintessence de la bottine parisienne. Réalisée dans un cuir de veau souple qui épouse la cheville sans pli disgracieux. Le talon bloc biseauté de 5,5 cm garantit une stabilité sans concession tout au long de la journée.',
    price: 590,
    currency: 'EUR',
    category: 'chaussures',
    categoryLabel: 'Souliers',
    collectionSlugs: ['intemporels'],
    images: [
      {
        url: 'https://images.unsplash.com/photo-1535043934128-cf0b28d52f95?auto=format&fit=crop&w=1200&q=85',
        alt: 'Bottines en cuir noir lisse à talon bloc minimaliste',
      },
      {
        url: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=1200&q=85',
        alt: 'Détail du zip latéral discret et de la semelle cuir cousu Blake',
      },
    ],
    availableSizes: ['36', '37', '38', '39', '40', '41'],
    availableColors: [
      { name: 'Noir Minéral', hex: '#22211F' },
      { name: 'Taupe Fumé', hex: '#A89B8B' },
    ],
    tags: ['bottines', 'souliers', 'talon', 'cuir'],
    featured: true,
    isNew: false,
    isBestseller: true,
    material: 'Tige 100% Cuir de veau français. Semelle intérieure et extérieure en cuir avec patin injecté anti-dérapant.',
    careInstructions: [
      'Poser un patin de protection chez un cordonnier qualifié après quelques ports',
      'Hydrater le cuir avec une cire incolore',
      'Utiliser des embauchoirs en cèdre brut',
    ],
    reference: 'MOYA-CHA-001',
    fit: 'Chaussant normal. Si vous hésitez entre deux pointures, choisissez la pointure supérieure.',
    origin: 'Montegranaro, Marches, Italie',
  },
  {
    id: 'prod-12',
    slug: 'mules-cuir-tresse-noir',
    name: 'Mules « Solstice » en Cuir Tressé Main',
    shortDescription: 'Tressage chevron artisanal et semelle à trépointe débordante.',
    description:
      'Chaque paire nécessite quatre heures de tressage manuel par nos artisans chausseurs. L’empeigne généreuse assure un excellent maintien du pied, rehaussée d’une semelle intérieure moussée à mémoire de forme.',
    price: 430,
    currency: 'EUR',
    category: 'chaussures',
    categoryLabel: 'Souliers',
    collectionSlugs: ['intemporels'],
    images: [
      {
        url: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=1200&q=85',
        alt: 'Mules plates en cuir tressé artisanal',
      },
      {
        url: 'https://images.unsplash.com/photo-1535043934128-cf0b28d52f95?auto=format&fit=crop&w=1200&q=85',
        alt: 'Gros plan sur la régularité du tressage cuir',
      },
    ],
    availableSizes: ['36', '37', '38', '39', '40'],
    availableColors: [
      { name: 'Noir Minéral', hex: '#22211F' },
      { name: 'Sable Clair', hex: '#DCD1C3' },
    ],
    tags: ['mules', 'cuir-tresse', 'ete', 'souliers'],
    featured: false,
    isNew: true,
    isBestseller: false,
    material: 'Lanières de cuir de chevreau souple tressées à la main.',
    careInstructions: ['Brosser délicatement avec une brosse en crin doux pour dépoussiérer les entrelacs'],
    reference: 'MOYA-CHA-002',
    fit: 'Pointure exacte. Adaptée aux cous-de-pied standard à fins.',
    origin: 'Sao Joao da Madeira, Portugal',
  },
  {
    id: 'prod-13',
    slug: 'escarpins-bout-pointu-taupe',
    name: 'Escarpins « Studio » Bout Pointu 70mm',
    shortDescription: 'Décolleté cœur subtil et ligne racée pour une féminité sans artifice.',
    description:
      'Une icône revisitée. Le décolleté a été abaissé juste assez pour révéler le début des orteils dans une tradition purement couture. Le talon aiguille renforcé en acier garantit un aplomb droit et serein.',
    price: 520,
    currency: 'EUR',
    category: 'chaussures',
    categoryLabel: 'Souliers',
    collectionSlugs: ['allure-soir', 'intemporels'],
    images: [
      {
        url: 'https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?auto=format&fit=crop&w=1200&q=85',
        alt: 'Escarpins en cuir taupe posés sur un dallage en marbre',
      },
      {
        url: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=1200&q=85',
        alt: 'Vue de profil de la cambrure et du talon droit',
      },
    ],
    availableSizes: ['36', '37', '38', '39', '40', '41'],
    availableColors: [
      { name: 'Taupe Fumé', hex: '#A89B8B' },
      { name: 'Noir Minéral', hex: '#22211F' },
    ],
    tags: ['escarpins', 'talon', 'soir', 'cuir'],
    featured: false,
    isNew: false,
    isBestseller: true,
    material: '100% Cuir de veau velours soyeux traité anti-taches. Doublure cuir naturel.',
    careInstructions: ['Dépoussiérer à la brosse crêpe. Imperméabiliser régulièrement.'],
    reference: 'MOYA-CHA-003',
    fit: 'Chausse normalement.',
    origin: 'Venise, Italie',
  },

  // ==================== ACCESSOIRES ====================
  {
    id: 'prod-14',
    slug: 'carre-soie-roulotte-graphique',
    name: 'Carré de Soie 90cm « Trame Nocturne »',
    shortDescription: 'Twill de soie lourd, dessin géométrique exclusif et roulotté à la main.',
    description:
      'Imprimé au cadre traditionnel dans la région lyonnaise. Les nuances de sable, taupe et noir profond s’entrelacent dans une composition abstraite inspirée de l’architecture brutaliste. Roulotté français réalisé à la main par nos ourleuses.',
    price: 310,
    currency: 'EUR',
    category: 'accessoires',
    categoryLabel: 'Accessoires',
    collectionSlugs: ['allure-soir', 'intemporels'],
    images: [
      {
        url: 'https://images.unsplash.com/photo-1601924994987-69e26d50dc26?auto=format&fit=crop&w=1200&q=85',
        alt: 'Foulard carré de soie plié avec élégance',
      },
      {
        url: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1200&q=85',
        alt: 'Détail du roulotté main et de la trame du twill de soie 16 mommes',
      },
    ],
    availableSizes: ['Taille Unique (90 x 90 cm)'],
    availableColors: [
      { name: 'Noir & Ivoire', hex: '#22211F' },
      { name: 'Taupe & Or', hex: '#A89B8B' },
    ],
    tags: ['foulard', 'soie', 'carre', 'roulotte'],
    featured: true,
    isNew: true,
    isBestseller: false,
    material: '100% Twill de soie naturelle 16 mommes.',
    careInstructions: [
      'Nettoyage à sec uniquement',
      'Repassage sur fer tiède sans vapeur en protégeant les bords roulottés',
    ],
    reference: 'MOYA-ACC-001',
    origin: 'Lyon, France',
  },
  {
    id: 'prod-15',
    slug: 'ceinture-fine-cuir-boucle-laiton',
    name: 'Ceinture Fine 20mm en Cuir Sellier & Laiton',
    shortDescription: 'Ligne fuselée, passants doublés et boucle dorée brossée artisanale.',
    description:
      'L’accessoire qui parfait un tailleur ou réveille une robe fluide. Le cuir au tannage végétal développe une patine ambrée. La boucle en laiton massif est coulée au sable dans une fonderie d’art.',
    price: 220,
    currency: 'EUR',
    category: 'accessoires',
    categoryLabel: 'Accessoires',
    collectionSlugs: ['intemporels'],
    images: [
      {
        url: 'https://images.unsplash.com/photo-1624222247344-550fb60583dc?auto=format&fit=crop&w=1200&q=85',
        alt: 'Ceinture fine en cuir sellier posée à plat',
      },
      {
        url: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=1200&q=85',
        alt: 'Gros plan sur la boucle en laiton brossé or mat',
      },
    ],
    availableSizes: ['75 cm', '80 cm', '85 cm', '90 cm', '95 cm'],
    availableColors: [
      { name: 'Noir Minéral', hex: '#22211F' },
      { name: 'Caramel Doré', hex: '#A58A5C' },
    ],
    tags: ['ceinture', 'cuir', 'laiton', 'accessoire'],
    featured: false,
    isNew: false,
    isBestseller: true,
    material: 'Cuir de collet à tannage végétal de Toscane. Boucle laiton massif découpé et brossé main.',
    careInstructions: ['Nourrir avec un cirage incolore à la cire d’abeille'],
    reference: 'MOYA-ACC-002',
    origin: 'Atelier de Cholet, France',
  },
  {
    id: 'prod-16',
    slug: 'echarpe-volumineuse-cachemire-brut',
    name: 'Écharpe Volumineuse en Cachemire Pur Dégraissé',
    shortDescription: 'Générosité d’étoffe, franges discrètes nouées et douceur inégalée.',
    description:
      'Mesurant 70 cm de largeur sur 210 cm de longueur, cette écharpe enveloppe délicatement les épaules. Son tissage aéré procure une chaleur bienfaisante sans peser sur la nuque.',
    price: 380,
    currency: 'EUR',
    category: 'accessoires',
    categoryLabel: 'Accessoires',
    collectionSlugs: ['cachemire-laine', 'intemporels'],
    images: [
      {
        url: 'https://images.unsplash.com/photo-1601924994987-69e26d50dc26?auto=format&fit=crop&w=1200&q=85',
        alt: 'Écharpe en cachemire brut roulée avec légèreté',
      },
      {
        url: 'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?auto=format&fit=crop&w=1200&q=85',
        alt: 'Détail de la texture ultra duveteuse des fibres de cachemire',
      },
    ],
    availableSizes: ['Taille Unique (70 x 210 cm)'],
    availableColors: [
      { name: 'Sable Clair', hex: '#DCD1C3' },
      { name: 'Taupe Fumé', hex: '#A89B8B' },
      { name: 'Ivoire Chaud', hex: '#F8F6F1' },
    ],
    tags: ['echarpe', 'cachemire', 'hiver', 'chaleur'],
    featured: false,
    isNew: true,
    isBestseller: true,
    material: '100% Cachemire peigné d’altitude.',
    careInstructions: ['Lavage pressing à sec doux ou lavage manuel à froid'],
    reference: 'MOYA-ACC-003',
    origin: 'Écosse, Royaume-Uni',
  },
];

// Helper query functions
export function getAllProducts(): Product[] {
  return PRODUCTS;
}

export function getProductBySlug(slug: string): Product | undefined {
  return PRODUCTS.find((p) => p.slug === slug);
}

export function getProductsByCategory(category: ProductCategory): Product[] {
  return PRODUCTS.filter((p) => p.category === category);
}

export function getProductsByCollection(collectionSlug: string): Product[] {
  return PRODUCTS.filter((p) => p.collectionSlugs.includes(collectionSlug));
}

export function getFeaturedProducts(): Product[] {
  return PRODUCTS.filter((p) => p.featured);
}

export function getNewArrivals(): Product[] {
  return PRODUCTS.filter((p) => p.isNew);
}

export function getBestsellerProducts(): Product[] {
  return PRODUCTS.filter((p) => p.isBestseller);
}

export function getRelatedProducts(currentProductId: string, limit: number = 4): Product[] {
  const current = PRODUCTS.find((p) => p.id === currentProductId);
  if (!current) return PRODUCTS.slice(0, limit);

  return PRODUCTS.filter(
    (p) => p.id !== currentProductId && (p.category === current.category || p.collectionSlugs.some((s) => current.collectionSlugs.includes(s)))
  ).slice(0, limit);
}

export function filterAndSortProducts(filters: ProductFilterState): Product[] {
  let list = [...PRODUCTS];

  if (filters.category) {
    list = list.filter((p) => p.category === filters.category);
  }

  if (filters.color) {
    const colLower = normalizeString(filters.color);
    list = list.filter((p) =>
      p.availableColors?.some((c) => normalizeString(c.name).includes(colLower))
    );
  }

  if (filters.size) {
    const sizeNorm = filters.size.trim().toUpperCase();
    list = list.filter((p) =>
      p.availableSizes?.some((s) => s.toUpperCase().includes(sizeNorm))
    );
  }

  if (typeof filters.minPrice === 'number') {
    list = list.filter((p) => p.price >= (filters.minPrice as number));
  }

  if (typeof filters.maxPrice === 'number') {
    list = list.filter((p) => p.price <= (filters.maxPrice as number));
  }

  if (filters.searchQuery) {
    const qNorm = normalizeString(filters.searchQuery);
    list = list.filter((p) => {
      const name = normalizeString(p.name);
      const desc = normalizeString(p.description);
      const cat = normalizeString(p.categoryLabel);
      const tags = p.tags.map(normalizeString).join(' ');
      const mat = normalizeString(p.material || '');
      return (
        name.includes(qNorm) ||
        desc.includes(qNorm) ||
        cat.includes(qNorm) ||
        tags.includes(qNorm) ||
        mat.includes(qNorm)
      );
    });
  }

  // Sorting
  switch (filters.sort) {
    case 'nouveautes':
      list.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
      break;
    case 'prix-asc':
      list.sort((a, b) => a.price - b.price);
      break;
    case 'prix-desc':
      list.sort((a, b) => b.price - a.price);
      break;
    case 'pertinence':
    default:
      // Keep curated order
      break;
  }

  return list;
}
