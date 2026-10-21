import React from 'react';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';

export default function NotFound() {
  return (
    <div className="py-24 sm:py-36 bg-ivory min-h-[75vh] flex items-center justify-center text-center">
      <Container size="sm">
        <span className="text-[11px] uppercase tracking-[0.3em] text-gold font-medium block mb-3">
          Erreur 404
        </span>

        <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl text-black font-normal mb-4">
          Page Introuvable
        </h1>

        <div className="w-10 h-[1px] bg-border-light mx-auto mb-6" />

        <p className="text-xs sm:text-sm text-taupe font-light max-w-md mx-auto mb-10 leading-relaxed">
          La création ou la page que vous recherchez semble avoir changé d&apos;adresse ou
          n&apos;est plus disponible au sein de nos collections.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button href="/boutique" variant="primary">
            Retourner à la boutique
          </Button>
          <Button href="/" variant="outline">
            Page d&apos;accueil
          </Button>
        </div>
      </Container>
    </div>
  );
}
