# MAISON MOYA — Maison de Mode & Haute Élégance

Front-end e-commerce contemporain haut de gamme conçu selon les préceptes du *Quiet Luxury*, alliant raffinement éditorial, minimalisme architectural, typographies soignées et parcours d'achat complet.

---

## 1. Direction Artistique & Identité Visuelle

- **Palette de Couleurs** :
  - Ivoire Chaud : `#F8F6F1`
  - Blanc Pur : `#FFFFFF`
  - Noir Minéral : `#22211F`
  - Anthracite Charbon : `#35322F`
  - Taupe Fumé : `#A89B8B`
  - Beige Sable : `#DCD1C3`
  - Accent Or Mat : `#A58A5C`
  - Bordure Délicate : `#E8E3DC`
- **Typographie** :
  - Titrages éditoriaux : `Cormorant Garamond` (Google Font optimisée)
  - Interface, navigation et corps de texte : `Inter`
- **Esthétique** :
  - Photographie haute définition au cadrage éditorial
  - Espacements généreux et hiérarchie rigoureuse
  - Micro-interactions fluides et respect de `prefers-reduced-motion`

---

## 2. Architecture & Pages Développées

| Route | Description |
| :--- | :--- |
| `/` | **Page d'Accueil Éditoriale** : Barre d'annonces, Navigation collante, Hero campagne, Grille des univers (Vêtements, Maroquinerie, Souliers, Accessoires), Collection phare, Nouveautés, Manifeste éditorial, Pièces iconiques, Histoire de la Maison, Inscription lettre d'information. |
| `/boutique` | **Catalogue & Découverte** : Filtres multi-critères (Rayons, Coloris, Tailles/Pointures, Prix), Tri dynamique (Pertinence, Nouveautés, Prix croissant/décroissant), Badges de filtres actifs, Tiroir de filtres dédié pour mobile, État vide interactif. |
| `/collections` | **Index des Récits Stylistiques** : Présentation éditoriale des 4 collections (*Les Intemporels*, *L'Allure Soir*, *Maroquinerie d'Atelier*, *Cachemire & Laines Rares*). |
| `/collections/[slug]` | **Détail de Collection** : Bannière grand format, citation narrative, filtrage automatique des pièces affiliées, breadcrumbs et gestion 404 pour slug inconnu. |
| `/produit/[slug]` | **Fiche Produit Détaillée** : Galerie interactive avec miniatures, sélection de coloris et de tailles avec validation obligatoire, sélecteur de quantité, ajout au panier fluide avec retour visuel, accordéons de détails (Composition, Coupe & guide, Entretien, Livraison), et recommandations de pièces coordonnées. |
| `/recherche` | **Moteur de Recherche** : Recherche plein texte avec normalisation des accents et de la casse, requêtes suggérées, comptage en direct et état vide guidé. |
| `/favoris` | **Carnet d'Envies** : Gestion locale des favoris, ajout rapide au panier, suppression et persistance `localStorage`. |
| `/panier` | **Panier & Récapitulatif** : Tableau détaillé des articles, ajustement des quantités, calcul automatique du sous-total, indicateur de livraison offerte (> 300 €), saisie de code avantage et modale de délimitation de démonstration. |
| `/a-propos` | **Histoire & Ateliers** : Récit de marque, engagement qualité, piliers artisanaux et manufactures partenaires. |
| `/livraison-retours` | **Service Client** : Modalités d'expédition discrète en écrin d'atelier, délais indicatifs et politique de retour sous 14 jours. |
| `/politique-confidentialite` | **Confidentialité & Mentions** : Notice explicative sur les données locales et mentions d'environnement de démonstration. |
| `not-found.tsx` | **Erreur 404 Personnalisée** : Page d'erreur aux codes graphiques de la Maison avec redirection vers la boutique. |

---

## 3. Stack Technique

- **Framework** : Next.js 16 (App Router, Server Components & Client Components ciblés)
- **Langage** : TypeScript en mode strict (`strict: true`)
- **Styles** : Tailwind CSS v4 & Turbopack
- **Icônes** : Lucide React
- **Gestion d'État** : Context API (`CartContext`, `FavoritesContext`) avec synchronisation locale sécurisée SSR
- **SEO & Accessibilité** : Métadonnées dynamiques Open Graph, balisage sémantique, `sitemap.ts`, `robots.ts` et contrastes WCAG.

---

## 4. Installation & Lancement Local

### Prérequis
- Node.js version 18.18+ ou 20+ (recommandé v20+)
- npm ou pnpm

### Commandes

```bash
# 1. Cloner ou ouvrir le répertoire du projet
cd projet-final

# 2. Installer les dépendances
npm install

# 3. Lancer le serveur de développement local
npm run dev

# 4. Ouvrir l'application
# Rendez-vous sur http://localhost:3000
```

---

## 5. Vérification & Tests

Le projet intègre une suite de vérifications complètes :

```bash
# Vérification TypeScript stricte
npx tsc --noEmit

# Analyse de qualité de code (ESLint 9)
npm run lint

# Tests fonctionnels unitaires (normalisation, calculs panier, recherche)
npm test

# Compilation pour la production
npm run build
```

---

## 6. Procédure de Déploiement Public

Le projet est conçu pour être déployé en un clic sur **Vercel** ou tout hébergeur compatible Node.js :

1. **Dépôt Git** :
   ```bash
   git add .
   git commit -m "feat: complete MAISON MOYA luxury e-commerce frontend"
   git push origin main
   ```
2. **Import Vercel** :
   - Connectez-vous sur [vercel.com](https://vercel.com)
   - Cliquez sur **Add New Project** et importez le dépôt GitHub/GitLab
   - Le framework Next.js est détecté automatiquement
   - Commande de build : `npm run build`
   - Répertoire de sortie : `.next`
3. **Variables d'environnement** :
   - Aucune variable secrète n'est requise pour cette phase front-end autonome.
4. **Déploiement** :
   - Cliquez sur **Deploy**.
   - Le site est généré statiquement (SSG pour 34 pages) et servi instantanément via CDN mondial.

---

## 7. Raccordement Backend Futur

L'architecture isole scrupuleusement la logique de présentation et la logique de données :
- `lib/products.ts` et `lib/search.ts` peuvent être remplacés directement par des appels API REST / GraphQL (ex: Shopify Storefront API, Medusa.js, Swell ou backend sur mesure).
- `CartContext.tsx` est prêt à être interfacé avec un panier côté serveur ou une session de checkout Stripe / Apple Pay.

---

© MAISON MOYA. Tous droits réservés.
