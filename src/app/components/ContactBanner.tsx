import Link from 'next/link';

export default function ContactBanner({
  title = 'Vous avez un projet de communication ?',
}: {
  title?: string;
}) {
  return (
    <section className="contact-banner">
      <div className="container">
        <div className="left">
          <h2>{title}</h2>
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
