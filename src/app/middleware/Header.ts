export type Menu = {
  data: {
    ID: number;
    menu_order: number;
    title: string;
    slug: string;
    url: string;
    menu_item_parent: string;
  }[];
};

export type rsOptions = {
  facebook: {
    url: string;
    title: string;
    target: string;
  };
  instagram: {
    url: string;
    title: string;
    target: string;
  };
  linkedin: {
    url: string;
    title: string;
    target: string;
  };
};

export type OptionsType = {
  data: rsOptions;
};

export type MenuData = {
  ID: number;
  menu_order: number;
  title: string;
  slug: string;
  url: string;
  menu_item_parent: string;
};
