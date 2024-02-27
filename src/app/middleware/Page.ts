import { ImageType } from './Image';
import { LinkType } from './Link';

export type PageType<T> = {
  id: number;
  title: string;
  content: string;
  parent: boolean;
  slug: string;
  template: string;
  date_modified: string;
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
    '1536x1536': string;
    '2048x2048': string;
  };
};

export interface VilleType {
  ville: 'Tours' | 'Vannes';
  sous_titre: string;
  image_premier_paragraphe: ImageType;
  texte_premier_paragraphe: string;
  titre_premier_paragraphe: string;
  titre_fond_jaune: string;
  description_fond_jaune: string;
  textes_fond_jaune_vannes: { texte: string }[];
  titre_fond_jaune_vannes: string;
  textes_fond_jaune: { texte: string }[];
  image_post_fond_jaune: ImageType;
  texte_post_fond_jaune: string;
  titre_fond_blanc: string;
  texte_un_fond_blanc: string;
  texte_deux_fond_blanc: string;
  image_fond_blanc: ImageType;
  titre_fond_gris: string;
  texte_fond_gris: { texte: string }[];
  titre_fond_jaune_2: string;
  texte_fond_jaune_un: string;
  texte_fond_jaune_deux: string;
  texte_fond_jaune_trois: string;
  carte: ImageType;
}

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
  lien_contact: LinkType;
};

export type ClientType = {
  temoignage: TemoignagesType[];
  sous_titre: string;
  lien_page_realisations: LinkType;
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
  lien_equipe: LinkType;
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
  lien_realisations: LinkType;
};

export type EquipeType = {
  sous_titre: string;
  membre: Membre[];
  lien_realisations: LinkType;
};

export interface Membre {
  nom_membre: string;
  image_membre: ImageType;
  image_blog_membre: ImageType;
  post_membre: string;
  descriptif_membre: string;
  blog_membre: string;
}
