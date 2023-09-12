import Image from "next/image";

export default function Map() {
  return (
    <section id="map">
      <div className="hexa-top">
        <Image src="/hexa-white.svg" alt="Hexagone" fill={true} />
      </div>
      <div className="map-background">
        <Image
          src="/adresse-btg-communication.jpg"
          alt="52 Boulevard Heurteloup, 37000 Tours"
          fill={true}
          quality={75}
        />
      </div>
      <div className="hexa-bottom">
        <Image src="/hexa-white.svg" alt="Hexagone" fill={true} />
        <div className="coordonnees">
          <p>Btg Communication</p>
          <Image
            src="/vague-coord.svg"
            alt="Btg Communication, Petit vague noir de décoration"
            width={80}
            height={14}
          />
          <ul>
            <li>52 Boulevard Heurteloup</li>
            <li>37000 Tours</li>
            <li>
              <a href="tel:0246655115">02.46.65.51.15</a>
            </li>
            <li>
              <a href="mailto:contact@btg-communication.fr">
                contact@btg-communication.fr
              </a>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
