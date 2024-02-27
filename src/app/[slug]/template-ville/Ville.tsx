import Banner from '@/components/Banner';
import { PageType, VilleType } from '@/middleware/Page';
import Image from 'next/image';
import he from 'he';
import ContactBanner from '@/components/ContactBanner';

export default function Ville({ data }: { data: PageType<VilleType> }) {
  const { acf } = data;
  return (
    <main id="ville">
      <Banner
        title={data.title}
        media={data.media}
        sous_titre={data.acf.sous_titre}
      />
      <section className="gardens">
        <div className="container">
          <Image
            src={acf.image_premier_paragraphe.url}
            alt={acf.image_premier_paragraphe.alt}
            width={908}
            height={674}
            priority={true}
          />
          <div
            className="text content"
            dangerouslySetInnerHTML={{
              __html: acf.texte_premier_paragraphe,
            }}
          />
          <h2>{he.decode(acf.titre_premier_paragraphe)}</h2>
        </div>
      </section>
      <div className="container">
        <section className="yellow-background">
          <h2>{he.decode(acf.titre_fond_jaune)}</h2>
          {acf.description_fond_jaune && (
            <div
              className="description"
              dangerouslySetInnerHTML={{
                __html: acf.description_fond_jaune,
              }}
            />
          )}
          {acf.textes_fond_jaune_vannes && (
            <div className="conseils">
              {acf.textes_fond_jaune_vannes.map((element, index) => (
                <div
                  key={index}
                  dangerouslySetInnerHTML={{ __html: element.texte }}
                />
              ))}
            </div>
          )}
          {acf.titre_fond_jaune_vannes && (
            <h2 className="vannes-title">{he.decode(acf.titre_fond_jaune)}</h2>
          )}
          <div className="conseils">
            {acf.textes_fond_jaune.map((element, index) => (
              <div
                key={index}
                dangerouslySetInnerHTML={{ __html: element.texte }}
              />
            ))}
          </div>
        </section>
        <section
          className={
            acf.textes_fond_jaune.length < 3 ? 'road no-after' : 'road'
          }
        >
          <Image
            src={acf.image_post_fond_jaune.url}
            alt={acf.image_post_fond_jaune.alt}
            width={Number(acf.image_post_fond_jaune.width)}
            height={Number(acf.image_post_fond_jaune.height)}
            className={acf.textes_fond_jaune.length < 3 ? 'less-top' : ''}
          />
          <div
            className="road-content content"
            dangerouslySetInnerHTML={{ __html: acf.texte_post_fond_jaune }}
          />
        </section>
        <section className="communication-digitale">
          <h2>{he.decode(acf.titre_fond_blanc)}</h2>
          <div className="content">
            <div
              className="txt"
              dangerouslySetInnerHTML={{ __html: acf.texte_un_fond_blanc }}
            />
            <div
              className="txt"
              dangerouslySetInnerHTML={{
                __html: acf.texte_deux_fond_blanc,
              }}
            />
            {acf.image_fond_blanc && (
              <Image
                src={acf.image_fond_blanc.url}
                alt={acf.image_fond_blanc.alt}
                width={700}
                height={664}
              />
            )}
          </div>
        </section>
      </div>
      <ContactBanner />
      <div className="container">
        {acf.titre_fond_gris && (
          <section className="fond-gris">
            <h2>{he.decode(acf.titre_fond_gris)}</h2>
            <div className="content">
              {acf.texte_fond_gris.map((element, index: number) => (
                <div
                  key={index}
                  dangerouslySetInnerHTML={{ __html: element.texte }}
                />
              ))}
            </div>
          </section>
        )}
        <section className="bottom-yellow">
          <h2 className={acf.ville === 'Vannes' ? 'center-title' : ''}>
            {he.decode(acf.titre_fond_jaune_2)}
          </h2>
          <div className="white-background">
            <div
              className="texte"
              dangerouslySetInnerHTML={{ __html: acf.texte_fond_jaune_un }}
            />
            {acf.ville === 'Vannes' && (
              <div className="map-container">
                <Image
                  src={acf.carte.url}
                  alt={acf.carte.alt}
                  width={acf.carte.width}
                  height={acf.carte.height}
                />
              </div>
            )}
            <div
              className="texte"
              dangerouslySetInnerHTML={{ __html: acf.texte_fond_jaune_deux }}
            />
            {acf.ville === 'Vannes' && (
              <div
                className="texte"
                dangerouslySetInnerHTML={{ __html: acf.texte_fond_jaune_trois }}
              />
            )}
            <div className="dashed-vertical" />
            <div
              className={
                acf.ville === 'Vannes'
                  ? 'center dashed-horizontal'
                  : 'dashed-horizontal'
              }
            />
          </div>
        </section>
      </div>
    </main>
  );
}
