import { ImageType } from "./Image";

export interface ContactType {
  image_top: ImageType;
  texte_top: string;
  titre: string;
  agences: Array<{
    titre: string;
    adresse: string;
  }>;
}
