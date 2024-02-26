import Link from 'next/link';

export default function ContactBanner() {
  return (
    <section className="contact-banner">
      <div className="container">
        <div className="left">
          <h2>Vous avez un projet de communication ?</h2>
          <p>
            Quel que soit votre projet, notre agence vous proposera une solution
            adaptée à vos besoins.
          </p>
        </div>
        <Link href="/contact">
          <span>Contactez notre agence</span>
        </Link>
      </div>
    </section>
  );
}
