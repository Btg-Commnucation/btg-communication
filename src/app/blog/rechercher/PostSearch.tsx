"use client";

import { PostData } from "@/middleware/Post";
import { format, parseISO } from "date-fns";
import { fr } from "date-fns/locale";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import slugify from "slugify";
import he from "he";
import unslugify from "unslugify";

const Post = ({
  article,
  priority,
}: {
  article: PostData;
  priority: boolean;
}) => {
  const truncateText = (text: string, length: number): string => {
    if (text.length <= length) {
      return text;
    }
    return text.slice(0, length) + "...";
  };

  const formatDate = (isoDate: string): string => {
    const date = parseISO(isoDate);
    return `publié le ${format(date, "dd MMMM yyyy", { locale: fr })}`;
  };

  return (
    <>
      <div className="post-content">
        <Link href={`/blog/${article.slug}`}>
          <Image
            src={article.media.large}
            alt={he.decode(article.title)}
            width={833}
            height={496}
            quality={100}
            priority={priority}
          />
        </Link>
        <div className="card-content">
          <Link href={`/blog/${article.slug}`} className="card-title">
            {he.decode(article.title)}
          </Link>
          <p className="post-cateogry">
            {he.decode(article.category_names[0])}
          </p>
          <div
            className="card-excerpt"
            dangerouslySetInnerHTML={
              article.excerpt
                ? { __html: article.excerpt }
                : { __html: truncateText(article.acf?.accroche, 199) }
            }
          ></div>
          <div className="card-date">{he.decode(formatDate(article.date))}</div>
        </div>
      </div>
    </>
  );
};

export default function PostSearch({ posts }: { posts: PostData[] }) {
  const searchParams = useSearchParams();
  const [search, setSearch] = useState(searchParams?.get("search") || "");
  const [filteredArticles, setFilteredArticles] = useState<PostData[]>([]);

  const slug = (title: string): string => {
    const slugTitle = slugify(title, {
      replacement: "-",
      lower: true,
      remove: /[*+~.()'"!:@]/g,
    });
    return slugTitle;
  };

  const searchTitle = (slug: string): string => {
    const name = unslugify(slug);
    return name;
  };

  useEffect(() => {
    setSearch(searchParams?.get("search") || "");
    setFilteredArticles(
      posts.filter((article) => {
        return slug(article.title).includes(search!);
      })
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, searchParams]);

  return (
    <>
      <section className="hero-banner filtered-hero">
        <div className="blog-container">
          <h1>
            Résultat de la recherche : <span>{searchTitle(search!)}</span>
          </h1>
        </div>
      </section>
      <section className="posts filtered-posts">
        <div className="blog-container">
          <div className="recommended-items">
            {filteredArticles.map((article, index) => (
              <Post article={article} priority={true} key={index} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
