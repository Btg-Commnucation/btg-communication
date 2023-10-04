import Banner from "@/components/Banner";
import { PageType, VilleType } from "@/middleware/Page";
import Image from "next/image";
import he from "he";

export default function Ville({ data }: { data: PageType<VilleType> }) {
  return (
    <main id="ville">
      <Banner data={data} />
      <section className="gardens">
        <div className="container">
          <Image
            src={data.acf.image_premier_paragraphe.url}
            alt={data.acf.image_premier_paragraphe.alt}
            width={908}
            height={674}
            priority={true}
          />
          <div
            className="text content"
            dangerouslySetInnerHTML={{
              __html: data.acf.texte_premier_paragraphe,
            }}
          ></div>
          <h2>{he.decode(data.acf.titre_premier_paragraphe)}</h2>
        </div>
      </section>
      <div className="container">
        <section className="yellow-background">
          <h2>{he.decode(data.acf.titre_fond_jaune)}</h2>
          <div
            className="description"
            dangerouslySetInnerHTML={{
              __html: data.acf.description_fond_jaune,
            }}
          ></div>
          <div className="conseils">
            {data.acf.textes_fond_jaune.map((element, index) => (
              <div
                key={index}
                dangerouslySetInnerHTML={{ __html: element.texte }}
              ></div>
            ))}
          </div>
        </section>
        <section className="road">
          <Image
            src={data.acf.image_post_fond_jaune.url}
            alt={data.acf.image_post_fond_jaune.alt}
            width={700}
            height={800}
          />
          <div
            className="road-content content"
            dangerouslySetInnerHTML={{ __html: data.acf.texte_post_fond_jaune }}
          ></div>
        </section>
        <section className="communication-digitale">
          <h2>{he.decode(data.acf.titre_fond_blanc)}</h2>
          <div className="content">
            <div
              className="txt"
              dangerouslySetInnerHTML={{ __html: data.acf.texte_un_fond_blanc }}
            ></div>
            <div
              className="txt"
              dangerouslySetInnerHTML={{
                __html: data.acf.texte_deux_fond_blanc,
              }}
            ></div>
            <Image
              src={data.acf.image_fond_blanc.url}
              alt={data.acf.image_fond_blanc.alt}
              width={700}
              height={664}
            />
          </div>
        </section>
      </div>
    </main>
  );
}
