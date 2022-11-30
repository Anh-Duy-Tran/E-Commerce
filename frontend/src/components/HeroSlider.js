import HeroSlider, { Slide, MenuNav } from "hero-slider";

const bogliasco = "https://i.postimg.cc/WsH6Qmmb/IMAGE-2.jpg";
const countyClare = "https://i.postimg.cc/L2vVVFnP/IMAGE-1.jpg";
const craterRock = "https://i.postimg.cc/Gb2x7gy5/IMAGE-3.jpg";
const giauPass = "https://i.postimg.cc/KZ3rFKQ7/IMAGE-4.jpg";

const PageHeroSlider = ({slides}) => {
  return (
    <HeroSlider
      height={"100vh"}
      autoplay
      controller={{
        initialSlide: 1,
        slidingDuration: 500,
        slidingDelay: 100,
        onSliding: (nextSlide) =>
          console.debug("onSliding(nextSlide): ", nextSlide),
        onBeforeSliding: (previousSlide, nextSlide) =>
          console.debug(
            "onBeforeSliding(previousSlide, nextSlide): ",
            previousSlide,
            nextSlide
          ),
        onAfterSliding: (nextSlide) =>
          console.debug("onAfterSliding(nextSlide): ", nextSlide)
      }}
    >
    {
      slides.map(
        slide => <Slide key={slide.title}
                        shouldRenderMask
                        label={slide.tilte}
                        background={{
                        backgroundImageSrc: slide.url
                        }}
        />
      )
    }

      {/* <MenuNav /> */}
    </HeroSlider>
  );
}

export default PageHeroSlider;