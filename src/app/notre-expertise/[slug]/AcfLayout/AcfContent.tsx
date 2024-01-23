import {
  ContentType,
  ContentTypeFondJauneType,
  ContentTextePlusType,
  ContentTypeImage, ContentLine,
} from "@/middleware/Domaines";
import Image from "next/image";
import he from "he";
import Link from "next/link";

type ItemType = ContentType<ContentTypeImage | ContentTypeFondJauneType | ContentTextePlusType | ContentLine>;
export default function AcfContent({item}: { item: ItemType }) {

  const getSlug = (url: string) => {
    const match = url.match(/\/([^/]+)\/?$/);
    return match ? match[1] : null;
  };

  return (
    <section className="acf contentType">
      <div className="container">
        {item.contenu && <article dangerouslySetInnerHTML={{__html: item.contenu}}></article>}
        {item.contenu_flex && item.contenu_flex.map((content, index) => (
          <>
            {content.acf_fc_layout === "fond_jaune" && (
              <>
                {content.colonne_ou_ligne === "Ligne" ? (
                  <div className="yellow-background" key={index}>
                    <div className="image-background">
                      <Image
                        src={content.image.url}
                        alt={content.image.alt}
                        width={57}
                        height={57}
                      />
                    </div>
                    <div
                      className="content_yellow_background"
                      dangerouslySetInnerHTML={{
                        __html: content.contenu_fond_jaune,
                      }}
                    ></div>
                  </div>
                ) : (
                  <div className="yellow-background__container" key={index}>
                    {content.colonne.map((item, index) => (
                      <div className="yellow-background" key={index}>
                        <div className="image-background">
                          <Image
                            src={item.image.url}
                            alt={item.image.alt}
                            width={57}
                            height={57}
                          />
                        </div>
                        <div
                          className="content_yellow_background"
                          dangerouslySetInnerHTML={{
                            __html: item.contenu,
                          }}
                        ></div>
                      </div>
                    ))}
                  </div>
                )}
              </>
            )}
            {content.acf_fc_layout === "image" && (
              <>
                <Image
                  src={content.image.url}
                  alt={content.image.alt}
                  title={content.image.title}
                  width={content.image.width}
                  height={content.image.height}
                  className="image-under"
                />
                {content.un_texte_sous_limage === "Oui" && (
                  <div className="text-under">
                    <div className="picto">
                      <span>+</span>
                    </div>
                    <div
                      className="text-under-content"
                      dangerouslySetInnerHTML={{
                        __html: content.texte_sous_image,
                      }}
                    ></div>
                  </div>
                )}
              </>
            )}
            {content.acf_fc_layout === "texte_avec_plus" && (
              <div className="texte_plus">
                <span>+</span>
                <p>{he.decode(content.texte)}</p>
              </div>
            )}
            {content.acf_fc_layout === "lien" && (
              <Link target={content.lien.target} href={`/${getSlug(content.lien.url)}`}
                    className="acf__content__link-type">
                <svg className="arrow" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" x="0px" y="0px">
                  <g data-name="Layer 2">
                    <polygon
                      points="44.13 72.13 58 86 94.25 50 57.87 13.13 44 27 57.51 41 6 41 6 59 57.51 59 44.13 72.13"></polygon>
                  </g>
                </svg>
                {he.decode(content.lien.title)}
              </Link>
            )}
          </>
        ))}
      </div>
    </section>
  );
}
