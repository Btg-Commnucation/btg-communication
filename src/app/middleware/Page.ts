import { ImageType } from "./Image";
import { LinkType } from "./Link";

export type PageType<T> = {
  id: number;
  title: string;
  content: string;
  parent: boolean;
  slug: string;
  template: string;
  acf: T;
  yoast: {
    yoast_wpseo_title: string;
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

export type TemoignagesType = {
  nom: string;
  job: string;
  societe: string;
  portrait: ImageType;
  description: string;
  id_video?: string;
};

export type RealisationType = {
  banner: ImageType;
  sous_titre: string;
  categories: {
    nom: string;
    image: ImageType;
    image_degrade: ImageType;
  }[];
};

export type ClientType = {
  temoignage: TemoignagesType[];
  sous_titre: string;
  confiances: {
    image: ImageType;
  }[];
};

export type SavoirType = {
  sous_titre: string;
  image_de_fond: ImageType;
  texte_agence: string;
  texte_accompagnement: string;
  texte_bas_de_page: string;
  lien_agence_tours: LinkType;
  lien_agence_vannes: LinkType;
  agence_bas_texte: string;
  agence_bas_image: ImageType;
  agence_fond_bleu_texte: string;
  competences: {
    icone: ImageType;
    titre: string;
    texte: string;
    exemple: string;
    lien_competence: LinkType;
  }[];
};

export type EquipeType = {
  sous_titre: string;
  membre: Membre[];
  lien: LinkType;
};

export interface Membre {
  nom_membre: string;
  image_membre: ImageType;
  image_blog_membre: ImageType;
  post_membre: string;
  descriptif_membre: string;
  blog_membre: string;
}
