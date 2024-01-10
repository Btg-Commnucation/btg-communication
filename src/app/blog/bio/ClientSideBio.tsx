"use client";

import { useSearchParams } from "next/navigation";
import { Membre } from "@/middleware/Page";
import { PostData } from "@/middleware/Post";
import AuthorCard from "@/components/AuthorCard";
import Link from "next/link";
import Image from "next/image";
import he from "he";
import { format, parseISO } from "date-fns";
import { fr } from "date-fns/locale";

const removeAccents = (input: string): string => {
  return input
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
};

export default function ClientSideBio({
  authors,
  articles,
}: {
  authors: Membre[];
  articles: PostData[];
}) {
  const searchParams = useSearchParams();
  const searchAuthor = searchParams.get("auteur");
  const author = authors.find(
    (author) =>
      removeAccents(author.nom_membre) === removeAccents(searchAuthor!)
  );

  const filteredArticles = articles.filter(
    (article) =>
      article.acf &&
      article.acf.auteur &&
      article.acf.auteur === author?.nom_membre
  );

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
      <section className="hero-banner filtered-hero">
        <div className={`blog-container`}>
          <h1>
            {author
              ? `Les articles de ${author.nom_membre}`
              : "Les articles de ..."}
          </h1>
          {author && (
            <AuthorCard
              member={author}
              removeAccents={removeAccents}
              hideArticlesButton={true}
            />
          )}
        </div>
      </section>
      <section className="posts filtered-posts">
        <div className="blog-container">
          <h2 className="articles-title">
            Mes <span>Articles</span>
          </h2>
          <div className="recommended-items">
            {filteredArticles.length > 0 ? (
              filteredArticles.map((post, index) => (
                <div className="post-content" key={index}>
                  <Link href={`/blog/${post.slug}`}>
                    <Image
                      src={
                        post.media.large
                          ? post.media.large
                          : "/fall-back-image.png"
                      }
                      alt={he.decode(post.title)}
                      width={833}
                      height={496}
                      quality={100}
                      priority={true}
                    />
                  </Link>
                  <div className="card-content">
                    <Link href={`/blog/${post.slug}`} className="card-title">
                      {he.decode(post.title)}
                    </Link>
                    <p className="post-cateogry">{post.category_names[0]}</p>
                    <div
                      className="card-excerpt"
                      dangerouslySetInnerHTML={
                        post.excerpt
                          ? { __html: post.excerpt }
                          : { __html: truncateText(post.acf.accroche, 199) }
                      }
                    ></div>
                    <div className="card-date">
                      {he.decode(formatDate(post.date))}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="no-article">Aucun article pour le moment</p>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
