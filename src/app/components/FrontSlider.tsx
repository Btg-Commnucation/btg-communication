"use client";

import { ImageType } from "@/middleware/Image";
import { AcfFrontPage } from "@/page";
import Image from "next/image";
import { CSSProperties, useCallback } from "react";
import { DotButton, useDotButton } from "./EmblaCarouselDotButton";
import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel, {
  EmblaCarouselType,
  EmblaOptionsType,
} from "embla-carousel-react";
import {
  NextButton,
  PrevButton,
  usePrevNextButtons,
} from "./EmblaCarouselArrowButton";
import Button from "@/components/Button";

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
  sliderLink,
}: {
  slider: AcfFrontPage["slider"];
  sliderText: AcfFrontPage["texte_photo"];
  sliderLink: AcfFrontPage["lien_realisations_slider"];
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
        <div
          className="embla"
          style={
            {
              "--slide-height": `calc(394px + (${slider[0].image.height} - 394) * ((100vw - 320px) / (1920 - 320)))`,
            } as CSSProperties
          }
        >
          <div ref={emblaRef} className="embla__viewport">
            <div className="embla__container">
              {slider.map((slide: { image: ImageType }) => (
                <div className="embla__slide" key={slide.image.id}>
                  <Image
                    src={slide.image.url}
                    alt={slide.image.alt}
                    title={slide.image.title}
                    width={slide.image.width}
                    height={slide.image.height}
                    placeholder={"blur"}
                    blurDataURL="data:image/jpeg..."
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
          <Button
            link={sliderLink.url}
            text={sliderLink.title}
            target={sliderLink.target}
          />
        </div>
      </div>
    </section>
  );
}
