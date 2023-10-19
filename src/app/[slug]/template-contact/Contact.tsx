import { ContactType } from "@/middleware/Contact";
import { PageType } from "@/middleware/Page";
import Image from "next/image";
import he from "he";
import FormContact from "./Form";

export default function Contact({ data }: { data: PageType<ContactType> }) {
  const { title, acf, yoast } = data;

  return (
    <main id="contact-page">
      <section className="top">
        <div className="container">
          <Image
            src={acf.image_top.url}
            alt={acf.image_top.alt}
            width={445}
            height={608}
            className="main-img"
          />
          <div className="txt">
            <Image
              src="/wave-radiant.gif"
              alt="vague en dégradé"
              width={188}
              height={36.27}
            />
            <h1>{he.decode(title)}</h1>
            <div dangerouslySetInnerHTML={{ __html: acf.texte_top }}></div>
          </div>
        </div>
      </section>
      <section className="gray">
        <div className="container">
          <address>
            <h3>{he.decode(acf.titre)}</h3>
            <ul className="agencies">
              {acf.agences.map((agency, index) => (
                <li key={index}>
                  <Image
                    src="/marker-thema.svg"
                    alt="Point de géolocalisation"
                    width={38.01}
                    height={55.7}
                  />
                  <strong>{agency.titre}</strong>
                  <div
                    className="coord"
                    dangerouslySetInnerHTML={{ __html: agency.adresse }}
                  ></div>
                </li>
              ))}
            </ul>
          </address>
          <FormContact />
        </div>
      </section>
    </main>
  );
}
