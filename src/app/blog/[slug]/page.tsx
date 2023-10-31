import {PostData} from "@/middleware/Post";
import axios from "axios";
import https from "https";
import {Metadata, ResolvingMetadata} from "next";
import he from "he";
import BlogHeader from "@/components/blog/BlogHeader";
import {use} from "react";
import Link from "next/link";
import Image from "next/image";
import AcfLayout from "./AcfLayout";
import Author from "./Author";
import BlogFooter from "@/components/blog/BlogFooter";
import Posts from "./Posts";

const URL_API = process.env.URL_API;
const agent = new https.Agent({
  rejectUnauthorized: false,
});
export const revalidate = 1800;

const getArticle = async (slug: string) => {
  try {
    const response = await axios<PostData[]>(
      `${URL_API}/better-rest-endpoints/v1/posts`,
      {
        httpsAgent: agent,
      }
    );

    const post = response.data.find((post) => post.slug === slug);

    if (!response) {
      return {
        data: {
          title: "Nous sommes désolés, et si nous retournions à l’accueil ?",
          category_names: ["Erreur"],
          media: {large: "error"},
          acf: {
            accroche: "Erreur",
            image_haut_article: null,
          },
        },
        status: 404,
        errorMessage: "La page que vous demandez n’existe pas",
      };
    }

    return {data: post, status: 200, errorMessage: "", posts: response.data};
  } catch (error) {
    console.log(error);
    return {
      data: {
        title: "error",
        category_names: ["Erreur"],
        media: {large: "error"},
        acf: {
          accroche: "Erreur",
          image_haut_article: null,
        },
      },
      status: 500,
      errorMessage: "error",
    };
  }
};

export async function generateMetadata(
  {params}: { params: { slug: string } },
  parent: ResolvingMetadata
): Promise<Metadata> {
  const {slug} = params;

  const data = await axios<PostData[]>(
    `${URL_API}/better-rest-endpoints/v1/posts`,
    {
      httpsAgent: agent,
    }
  ).then((response) => response.data.find((page) => page.slug === slug));
  if (!data) {
    return Promise.resolve({
      title: "404",
      description: "Page not found",
    });
  }

  return Promise.resolve({
    title: he.decode(data?.title),
    description: he.decode(data?.yoast.yoast_wpseo_metadesc),
  });
}

export default function Page({params}: { params: { slug: string } }) {
  const {slug} = params;
  const {data, status, errorMessage, posts} = use(getArticle(slug));

  return (
    <>
      <BlogHeader/>
      {(data as PostData) && (
        <main id="single">
          <section className="hero-banner">
            <div className="background"></div>
            <div className="blog-container">
              <ul className="breadcrumbs">
                <li>
                  <Link href="/">BTG Communication</Link>
                </li>
                <li>
                  <Link href="/">{he.decode(data!.category_names[0])}</Link>
                </li>
                <li>{he.decode(data!.title)}</li>
              </ul>
              <div className="title">
                <h1>{he.decode(data!.title)}</h1>
                <Image
                  src="/wave-radiant.gif"
                  alt="Vague en dégradé Rose et violet"
                  width={188}
                  height={36}
                />
              </div>
            </div>
          </section>
          <article>
            <div className="blog-container">
              <section className="post">
                {data!.acf.image_haut_article ? (
                  <Image
                    src={data!.acf.image_haut_article.url}
                    width={833}
                    height={370}
                    alt={data!.title}
                    className="thumbnail"
                    priority={true}
                  />
                ) : (
                  <Image
                    src={data!.media.large}
                    width={833}
                    height={370}
                    alt={data!.title}
                    className="thumbnail"
                  />
                )}
                <div
                  className="exo-light-18"
                  dangerouslySetInnerHTML={{__html: data!.acf.accroche}}
                ></div>
                <AcfLayout data={data as PostData}/>
              </section>
              <Posts
                posts={posts as PostData[]}
                articleCategory={data!.category_names[0] as string}
              />
            </div>
          </article>
          {<Author data={data as PostData}/>}
        </main>
      )}
      <BlogFooter/>
    </>
  );
}
