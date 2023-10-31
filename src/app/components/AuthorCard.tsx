import {Membre} from "@/middleware/Page";
import Image from "next/image";
import Link from "next/link";

export default function AuthorCard({member, removeAccents, hideArticlesButton}: {
  member: Membre,
  removeAccents: (input: string) => string,
  hideArticlesButton?: boolean
}) {

  return (
    <section className="author">
      <div className="blog-container">
        <Image
          src={member.image_blog_membre.url}
          alt={member.image_blog_membre.alt}
          width={254}
          height={292}
        />
        <div className="author-card-content">
          {!hideArticlesButton && <p className="author-card-title">L&apos;auteur :</p>}
          <p className="author-card-subtitle">Qui je suis ?</p>
          <p className="author-card-job">{member.post_membre}</p>
          <div
            className="author-card-job-content"
            dangerouslySetInnerHTML={{__html: member.blog_membre}}
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
            {!hideArticlesButton && (
              <Link href={`/blog/bio?auteur=${removeAccents(member.nom_membre)}`} className="btn">
                Mes articles
              </Link>)}

          </div>
        </div>
      </div>
    </section>
  )
}
