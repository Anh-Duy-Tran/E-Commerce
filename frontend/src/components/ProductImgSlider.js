import HeroSlider, { Slide, SideNav } from "hero-slider";

const ProductImgSlider = ({slides}) => {
  console.log(slides);
  return (
    <HeroSlider
      height={"80vh"}
      autoplay
      settings={{
        sliderColor: 'black'
      }}
      accessability={{
          orientation: 'vertical',
          shouldSlideOnArrowKeypress : true,
          shouldDisplayButtons: false
      }}
      controller={{
        initialSlide: 1,
        slidingDuration: 500,
        slidingDelay: 50
      }}
    >
    {
      slides.map(
        slide => <Slide key={slide}
                        label={slide}
                        background={{
                        backgroundImageSrc: slide
                        }}
        />
      )
    }

      <SideNav
      color="black"
      activeColor="black"
        isPositionedRight={false}
        position={{
          top: '20%',
          left: '0px',
          transform: 'translateY(-50%)'
      }}
      />
    </HeroSlider>
  );
}

export default ProductImgSlider;