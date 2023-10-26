import { ImageType } from "./Image";
import { LinkType } from "./Link";

export type DomainesType<T> = {
  id: number;
  title: string;
  slug: string;
  permalink: string;
  excerpt: string;
  content: string;
  acf: {
    mini_titre: string;
    sous_titre: string;
    titre: string;
    logo_noir: ImageType;
    contenu_fond_gris: string;
    image_fond_gris: ImageType;
    contenu_flexible: T[];
    image_bas_de_page: ImageType;
    titre_bas_de_page: string;
  };
  yoast: {
    yoast_wpsea_metadesc: string;
  };
  media: {
    thumbnail: string;
    medium: string;
    large: string;
    "2048x2048": string;
  };
};

export type ContentType<T> = {
  acf_fc_layout: "contenu";
  contenu: string;
  contenu_flex: T[];
};

export interface ContentTypeImage {
  acf_fc_layout: "image";
  image: ImageType;
  un_texte_sous_limage: string;
  texte_sous_image: string;
  picto_sous_image: ImageType;
}

export interface ContentTypeFondJauneType {
  acf_fc_layout: "fond_jaune";
  colonne_ou_ligne: string;
  image: ImageType;
  contenu_fond_jaune: string;
  colonne: Array<{ contenu: string; image: ImageType }>;
}

export interface SliderType {
  acf_fc_layout: "slider";
  titre: string;
  visuels: {
    image: ImageType;
  }[];
}

export interface ContentFondImageType {
  acf_fc_layout: "image_de_fond";
  image_de_fond: ImageType;
  colonne_ou_ligne: string;
  contenu_en_ligne: string;
  contenu_en_colonne: Array<{ contenu: string }>;
  lien_ou_sous_texte: string;
  lien: LinkType;
  sous_texte: string;
  image_sous_texte: ImageType;
}
