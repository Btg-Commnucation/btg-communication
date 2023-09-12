import Image from "next/image";
import { ImageContentType } from "./page";

export default function AcfImage({ image }: { image: ImageContentType }) {
  return (
    <Image
      src={image.image.url}
      alt={image.image.alt}
      width={image.image.width}
      height={image.image.height}
    />
  );
}
