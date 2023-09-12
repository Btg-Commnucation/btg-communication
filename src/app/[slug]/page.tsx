import Footer from "@/components/footer/Footer";
import Header from "@/components/header/Header";
import axios from "axios";
import https from "https";
import { use } from "react";
import Client from "./template-client/Client";
import { Metadata, ResolvingMetadata } from "next";
import he from "he";
import Savoir from "./template-savoir/Savoir";
import Realisation from "./template-real/Realisation";
import Home from "@/page";
import {
  ClientType,
  EquipeType,
  PageType,
  RealisationType,
  SavoirType,
} from "@/middleware/Page";
import Custom404 from "./custom404";
import Equipe from "./template-equipe/Equipe";

const URL_API = process.env.URL_API;
const agent = new https.Agent({
  rejectUnauthorized: false,
});

export type Response = {
  errorMessage: string;
} & (
  | {
      status: 200;
      data: PageType<ClientType | SavoirType | RealisationType | EquipeType>;
    }
  | { status: 500; data: any }
  | { status: 404; data: string }
);

const getPages = async (slug: string): Promise<Response> => {
  try {
    const response = await axios<
      PageType<ClientType | SavoirType | EquipeType>[],
      any
    >(`${URL_API}/better-rest-endpoints/v1/pages?per_page=100`, {
      httpsAgent: agent,
    }).then((response) =>
      response.data.find(
        (page: PageType<ClientType | SavoirType | EquipeType>) =>
          page.slug === slug
      )
    );

    if (!response) {
      return {
        data: "Nous sommes désolés, et si nous retournions à l’accueil ?",
        status: 404,
        errorMessage: "La page que vous demandez n’existe pas :’(",
      };
    }

    return { data: response, status: 200, errorMessage: "" };
  } catch (e) {
    console.log(`Page error fetch Page : ${e}`);
    return { data: e, status: 500, errorMessage: "Un problème est survenue" };
  }
};

export async function generateMetadata(
  { params }: { params: { slug: string } },
  parent?: ResolvingMetadata
): Promise<Metadata> {
  const { slug } = params;

  const data = await axios<
    PageType<ClientType | SavoirType | EquipeType>[],
    any
  >(`${URL_API}/better-rest-endpoints/v1/pages?per_page=100`, {
    httpsAgent: agent,
  }).then((response) =>
    response.data.find(
      (page: PageType<ClientType | SavoirType | EquipeType>) =>
        page.slug === slug
    )
  );
  if (!data) {
    return {
      title: "404",
      description: "Page not found",
    };
  }

  return {
    title: he.decode(data?.title),
    description: he.decode(data?.yoast.yoast_wpseo_metadesc),
  };
}

export default function Page({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const { data, status, errorMessage } = use(getPages(slug));

  if (status !== 200) {
    return (
      <>
        <Header />
        <Custom404 data={data} errorMessage={errorMessage} status={status} />
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      {data?.template === "template-client" && (
        <Client page={data as PageType<ClientType>} />
      )}
      {data?.template === "template-savoir" && (
        <Savoir page={data as PageType<SavoirType>} />
      )}
      {data?.template === "template-realisations" && (
        <Realisation page={data as PageType<RealisationType>} />
      )}
      {data?.template === "template-equipe" && (
        <Equipe page={data as PageType<EquipeType>} />
      )}
      {data?.slug === "accueil" && (
        <>
          <Home />
        </>
      )}
      <Footer />
    </>
  );
}
