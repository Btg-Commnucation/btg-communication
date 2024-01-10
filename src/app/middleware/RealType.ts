export type RealType = {
  id: number;
  title: string;
  slug: string;
  date: string;
  terms:
    | {
        count: number;
        name: string;
        term_id: number;
        term_taxonomy_id: number;
        slug: string;
        filter: string;
        description: string;
      }[]
    | false;
  acf: {
    banner: {
      url: string;
      alt: string;
      width: number;
      height: number;
    };
  };
  excerpt: string;
  content: string;
  author: string;
  yoast: {
    yoast_wpseo_metadesc: string;
  };
  media: {
    thumbnail: string;
    medium: string;
    medium_large: string;
    large: string;
    "1536x1536": string;
    "2048x2048": string;
  };
};
