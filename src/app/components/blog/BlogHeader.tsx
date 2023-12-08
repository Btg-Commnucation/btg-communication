import Image from "next/image";
import https from "https";
import { MenuData, MenuType, OptionsType, rsOptions, } from "@/middleware/Header";
import axios from "axios";
import { use } from "react";
import Link from "next/link";
import BlogHeaderFront from "./BlogHeaderFront";
import BlogNav from "./BlogNav";
import { Cabin } from "next/font/google";
import Search from "./Search";

const cabin = Cabin({ subsets: ["latin"] });

const agent = new https.Agent({
  rejectUnauthorized: false,
});

const URL_API = process.env.URL_API;

const getOptions = async (): Promise<OptionsType | undefined> => {
  try {
    const response = await axios<OptionsType, any>(
      `${URL_API}/better-rest-endpoints/v1/options/acf`,
      { httpsAgent: agent }
    );
    return response;
  } catch (e) {
    console.log(`Header getting options error : ${e}`);
  }
};

const getMenu = async (): Promise<MenuType | undefined> => {
  try {
    const response = await axios<MenuType, any>(
      `${URL_API}/better-rest-endpoints/v1/menus/location/blog-actualites`,
      { httpsAgent: agent }
    );
    return response.data;
  } catch (e) {
    console.log(`Header getting Menu error : ${e}`);
    return;
  }
};

export default function BlogHeader() {
  const menuBlog = use(getMenu());
  const options = use(getOptions());

  return (
    <>
      <header className="blog-header">
        <Link href="/blog" className="header-logo">
          <Image
            src="/logo-btg-encadre.svg"
            alt="Logo de BTG Communication"
            title="BTG Communication"
            width={71}
            height={81.97}
          />
          <span className="header-logo-text">
            Le blog de <strong>btg communication</strong>
          </span>
        </Link>
        <BlogHeaderFront element={menuBlog as unknown as MenuData[]} />
        <Search />
      </header>
      <div id="overlay-menu" className={cabin.className}>
        <div className="content">
          <BlogNav
            data={menuBlog as unknown as MenuData[]}
            options={options!.data as rsOptions}
          />
        </div>
      </div>
    </>
  );
}
