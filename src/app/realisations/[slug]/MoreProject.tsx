import Link from 'next/link';
import { RealType } from './page';
import Image from 'next/image';

const ProjetsLoop = ({ projects }: { projects: RealType[] }) => {
  return (
    <ul className="projects-container">
      {projects.map((project, index: number) => (
        <li key={index}>
          <Link href={`/realisations/${project.slug}`}>
            <Image
              src={project.media.large}
              alt={project.title}
              width={321.19}
              height={393.94}
            />
            <div className="overlay">
              <div className="bg-overlay"></div>
              <h3>{project.title}</h3>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 371.9 429.5">
                <path d="M186 0L0 107.4v214.7l186 107.4 186-107.4V107.4L186 0zm174.9 315.7l-175 101-175-101v-202l175-101 175 101v202z"></path>
                <path d="M169.3 134.7v63.6h-61.2v32.3h61.2v64.2h23.3v-64.2h61.2v-32.3h-61.2v-63.6z"></path>
              </svg>
              <div
                className="project-content"
                dangerouslySetInnerHTML={{ __html: project.content }}
              ></div>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default function MoreProject({ projects }: { projects: RealType[] }) {
  return (
    <section className="more-project">
      <div className="container">
        <h3>Plus de projets de l&apos;agence</h3>
        <div className="separator"></div>
        <ProjetsLoop projects={projects} />
      </div>
    </section>
  );
}
