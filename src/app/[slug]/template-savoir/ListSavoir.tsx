import Image from "next/image";
import he from "he";
import Link from "next/link";
import { Compétences } from "@/middleware/Competence";

export default function ListSavoir({
  competences,
}: {
  competences: Compétences[];
}) {
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
                <Link href="/">En savoir plus</Link>
              </div>
            </li>
          ))}
        </ul>
        <Link href="/" className="classic-btn">
          Nos réalisations
          <svg
            className="arrow"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 100 100"
            x="0px"
            y="0px"
          >
            <title>Arrows</title>
            <g data-name="Layer 2">
              <polygon points="44.13 72.13 58 86 94.25 50 57.87 13.13 44 27 57.51 41 6 41 6 59 57.51 59 44.13 72.13"></polygon>
            </g>
          </svg>
        </Link>
      </div>
    </section>
  );
}
