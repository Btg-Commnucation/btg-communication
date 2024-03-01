import BlogHeader from '@/components/blog/BlogHeader';
import BlogFooter from '@/components/blog/BlogFooter';
import { PostData } from '@/middleware/Post';
import axios from 'axios';
import https from 'https';
import { use } from 'react';
import { Authors, Post } from './Blog';
import { EquipeType, Membre, PageType } from '@/middleware/Page';
import { Metadata } from 'next';
import he from 'he';
import Link from 'next/link';
import slugify from 'slugify';

const URL_API = process.env.URL_API;

const agent = new https.Agent({
  rejectUnauthorized: false,
});

export const revalidate = 1800;

export const metadata: Metadata = {
  title: he.decode('Les articles de notre auteur - Btg Communication'),
  description: he.decode(
    'Retrouvez toutes les actualités de notre auteur sur le blog de Btg Communication',
  ),
};

const getArticles = async () => {
  try {
    const response = await axios<PostData[]>(
      `${URL_API}/better-rest-endpoints/v1/posts?per_page=100`,
      {
        httpsAgent: agent,
      },
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
      },
    );

    return response.data.acf.membre;
  } catch (error) {
    console.log(error);
  }
};

const slug = (categoryName: string): string => {
  const categorySlug = slugify(categoryName, {
    replacement: '-',
    lower: true,
    remove: /[*+~.()'"!:@]/g,
  });
  return categorySlug;
};

export default function Page() {
  const articles = use(getArticles());
  const authors = use(getAuthors());
  const guideArticles = articles!.filter((article) => {
    return article.category_names.find(
      (category) => slug(category) === 'guides',
    );
  });

  return (
    <>
      <BlogHeader />
      <main id="blog">
        <>
          <section className="hero-banner">
            <div className="blog-container">
              <h1>Retrouvez l&apos;actualités de la communication</h1>
              <div className="articles-container-recommended">
                <h2>
                  Nos derniers <span>Articles</span>
                </h2>
                <div className="recommended-items">
                  {articles!.slice(0, 3).map((article) => (
                    <Post
                      article={article}
                      key={`last-${article.id}`}
                      priority={true}
                    />
                  ))}
                </div>
              </div>
              <div className="all-articles__container">
                <Link href="/blog/all" className="all-articles">
                  Tous nos articles
                </Link>
              </div>
            </div>
          </section>
          <section className="mostRead">
            <div className="blog-container">
              <h2>
                Les articles les <span>plus lus</span>
              </h2>
              <div className="recommended-items">
                {articles!.map((article) => (
                  <>
                    {article.acf &&
                      article.acf.article_plus_lu &&
                      article.acf.article_plus_lu === 'Oui' && (
                        <Post
                          article={article}
                          key={`mostRead-${article.id}`}
                          priority={false}
                        />
                      )}
                  </>
                ))}
              </div>
            </div>
          </section>
          <section className="authors">
            <div className="blog-container">
              <Authors members={authors as Membre[]} />
            </div>
          </section>
          <section className="guides">
            <div className="blog-container">
              <h2>Tuto / guides</h2>
              <div className="recommended-items">
                {guideArticles.slice(0, 2).map((article) => (
                  <Post
                    article={article}
                    key={`guides-${article.id}`}
                    priority={false}
                    filter="guides"
                  />
                ))}
              </div>
              <div className="guides-link">
                <Link href="/blog/guides">Tous nos guides</Link>
              </div>
            </div>
          </section>
        </>
      </main>
      <BlogFooter />
    </>
  );
}
