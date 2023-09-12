import { Membre } from "@/middleware/Page";
import Image from "next/image";
import he from "he";

export default function Members({ data }: { data: Membre[] }) {
  const removeAccents = (input: string): string => {
    return input
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase();
  };

  return (
    <>
      {data.map(
        (
          {
            nom_membre,
            image_membre,
            image_blog_membre,
            post_membre,
            descriptif_membre,
            blog_membre,
          },
          index: number
        ) => (
          <section
            className="membre"
            id={removeAccents(nom_membre)}
            key={index}
          >
            <div className="container">
              <h4 className="reversed flipped">{nom_membre}</h4>
              <Image
                src={image_membre.url}
                width={586}
                height={586}
                alt={image_membre.alt}
              />
              <div className="desc">
                <h3>{he.decode(post_membre)}</h3>
                <div
                  className="exo-light-16"
                  dangerouslySetInnerHTML={{ __html: descriptif_membre }}
                ></div>
              </div>
            </div>
          </section>
        )
      )}
    </>
  );
}
