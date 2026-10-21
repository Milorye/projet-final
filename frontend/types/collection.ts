export interface Collection {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  editorialQuote?: string;
  heroImage: {
    url: string;
    alt: string;
  };
  featured: boolean;
  season?: string;
}
