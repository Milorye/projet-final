'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Search, Heart, ShoppingBag, Menu } from 'lucide-react';
import { AnnouncementBar } from './AnnouncementBar';
import { MobileNavigation } from './MobileNavigation';
import { SearchDialog } from '@/components/search/SearchDialog';
import { useCart } from '@/context/CartContext';
import { useFavorites } from '@/context/FavoritesContext';
import { cn } from '@/lib/utils';

export function SiteHeader() {
  const pathname = usePathname();
  const { openCart, itemCount } = useCart();
  const { favoritesCount } = useFavorites();

  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const leftNavLinks = [
    { label: 'Boutique', href: '/boutique' },
    { label: 'Nouveautés', href: '/boutique?filtre=nouveau' },
    { label: 'Collections', href: '/collections' },
  ];

  const rightNavLinks = [
    { label: 'À propos', href: '/a-propos' },
  ];

  return (
    <>
      <header
        className={cn(
          'sticky top-0 z-40 w-full transition-all duration-300',
          isScrolled
            ? 'bg-ivory/95 backdrop-blur-md shadow-xs border-b border-border-light'
            : 'bg-ivory border-b border-border-light/60'
        )}
      >
        <AnnouncementBar />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="h-16 sm:h-20 flex items-center justify-between">
            {/* Left Wing: Mobile Menu Button (Mobile) OR Catalog Links (Desktop) */}
            <div className="flex-1 flex items-center justify-start min-w-0">
              {/* Mobile hamburger button */}
              <button
                type="button"
                onClick={() => setMobileMenuOpen(true)}
                className="lg:hidden w-11 h-11 flex items-center justify-center -ml-2 text-charcoal hover:text-black transition-colors"
                aria-label="Ouvrir le menu de navigation"
              >
                <Menu className="w-5 h-5 sm:w-6 sm:h-6 stroke-[1.5]" />
              </button>

              {/* Desktop Left Links */}
              <nav className="hidden lg:flex items-center space-x-6 xl:space-x-8" aria-label="Navigation catalogue">
                {leftNavLinks.map((link) => {
                  const isActive = pathname.startsWith(link.href.split('?')[0]);
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={cn(
                        'text-xs uppercase tracking-[0.18em] transition-colors relative py-1 whitespace-nowrap',
                        isActive
                          ? 'text-black font-semibold'
                          : 'text-charcoal/80 hover:text-black'
                      )}
                    >
                      {link.label}
                      {isActive && (
                        <span className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-black" />
                      )}
                    </Link>
                  );
                })}
              </nav>
            </div>

            {/* Center: Iconic Brand Wordmark (Symmetrically anchored, never overlapping) */}
            <div className="shrink-0 px-2 sm:px-6 text-center">
              <Link
                href="/"
                className="font-serif text-lg xs:text-xl sm:text-2xl lg:text-3xl tracking-[0.2em] sm:tracking-[0.25em] uppercase text-black font-normal hover:opacity-90 transition-opacity block whitespace-nowrap"
                aria-label="MAISON MOYA — Retour à l'accueil"
              >
                MAISON MOYA
              </Link>
            </div>

            {/* Right Wing: Brand Link (Desktop) + Action Buttons */}
            <div className="flex-1 flex items-center justify-end space-x-1 sm:space-x-2 lg:space-x-3 xl:space-x-4 min-w-0">
              {/* Desktop Right Link */}
              <nav className="hidden lg:flex items-center mr-3" aria-label="Navigation maison">
                {rightNavLinks.map((link) => {
                  const isActive = pathname.startsWith(link.href);
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={cn(
                        'text-xs uppercase tracking-[0.18em] transition-colors relative py-1 whitespace-nowrap',
                        isActive
                          ? 'text-black font-semibold'
                          : 'text-charcoal/80 hover:text-black'
                      )}
                    >
                      {link.label}
                      {isActive && (
                        <span className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-black" />
                      )}
                    </Link>
                  );
                })}
              </nav>

              {/* Search button */}
              <button
                type="button"
                onClick={() => setSearchOpen(true)}
                className="w-10 h-10 sm:w-11 sm:h-11 flex items-center justify-center text-charcoal hover:text-black transition-colors"
                aria-label="Rechercher des créations"
              >
                <Search className="w-4 h-4 sm:w-5 sm:h-5 stroke-[1.5]" />
              </button>

              {/* Favorites link */}
              <Link
                href="/favoris"
                className="relative w-10 h-10 sm:w-11 sm:h-11 flex items-center justify-center text-charcoal hover:text-black transition-colors"
                aria-label={`Favoris (${favoritesCount} articles)`}
              >
                <Heart className="w-4 h-4 sm:w-5 sm:h-5 stroke-[1.5]" />
                {favoritesCount > 0 && (
                  <span className="absolute top-1.5 right-1.5 flex items-center justify-center w-4 h-4 bg-sand text-black text-[9px] font-bold rounded-full">
                    {favoritesCount}
                  </span>
                )}
              </Link>

              {/* Shopping bag button */}
              <button
                type="button"
                onClick={openCart}
                className="relative w-10 h-10 sm:w-11 sm:h-11 flex items-center justify-center text-charcoal hover:text-black transition-colors"
                aria-label={`Panier (${itemCount} articles)`}
              >
                <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5 stroke-[1.5]" />
                {itemCount > 0 && (
                  <span className="absolute top-1.5 right-1.5 flex items-center justify-center w-4 h-4 bg-black text-white text-[9px] font-bold rounded-full">
                    {itemCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      <MobileNavigation
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
      />

      {/* Instant Search Dialog */}
      <SearchDialog
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
      />
    </>
  );
}
