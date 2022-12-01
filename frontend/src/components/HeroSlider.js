import HeroSlider, { Slide, MenuNav } from "hero-slider";

const PageHeroSlider = ({slides}) => {
  return (
    <HeroSlider
      height={"100vh"}
      autoplay
      controller={{
        initialSlide: 1,
        slidingDuration: 500,
        slidingDelay: 100
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