'use client';
import Image from 'next/image';
import he from 'he';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { PageType, RealisationType } from '@/middleware/Page';
import { RealType } from '@/middleware/RealType';

export default function RealisationClient({
  page,
  data,
}: {
  page: PageType<RealisationType>;
  data: RealType[];
}) {
  const [filter, setFilter] = useState<string>('all');
  const [filteredData, setFilteredData] = useState(data);
  const [windowWidth, setWindowWidth] = useState<number>(0);

  useEffect(() => {
    if (filter === 'all') {
      setFilteredData(data);
    } else {
      setFilteredData(
        data.filter(
          (real) =>
            real.terms !== false &&
            real.terms?.some((term) => term.name === filter),
        ),
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter]);

  useEffect(() => {
    setWindowWidth(window.innerWidth);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {windowWidth > 768 ? (
        <ul className="categories-filter">
          <li>
            <button
              onClick={() => setFilter('all')}
              className={filter === 'all' ? 'active' : ''}
            >
              <div className="icon">
                <Image
                  src="/filter-tous.svg"
                  alt="Tous les filtres"
                  height={80}
                  width={70}
                />
                <Image
                  src="/filter-tous-degrade.svg"
                  alt="Tous les filtres"
                  height={80}
                  width={70}
                />
              </div>
              <Image
                src="/vague.svg"
                alt="Vague"
                width={58.75}
                height={10}
                className="wave"
              />
            </button>
          </li>
          {page.acf.categories.map((category, index: number) => (
            <li key={index}>
              <button
                onClick={() => {
                  setFilter(category.nom);
                }}
                className={category.nom === filter ? 'active' : ''}
              >
                <div className="icon">
                  <Image
                    src={category.image.url}
                    alt={category.image.alt}
                    height={80}
                    width={70}
                  />
                  <Image
                    src={category.image_degrade.url}
                    alt={category.image_degrade.alt}
                    height={80}
                    width={70}
                  />
                </div>
                <p>{he.decode(category.nom)}</p>
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <ul
          className="resp-filters"
          onClick={(e) => {
            if (e.target instanceof HTMLElement) {
              e.target.classList.toggle('active');
            }
          }}
        >
          <li className="openList">Type de projet</li>
          <li
            className={`filter-item ${filter === 'all' && 'active'}`}
            onClick={() => setFilter('all')}
          >
            Tous
          </li>
          {page.acf.categories.map((category, index: number) => (
            <li
              className={`filter-item ${filter === category.nom && 'active'}`}
              key={index}
              onClick={() => setFilter(he.decode(category.nom))}
            >
              {he.decode(category.nom)}
            </li>
          ))}
        </ul>
      )}

      <div className="all-projects">
        <ul className="projects-container">
          {filteredData.map((project, index: number) => (
            <li key={index}>
              <Link href={`/realisations/${project.slug}`}>
                <Image
                  src={project.media.large}
                  alt={project.title}
                  width={321.19}
                  height={393.94}
                  quality={100}
                  loading="lazy"
                />
                <div className="overlay">
                  <div className="bg-overlay"></div>
                  <h3>{he.decode(project.title)}</h3>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 371.9 429.5"
                  >
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
      </div>
    </>
  );
}
