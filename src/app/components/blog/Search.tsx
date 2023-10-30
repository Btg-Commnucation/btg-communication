"use client";
import Image from "next/image";
import Link from "next/link";
import {useState} from "react";
import slugify from "slugify";

export default function Search() {
  const [search, setSearch] = useState(false);
  const [searchValue, setsearchValue] = useState<string>("");
  const toggleSearch = () => setSearch(!search);

  const slug = (searchParams: string): string => {
    const searchSlug = slugify(searchParams, {
      replacement: "-",
      lower: true,
      remove: /[*+~.()'"!:@]/g,
    });
    return searchSlug;
  };

  return (
    <section className={`blog-header-right ${search && 'open'}`}>
      <span className="screen-reader-text">Recherche un article</span>
      <input
        type="text"
        name="search"
        id="search"
        onChange={(e) => setsearchValue(e.target.value)}
        className={search ? "search-input" : "search-input hidden"}
        placeholder={"Rechercher ..."}
      />
      {search ? (
        <Link
          href={`/blog/rechercher?search=${slug(searchValue)}`}
          className="search-link"
        >
          <Image
            src="/search.png"
            width={27}
            height={27}
            alt="Rechercher un article"
          />
        </Link>
      ) : (
        <Image
          src="/search.png"
          width={27}
          height={27}
          alt="Rechercher un article"
          onClick={toggleSearch}
        />
      )}
      <Link href="/">L&apos;agence</Link>
    </section>
  );
}
