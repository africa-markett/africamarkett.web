import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, A11y, FreeMode } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import styles from './Carousel.module.css';

export default function Carousel({
  children,
  itemsPerView = { mobile: 1, tablet: 2, desktop: 3, large: 4 },
  autoPlay = true,
  autoPlayInterval = 4000,
  showNavigation = true,
  showDots = true,
  loop = true,
  gap = 8,
  freeMode = false,
  className = '',
}) {
  const swiperModules = [A11y];
  if (autoPlay) swiperModules.push(Autoplay);
  if (showNavigation) swiperModules.push(Navigation);
  if (showDots) swiperModules.push(Pagination);
  if (freeMode) swiperModules.push(FreeMode);

  return (
    <div className={`${styles.carouselContainer} ${className} custom-carousel`}>
      <Swiper
        modules={swiperModules}
        spaceBetween={gap}
        slidesPerView={itemsPerView.mobile}
        breakpoints={{
          640: {
            slidesPerView: itemsPerView.tablet,
          },
          768: {
            slidesPerView: itemsPerView.desktop,
          },
          1024: {
            slidesPerView: itemsPerView.large,
          },
        }}
        loop={loop}
        freeMode={freeMode}
        autoplay={
          autoPlay
            ? {
                delay: autoPlayInterval,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
              }
            : false
        }
        navigation={showNavigation}
        pagination={showDots ? { clickable: true } : false}
        grabCursor={true}
        className={styles.swiper}
      >
        {React.Children.map(children, (child) => (
          <SwiperSlide className={styles.swiperSlide}>{child}</SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
