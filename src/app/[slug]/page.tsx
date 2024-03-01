import Footer from '@/components/footer/Footer';
import Header from '@/components/header/Header';
import axios from 'axios';
import https from 'https';
import { use } from 'react';
import Client from './template-client/Client';
import { Metadata } from 'next';
import he from 'he';
import Savoir from './template-savoir/Savoir';
import Realisation from './template-real/Realisation';
import { redirect } from 'next/navigation';
import Home from '@/page';
import {
  ClientType,
  EquipeType,
  PageType,
  RealisationType,
  SavoirType,
  VilleType,
} from '@/middleware/Page';
import Equipe from './template-equipe/Equipe';
import Ville from './template-ville/Ville';
import { ContactType } from '@/middleware/Contact';
import Contact from './template-contact/Contact';
import Mention from '@/[slug]/Mention';

const URL_API = process.env.URL_API;
const ADMIN_URL = process.env.ADMIN_URL;
const agent = new https.Agent({
  rejectUnauthorized: false,
});

export const revalidate = 3200;

export type Response = {
  errorMessage: string;
} & (
  | {
      status: 200;
      data: PageType<
        | ClientType
        | SavoirType
        | RealisationType
        | EquipeType
        | VilleType
        | ContactType
      >;
    }
  | { status: 500; data: any }
  | { status: 404; data: string }
);

const getPages = async (slug: string): Promise<Response> => {
  if (ADMIN_URL && slug === 'wp-admin') {
    redirect(ADMIN_URL);
  }
  const response = await axios<
    PageType<ClientType | SavoirType | EquipeType | VilleType | ContactType>,
    any
  >(`${URL_API}/better-rest-endpoints/v1/page/${slug}`, {
    httpsAgent: agent,
  });

  if (!response || !response.data.id) {
    throw new Error('Failed to fetch data');
  }

  return { data: response.data, status: 200, errorMessage: '' };
};

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const { slug } = params;

  const data = await axios<
    PageType<ClientType | SavoirType | EquipeType | VilleType | ContactType>,
    any
  >(`${URL_API}/better-rest-endpoints/v1/page/${slug}`, {
    httpsAgent: agent,
  });
  if (!data || !data.data.id) {
    return Promise.resolve({
      title: 'BTG Communication - 404',
      description:
        "BTG Communication - Oups, la page que vous demandez n'existe pas",
    });
  }

  const { title, yoast } = data.data;

  return Promise.resolve({
    title: he.decode(title),
    description: he.decode(yoast.yoast_wpseo_metadesc),
  });
}

export default function Page({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const { data, status, errorMessage } = use(getPages(slug));

  return (
    <>
      <Header />
      {data.template === 'template-client' && (
        <Client page={data as PageType<ClientType>} />
      )}
      {data.template === 'template-savoir' && (
        <Savoir page={data as PageType<SavoirType>} />
      )}
      {data?.template === 'template-realisations' && (
        <Realisation page={data as PageType<RealisationType>} />
      )}
      {data?.template === 'template-equipe' && (
        <Equipe page={data as PageType<EquipeType>} />
      )}
      {data?.template === 'template-ville' && (
        <Ville data={data as PageType<VilleType>} />
      )}
      {data?.template === 'template-contact' && (
        <Contact data={data as PageType<ContactType>} />
      )}
      {data?.template === 'default' && (
        <Mention
          data={
            data as {
              title: string;
              content: string;
              media: { '2048x2048': string };
            }
          }
        />
      )}
      {data?.slug === 'accueil' && (
        <>
          <Home />
        </>
      )}
      <Footer />
    </>
  );
}
