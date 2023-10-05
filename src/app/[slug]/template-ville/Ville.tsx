import Banner from "@/components/Banner";
import { PageType, VilleType } from "@/middleware/Page";
import Image from "next/image";
import he from "he";

export default function Ville({ data }: { data: PageType<VilleType> }) {
  const { acf } = data;
  return (
    <main id="ville">
      <Banner data={data} />
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
          <div
            className="description"
            dangerouslySetInnerHTML={{
              __html: acf.description_fond_jaune,
            }}
          />
          <div className="conseils">
            {acf.textes_fond_jaune.map((element, index) => (
              <div
                key={index}
                dangerouslySetInnerHTML={{ __html: element.texte }}
              />
            ))}
          </div>
        </section>
        <section className="road">
          <Image
            src={acf.image_post_fond_jaune.url}
            alt={acf.image_post_fond_jaune.alt}
            width={700}
            height={800}
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
            <Image
              src={acf.image_fond_blanc.url}
              alt={acf.image_fond_blanc.alt}
              width={700}
              height={664}
            />
          </div>
        </section>
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
        <section className="bottom-yellow">
          <h2>{he.decode(acf.titre_fond_jaune_2)}</h2>
          <div className="white-background">
            <div
              className="texte"
              dangerouslySetInnerHTML={{ __html: acf.texte_fond_jaune_un }}
            />
            <div
              className="texte"
              dangerouslySetInnerHTML={{ __html: acf.texte_fond_jaune_deux }}
            />
            <div className="dashed-vertical" />
            <div className="dashed-horizontal" />
          </div>
        </section>
      </div>
    </main>
  );
}
