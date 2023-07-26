import Slider from 'react-slick';
import { ParallaxBanner, ParallaxProvider } from 'react-scroll-parallax';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import ImgOne from '@/img/home/photoone.png';
import ImgTwo from '@/img/home/phototwo.png';
import ImgThree from '@/img/home/photothree.png';
import ImgFour from '@/img/home/photofour.png';
import ImgFive from '@/img/home/photofive.png';

const ParallaxCarousel = () => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 300,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    arrows: false,
    draggable: false,
    touchMove: false,
  };

  return (
    <ParallaxProvider>
      <Slider {...settings}>
        <div>
          <ParallaxBanner
            layers={[{ image: `${ImgOne}`, speed: -20 }]}
            style={{ height: '48rem', width: '100%' }}
          />
        </div>
        <div>
          <ParallaxBanner
            layers={[{ image: `${ImgTwo}`, speed: -20 }]}
            style={{ height: '48rem', width: '100%' }}
          />
        </div>
        <div>
          <ParallaxBanner
            layers={[{ image: `${ImgThree}`, speed: -20 }]}
            style={{ height: '768px', width: '100%' }}
          />
        </div>
        <div>
          <ParallaxBanner
            layers={[{ image: `${ImgFour}`, speed: -20 }]}
            style={{ height: '48rem', width: '100%' }}
          />
        </div>
        <div>
          <ParallaxBanner
            layers={[{ image: `${ImgFive}`, speed: -20 }]}
            style={{ height: '48rem', width: '100%' }}
          />
        </div>
      </Slider>
    </ParallaxProvider>
  );
};

export default ParallaxCarousel;
