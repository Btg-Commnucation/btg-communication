import Image from "next/image";
import https from "https";
import { Menu } from "@/middleware/Header";
import axios from "axios";
import { use } from "react";
import Link from "next/link";

const agent = new https.Agent({
  rejectUnauthorized: false,
});

const URL_API = process.env.URL_API;

const getMenu = async (): Promise<Menu | undefined> => {
  try {
    const response = await axios<Menu, any>(
      `${URL_API}/better-rest-endpoints/v1/menus/location/blog-actualites`,
      { httpsAgent: agent }
    );
    return response;
  } catch (e) {
    console.log(`Header getting Menu error : ${e}`);
    return;
  }
};

export default function BlogHeader() {
  const menuBlog = use(getMenu());

  return (
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
          Le blog <strong>btg communication</strong>
        </span>
      </Link>
      <nav className="blog-nav">
        <ul>
          {menuBlog &&
            menuBlog.data.map((item, index: number) => (
              <li key={index}>
                <Link href={`/blog?category=${item.url}`}>{item.title}</Link>
              </li>
            ))}
        </ul>
      </nav>
      <section className="blog-header-right">
        <Image
          src="/search.png"
          width={27}
          height={27}
          alt="Rechercher un article"
        />
        <Link href="/">L&apos;agence</Link>
      </section>
    </header>
  );
}
