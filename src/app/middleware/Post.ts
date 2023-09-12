import { ImageType } from "./Image";
import { LinkType } from "./Link";

export interface PostData {
  id: number;
  title: string;
  slug: string;
  permalink: string;
  date: string;
  excerpt: string;
  content: string;
  author: string;
  author_id: number;
  category_names: string[];
  acf: {
    accroche: string;
    image_haut_article?: ImageType;
    content: contentType[];
    auteur: string;
  };
  yoast: {
    yoast_wpseo_title: string;
    yoast_wpseo_metadesc: string;
  };
  media: {
    thumbnail: string;
    media: string;
    medium_large: string;
    large: string;
    ["1536x1536"]: string;
    ["2048x2048"]: string;
  };
}

export type contentType =
  | (AcfLayout & SousTitreData & { acf_fc_layout: "sous_titre" })
  | (AcfLayout & ImageData & { acf_fc_layout: "image" })
  | (AcfLayout & VideoData & { acf_fc_layout: "video" })
  | (AcfLayout & TexteData & { acf_fc_layout: "texte" })
  | (AcfLayout & FichierData & { acf_fc_layout: "fichier" });

interface AcfLayout {
  acf_fc_layout: string;
}

interface SousTitreData {
  sous_titre: string;
}

interface ImageData {
  image: ImageType;
}

interface VideoData {
  video: LinkType;
}

interface TexteData {
  texte: string;
}

interface FichierData {
  fichier: LinkType;
  lienFichier: LinkType;
  titre: string;
}
