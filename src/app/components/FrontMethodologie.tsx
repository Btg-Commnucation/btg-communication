import { AcfFrontPage } from "@/page";
import Link from "next/link";
import {LinkType} from "@/middleware/Link";
import he from "he";

export default function FrontMethodologie({
  texteMethodologie,
  lien
}: {
  texteMethodologie: AcfFrontPage["texte_methodologie"];
  lien: LinkType
}) {

  const getSlug = (url: string) => {
    const match = url.match(/\/([^/]+)\/?$/);
    return match ? match[1] : null;
  };

  return (
    <section id="methodologie">
      <div className="container">
        <h2>Methodologie</h2>
        <div
          className="content"
          dangerouslySetInnerHTML={{ __html: texteMethodologie }}
        ></div>
        <Link target={lien.target} href={`/${getSlug(lien.url)}`} className="btn-primary">
          {he.decode(lien.title)}
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
      </div>
      <div className="background"></div>
    </section>
  );
}
