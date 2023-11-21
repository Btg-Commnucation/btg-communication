import Footer from "@/components/footer/Footer";
import Header from "@/components/header/Header";
import axios from "axios";
import { use } from "react";
import he from "he";
import Image from "next/image";
import AcfImage from "./AcfImage";
import AcfText from "./AcfText";
import MoreProject from "./MoreProject";
import AcfVideo from "./AcfVideo";
import ContactBanner from "@/components/ContactBanner";
import { headers } from "next/headers";
import Link from "next/link";

const URL_API = process.env.URL_API;

export const revalidate = 3200;

export type ImageContentType = {
  acf_fc_layout: string;
  image: {
    id: number;
    url: string;
    alt: string;
    width: number;
    height: number;
  };
};

export type VideoContentType = {
  acf_fc_layout: string;
  video: string;
};

export type TextContentType = {
  acf_fc_layout: string;
  texte: string;
};

type ACFType<T> = {
  poster_single: {
    id: number;
    url: string;
    alt: string;
    width: number;
    height: number;
  };
  content: T[];
  accroche: string;
  url_client: string;
};

export type RealType = {
  id: number;
  title: string;
  slug: string;
  date: string;
  acf: ACFType<ImageContentType | TextContentType | VideoContentType>;
  excerpt: string;
  content: string;
  author: string;
  yoast: {
    yoast_wpseo_metadesc: string;
  };
  media: {
    thumbnail: string;
    medium: string;
    medium_large: string;
    large: string;
    "1536x1536": string;
    "2048x2048": string;
  };
};

const getRealisation = async (
  slug: string
): Promise<{
  allData: RealType[];
  data: RealType | undefined;
  error: boolean;
}> => {
  try {
    const response = await axios.get(
      `${ URL_API }/better-rest-endpoints/v1/realisations`
    );
    return {
      allData: response.data,
      data: response.data.find( ( real: RealType ) => real.slug === slug ),
      error: false,
    };
  } catch ( e ) {
    return { allData: [], data: undefined, error: true };
  }
};

export async function generateMetadata ( { params }: {
  params: { slug: string };
} ) {
  const data = await axios(
    `${ URL_API }/better-rest-endpoints/v1/realisations`
  ).then( ( response ) =>
    response.data.find( ( real: RealType ) => real.slug === params.slug )
  );

  return {
    title: he.decode( data?.title ),
    description: he.decode( data?.yoast.yoast_wpseo_metadesc ),
  };
}

export default function Page ( { params }: { params: { slug: string } } ) {
  const { slug } = params;
  const { allData, data, error } = use( getRealisation( slug ) );
  const heads = headers();
  const pathname = heads.get('next-url')
  const parts = pathname?.split('/')
  const realisation = parts?.filter(part=> part!=='')[0];


  const isImageContentType = ( object: any ): object is ImageContentType => {
    return object.acf_fc_layout === "image";
  };

  const isTextContentType = ( object: any ): object is TextContentType => {
    return object.acf_fc_layout === "texte";
  };

  return (
    <>
      <Header/>
      { !error ? (
        <main id="realisations">
          <section className="banner">
            <div className="container">
              <Link href={`/${realisation}`} className="backToProject">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1276.9 768">
                  <path
                      id="hexa"
                      d="M948.6 761.8L620.4 572.3v-379L948.6 3.7l328.3 189.5v379L948.6 761.8zM637.2 562.6l311.5 179.8 311.5-179.8V202.9L948.6 23.1 637.2 202.9v359.7z"
                  ></path>
                  <path
                      id="arrow"
                      d="M562.1 239l-88.3-88.3L242.9 380l231.7 234.8 88.3-88.4-86-89.1h328V322.7h-328l85.2-83.7z"
                      fill="#e3775b"
                  ></path>
                </svg>
                Retour aux projets
              </Link>
              <Image
                src={ data!.acf.poster_single.url }
                alt={ data!.acf.poster_single.alt }
                width={ data!.acf.poster_single.width }
                height={ data!.acf.poster_single.height }
              />
            </div>
          </section>
          <section className="top">
            <div className="container">
              <h1>{ he.decode( data!.title ) }</h1>
              <div
                className="content"
                dangerouslySetInnerHTML={ { __html: data!.content } }
              ></div>
              <div
                className="accroche"
                dangerouslySetInnerHTML={ { __html: data!.acf.accroche } }
              ></div>
              <Image
                src="/wave-radiant.gif"
                alt="Vague en dégradé"
                width={ 188 }
                height={ 37 }
                className="wave-radiant"
              />
            </div>
          </section>
          <section className="acf-layouts">
            <div className="container">
              <ul>
                { data!.acf.content.map(
                  (
                    item: ImageContentType | TextContentType | VideoContentType,
                    index: number
                  ) => (
                    <li key={ index }>
                      { isImageContentType( item ) ? (
                        <AcfImage image={ item }/>
                      ) : isTextContentType( item ) ? (
                        <AcfText text={ item }/>
                      ) : (
                        <AcfVideo video={ item }/>
                      ) }
                    </li>
                  )
                ) }
              </ul>
            </div>
          </section>
          <ContactBanner/>
          <MoreProject projects={ allData!.slice( 0, 4 ) }/>
        </main>
      ) : (
        <main id="realisation">
          <section className="errors">
            <div className="container">
              <h1>
                Une erreur semble s&apos;être produites, veuillez actualiser la
                page ou réessayer plus tard.
              </h1>
            </div>
          </section>
        </main>
      ) }
      <Footer/>
    </>
  );
}
