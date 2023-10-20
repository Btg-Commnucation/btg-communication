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
                  <></>
                )}
              </>
            )}
          </>
        ))}
      </div>
    </section>
  );
}
