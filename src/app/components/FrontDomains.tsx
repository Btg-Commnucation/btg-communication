import { AcfFrontPage } from '@/page';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import he from 'he';
import Button from '@/components/Button';

const DomainComponent = ({
  skills,
}: {
  skills: AcfFrontPage['competences'];
}) => {
  const urls = skills.map((skill) => new URL(skill.competence.url));
  const pathnames = urls.map((url) => url.pathname);
  const parts = pathnames.map((pathname) => pathname.split('/'));
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
  skillsLink,
}: {
  skills: AcfFrontPage['competences'];
  skillsText: AcfFrontPage['texte_competences'];
  skillsLink: AcfFrontPage['lien_competences'];
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
          <Button
            link={skillsLink.url}
            text={skillsLink.title}
            target={skillsLink.target}
          />
        </div>
      </div>
      <DomainComponent skills={skills} />
    </section>
  );
}
