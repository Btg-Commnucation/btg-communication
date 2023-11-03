import Banner from "@/components/Banner";
import {EquipeType, PageType} from "@/middleware/Page";
import Members from "./Members";
import ScrollToTop from "@/components/ScrollToTop";
import ContactBanner from "@/components/ContactBanner";
import Button from "@/components/Button";

export default function Equipe({page}: { page: PageType<EquipeType> }) {
  return (
    <main id="equipe">
      <ScrollToTop/>
      <Banner
        title={page.title}
        sous_titre={page.acf.sous_titre}
        media={page.media}
      />
      <article>
        <div
          className="container"
          dangerouslySetInnerHTML={{__html: page.content}}
        ></div>
      </article>
      <Members data={page.acf.membre}/>
      <section className="lien">
        <Button link={page.acf.lien_realisations.url} text={page.acf.lien_realisations.title}
                target={page.acf.lien_realisations.target}/>
      </section>
      <ContactBanner/>
    </main>
  );
}
