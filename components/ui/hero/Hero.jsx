import HotspotImage from '@/components/hotspotImage/HotspotImage';
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, EffectFade, Pagination, Autoplay } from 'swiper/modules';
import styles from './Hero.module.css';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import Link from 'next/link';

export default function Hero() {
  const handleMarketplaceClick = () => {
    // You can change this to your actual marketplace route
    window.location.href = '/marketplace';
  };

  const firstImage = '/assests/imgs/hero-1.png';
  const secondImage = '/assests/imgs/hero-2.jpg';
  const thirdImage = '/assests/imgs/hero-3.png';

  const hotspots1 = [
    {
      id: 'panel-left',
      top: '28%',
      left: '47.2%',
      href: '/catalog/ndebele-panel-left',
      content: (
        <div>
          <Link href="/catalog/ndebele-panel-left">
            <div className="flex items-center justify-between gap-5">
              <p>Combo Gown</p>

              <img src="/assests/icons/arrow-right-up.png" alt="Ndebele Panel" />
            </div>
          </Link>
          <div className="mt-2 font-bold text-[#737373]">₦120,000</div>
        </div>
      ),
    },
    {
      id: 'wax-right',
      top: '39.5%',
      left: '76.5%',
      href: '/catalog/wax-print-set-right',
      content: (
        <div>
          <Link href="/catalog/ndebele-panel-left">
            <div className="flex items-center justify-between gap-5">
              <p>Combo Gown</p>

              <img src="/assests/icons/arrow-right-up.png" alt="Ndebele Panel" />
            </div>
          </Link>
          <div className="mt-2 font-bold text-[#737373]">₦120,000</div>
        </div>
      ),
    },
    {
      id: 'cloak-far-right',
      top: '39.5%',
      left: '93.2%',
      href: '/catalog/cloak-far-right',
      content: (
        <div>
          <Link href="/catalog/ndebele-panel-left">
            <div className="flex items-center justify-between gap-5">
              <p>Combo Gown</p>

              <img src="/assests/icons/arrow-right-up.png" alt="Ndebele Panel" />
            </div>
          </Link>
          <div className="mt-2 font-bold text-[#737373]">₦120,000</div>
        </div>
      ),
    },
  ];
  const hotspots2 = [
    {
      id: 1,
      top: '39%',
      left: '17.2%',
      href: '/catalog/ndebele-panel-left',
      content: (
        <div>
          <Link href="/catalog/ndebele-panel-left">
            <div className="flex items-center justify-between gap-5">
              <p>Combo Gown</p>

              <img src="/assests/icons/arrow-right-up.png" alt="Ndebele Panel" />
            </div>
          </Link>
          <div className="mt-2 font-bold text-[#737373]">₦120,000</div>
        </div>
      ),
    },
    {
      id: 2,
      top: '39%',
      left: '31.5%',
      href: '/catalog/wax-print-set-right',
      content: (
        <div>
          <Link href="/catalog/ndebele-panel-left">
            <div className="flex items-center justify-between gap-5">
              <p>Combo Gown</p>

              <img src="/assests/icons/arrow-right-up.png" alt="Ndebele Panel" />
            </div>
          </Link>
          <div className="mt-2 font-bold text-[#737373]">₦120,000</div>
        </div>
      ),
    },
    {
      id: 3,
      top: '39%',
      left: '42.8%',
      href: '/catalog/cloak-far-right',
      content: (
        <div>
          <Link href="/catalog/ndebele-panel-left">
            <div className="flex items-center justify-between gap-5">
              <p>Combo Gown</p>

              <img src="/assests/icons/arrow-right-up.png" alt="Ndebele Panel" />
            </div>
          </Link>
          <div className="mt-2 font-bold text-[#737373]">₦120,000</div>
        </div>
      ),
    },
    {
      id: 4,
      top: '39%',
      left: '53.2%',
      href: '/catalog/cloak-far-right',
      content: (
        <div>
          <Link href="/catalog/ndebele-panel-left">
            <div className="flex items-center justify-between gap-5">
              <p>Combo Gown</p>

              <img src="/assests/icons/arrow-right-up.png" alt="Ndebele Panel" />
            </div>
          </Link>
          <div className="mt-2 font-bold text-[#737373]">₦120,000</div>
        </div>
      ),
    },
    {
      id: 5,
      top: '39%',
      left: '63.9%',
      href: '/catalog/cloak-far-right',
      content: (
        <div>
          <Link href="/catalog/ndebele-panel-left">
            <div className="flex items-center justify-between gap-5">
              <p>Combo Gown</p>

              <img src="/assests/icons/arrow-right-up.png" alt="Ndebele Panel" />
            </div>
          </Link>
          <div className="mt-2 font-bold text-[#737373]">₦120,000</div>
        </div>
      ),
    },
    {
      id: 6,
      top: '39%',
      left: '74.6%',
      href: '/catalog/cloak-far-right',
      content: (
        <div>
          <Link href="/catalog/ndebele-panel-left">
            <div className="flex items-center justify-between gap-5">
              <p>Combo Gown</p>

              <img src="/assests/icons/arrow-right-up.png" alt="Ndebele Panel" />
            </div>
          </Link>
          <div className="mt-2 font-bold text-[#737373]">₦120,000</div>
        </div>
      ),
    },
    {
      id: 7,
      top: '64.2%',
      left: '61.2%',
      href: '/catalog/cloak-far-right',
      content: (
        <div>
          <Link href="/catalog/ndebele-panel-left">
            <div className="flex items-center justify-between gap-5">
              <p>Combo Gown</p>

              <img src="/assests/icons/arrow-right-up.png" alt="Ndebele Panel" />
            </div>
          </Link>
          <div className="mt-2 font-bold text-[#737373]">₦120,000</div>
        </div>
      ),
    },
    {
      id: 8,
      top: '74%',
      left: '38.2%',
      href: '/catalog/cloak-far-right',
      content: (
        <div>
          <Link href="/catalog/ndebele-panel-left">
            <div className="flex items-center justify-between gap-5">
              <p>Combo Gown</p>

              <img src="/assests/icons/arrow-right-up.png" alt="Ndebele Panel" />
            </div>
          </Link>
          <div className="mt-2 font-bold text-[#737373]">₦120,000</div>
        </div>
      ),
    },
    {
      id: 9,
      top: '85.9%',
      left: '46.8%',
      href: '/catalog/cloak-far-right',
      content: (
        <div>
          <Link href="/catalog/ndebele-panel-left">
            <div className="flex items-center justify-between gap-5">
              <p>Combo Gown</p>

              <img src="/assests/icons/arrow-right-up.png" alt="Ndebele Panel" />
            </div>
          </Link>
          <div className="mt-2 font-bold text-[#737373]">₦120,000</div>
        </div>
      ),
    },
    {
      id: 10,
      top: '88.5%',
      left: '73.2%',
      href: '/catalog/cloak-far-right',
      content: (
        <div>
          <Link href="/catalog/ndebele-panel-left">
            <div className="flex items-center justify-between gap-5">
              <p>Combo Gown</p>

              <img src="/assests/icons/arrow-right-up.png" alt="Ndebele Panel" />
            </div>
          </Link>
          <div className="mt-2 font-bold text-[#737373]">₦120,000</div>
        </div>
      ),
    },
  ];
  const hotspots3 = [
    {
      id: 1,
      top: '38.5%',
      left: '10.9%',
      href: '/catalog/ndebele-panel-left',
      content: (
        <div>
          <Link href="/catalog/ndebele-panel-left">
            <div className="flex items-center justify-between gap-5">
              <p>Combo Gown</p>

              <img src="/assests/icons/arrow-right-up.png" alt="Ndebele Panel" />
            </div>
          </Link>
          <div className="mt-2 font-bold text-[#737373]">₦120,000</div>
        </div>
      ),
    },
    {
      id: 2,
      top: '31.5%',
      left: '23.3%',
      href: '/catalog/wax-print-set-right',
      content: (
        <div>
          <Link href="/catalog/ndebele-panel-left">
            <div className="flex items-center justify-between gap-5">
              <p>Combo Gown</p>

              <img src="/assests/icons/arrow-right-up.png" alt="Ndebele Panel" />
            </div>
          </Link>
          <div className="mt-2 font-bold text-[#737373]">₦120,000</div>
        </div>
      ),
    },
    {
      id: 3,
      top: '21.2%',
      left: '35.6%',
      href: '/catalog/cloak-far-right',
      content: (
        <div>
          <Link href="/catalog/ndebele-panel-left">
            <div className="flex items-center justify-between gap-5">
              <p>Combo Gown</p>

              <img src="/assests/icons/arrow-right-up.png" alt="Ndebele Panel" />
            </div>
          </Link>
          <div className="mt-2 font-bold text-[#737373]">₦120,000</div>
        </div>
      ),
    },
    {
      id: 4,
      top: '32.5%',
      left: '50.5%',
      href: '/catalog/cloak-far-right',
      content: (
        <div>
          <Link href="/catalog/ndebele-panel-left">
            <div className="flex items-center justify-between gap-5">
              <p>Combo Gown</p>

              <img src="/assests/icons/arrow-right-up.png" alt="Ndebele Panel" />
            </div>
          </Link>
          <div className="mt-2 font-bold text-[#737373]">₦120,000</div>
        </div>
      ),
    },
    {
      id: 5,
      top: '32.5%',
      left: '65.2%',
      href: '/catalog/cloak-far-right',
      content: (
        <div>
          <Link href="/catalog/ndebele-panel-left">
            <div className="flex items-center justify-between gap-5">
              <p>Combo Gown</p>

              <img src="/assests/icons/arrow-right-up.png" alt="Ndebele Panel" />
            </div>
          </Link>
          <div className="mt-2 font-bold text-[#737373]">₦120,000</div>
        </div>
      ),
    },
    {
      id: 6,
      top: '34.5%',
      left: '86.6%',
      href: '/catalog/cloak-far-right',
      content: (
        <div>
          <Link href="/catalog/ndebele-panel-left">
            <div className="flex items-center justify-between gap-5">
              <p>Combo Gown</p>

              <img src="/assests/icons/arrow-right-up.png" alt="Ndebele Panel" />
            </div>
          </Link>
          <div className="mt-2 font-bold text-[#737373]">₦120,000</div>
        </div>
      ),
    },
  ];

  const heroSlides = [
    {
      image: firstImage,
      hotspots: hotspots1,
      title: "Your one-stop shop for Africa's creativity.",

      buttonText: 'Explore Marketplace',
    },
    {
      image: secondImage,
      hotspots: hotspots2,
      title: 'Your Market for All Things Africa.',
      buttonText: 'Explore Marketplace',
    },
    {
      image: thirdImage,
      hotspots: hotspots3,
      title: 'Crafted in Africa. Priced for You.',
      buttonText: 'Explore Marketplace',
    },
  ];

  return (
    <div className={styles.heroCarouselContainer}>
      <Swiper
        direction="vertical"
        slidesPerView={1}
        spaceBetween={0}
        effect={'fade'}
        allowTouchMove={false}
        touchStartPreventDefault={false}
        simulateTouch={false}
        touchRatio={0}
        passiveListeners={true}
        pagination={{
          clickable: true,
        }}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        loop={true}
        modules={[Navigation, EffectFade, Autoplay, Pagination]}
        className="hero-swiper"
        style={{ height: '100%', touchAction: 'pan-y' }}
      >
        {heroSlides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className={styles.heroSlideContainer}>
              <HotspotImage hotspots={slide.hotspots} src={slide.image} />
              <div className={styles.heroOverlay}>
                <div className={styles.heroContent}>
                  <h1 className={styles.heroTitle}>{slide.title}</h1>
                  <button className={styles.heroButton} onClick={handleMarketplaceClick}>
                    {slide.buttonText}
                  </button>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
