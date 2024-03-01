/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import { PostData } from '@/middleware/Post';
import { format, parseISO } from 'date-fns';
import Image from 'next/image';
import Link from 'next/link';
import he from 'he';
import { fr } from 'date-fns/locale';
import { useEffect, useState } from 'react';

export default function Posts({
  posts,
  articleCategory,
  currentArticle,
}: {
  posts: PostData[];
  articleCategory: string;
  currentArticle: string;
}) {
  const [similarPosts, setSimilarPosts] = useState<PostData[]>([]);

  useEffect(() => {
    const samePosts = posts.filter(
      (post) =>
        post.category_names.includes(articleCategory) &&
        post.title !== currentArticle,
    );
    setSimilarPosts(samePosts);
  }, []);

  const truncateText = (text: string, length: number): string => {
    if (text.length <= length) {
      return text;
    }
    return text.slice(0, length) + '...';
  };

  const formatDate = (isoDate: string): string => {
    const date = parseISO(isoDate);
    return `publié le ${format(date, 'dd MMMM yyyy', { locale: fr })}`;
  };

  return (
    <section className="same-theme">
      <h2>
        Les articles <br />
        <span>recommandés</span>
      </h2>
      {similarPosts.slice(0, 3).map((post, index: number) => (
        <>
          <div className="post-content" key={index}>
            <Link href={`/blog/${post.slug}`}>
              <Image
                src={
                  post.media.large ? post.media.large : '/fall-back-image.png'
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
              <p className="post-cateogry">
                {post.category_names.find(
                  (category) => category === articleCategory,
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
        </>
      ))}
    </section>
  );
}
