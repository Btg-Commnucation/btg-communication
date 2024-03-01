import Link from 'next/link';
import LogoError from '@/components/LogoError';
import BottomError from '@/components/bottomError';
import Header from '@/components/header/Header';
import Footer from '@/components/footer/Footer';

function NotFoundPage() {
  return (
    <>
      <Header />
      <main id="error404">
        <div className="container">
          <LogoError />
          <div className="center">
            <h1>404</h1>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 188 32">
              <path d="M156.7 32c-9.5 0-14.2-7.7-18.2-14.5-4.4-7.1-7.4-11.5-13.2-11.5-5.7 0-8.8 4.4-13.1 11.5C108.1 24.3 103.5 32 94 32s-14.2-7.7-18.2-14.5C71.4 10.4 68.4 6 62.7 6c-5.7 0-8.8 4.4-13.1 11.5C45.5 24.3 40.9 32 31.3 32s-14.2-7.7-18.2-14.5C8.8 10.4 5.7 6 0 6V0c9.5 0 14.2 7.7 18.2 14.5C22.6 21.6 25.6 26 31.3 26c5.7 0 8.8-4.4 13.1-11.5C48.5 7.7 53.1 0 62.7 0c9.5 0 14.2 7.7 18.2 14.5C85.2 21.6 88.3 26 94 26s8.8-4.4 13.1-11.5C111.2 7.7 115.8 0 125.3 0s14.2 7.7 18.2 14.5c4.3 7.2 7.4 11.5 13.1 11.5s8.8-4.4 13.1-11.5C173.8 7.7 178.5 0 188 0v6c-5.7 0-8.8 4.4-13.1 11.5-4.1 6.8-8.7 14.5-18.2 14.5z"></path>
            </svg>
            <strong>Oups, une erreur c'est produite</strong>

            <p>
              La page que vous recherchez n'existe pas ou a été supprimés,
              retournons plutôt ) l'accueil
            </p>
            <Link href="/" className="return-home">
              Retour à l&apos;accueil
            </Link>
          </div>
          <BottomError />
        </div>
      </main>
      <Footer />
    </>
  );
}

export default NotFoundPage;
