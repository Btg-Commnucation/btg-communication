"use client";
import useEmblaCarousel, {
  EmblaOptionsType,
  EmblaCarouselType,
} from "embla-carousel-react";
import { SliderType } from "@/middleware/Domaines";
import Image from "next/image";
import Autoplay from "embla-carousel-autoplay";
import { DotButton, useDotButton } from "@/components/EmblaCarouselDotButton";
import { useCallback } from "react";

const OPTIONS: EmblaOptionsType = {
  align: "start",
  slidesToScroll: 5,
  duration: 50,
  breakpoints: {
    "(max-width: 967px)": {
      slidesToScroll: 3,
    },
  },
};

export default function Slider({ data }: { data: SliderType }) {
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

  return (
    <section className="acf sliderType">
      <div className="container">
        <h2>{data.titre}</h2>
        <Image
          src="/wave-yellow.gif"
          alt="vague jaune"
          className="vague"
          width={106.6}
          height={20.56}
        />
        <div className="embla">
          <div ref={emblaRef} className="embla__viewport">
            <div className="embla__container">
              {data.visuels.map(({ image }, index) => (
                <div className="embla__slide" key={index}>
                  <Image
                    src={image.url}
                    alt={image.alt}
                    width={116}
                    height={133.94}
                    title={image.title}
                    className="embla__slide_img"
                  />
                </div>
              ))}
            </div>
          </div>

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
        </div>
      </div>
    </section>
  );
}
