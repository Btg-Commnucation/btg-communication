import Footer from "@/components/footer/Footer";
import Header from "@/components/header/Header";
import axios from "axios";
import he from "he";
import { use } from "react";
import OtherDomain from "./OtherDomain";
import Custom404 from "@/[slug]/custom404";
import {
  ContentFondImageType,
  ContentLine,
  ContentTextePlusType,
  ContentType,
  ContentTypeFondJauneType,
  ContentTypeImage,
  DomainesType,
  SliderType,
} from "@/middleware/Domaines";
import Banner from "@/components/Banner";
import GrayBackground from "./GrayBackground";
import ContactBanner from "@/components/ContactBanner";
import AcfContent from "./AcfLayout/AcfContent";
import Slider from "./AcfLayout/Slider";
import ExpertiseForm from "@/components/ExpertiseForm";
import AcfBackgroundImage from "./AcfLayout/AcfBackgroundImage";

export type Domaines = DomainesType<
  | ContentType<
      | ContentTypeFondJauneType
      | ContentTypeImage
      | ContentTextePlusType
      | ContentLine
    >
  | SliderType
  | ContentFondImageType
>;

export const revalidate = 3200;

export type allDomaineType = Domaines[];

const URL_API = process.env.URL_API;

const getDomaines = async (
  slug: string
): Promise<{
  data: Domaines | undefined;
  allData: allDomaineType;
  error: boolean;
}> => {
  try {
    const response = await axios.get(
      `${URL_API}/better-rest-endpoints/v1/domaines`
    );
    return {
      data: response.data.find((domaine: Domaines) => domaine.slug === slug),
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
      response.data.find((domaine: Domaines) => domaine.slug === params.slug)
  );

  return {
    title:
      data && data.title
        ? he.decode(data.title)
        : "BTG Communication, agence de communication à 360°",
    description: he.decode(data?.yoast.yoast_wpseo_metadesc),
  };
}

export default function Page({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const { data, allData, error } = use(getDomaines(slug));

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
        <Banner
          title={data!.title}
          media={data!.media}
          sous_titre={data!.acf.sous_titre}
        />
        <section className="main-content">
          <div className="container">
            <h2>{he.decode(data!.acf.titre)}</h2>
            <div
              className="content"
              dangerouslySetInnerHTML={{ __html: data!.content }}
            ></div>
          </div>
        </section>
        <GrayBackground
          contenu={data!.acf.contenu_fond_gris}
          image={data!.acf.image_fond_gris}
        />
        <ContactBanner />
        {data!.acf.contenu_flexible.map((item, key) => (
          <>
            {item.acf_fc_layout === "contenu" && (
              <AcfContent
                key={key}
                item={
                  item as ContentType<
                    | ContentTypeImage
                    | ContentTypeFondJauneType
                    | ContentTextePlusType
                    | ContentLine
                  >
                }
              />
            )}
            {item.acf_fc_layout === "image_de_fond" && (
              <AcfBackgroundImage data={item as ContentFondImageType} />
            )}
            {item.acf_fc_layout === "slider" && (
              <Slider data={item as SliderType} />
            )}
          </>
        ))}
        <ExpertiseForm
          titre={data!.acf.titre_bas_de_page}
          image={data!.acf.image_bas_de_page}
        />
        <section className="other-domaines">
          <div className="container">
            <h4>{he.decode("Nos autres domaines d'expertise")}</h4>
            <div className="separator"></div>
            <OtherDomain domains={allData} />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
