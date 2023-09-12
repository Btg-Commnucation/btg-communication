import Footer from "@/components/footer/Footer";
import Header from "@/components/header/Header";
import axios from "axios";
import he from "he";
import Image from "next/image";
import { use } from "react";
import AcfText from "./AcfText";
import AcfImage from "./AcfImage";
import OtherDomain from "./OtherDomain";
import Custom404 from "@/[slug]/custom404";

export type TextContentType = {
  acf_fc_layout: string;
  texte: string;
};
export type ImageContentType = {
  acf_fc_layout: string;
  image: {
    id: number;
    url: string;
    alt: string;
    name: string;
    width: number;
    height: number;
  };
};

export type DomaineType<T> = {
  id: number;
  title: string;
  slug: string;
  content: string;
  acf: {
    logo_noir: {
      url: string;
      alt: string;
      width: string;
      height: string;
    };
    sous_titre: string;
    titre: string;
    content: T[];
  };
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

export type allDomaineType = DomaineType<ImageContentType | TextContentType>[];

const URL_API = process.env.URL_API;

const getDomaines = async (
  slug: string
): Promise<{
  data: DomaineType<ImageContentType | TextContentType> | undefined;
  allData: allDomaineType;
  error: boolean;
}> => {
  try {
    const response = await axios.get(
      `${URL_API}/better-rest-endpoints/v1/domaines`
    );
    return {
      data: response.data.find(
        (domaine: DomaineType<ImageContentType | TextContentType>) =>
          domaine.slug === slug
      ),
      allData: response.data,
      error: false,
    };
  } catch (e) {
    return { data: undefined, allData: [], error: true };
  }
};

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}) {
  const data = await axios(`${URL_API}/better-rest-endpoints/v1/domaines`).then(
    (response) =>
      response.data.find(
        (domaine: DomaineType<ImageContentType | TextContentType>) =>
          domaine.slug === params.slug
      )
  );

  return {
    title: he.decode(data?.title),
    description: he.decode(data?.yoast.yoast_wpseo_metadesc),
  };
}

export default function Page({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const { data, allData, error } = use(getDomaines(slug));

  const isImageContentType = (object: any): object is ImageContentType => {
    return object.acf_fc_layout === "image";
  };

  const isTextContentType = (object: any): object is TextContentType => {
    return object.acf_fc_layout === "texte";
  };

  if (error) {
    return (
      <>
        <Header />
        <Custom404
          status={404}
          data="Nous sommes désolés, et si nous retournions à l’accueil ?"
          errorMessage="La page que vous demandez n’existe pas :’("
        />
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <main id="expertise">
        <section className="top">
          <div className="container">
            <div
              className="banner"
              style={{
                background: `url(${data?.media["2048x2048"]}) no-repeat top center`,
                backgroundSize: "cover",
              }}
            >
              <Image
                src="/logo-btg-white.svg"
                alt="BTG Communication"
                width={219}
                height={252.86}
              />
              <div className="vague">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 188 32">
                  <path d="M156.7 32c-9.5 0-14.2-7.7-18.2-14.5-4.4-7.1-7.4-11.5-13.2-11.5-5.7 0-8.8 4.4-13.1 11.5C108.1 24.3 103.5 32 94 32s-14.2-7.7-18.2-14.5C71.4 10.4 68.4 6 62.7 6c-5.7 0-8.8 4.4-13.1 11.5C45.5 24.3 40.9 32 31.3 32s-14.2-7.7-18.2-14.5C8.8 10.4 5.7 6 0 6V0c9.5 0 14.2 7.7 18.2 14.5C22.6 21.6 25.6 26 31.3 26c5.7 0 8.8-4.4 13.1-11.5C48.5 7.7 53.1 0 62.7 0c9.5 0 14.2 7.7 18.2 14.5C85.2 21.6 88.3 26 94 26s8.8-4.4 13.1-11.5C111.2 7.7 115.8 0 125.3 0s14.2 7.7 18.2 14.5c4.3 7.2 7.4 11.5 13.1 11.5s8.8-4.4 13.1-11.5C173.8 7.7 178.5 0 188 0v6c-5.7 0-8.8 4.4-13.1 11.5-4.1 6.8-8.7 14.5-18.2 14.5z"></path>
                </svg>
              </div>
              <h1>{he.decode(data!.title)}</h1>
              <strong>{he.decode(data!.acf.sous_titre)}</strong>
            </div>
          </div>
        </section>
        <section className="content-container">
          <div className="container">
            <h2>{he.decode(data!.acf.titre)}</h2>
            <div
              className="slogan"
              dangerouslySetInnerHTML={{ __html: data!.content }}
            ></div>
            <Image
              src="/wave-radiant.gif"
              alt="Une vague en dégradé de rose et violet"
              width={188}
              height={36.3}
              className="wave-radiant"
            />
            <ul className="content">
              {data!.acf.content.map(
                (item: ImageContentType | TextContentType, index: number) => (
                  <li key={index}>
                    {isTextContentType(item) && <AcfText data={item} />}
                    {isImageContentType(item) && <AcfImage data={item} />}
                  </li>
                )
              )}
            </ul>
          </div>
        </section>
        <section className="other-domaines">
          <div className="container">
            <h4>Nos autres domaines d&apos;expertise</h4>
            <div className="separator"></div>
            <OtherDomain domains={allData} />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
