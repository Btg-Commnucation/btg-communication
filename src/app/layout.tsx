import { Exo } from 'next/font/google';
import { ReactNode } from 'react';
import './sass/style.scss';

const exo = Exo({ subsets: ['latin'] });

export const metadata = {
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="fr">
      <body className={exo.className}>{children}</body>
    </html>
  );
}
