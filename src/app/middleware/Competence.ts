export type Competences = {
  icone: {
    url: string;
    alt: string;
    width: number;
    height: number;
  };
  titre: string;
  texte: string;
  exemple: string;
  lien_competence: {
    url: string;
    title: string;
    target: string;
  };
};
