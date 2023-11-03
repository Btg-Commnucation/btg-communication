import Image from "next/image";
import he from "he";
import Link from "next/link";
import ListSavoir from "./ListSavoir";
import {PageType, SavoirType} from "@/middleware/Page";
import Banner from "@/components/Banner";
import ScrollToTop from "@/components/ScrollToTop";
import ContactBanner from "@/components/ContactBanner";
import Button from "@/components/Button";

export default function Savoir({page}: { page: PageType<SavoirType> }) {

  const getSlug = (url: string) => {
    const match = url.match(/\/([^/]+)\/?$/);
    return match ? match[1] : null;
  };

  return (
    <main id="savoir">
      <ScrollToTop/>
      <Banner
        title={page.title}
        media={page.media}
        sous_titre={page.acf.sous_titre}
      />
      <section className="agence">
        <div className="container">
          <Image
            src={page.acf.image_de_fond.url}
            alt={page.acf.image_de_fond.alt}
            width={page.acf.image_de_fond.width}
            height={page.acf.image_de_fond.height}
          />
          <div
            className="right"
            style={{height: `${page.acf.image_de_fond.height}px`}}
          >
            <div className="supperpo">
              <h2>L&apos;agence</h2>
              <div
                dangerouslySetInnerHTML={{__html: page.acf.texte_agence}}
              ></div>
              <ul className="link">
                <li>
                  <Link href={`/${getSlug(page.acf.lien_agence_tours.url)}`}>
                    {he.decode(page.acf.lien_agence_tours.title)}
                  </Link>
                </li>
                <li>
                  <Link href={`/${getSlug(page.acf.lien_agence_vannes.url)}`}>
                    {he.decode(page.acf.lien_agence_vannes.title)}
                  </Link>
                </li>
              </ul>
            </div>
            <div className="text-accomp">
              <div
                dangerouslySetInnerHTML={{
                  __html: page.acf.texte_accompagnement,
                }}
              ></div>
              <Button link={page.acf.lien_equipe.url} text={page.acf.lien_equipe.title}
                      target={page.acf.lien_equipe.target} name="link-equipe"/>
            </div>
          </div>
        </div>
      </section>
      <ListSavoir competences={page.acf.competences} lien={page.acf.lien_realisations}/>
      <ContactBanner/>
      <section className="bottom">
        <div className="container">
          <Image
            src={page.acf.agence_bas_image.url}
            alt={page.acf.agence_bas_image.alt}
            width={page.acf.agence_bas_image.width}
            height={page.acf.agence_bas_image.height}
          />
          <div
            className="bottom-text"
            dangerouslySetInnerHTML={{__html: page.acf.agence_bas_texte}}
          ></div>
        </div>
      </section>
      <section className="bottom-blue">
        <div className="container">
          <div className="texte">
            <Image
              src="/wave-radiant.gif"
              alt="Vague en dégradée animée"
              width={188}
              height={37}
            />
            <div
              className="text__content"
              dangerouslySetInnerHTML={{
                __html: page.acf.agence_fond_bleu_texte,
              }}
            ></div>
            <Image
              src="/wave-radiant.gif"
              alt="Vague en dégradée animée"
              width={188}
              height={37}
            />
          </div>
        </div>
      </section>
    </main>
  );
}
