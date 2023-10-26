import {
  ContentType,
  ContentTypeFondJauneType,
  ContentTypeImage,
} from "@/middleware/Domaines";
import Image from "next/image";

type ItemType = ContentType<ContentTypeImage | ContentTypeFondJauneType>;

export default function AcfContent({ item }: { item: ItemType }) {
  return (
    <section className="acf contentType">
      <div className="container">
        <article dangerouslySetInnerHTML={{ __html: item.contenu }}></article>
        {item.contenu_flex.map((content, index) => (
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
                  <>
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
                  </>
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
          </>
        ))}
      </div>
    </section>
  );
}
