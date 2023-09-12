import Image from "next/image";
import { ImageContentType } from "./page";

export default function AcfImage({ data }: { data: ImageContentType }) {
  return (
    <Image
      src={data.image.url}
      alt={data.image.alt}
      width={940}
      height={419.73}
    />
  );
}
