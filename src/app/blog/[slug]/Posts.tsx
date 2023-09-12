import { PostData } from "@/middleware/Post";
import { format, parseISO } from "date-fns";
import Image from "next/image";
import Link from "next/link";
import he from "he";
import { fr } from "date-fns/locale";

export default function Posts({
  posts,
  articleCategory,
}: {
  posts: PostData[];
  articleCategory: string;
}) {
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
    <section className="same-theme">
      <h2>
        Les articles <br />
        <span>recommandés</span>
      </h2>
      {posts.slice(0, 3).map((post, index: number) => (
        <>
          {post.category_names.find(
            (category) => category === articleCategory
          ) && (
            <div className="post-content" key={index}>
              <Link href={`/blog/${post.slug}`}>
                <Image
                  src={post.media.large}
                  alt={he.decode(post.title)}
                  width={366}
                  height={218}
                />
              </Link>
              <div className="card-content">
                <Link href={`/blog/${post.slug}`} className="card-title">
                  {he.decode(post.title)}
                </Link>
                <p className="post-cateogry">
                  {post.category_names.find(
                    (category) => category === articleCategory
                  )}
                </p>
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
          )}
        </>
      ))}
    </section>
  );
}
