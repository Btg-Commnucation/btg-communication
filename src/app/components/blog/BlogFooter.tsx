import Link from "next/link";
import Rs from "../header/Rs";
import https from "https";
import axios from "axios";
import { OptionsType } from "@/middleware/Header";
import { use } from "react";

const URL_API = process.env.URL_API;

const agent = new https.Agent({
  rejectUnauthorized: false,
});

const getOptions = async (): Promise<OptionsType | undefined> => {
  try {
    const response = await axios<OptionsType, any>(
      `${URL_API}/better-rest-endpoints/v1/options/acf`,
      { httpsAgent: agent }
    );
    return response;
  } catch (e) {
    console.log(`Footer getting options error : ${e}`);
  }
};

export default function BlogFooter() {
  const options = use(getOptions());

  return (
    <>
      <section className="blog-newsletter">
        <div className="blog-container">
          <h2>Ne loupez plus l&apos;actu de la comm</h2>
          <p>
            Inscrivez vous à la newsletter de btg communication et recevez
            directement dans votre boite mail toute l&apos;actu de la
            communication.
          </p>
        </div>
      </section>
      <section className="blog-part-agency">
        <div className="blog-container">
          <h2>
            1 agence, <span>2 localisations</span>
          </h2>
          <p className="agency-content">
            Notre agence de communication s&apos;est récemment implantée
            également dans le Morbihan, vous pouvez donc désormais retrouver
            votre agence préférée à Tours et à Vannes ! <br />
            Alors n&apos;hésitez pas à nous contacter, notre équipe sera
            heureuse d evous rencontrer pour échanger sur vos projets.
          </p>
          <p className="agency-bold">
            Sautez le pas de la communication avec nous !
          </p>
          <div className="agency-location">
            <Link href="/" className="btn">
              Agence de Tours
            </Link>
            <Link href="/" className="btn">
              Agence de Vannes
            </Link>
          </div>
        </div>
      </section>
      <footer className="blog-footer">
        <section className="informations">
          <div className="left">
            <strong>
              <span>© BTG Communication</span>
              <span> - </span>
              <span>
                agence de communication visuelle à Tours (37) et Vannes (56)
              </span>
              <span> - </span>
              <a href="#">Mentions légales</a>
            </strong>
          </div>
          <Rs rsOptions={options!.data} showContact={true} />
        </section>
      </footer>
    </>
  );
}
