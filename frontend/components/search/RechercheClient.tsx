'use client';

import React, { useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { searchProducts, SUGGESTED_SEARCHES } from '@/lib/search';
import { Container } from '@/components/ui/Container';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { ProductGrid } from '@/components/products/ProductGrid';
import { EmptyState } from '@/components/ui/EmptyState';
import { Search, X } from 'lucide-react';

export function RechercheClient() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const activeQuery = searchParams.get('q') || '';

  const [inputVal, setInputVal] = useState(activeQuery);

  const searchResult = searchProducts(activeQuery);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputVal.trim()) return;
    router.push(`/recherche?q=${encodeURIComponent(inputVal.trim())}`);
  };

  const handleSuggestion = (keyword: string) => {
    setInputVal(keyword);
    router.push(`/recherche?q=${encodeURIComponent(keyword)}`);
  };

  return (
    <div className="py-8 sm:py-12 bg-ivory min-h-screen">
      <Container>
        <Breadcrumbs items={[{ label: 'Recherche' }]} />

        {/* Search header & input */}
        <div className="max-w-3xl mx-auto text-center pt-4 pb-12">
          <p className="text-[11px] uppercase tracking-[0.25em] text-taupe font-medium mb-3">
            Recherche dans le catalogue
          </p>
          <h1 className="font-serif text-3xl sm:text-4xl text-black mb-8">
            Trouver une création
          </h1>

          <form onSubmit={handleSubmit} className="relative max-w-xl mx-auto">
            <div className="relative flex items-center border border-border-light bg-white focus-within:border-black transition-colors shadow-xs">
              <Search className="w-5 h-5 text-taupe ml-4 shrink-0" />
              <input
                type="text"
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                placeholder="Ex. : Manteau, sac cuir, soie, cachemire..."
                className="w-full py-4 px-3 text-sm bg-transparent text-black placeholder:text-taupe focus:outline-hidden"
              />
              {inputVal && (
                <button
                  type="button"
                  onClick={() => {
                    setInputVal('');
                    router.push('/recherche');
                  }}
                  className="p-2 text-taupe hover:text-black mr-2"
                  aria-label="Effacer le champ"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
              <button
                type="submit"
                className="bg-black text-white px-6 py-4 text-xs uppercase tracking-widest font-medium hover:bg-charcoal transition-colors shrink-0"
              >
                Rechercher
              </button>
            </div>
          </form>

          {/* Suggestions */}
          <div className="mt-4 flex flex-wrap items-center justify-center gap-2 text-xs">
            <span className="text-taupe text-[11px]">Suggestions :</span>
            {SUGGESTED_SEARCHES.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => handleSuggestion(item)}
                className="px-2.5 py-1 bg-sand/30 hover:bg-sand/60 text-charcoal border border-border-light text-[11px] transition-colors"
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        {/* Results Area */}
        <div className="border-t border-border-light pt-8">
          {activeQuery ? (
            <div>
              <div className="flex items-center justify-between mb-8 text-xs text-taupe">
                <span>
                  Résultats pour « <strong className="text-black font-semibold">{activeQuery}</strong> »
                </span>
                <span>
                  {searchResult.total} pièce{searchResult.total > 1 ? 's' : ''} trouvée{searchResult.total > 1 ? 's' : ''}
                </span>
              </div>

              {searchResult.total === 0 ? (
                <EmptyState
                  title="Aucun résultat trouvé"
                  description={`Nous n'avons trouvé aucune création correspondant à votre recherche « ${activeQuery} ». Vous pouvez essayer d'autres mots-clés ou découvrir nos pièces intemporelles.`}
                  actionLabel="Explorer toute la boutique"
                  actionHref="/boutique"
                />
              ) : (
                <ProductGrid products={searchResult.products} columns={4} />
              )}
            </div>
          ) : (
            <div className="text-center py-12 text-taupe text-sm font-light">
              Saisissez un mot-clé ou choisissez l&apos;une des suggestions ci-dessus
              pour explorer nos pièces.
            </div>
          )}
        </div>
      </Container>
    </div>
  );
}
