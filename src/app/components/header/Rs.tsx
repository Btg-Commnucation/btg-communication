import { rsOptions } from "@/middleware/Header";
import Image from "next/image";

export default function Rs({
  rsOptions,
  showContact,
}: {
  rsOptions: rsOptions;
  showContact: boolean;
}) {
  return (
    <ul className="rs">
      {showContact && (
        <li>
          <a
            href="mailto:contact@btg-communication.fr"
            rel="noreferrer noopenener"
          >
            <span className="screen-reader-text">
              Nous envoyer directement un email
            </span>
            <Image
              width={48}
              height={56}
              src="/contact-degrade.svg"
              alt="Image d'une enveloppe"
            />
          </a>
        </li>
      )}
      <li>
        <a
          href={rsOptions.facebook.url}
          target={rsOptions.facebook.target}
          rel="noreferrer noopenener"
        >
          <span className="screen-reader-text">{rsOptions.facebook.title}</span>
          <Image
            width={48}
            height={56}
            src="/facebook-degrade.svg"
            alt="Logo de Facebook"
          />
        </a>
      </li>
      <li>
        <a
          href={rsOptions.linkedin.url}
          target={rsOptions.linkedin.target}
          rel="noreferrer noopenener"
        >
          <span className="screen-reader-text">{rsOptions.linkedin.title}</span>
          <Image
            width={48}
            height={56}
            src="/linkedin-degrade.svg"
            alt="Logo de Linkedin"
          />
        </a>
      </li>
      <li>
        <a
          href={rsOptions.instagram.url}
          target={rsOptions.instagram.target}
          rel="noreferrer noopenener"
        >
          <span className="screen-reader-text">
            {rsOptions.instagram.title}
          </span>
          <Image
            width={48}
            height={56}
            src="/insta-degrade.svg"
            alt="Logo d'instagram"
          />
        </a>
      </li>
    </ul>
  );
}
