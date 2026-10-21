import React from 'react';
import Link from 'next/link';

export function SiteFooter() {
  return (
    <footer className="bg-charcoal text-ivory border-t border-black/40 mt-auto">
      {/* Upper editorial block */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 sm:pt-16 pb-10 sm:pb-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-8">
          {/* Brand Col */}
          <div className="sm:col-span-2 lg:col-span-2 space-y-3 sm:space-y-4">
            <Link
              href="/"
              className="font-serif text-xl sm:text-2xl tracking-[0.22em] sm:tracking-[0.25em] uppercase text-white font-normal inline-block"
            >
              MAISON MOYA
            </Link>
            <p className="text-sand/80 text-xs sm:text-sm leading-relaxed max-w-sm font-light">
              Maison de mode contemporaine incarnant l&apos;élégance discrète, les coupes
              épurées et les matières d&apos;exception. Des pièces pensées pour traverser le
              temps avec distinction.
            </p>
            <div className="pt-1 text-[11px] sm:text-xs text-sand/60">
              <p>Ateliers partenaires en France, Italie et Portugal.</p>
            </div>
          </div>

          {/* Boutique Navigation */}
          <div className="space-y-2.5 sm:space-y-3">
            <h4 className="text-[10px] sm:text-[11px] uppercase tracking-[0.2em] font-semibold text-white">
              Boutique
            </h4>
            <ul className="space-y-2 text-xs text-sand/80">
              <li>
                <Link href="/boutique" className="hover:text-white transition-colors block py-0.5">
                  Toute la collection
                </Link>
              </li>
              <li>
                <Link
                  href="/boutique?category=vetements"
                  className="hover:text-white transition-colors block py-0.5"
                >
                  Vêtements
                </Link>
              </li>
              <li>
                <Link
                  href="/boutique?category=sacs"
                  className="hover:text-white transition-colors block py-0.5"
                >
                  Maroquinerie
                </Link>
              </li>
              <li>
                <Link
                  href="/boutique?category=chaussures"
                  className="hover:text-white transition-colors block py-0.5"
                >
                  Souliers
                </Link>
              </li>
              <li>
                <Link
                  href="/boutique?category=accessoires"
                  className="hover:text-white transition-colors block py-0.5"
                >
                  Accessoires
                </Link>
              </li>
            </ul>
          </div>

          {/* Collections */}
          <div className="space-y-2.5 sm:space-y-3">
            <h4 className="text-[10px] sm:text-[11px] uppercase tracking-[0.2em] font-semibold text-white">
              Collections
            </h4>
            <ul className="space-y-2 text-xs text-sand/80">
              <li>
                <Link
                  href="/collections/intemporels"
                  className="hover:text-white transition-colors block py-0.5"
                >
                  Les Intemporels
                </Link>
              </li>
              <li>
                <Link
                  href="/collections/allure-soir"
                  className="hover:text-white transition-colors block py-0.5"
                >
                  L’Allure Soir
                </Link>
              </li>
              <li>
                <Link
                  href="/collections/maroquinerie-fine"
                  className="hover:text-white transition-colors block py-0.5"
                >
                  Maroquinerie d’Atelier
                </Link>
              </li>
              <li>
                <Link
                  href="/collections/cachemire-laine"
                  className="hover:text-white transition-colors block py-0.5"
                >
                  Cachemire & Laines Rares
                </Link>
              </li>
            </ul>
          </div>

          {/* Maison & Service */}
          <div className="space-y-2.5 sm:space-y-3">
            <h4 className="text-[10px] sm:text-[11px] uppercase tracking-[0.2em] font-semibold text-white">
              Maison & Service
            </h4>
            <ul className="space-y-2 text-xs text-sand/80">
              <li>
                <Link href="/a-propos" className="hover:text-white transition-colors block py-0.5">
                  À propos de la Maison
                </Link>
              </li>
              <li>
                <Link
                  href="/livraison-retours"
                  className="hover:text-white transition-colors block py-0.5"
                >
                  Livraison & Retours
                </Link>
              </li>
              <li>
                <Link
                  href="/politique-confidentialite"
                  className="hover:text-white transition-colors block py-0.5"
                >
                  Confidentialité
                </Link>
              </li>
              <li className="pt-1">
                <span className="text-sand/50 text-[11px] block">
                  Service Client : contact@maisonmoya.com
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10 bg-black/60 py-5 sm:py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between text-[11px] text-sand/60 gap-3 text-center sm:text-left">
          <p>© {new Date().getFullYear()} MAISON MOYA. Tous droits réservés.</p>
          <div className="flex items-center space-x-4 sm:space-x-6">
            <Link href="/politique-confidentialite" className="hover:text-white transition-colors py-1">
              Mentions légales & Confidentialité
            </Link>
            <Link href="/livraison-retours" className="hover:text-white transition-colors py-1">
              Conditions de livraison
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
