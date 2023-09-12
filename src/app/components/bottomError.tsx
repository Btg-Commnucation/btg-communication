import Image from "next/image";

export default function BottomError() {
  return (
    <div className="bottom">
      <ul className="rs">
        <li>
          <a href="mailto:contact@btg-communication.fr">
            <Image
              src="/contact-degrade.svg"
              alt="Nous contacter"
              width={34}
              height={39.25}
            />
          </a>
        </li>
        <li>
          <a
            href="https://www.instagram.com/btg_communication/"
            target="_blank"
          >
            <Image
              src="/insta-degrade.svg"
              alt="Notre instagram"
              width={34}
              height={39.25}
            />
          </a>
        </li>
        <li>
          <a
            href="https://www.linkedin.com/company/btg-communication/"
            target="_blank"
          >
            <Image
              src="/linkedin-degrade.svg"
              alt="Notre Linkedin"
              width={34}
              height={39.25}
            />
          </a>
        </li>
      </ul>
      <h3>Btg Communication</h3>
      <p>52 boulevard Heurteloup / 3700 Tours / 02.46.65.51.15</p>
      <p>contact@btg-communication.fr</p>
    </div>
  );
}
