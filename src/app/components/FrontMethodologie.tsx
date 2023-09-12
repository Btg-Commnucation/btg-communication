import { AcfFrontPage } from "@/page";

export default function FrontMethodologie({
  texteMethodologie,
}: {
  texteMethodologie: AcfFrontPage["texte_methodologie"];
}) {
  return (
    <section id="methodologie">
      <div className="container">
        <h2>Methodologie</h2>
        <div
          className="content"
          dangerouslySetInnerHTML={{ __html: texteMethodologie }}
        ></div>
        <a href="mailto:contact@btg-communication.fr" className="btn-primary">
          Contactez-nous
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
        </a>
      </div>
      <div className="background"></div>
    </section>
  );
}
