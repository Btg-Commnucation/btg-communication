"use client";

import { ImageType } from "@/middleware/Image";
import { AcfFrontPage } from "@/page";
import "keen-slider/keen-slider.min.css";
import { useKeenSlider } from "keen-slider/react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const animation = { duration: 100, easing: (t: number) => t };

export default function FrontSlider({
  slider,
  sliderText,
}: {
  slider: AcfFrontPage["slider"];
  sliderText: AcfFrontPage["texte_photo"];
}) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
    initial: 0,
    renderMode: "performance",
    loop: true,
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel);
    },
    created(s) {
      setLoaded(true);
      setTimeout(() => {
        s.moveToIdx(1, true, animation);
      }, 5000);
    },
    updated(s) {
      s.moveToIdx(s.track.details.abs + 1, true, animation);
    },
    animationEnded(s) {
      setTimeout(() => {
        s.moveToIdx(s.track.details.abs + 1, true, animation);
      }, 5000);
    },
  });

  return (
    <section className="slider-wrapper">
      <div className="container">
        <div className="navigation-wrapper">
          <div
            className="keen-slider"
            ref={sliderRef}
            style={{
              width: slider[0].image.width,
              height: slider[0].image.height,
            }}
          >
            {slider.map((slide: { image: ImageType }) => (
              <div
                className="keen-slider__slide"
                key={slide.image.id}
                style={{ width: slide.image.width, height: slide.image.height }}
              >
                <Image
                  src={slide.image.url}
                  alt={slide.image.alt}
                  width={slide.image.width}
                  height={slide.image.height}
                />
              </div>
            ))}
          </div>
          {loaded && instanceRef.current && (
            <div className="slider-navigation">
              <Arrow
                left
                onClick={(e: any) =>
                  e.stopPropagation() || instanceRef.current?.prev()
                }
              />
              <div className="dots">
                {[
                  ...Array(
                    instanceRef.current.track.details.slides.length
                  ).keys(),
                ].map((idx) => {
                  return (
                    <button
                      key={idx}
                      onClick={() => instanceRef.current?.moveToIdx(idx)}
                      className={
                        "dot " + (currentSlide === idx ? "active" : "")
                      }
                    ></button>
                  );
                })}
              </div>
              <Arrow
                onClick={(e: any) =>
                  e.stopPropagation() || instanceRef.current?.next()
                }
              />
            </div>
          )}
        </div>
        <div className="slider-text">
          <h2>Projets</h2>
          <div
            className="text"
            dangerouslySetInnerHTML={{ __html: sliderText }}
          ></div>
          <Link href="/nos-realisations" className="btn-primary">
            Les réalisations de l&apos;agence
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
    </section>
  );
}

const Arrow = (props: {
  disabled?: boolean;
  left?: boolean;
  onClick: (e: any) => void;
}) => {
  const disabled = props.disabled ? "arrow--disabled" : "";
  return (
    <svg
      onClick={props.onClick}
      className={"arrow " + (props.left ? "arrow--left" : "arrow--right")}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
      x="0px"
      y="0px"
      style={
        props.left
          ? { transform: "rotate(180deg)" }
          : { transform: "rotate(0)" }
      }
    >
      <title>Arrows</title>
      <g data-name="Layer 2">
        <polygon points="44.13 72.13 58 86 94.25 50 57.87 13.13 44 27 57.51 41 6 41 6 59 57.51 59 44.13 72.13"></polygon>
      </g>
    </svg>
  );
};
