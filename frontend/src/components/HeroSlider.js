import HeroSlider, { Slide, MenuNav } from "hero-slider";

import LandingPageHeroSlider from '../static/LandingPageSlider.json';

const PageHeroSlider = () => {
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
      LandingPageHeroSlider.map(
        slide => <Slide key={slide.title}
                        shouldRenderMask
                        label={slide.tilte}
                        background={{
                        backgroundImageSrc: slide.url
                        }}
        />
      )
    }
    </HeroSlider>
  );
}

export default PageHeroSlider;