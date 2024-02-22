import { Exo } from 'next/font/google';
import { ReactNode } from 'react';
import './sass/style.scss';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Analytics } from '@vercel/analytics/react';

const exo = Exo({ subsets: ['latin'] });

export const metadata = {
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="fr">
      <body className={exo.className}>
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
