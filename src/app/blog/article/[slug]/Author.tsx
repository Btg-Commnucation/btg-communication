import {EquipeType, PageType} from "@/middleware/Page";
import {PostData} from "@/middleware/Post";
import axios from "axios";
import {use} from "react";
import AuthorCard from "@/components/AuthorCard";

const URL_API = process.env.URL_API;

const getAuthorData = async (author: string) => {
  try {
    const response = await axios<PageType<EquipeType>>(
      `${URL_API}/better-rest-endpoints/v1/page/specialistes-communication`
    ).then((response) =>
      response.data.acf.membre.find((m) => m.nom_membre === author)
    );

    return response;
  } catch (error) {
    console.log(error);
  }
};

export default function Author({data}: { data: PostData }) {
  const member = use(getAuthorData(data.acf.auteur));

  const removeAccents = (input: string): string => {
    return input
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase();
  };

  return (
    <>
      {member && (
        <AuthorCard member={member} removeAccents={removeAccents}/>
      )}
    </>
  );
}
