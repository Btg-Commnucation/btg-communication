import Banner from "@/components/Banner";
import { EquipeType, PageType } from "@/middleware/Page";
import Members from "./Members";
import Link from "next/link";
import ScrollToTop from "@/components/ScrollToTop";

export default function Equipe({ page }: { page: PageType<EquipeType> }) {
  return (
    <main id="equipe">
      <ScrollToTop />
      <Banner
        title={page.title}
        sous_titre={page.acf.sous_titre}
        media={page.media}
      />
      <article>
        <div
          className="container"
          dangerouslySetInnerHTML={{ __html: page.content }}
        ></div>
      </article>
      <Members data={page.acf.membre} />
      <section className="lien">
        <Link href="/nos-realisations">
          Notre réalisations
          <svg
            className="arrow"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 100 100"
            x="0px"
            y="0px"
          >
            <title>Arrows</title>
            <g data-name="Layer 2">
              <polygon points="44.13 72.13 58 86 94.25 50 57.87 13.13 44 27 57.51 41 6 41 6 59 57.51 59 44.13 72.13"></polygon>
            </g>
          </svg>
        </Link>
      </section>
    </main>
  );
}
