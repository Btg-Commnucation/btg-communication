import { PostData } from '@/middleware/Post';
import axios from 'axios';
import https from 'https';
import { Metadata, ResolvingMetadata } from 'next';
import he from 'he';
import BlogHeader from '@/components/blog/BlogHeader';
import { use } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import BlogFooter from '@/components/blog/BlogFooter';
import slugify from 'slugify';
import { fr } from 'date-fns/locale';
import { format, parseISO } from 'date-fns';
import unslugify from 'unslugify';

const URL_API = process.env.URL_API;
const agent = new https.Agent({
  rejectUnauthorized: false,
});
export const revalidate = 1800;

const getArticle = async (slug: string) => {
  try {
    const response = await axios<PostData[]>(
      `${URL_API}/better-rest-endpoints/v1/posts?per_page=100`,
      {
        httpsAgent: agent,
      },
    );

    if (slug === 'all') {
      return { data: response.data, status: 200, errorMessage: '' };
    }

    const post = response.data.filter((post) =>
      post.category_names.find(
        (category) => slug === slugify(category, { lower: true }),
      ),
    );

    if (!response) {
      return {
        data: [
          {
            title: 'Nous sommes désolés, et si nous retournions à l’accueil ?',
            slug: 'error',
            category_names: ['Erreur'],
            media: { large: 'error' },
            excerpt: 'La page que vous demandez n’existe pas',
            date: 'error',
            acf: {
              accroche: 'Erreur',
              image_haut_article: null,
            },
          },
        ],
        status: 404,
        errorMessage: 'La page que vous demandez n’existe pas',
      };
    }

    return { data: post, status: 200, errorMessage: '' };
  } catch (error) {
    console.log(error);
    return {
      data: [
        {
          title: 'error',
          slug: 'error',
          category_names: ['Erreur'],
          excerpt: 'Erreur',
          media: { large: 'error' },
          date: 'error',
          acf: {
            accroche: 'Erreur',
            image_haut_article: null,
          },
        },
      ],
      status: 500,
      errorMessage: 'error',
    };
  }
};

export async function generateMetadata(
  { params }: { params: { slug: string } },
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const { slug } = params;

  const data = await axios<PostData[]>(
    `${URL_API}/better-rest-endpoints/v1/posts`,
    {
      httpsAgent: agent,
    },
  ).then((response) =>
    response.data.find((post) =>
      post.category_names.find(
        (category) => slug === slugify(category, { lower: true }),
      ),
    ),
  );
  if (!data) {
    return Promise.resolve({
      title: 'BTG Communication - 404',
      description:
        "BTG Communication - Oups, la page que vous demandez n'existe pas",
    });
  }

  const { title, yoast } = data;

  return Promise.resolve({
    title: 'Tous nos articles de la catégorie' + slug,
    description: 'Retrouvez tous nos articles de la catégorie' + slug,
  });
}

export default function Page({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const { data } = use(getArticle(slug));
  const categoryName = (slug: string): string => {
    const name = unslugify(slug);
    return name;
  };

  const formatedSearch = (element: string): string => {
    const temp = element
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-zA-Z0-9 ]/g, '');
    return slugify(temp, { replacement: '-', lower: true });
  };

  const formatDate = (isoDate: string): string => {
    const date = parseISO(isoDate);
    return `publié le ${format(date, 'dd MMMM yyyy', { locale: fr })}`;
  };

  const truncateText = (text: string, length: number): string => {
    if (text.length <= length) {
      return text;
    }
    return text.slice(0, length) + '...';
  };

  return (
    <>
      <BlogHeader />
      <main id="blog">
        <section className="hero-banner filtered-hero">
          <div className="blog-container">
            <h1>{categoryName(slug)}</h1>
          </div>
        </section>
        <section className="posts filtered-posts">
          <div className="blog-container">
            <Image
              src="/wave-radiant.gif"
              alt="Vague"
              width={188}
              height={36}
              className="wave"
            />
            <div className="recommended-items">
              {data.map((article) => (
                <>
                  <div className="post-content">
                    <Link href={`/blog/article/${article.slug}`}>
                      <Image
                        src={
                          article.media.large
                            ? article.media.large
                            : '/fall-back-image.png'
                        }
                        alt={he.decode(article.title)}
                        width={833}
                        height={496}
                        quality={100}
                      />
                    </Link>
                    <div className="card-content">
                      <Link
                        href={`/blog/article/${article.slug}`}
                        className="card-title"
                      >
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
                            : {
                                __html: truncateText(article.acf.accroche, 199),
                              }
                        }
                      ></div>
                      <div className="card-date">
                        {he.decode(formatDate(article.date))}
                      </div>
                    </div>
                  </div>
                </>
              ))}
            </div>
          </div>
        </section>
      </main>
      <BlogFooter />
    </>
  );
}
