"use client";

import { ImageType } from "@/middleware/Image";
import { AcfFrontPage } from "@/page";
import Image from "next/image";
import Link from "next/link";
import { useCallback } from "react";
import { DotButton, useDotButton } from "./EmblaCarouselDotButton";
import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel, {
  EmblaOptionsType,
  EmblaCarouselType,
} from "embla-carousel-react";
import {
  NextButton,
  PrevButton,
  usePrevNextButtons,
} from "./EmblaCarouselArrowButton";

const OPTIONS: EmblaOptionsType = {
  align: "start",
  slidesToScroll: 1,
  duration: 30,
  breakpoints: {
    "(max-width: 967px)": {
      slidesToScroll: 1,
    },
  },
};

export default function FrontSlider({
  slider,
  sliderText,
}: {
  slider: AcfFrontPage["slider"];
  sliderText: AcfFrontPage["texte_photo"];
}) {
  const [emblaRef, emblaApi] = useEmblaCarousel(OPTIONS, [Autoplay()]);

  const onButtonClick = useCallback((emblaApi: EmblaCarouselType) => {
    const { autoplay } = emblaApi.plugins();
    if (!autoplay) return;
    if (autoplay.options.stopOnInteraction !== false) autoplay.stop();
  }, []);

  const { selectedIndex, scrollSnaps, onDotButtonClick } = useDotButton(
    emblaApi,
    onButtonClick
  );

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  } = usePrevNextButtons(emblaApi, onButtonClick);

  return (
    <section className="slider-wrapper">
      <div className="container">
        <div className="embla">
          <div ref={emblaRef} className="embla__viewport">
            <div className="embla__container">
              {slider.map((slide: { image: ImageType }) => (
                <div
                  className="embla__slide"
                  key={slide.image.id}
                  style={{
                    width: slide.image.width,
                    height: slide.image.height,
                  }}
                >
                  <Image
                    src={slide.image.url}
                    alt={slide.image.alt}
                    title={slide.image.title}
                    width={slide.image.width}
                    height={slide.image.height}
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="embla__buttons">
            <PrevButton
              onClick={onPrevButtonClick}
              disabled={prevBtnDisabled}
            />
            <div className="embla__dots">
              {scrollSnaps.map((_, index) => (
                <DotButton
                  key={index}
                  onClick={() => onDotButtonClick(index)}
                  className={"embla__dot".concat(
                    index === selectedIndex ? " embla__dot--selected" : ""
                  )}
                />
              ))}
            </div>
            <NextButton
              onClick={onNextButtonClick}
              disabled={nextBtnDisabled}
            />
          </div>
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
