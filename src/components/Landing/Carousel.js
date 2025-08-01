import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-fade';
import Image from 'next/image';

const images = [
  // '/assets/img/Carousel/1.jpeg',
  '/assets/img/Carousel/2.jpeg',
  '/assets/img/Carousel/3.jpeg',
  '/assets/img/Carousel/4.jpg',
];

export default function Carousel() {
  return (
    <Swiper
      modules={[Autoplay, EffectFade]}
      effect="fade"
      loop
      autoplay={{ delay: 2500, disableOnInteraction: false }}
      className="w-full h-full absolute top-0 left-0 z-0"
      style={{ pointerEvents: 'none' }}
    >
      {images.map((src, idx) => (
        <SwiperSlide key={idx}>
          <div className="w-full h-full relative">
            <Image
              src={src}
              alt={`carousel-img-${idx}`}
              fill
              className="object-cover"
              priority={idx === 0}
            />
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
} 
