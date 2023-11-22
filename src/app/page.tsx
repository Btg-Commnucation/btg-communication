import Header from "@/components/header/Header";
import Footer from "@/components/footer/Footer";
import axios from "axios";
import https from "https";
import { ImageType } from "./middleware/Image";
import { LinkType } from "./middleware/Link";
import { PageType } from "./middleware/Page";
import { use } from "react";
import Image from "next/image";
import Link from "next/link";
import FrontSlider from "./components/FrontSlider";
import he from "he";
import FrontDomains from "./components/FrontDomains";
import FrontClient from "./components/FrontClient";
import { Metadata } from "next";
import Custom404 from "./[slug]/custom404";
import FrontPhilosophie from "@/components/FrontPhilosophie";
import FrontMethodologie from "@/components/FrontMethodologie";

const URL_API = process.env.URL_API;
const agent = new https.Agent( {
  rejectUnauthorized: false,
} );

export const revalidate = 3200;

export type AcfFrontPage = {
  clients: { image: ImageType }[];
  competences: {
    icone: ImageType;
    competence: LinkType;
    description: string;
  }[];
  image_philosophie: ImageType;
  lien_clients: LinkType;
  lien_competences: LinkType;
  lien_contact: LinkType;
  lien_realisations_slider: LinkType;
  slider: { image: ImageType }[];
  texte_competences: string;
  texte_methodologie: string;
  texte_philosophie: string;
  texte_photo: string;
};

type Response = {
  error: string;
} & (
    | {
  status: 200;
  data: PageType<AcfFrontPage>;
}
    | {
  status: 500;
  data: null;
}
    );

const HeroDomains = ( { competences }: {
  competences: AcfFrontPage["competences"];
} ) => {
  const getSlug = ( url: string ) => {
    const match = url.match( /\/([^/]+)\/?$/ );
    return match ?
        match[ 1 ] :
        null;
  };

  return (
      <ul className="domains">
        { competences.map( ( domain,
                             index ) => (
            <li key={ index }>
              <Link
                  href={ `/notre-expertise/${ getSlug( domain.competence.url ) }` }
                  target={ domain.competence.target }
              >
                { domain.competence.title }
              </Link>
            </li>
        ) ) }
      </ul>
  );
};

const getHome = async (): Promise<Response> => {
  try {
    const response = await axios(
        `${ URL_API }/better-rest-endpoints/v1/page/accueil`,
        { httpsAgent: agent }
    );
    return {
      data: response.data,
      error: "Tous fonctionne par ici !",
      status: 200,
    };
  } catch ( error ) {
    return {
      data: null,
      error: `Un problème est survenu lors de la récupération des données: ${ error }`,
      status: 500,
    };
  }
};

export async function generateMetadata (): Promise<Metadata> {
  const data = await axios<PageType<AcfFrontPage>[], any>(
      `${ URL_API }/better-rest-endpoints/v1/page/accueil`,
      { httpsAgent: agent }
  );

  return {
    title: data && data.title ? he.decode(data.title) : "BTG Communication, agence de communication à 360°",
    description: data && data.yoast.yoast_wpseo_metadesc ? he.decode(data?.yoast.yoast_wpseo_metadesc) : "BTG" +
        " Communication est une agence de communication à 360° située à Tours et Vanne. Nous vous accompagnons dans" +
        " la création de votre identité visuelle",
  };
}

export default function Home () {
  const { data, error, status } = use( getHome() );


  if (status !==
      200) {
    console.log( error );
    return (
        <>
          <Header/>
          <Custom404 data={ data }
                     status={ status }
                     errorMessage={ error }/>
          <Footer/>
        </>
    );
  }

  return (
      <>
        <Header/>
        <main id="front-page">
          <section className="hero-banner">
            <div className="container">
              <div className="middle">
                <Image
                    src="/logo-btg-encadre.svg"
                    alt="BTG Communication, agence de communication"
                    width={ 370 }
                    height={ 427.2 }
                    quality={ 100 }
                />
                <HeroDomains competences={ data.acf.competences }/>
                <svg
                    id="arrow-index"
                    className="arrow active"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    x="0px"
                    y="0px"
                    viewBox="0 0 600 600"
                >
                  <g>
                    <path
                        id="arrow-svg-top"
                        d="M291.5,158c-2.8,0-5-2.2-5-5V4c0-2.8,2.2-5,5-5s5,2.2,5,5v149C296.5,155.8,294.2,158,291.5,158z"
                    ></path>
                  </g>
                  <g>
                    <path
                        id="arrow-svg-bot"
                        d="M291.5,572c-2.8,0-5-2.2-5-5V418c0-2.8,2.2-5,5-5s5,2.2,5,5v149C296.5,569.8,294.2,572,291.5,572z"
                    ></path>
                  </g>
                  <g>
                    <path
                        id="arrow-svg-left"
                        d="M175.7,327.8c-0.8,0-1.7-0.2-2.5-0.7l-129-74.5c-2.4-1.4-3.2-4.4-1.8-6.8c1.4-2.4,4.4-3.2,6.8-1.8l129,74.5
                            c2.4,1.4,3.2,4.4,1.8,6.8C179.1,326.9,177.4,327.8,175.7,327.8z"
                    ></path>
                  </g>
                  <g>
                    <path
                        id="arrow-svg-right"
                        d="M407.3,327.8c-1.7,0-3.4-0.9-4.3-2.5c-1.4-2.4-0.6-5.4,1.8-6.8l129-74.5c2.4-1.4,5.5-0.6,6.8,1.8c1.4,2.4,0.6,5.4-1.8,6.8
                            l-129,74.5C409,327.5,408.1,327.8,407.3,327.8z"
                    ></path>
                  </g>
                </svg>
              </div>
            </div>
            <h1>{ data.title ? he.decode( data.title ) : 'BTG Communication, agence de communication 360° à Tours et' +
                ' Vannes' }</h1>
          </section>
          <FrontSlider
              slider={ data.acf.slider }
              sliderText={ data.acf.texte_photo }
              sliderLink={ data.acf.lien_realisations_slider }
          />
          <FrontDomains
              skills={ data.acf.competences }
              skillsText={ data.acf.texte_competences }
              skillsLink={ data.acf.lien_competences }
          />
          <FrontClient clients={ data.acf.clients }
                       clientsLink={ data.acf.lien_clients }/>
          <FrontPhilosophie
              textePhilosophie={ data.acf.texte_philosophie }
              imagePhilosophie={ data.acf.image_philosophie }
          />
          <FrontMethodologie texteMethodologie={ data.acf.texte_methodologie }
                             lien={ data.acf.lien_contact }/>
        </main>
        <Footer/>
      </>
  );
}
