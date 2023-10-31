"use client";

import {ClientType, PageType, TemoignagesType} from "@/middleware/Page";
import ScrollToTop from "@/components/ScrollToTop";
import ContactBanner from "@/components/ContactBanner";
import Image from "next/image";
import Temoin from "@/[slug]/template-client/Temoin";
import Banner from "@/components/Banner";
import Link from "next/link";
import he from "he";

export default function Client({page}: { page: PageType<ClientType> }) {

  const getSlug = (url: string) => {
    const match = url.match(/\/([^/]+)\/?$/);
    return match ? match[1] : null;
  };

  return (
    <main id="client">
      <ScrollToTop/>
      <Banner
        title={page.title}
        media={page.media}
        sous_titre={page.acf.sous_titre}
      />
      <section className="experiences">
        <h2>Ils ont fait l&apos;expérience</h2>
        <ul className="clients">
          {page.acf.temoignage.map((temoin: TemoignagesType, index: number) => (
            <Temoin temoin={temoin} index={index} key={index}/>
          ))}
        </ul>
        <Link href={`/${getSlug(page.acf.lien_page_realisations?.url)}`} className="real">
          <p>{he.decode(page.acf.lien_page_realisations?.title)}</p>
          <svg
            className="arrow"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 100 100"
            x="0px"
            y="0px"
          >
            <title>Arrows</title>
            <g data-name="Layer 2">
              <polygon
                points="44.13 72.13 58 86 94.25 50 57.87 13.13 44 27 57.51 41 6 41 6 59 57.51 59 44.13 72.13"></polygon>
            </g>
          </svg>
        </Link>
      </section>
      <section className="trust-us">
        <div className="container">
          <h2>Ils nous font confiance :</h2>
          <ul className="confiances">
            {page.acf.confiances.map((client, index: number) => (
              <li key={index}>
                <Image
                  src={client.image.url}
                  alt={client.image.alt}
                  width={client.image.width}
                  height={client.image.height}
                />
              </li>
            ))}
          </ul>
        </div>
      </section>
      <ContactBanner/>
    </main>
  );
}
