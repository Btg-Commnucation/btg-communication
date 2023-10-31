"use client";

import {useEffect, useState} from "react";
import {PostData} from "@/middleware/Post";
import Image from "next/image";
import Link from "next/link";
import he from "he";
import {format, parseISO} from "date-fns";
import {fr} from "date-fns/locale";
import {Membre} from "@/middleware/Page";
import {useKeenSlider} from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import {useSearchParams} from "next/navigation";
import slugify from "slugify";
import unslugify from "unslugify";

const Post = ({
                article,
                priority,
                filter,
              }: {
  article: PostData;
  priority: boolean;
  filter?: string | null;
}) => {
  const truncateText = (text: string, length: number): string => {
    if (text.length <= length) {
      return text;
    }
    return text.slice(0, length) + "...";
  };

  const slug = (categoryName: string): string => {
    const categorySlug = slugify(categoryName, {
      replacement: "-",
      lower: true,
      remove: /[*+~.()'"!:@]/g,
    });
    return categorySlug;
  };

  const formatDate = (isoDate: string): string => {
    const date = parseISO(isoDate);
    return `publié le ${format(date, "dd MMMM yyyy", {locale: fr})}`;
  };

  return (
    <>
      {!filter ? (
        <div className="post-content">
          <Link href={`/blog/${article.slug}`}>
            <Image
              src={article.media.large}
              alt={he.decode(article.title)}
              width={833}
              height={496}
              quality={100}
              priority={priority}
            />
          </Link>
          <div className="card-content">
            <Link href={`/blog/${article.slug}`} className="card-title">
              {he.decode(article.title)}
            </Link>
            <p className="post-cateogry">
              {he.decode(article.category_names[0])}
            </p>
            <div
              className="card-excerpt"
              dangerouslySetInnerHTML={
                article.excerpt
                  ? {__html: article.excerpt}
                  : {__html: truncateText(article.acf.accroche, 199)}
              }
            ></div>
            <div className="card-date">
              {he.decode(formatDate(article.date))}
            </div>
          </div>
        </div>
      ) : (
        <>
          {article.category_names.find(
            (category) => slug(category) === filter
          ) && (
            <div className="post-content">
              <Link href={`/blog/${article.slug}`}>
                <Image
                  src={article.media.large}
                  alt={he.decode(article.title)}
                  width={833}
                  height={496}
                  quality={100}
                  priority={priority}
                />
              </Link>
              <div className="card-content">
                <Link href={`/blog/${article.slug}`} className="card-title">
                  {he.decode(article.title)}
                </Link>
                <p className="post-cateogry">
                  {he.decode(article.category_names[0])}
                </p>
                <div
                  className="card-excerpt"
                  dangerouslySetInnerHTML={
                    article.excerpt
                      ? {__html: article.excerpt}
                      : {__html: truncateText(article.acf.accroche, 199)}
                  }
                ></div>
                <div className="card-date">
                  {he.decode(formatDate(article.date))}
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
};

const Authors = ({members}: { members: Membre[] }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>(
    {
      initial: 0,
      renderMode: "performance",
      loop: true,
      slideChanged(slider) {
        setCurrentSlide(slider.track.details.rel);
      },
      created(s) {
        setLoaded(true);
      },
    },
    []
  );

  const removeAccents = (input: string): string => {
    return input
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase();
  };

  return (
    <>
      <div className="keen-slider" ref={sliderRef}>
        {members.map((member, index: number) => (
          <>
            {member.image_blog_membre && (
              <div className="keen-slider__slide" key={index}>
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
                    <Link href={`/blog/bio?auteur=${removeAccents(member.nom_membre)}`} className="btn">
                      Mes articles
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </>
        ))}
      </div>
      {loaded && instanceRef.current && (
        <div className="slider-navigation">
          <div className="dots">
            {[
              ...Array(instanceRef.current.track.details.slides.length).keys(),
            ].map((idx) => {
              return (
                <button
                  key={idx}
                  onClick={() => instanceRef.current?.moveToIdx(idx)}
                  className={"dot " + (currentSlide === idx ? "active" : "")}
                ></button>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
};

export default function Blog({
                               articles,
                               members,
                             }: {
  articles: PostData[];
  members: Membre[];
}) {
  const searchParams = useSearchParams();

  const [search, setSearch] = useState(searchParams.get("category"));

  const categoryName = (slug: string): string => {
    const name = unslugify(slug);
    return name;
  };

  useEffect(() => {
    setSearch(searchParams.get("category"));
  }, [search, searchParams]);

  return (
    <>
      {!search ? (
        <>
          <section className="hero-banner">
            <div className="blog-container">
              <h1>Retrouvez l&apos;actualités de la communication</h1>
              <div className="articles-container-recommended">
                <h2>
                  Nos derniers <span>Articles</span>
                </h2>
                <div className="recommended-items">
                  {articles.slice(0, 3).map((article) => (
                    <Post article={article} key={article.id} priority={true}/>
                  ))}
                </div>
              </div>
              <div className="all-articles__container">
                <Link href="/blog?category=all" className="all-articles">
                  Tous nos articles
                </Link>
              </div>
            </div>
          </section>
          <section className="mostRead">
            <div className="blog-container">
              <h2>
                Les articles les <span>plus lus</span>
              </h2>
              <div className="recommended-items">
                {articles.map((article) => (
                  <>
                    {article.acf.article_plus_lu === "Oui" && (
                      <Post
                        article={article}
                        key={article.id}
                        priority={false}
                      />
                    )}
                  </>
                ))}
              </div>
            </div>
          </section>
          <section className="authors">
            <div className="blog-container">
              <Authors members={members}/>
            </div>
          </section>
          <section className="guides">
            <div className="blog-container">
              <h2>Tuto / guides</h2>
              <div className="recommended-items">
                {articles.map((article) => (
                  <Post
                    article={article}
                    key={article.id}
                    priority={false}
                    filter="guides"
                  />
                ))}
              </div>
              <div className="guides-link">
                <Link href="/blog?category=guides">Tous nos guides</Link>
              </div>
            </div>
          </section>
        </>
      ) : (
        <>
          <section className="hero-banner filtered-hero">
            <div className="blog-container">
              <h1>
                {search === "all" ? "Tous les articles" : categoryName(search)}
              </h1>
            </div>
          </section>
          <section className="posts filtered-posts">
            <div className="blog-container">
              <Image
                src="/wave-radiant.gif"
                alt="Vague"
                width={188}
                height={36}
                className="wave"
              />
              <div className="recommended-items">
                {articles.map((article) => (
                  <Post
                    article={article}
                    key={article.id}
                    priority={true}
                    filter={search === "all" ? null : search}
                  />
                ))}
              </div>
            </div>
          </section>
        </>
      )}
    </>
  );
}
