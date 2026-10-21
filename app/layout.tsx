import type { Metadata } from 'next';
import { Cormorant_Garamond, Inter } from 'next/font/google';
import './globals.css';
import { Providers } from '@/components/layout/Providers';
import { SiteHeader } from '@/components/layout/SiteHeader';
import { SiteFooter } from '@/components/layout/SiteFooter';

const cormorant = Cormorant_Garamond({
  variable: '--font-cormorant',
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
});

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    template: '%s | MAISON MOYA',
    default: 'MAISON MOYA — Maison de Mode & Haute Élégance',
  },
  description:
    'Maison de mode contemporaine incarnant l’élégance discrète, les coupes épurées et les matières d’exception. Prêt-à-porter, maroquinerie et souliers.',
  keywords: [
    'Maison Moya',
    'mode contemporaine',
    'luxe discret',
    'vêtements femme',
    'maroquinerie',
    'souliers',
    'accessoires',
  ],
  authors: [{ name: 'MAISON MOYA' }],
  openGraph: {
    title: 'MAISON MOYA — Maison de Mode & Haute Élégance',
    description:
      'L’élégance sans effort. Silhouettes contemporaines et pièces intemporelles.',
    type: 'website',
    locale: 'fr_FR',
    siteName: 'MAISON MOYA',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className={`${cormorant.variable} ${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-ivory text-charcoal font-sans selection:bg-sand selection:text-black">
        <Providers>
          <SiteHeader />
          <main className="flex-1 flex flex-col">{children}</main>
          <SiteFooter />
        </Providers>
      </body>
    </html>
  );
}
