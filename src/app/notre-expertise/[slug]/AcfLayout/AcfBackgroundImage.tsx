import { ContentFondImageType } from '@/middleware/Domaines';
import Image from 'next/image';
import he from 'he';
import Button from '@/components/Button';

export default function AcfBackgroundImage({
  data,
}: {
  data: ContentFondImageType;
}) {
  const getSlug = (url: string) => {
    const match = url.match(/\/([^/]+)\/?$/);
    return match ? match[1] : null;
  };

  return (
    <section
      className="background-image"
      style={{
        background: `url(${data.image_de_fond.url}) no-repeat center`,
        backgroundSize: 'cover',
      }}
    >
      {data.colonne_ou_ligne === 'Ligne' ? (
        <div
          className="container"
          dangerouslySetInnerHTML={{ __html: data.contenu_en_ligne }}
        ></div>
      ) : (
        <div className="container colonne-container">
          <h3 className="column-title">{data.titre}</h3>
          {data.contenu_en_ligne && (
            <div
              className="container column-container"
              dangerouslySetInnerHTML={{ __html: data.contenu_en_ligne }}
            ></div>
          )}
          <ul className="steps">
            {data.contenu_en_colonne.map(({ image, titre, texte }, index) => (
              <li key={index}>
                <h3>
                  <span className="img">
                    <Image
                      src={image.url}
                      alt={image.alt}
                      width={29.37}
                      height={29.62}
                    />
                  </span>
                  {he.decode(titre)}
                </h3>
                <div dangerouslySetInnerHTML={{ __html: texte }}></div>
              </li>
            ))}
          </ul>
          {data.lien_ou_sous_texte === 'Lien' && (
            // <Link href={`/${getSlug(data.lien.url)}`} target={data.lien.target}>
            //   <span>{data.lien.title}</span>
            // </Link>
            <Button
              link={data.lien.url}
              text={data.lien.title}
              target={data.lien.target}
            />
          )}
        </div>
      )}

      <Image
        src="/vague-degrade.svg"
        alt="Vague animée"
        width={271.55}
        height={52.38}
        className={data.colonne_ou_ligne === 'Ligne' ? 'wave' : 'hidden-wave'}
      />
    </section>
  );
}
