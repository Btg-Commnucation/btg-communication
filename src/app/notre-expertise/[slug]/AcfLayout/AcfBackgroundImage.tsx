import { ContentFondImageType } from "@/middleware/Domaines";
import Image from "next/image";

export default function AcfBackgroundImage({
  data,
}: {
  data: ContentFondImageType;
}) {
  return (
    <section
      className="background-image"
      style={{
        background: `url(${data.image_de_fond.url}) no-repeat center`,
        backgroundSize: "cover",
      }}
    >
      {data.colonne_ou_ligne === "Ligne" ? (
        <div
          className="container"
          dangerouslySetInnerHTML={{ __html: data.contenu_en_ligne }}
        ></div>
      ) : (
        <div className="container"></div>
      )}
      <Image
        src="/wave-radiant.gif"
        alt="Vague animée"
        width={271.55}
        height={52.38}
        className="wave"
      />
    </section>
  );
}
