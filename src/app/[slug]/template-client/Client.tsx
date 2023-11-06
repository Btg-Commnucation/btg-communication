"use client";

import { ClientType, PageType, TemoignagesType } from "@/middleware/Page";
import ScrollToTop from "@/components/ScrollToTop";
import ContactBanner from "@/components/ContactBanner";
import Image from "next/image";
import Temoin from "@/[slug]/template-client/Temoin";
import Banner from "@/components/Banner";
import Button from "@/components/Button";

export default function Client ( { page }: { page: PageType<ClientType> } ) {

  return (
    <main id="client">
      <ScrollToTop/>
      <Banner
        title={ page.title }
        media={ page.media }
        sous_titre={ page.acf.sous_titre }
      />
      <section className="experiences">
        <h2>Ils ont fait l&apos;expérience</h2>
        <ul className="clients">
          { page.acf.temoignage.map( ( temoin: TemoignagesType,
                                       index: number ) => (
            <Temoin temoin={ temoin }
                    index={ index }
                    key={ index }/>
          ) ) }
        </ul>
        <Button link={ page.acf.lien_page_realisations.url }
                text={ page.acf.lien_page_realisations.title }
                target={ page.acf.lien_page_realisations.target }
                name="real"/>
      </section>
      <section className="trust-us">
        <div className="container">
          <h2>Ils nous font confiance :</h2>
          <ul className="confiances">
            { page.acf.confiances.map( ( client,
                                         index: number ) => (
              <li key={ index }>
                <Image
                  src={ client.image.url }
                  alt={ client.image.alt }
                  width={ client.image.width }
                  height={ client.image.height }
                />
              </li>
            ) ) }
          </ul>
        </div>
      </section>
      <ContactBanner/>
    </main>
  );
}
