import Image from 'next/image';
import he from 'he';
import Link from 'next/link';
import { Competences } from '@/middleware/Competence';
import Button from '@/components/Button';
import { LinkType } from '@/middleware/Link';

export default function ListSavoir({
  competences,
  lien,
}: {
  competences: Competences[];
  lien: LinkType;
}) {
  const createSlug = (lien: string): string => {
    const regexp =
      /^http(?:s)?:\/\/(?:www\.)?admin.btg-communication\.(?:.+)\/(.+)$/;
    const matches = lien.match(regexp);
    if (matches && matches[1]) {
      return matches[1];
    } else {
      return '';
    }
  };

  return (
    <section className="list-savoir">
      <div className="container">
        <h2>Notre savoir-faire</h2>
        <p className="sub-title">
          Notre agence Tourangelle évolue dans l&apos;ensemble des domaines de
          la communication visuelle, ce qui nous permet de réaliser
          l&apos;ensemble des supports de communication de nos clients.
          <br />
          Nous sommes donc aptes à répondre aux demandes les plus spécifiques en
          terme de communication.
        </p>
        <ul className="savoir-listing">
          {competences.map((competence, index: number) => (
            <li key={index}>
              <Image
                src={competence.icone.url}
                alt={competence.icone.alt}
                width="116"
                height="150"
              />
              <div className="listing-right">
                <h3>{he.decode(competence.titre)}</h3>
                <p className="listing-texte">{he.decode(competence.texte)}</p>
                <p className="listing-exemple">
                  <span className="exemple">Exemple : </span>
                  {he.decode(competence.exemple)}
                </p>
                <Link href={`/${createSlug(competence.lien_competence.url)}`}>
                  En savoir plus
                </Link>
              </div>
            </li>
          ))}
        </ul>
        <Button
          link={lien.url}
          text={lien.title}
          target={lien.target}
          name="classic-btn"
        />
      </div>
    </section>
  );
}
