import BlogHeader from "@/components/blog/BlogHeader";
import BlogFooter from "@/components/blog/BlogFooter";
import {PostData} from "@/middleware/Post";
import axios from "axios";
import https from "https";
import {use} from "react";
import Blog from "./Blog";
import {EquipeType, Membre, PageType} from "@/middleware/Page";
import {Metadata} from "next";
import he from "he";

const URL_API = process.env.URL_API;

const agent = new https.Agent({
  rejectUnauthorized: false,
});

export const metadata: Metadata = {
  title: he.decode("Les articles de notre auteur - Btg Communication"),
  description: he.decode("Retrouvez toutes les actualités de notre auteur sur le blog de Btg Communication"),
}

const getArticles = async () => {
  try {
    const response = await axios<PostData[]>(
      `${URL_API}/better-rest-endpoints/v1/posts`,
      {
        httpsAgent: agent,
      }
    );

    return response.data;
  } catch (error) {
    console.log(error);
  }
};

const getAuthors = async () => {
  try {
    const response = await axios<PageType<EquipeType>>(
      `${URL_API}/better-rest-endpoints/v1/page/specialistes-communication`,
      {
        httpsAgent: agent,
      }
    );

    return response.data.acf.membre;
  } catch (error) {
    console.log(error);
  }
};

export default function Page() {
  const articles = use(getArticles());
  const authors = use(getAuthors());

  return (
    <>
      <BlogHeader/>
      <main id="blog">
        <Blog articles={articles as PostData[]} members={authors as Membre[]}/>
      </main>
      <BlogFooter/>
    </>
  );
}
