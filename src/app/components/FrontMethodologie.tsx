import {AcfFrontPage} from "@/page";
import {LinkType} from "@/middleware/Link";
import Button from "@/components/Button";

export default function FrontMethodologie({
                                            texteMethodologie,
                                            lien
                                          }: {
  texteMethodologie: AcfFrontPage["texte_methodologie"];
  lien: LinkType
}) {


  return (
    <section id="methodologie">
      <div className="container">
        <h2>Methodologie</h2>
        <div
          className="content"
          dangerouslySetInnerHTML={{__html: texteMethodologie}}
        ></div>
        <Button link={lien.url} text={lien.title} target={lien.target}/>
      </div>
      <div className="background"></div>
    </section>
  );
}
