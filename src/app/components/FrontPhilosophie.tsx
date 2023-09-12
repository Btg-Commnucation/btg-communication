import { AcfFrontPage } from "@/page";
import Image from "next/image";

export default function FrontPhilosophie({
  textePhilosophie,
  imagePhilosophie,
}: {
  textePhilosophie: AcfFrontPage["texte_philosophie"];
  imagePhilosophie: AcfFrontPage["image_philosophie"];
}) {
  return (
    <section id="philosophie">
      <div className="container">
        <Image
          src={imagePhilosophie.url}
          alt={imagePhilosophie.alt}
          width={684}
          height={912}
          className="philo-img"
        />
        <div className="desc">
          <h2>Philosophie</h2>
          <div
            className="content"
            dangerouslySetInnerHTML={{ __html: textePhilosophie }}
          ></div>
          <Image
            src="/wave-yellow.gif"
            alt="Vague jaune"
            width={188}
            height={32}
            className="flipped vague"
          />
        </div>
      </div>
    </section>
  );
}
