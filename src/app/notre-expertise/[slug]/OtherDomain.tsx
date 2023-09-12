import Link from "next/link";
import { DomaineType, ImageContentType, TextContentType } from "./page";
import he from "he";
import Image from "next/image";

export default function OtherDomain({
  domains,
}: {
  domains: DomaineType<TextContentType | ImageContentType>[];
}) {
  return (
    <ul className="domains-list">
      {domains.map((domain, index: number) => (
        <li key={index}>
          <Link href={`/notre-expertise/${domain.slug}`}>
            <div className="img-container">
              <Image
                src={domain.acf.logo_noir.url}
                alt={domain.acf.logo_noir.alt}
                width={75}
                height={86.67}
              />
            </div>
            <strong>{he.decode(domain.title)}</strong>
          </Link>
        </li>
      ))}
    </ul>
  );
}
