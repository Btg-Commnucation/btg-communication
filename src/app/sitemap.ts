import { MetadataRoute } from 'next';
import https from 'https';
import axios from 'axios';
import { PageType } from '@/middleware/Page';
import { PostData } from '@/middleware/Post';

const URL_API = process.env.URL_API;
const agent = new https.Agent({
  rejectUnauthorized: false,
});
const baseUrl = 'https://www.btg-communication.fr';

const getPages = async () => {
  const response = await axios<PageType<{ slug: string }>[]>(
    `${URL_API}/better-rest-endpoints/v1/pages?per_page=100`,
    {
      httpsAgent: agent,
    },
  );

  return response.data;
};

const getAticles = async () => {
  const response = await axios<PostData[]>(
    `${URL_API}/better-rest-endpoints/v1/posts?per_page=100`,
    {
      httpsAgent: agent,
    },
  );

  return response.data;
};
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const pages = await getPages();
  const articles = await getAticles();

  const pagesUrls = pages.map((page) => {
    return {
      url: `${baseUrl}/${page.slug}`,
      lastModified: new Date(),
    };
  });

  const articlesUrls = articles.map((article) => {
    return {
      url: `${baseUrl}/blog/${article.slug}`,
      lastModified: new Date(article.date_modified),
    };
  });

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
    ...pagesUrls,
    ...articlesUrls,
  ];
}
