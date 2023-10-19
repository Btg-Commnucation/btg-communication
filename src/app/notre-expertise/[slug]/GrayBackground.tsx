import { ImageType } from "@/middleware/Image";
import Image from "next/image";

export default function GrayBackground({
  contenu,
  image,
}: {
  contenu: string;
  image: ImageType;
}) {
  return (
    <section className="gray-background">
      <div className="txt" dangerouslySetInnerHTML={{ __html: contenu }}></div>
      <Image
        src={image.url}
        alt={image.alt}
        width={730}
        height={729}
        className="photo"
      />
      <Image
        src="/wave-yellow.gif"
        alt="vague jaune"
        width={188}
        height={36.27}
        className="wave-yellow"
      />
    </section>
  );
}
