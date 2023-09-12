import { EquipeType, PageType } from "@/middleware/Page";
import { PostData } from "@/middleware/Post";
import axios from "axios";
import he from "he";
import Image from "next/image";
import Link from "next/link";
import { use } from "react";

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

export default function Author({ data }: { data: PostData }) {
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
        <section className="author">
          <div className="blog-container">
            <Image
              src={member.image_blog_membre.url}
              alt={member.image_blog_membre.alt}
              width={254}
              height={292}
            />
            <div className="author-card-content">
              <p className="author-card-title">L&apos;auteur :</p>
              <p className="author-card-subtitle">Qui je suis ?</p>
              <p className="author-card-job">{member.post_membre}</p>
              <div
                className="author-card-job-content"
                dangerouslySetInnerHTML={{ __html: member.blog_membre }}
              ></div>
              <div className="btn-container">
                <Link
                  href={`/specialistes-communication#${removeAccents(
                    member.nom_membre
                  )}`}
                  className="btn"
                >
                  Mon profil
                </Link>
                <Link href="/" className="btn">
                  Mes articles
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
}
