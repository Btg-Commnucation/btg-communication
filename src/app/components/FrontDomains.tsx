import { AcfFrontPage } from "@/page";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import he from "he";

const DomainComponent = ({
  skills,
}: {
  skills: AcfFrontPage["competences"];
}) => {
  const urls = skills.map((skill) => new URL(skill.competence.url));
  const pathnames = urls.map((url) => url.pathname);
  const parts = pathnames.map((pathname) => pathname.split("/"));
  const lastParts = parts.map((part) => part[part.length - 2]);

  return (
    <div className="skills">
      <ul>
        {skills.map((skill, index) => (
          <li key={index}>
            <Link href={`/notre-expertise/${lastParts[index]}`}>
              <Image
                src={skill.icone.url}
                alt={skill.icone.alt}
                width={100}
                height={130}
              />
              <h3>{skill.competence.title}</h3>
              <p>{he.decode(skill.description)}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default function FrontDomains({
  skills,
  skillsText,
}: {
  skills: AcfFrontPage["competences"];
  skillsText: AcfFrontPage["texte_competences"];
}) {
  return (
    <section className="front-skills">
      <div className="agence">
        <Image
          src="/wave-yellow.gif"
          alt="Vague jaune animée"
          width={188}
          height={32}
          className="wave-yellow"
        />
        <div className="container-narrow">
          <h2>Ce que l&apos;on fait</h2>
          <div
            className="desc"
            dangerouslySetInnerHTML={{ __html: skillsText }}
          ></div>
          <Link href="/lagence-savoir-faire" className="btn-primary">
            L&apos;agence et savoir-faire
            <svg
              className="arrow"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 100 100"
              x="0px"
              y="0px"
            >
              <title>Arrows</title>
              <g data-name="Layer 2">
                <polygon points="44.13 72.13 58 86 94.25 50 57.87 13.13 44 27 57.51 41 6 41 6 59 57.51 59 44.13 72.13"></polygon>
              </g>
            </svg>
          </Link>
        </div>
      </div>
      <DomainComponent skills={skills} />
    </section>
  );
}
