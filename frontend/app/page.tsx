import { HeroSection } from '@/components/home/HeroSection';
import { CategoryGrid } from '@/components/home/CategoryGrid';
import { FeaturedCollection } from '@/components/home/FeaturedCollection';
import { NewArrivals } from '@/components/home/NewArrivals';
import { EditorialSection } from '@/components/home/EditorialSection';
import { BestsellersSection } from '@/components/home/BestsellersSection';
import { BrandStory } from '@/components/home/BrandStory';
import { NewsletterSection } from '@/components/home/NewsletterSection';

export default function HomePage() {
  return (
    <>
      {/* Section A: Hero Campaign */}
      <HeroSection />

      {/* Section B: Shop by Category */}
      <CategoryGrid />

      {/* Section C: Featured Collection */}
      <FeaturedCollection />

      {/* Section D: New Arrivals */}
      <NewArrivals />

      {/* Section E: Editorial Campaign */}
      <EditorialSection />

      {/* Section F: Bestsellers */}
      <BestsellersSection />

      {/* Section G: Brand Story */}
      <BrandStory />

      {/* Section H: Newsletter */}
      <NewsletterSection />
    </>
  );
}
