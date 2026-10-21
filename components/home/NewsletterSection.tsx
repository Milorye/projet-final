'use client';

import React, { useState } from 'react';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { CheckCircle2, AlertCircle } from 'lucide-react';

export function NewsletterSection() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const validateEmail = (val: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!email.trim()) {
      setStatus('error');
      setErrorMessage('Veuillez renseigner votre adresse e-mail.');
      return;
    }

    if (!validateEmail(email)) {
      setStatus('error');
      setErrorMessage('Veuillez saisir une adresse e-mail valide.');
      return;
    }

    setStatus('loading');

    // Simulate front-end submission feedback
    setTimeout(() => {
      setStatus('success');
      setEmail('');
    }, 600);
  };

  return (
    <section className="py-16 sm:py-24 bg-white border-t border-border-light">
      <Container size="sm" className="text-center px-4">
        <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.25em] text-taupe font-medium block mb-2">
          Correspondance Privée
        </span>
        <h2 className="font-serif text-2xl xs:text-3xl sm:text-4xl text-black mb-3 sm:mb-4">
          La Lettre MAISON MOYA
        </h2>
        <p className="text-xs sm:text-sm text-taupe font-light max-w-md mx-auto mb-6 sm:mb-8 leading-relaxed">
          Recevez en avant-première nos lancements de collections, nos invitations aux
          ventes privées et nos carnets d&apos;inspiration éditoriaux.
        </p>

        {status === 'success' ? (
          <div className="p-5 sm:p-6 bg-sand/20 border border-border-light max-w-md mx-auto animate-fade-in text-center">
            <CheckCircle2 className="w-6 h-6 text-emerald-700 mx-auto mb-2" />
            <h3 className="font-serif text-base sm:text-lg text-black mb-1">
              Merci pour votre inscription
            </h3>
            <p className="text-xs text-charcoal/80 mb-3">
              Vous recevrez prochainement nos nouvelles correspondances.
            </p>
            <p className="text-[10px] text-taupe italic">
              Note : Démonstration front-end — aucune donnée personnelle n&apos;a été transmise à un serveur.
            </p>
            <button
              onClick={() => setStatus('idle')}
              className="mt-4 text-xs text-black underline underline-offset-4 py-1"
            >
              Inscrire une autre adresse
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-3">
            <div className="flex flex-col sm:flex-row gap-2.5">
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (status === 'error') setStatus('idle');
                }}
                placeholder="Votre adresse e-mail"
                className="flex-1 px-4 py-3 min-h-[46px] text-xs bg-ivory border border-border-light text-black placeholder:text-taupe focus:outline-hidden focus:border-black"
                aria-label="Adresse e-mail pour la newsletter"
                disabled={status === 'loading'}
              />
              <Button
                type="submit"
                variant="primary"
                size="md"
                isLoading={status === 'loading'}
                className="shrink-0 min-h-[46px]"
              >
                S&apos;inscrire
              </Button>
            </div>

            {status === 'error' && (
              <div className="flex items-center justify-center gap-1.5 text-xs text-rose-700 pt-1">
                <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            <p className="text-[10px] text-taupe pt-1 leading-normal">
              En vous inscrivant, vous acceptez de recevoir nos e-mails. Désinscription à
              tout moment d&apos;un simple clic.
            </p>
          </form>
        )}
      </Container>
    </section>
  );
}
