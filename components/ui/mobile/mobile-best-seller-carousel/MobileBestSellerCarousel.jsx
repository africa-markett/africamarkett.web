import React, { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Pagination } from 'swiper/modules';
import Image from 'next/image';
import Link from 'next/link';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';
import styles from './MobileBestSellerCarousel.module.css';

export default function MobileBestSellerCarousel({ products, title = "Best Seller", showViewAll = true }) {
  const swiperRef = useRef(null);

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(price);
  };

  return (
    <section className={styles.mobileCarouselSection}>
      {/* Header */}
      <div className={styles.header}>
        <h2 className={styles.sectionTitle}>{title}</h2>
        {showViewAll && (
          <Link href="/products" className={styles.viewAllLink}>
            See all
          </Link>
        )}
      </div>

      {/* Carousel */}
      <div className={styles.carouselWrapper}>
        <Swiper
          ref={swiperRef}
          modules={[FreeMode, Pagination]}
          spaceBetween={12}
          slidesPerView={2.4}
          loop={true}
          breakpoints={{
            375: {
              slidesPerView: 2.4,
              spaceBetween: 14,
            },
            425: {
              slidesPerView: 2.6,
              spaceBetween: 16,
            },
            640: {
              slidesPerView: 2.8,
              spaceBetween: 16,
            },
          }}
          freeMode={{
            enabled: true,
            momentum: true,
            momentumRatio: 0.5,
            momentumVelocityRatio: 0.5,
          }}
          grabCursor={true}
          className={styles.swiper}
        >
          {products.map((product) => (
            <SwiperSlide key={product.id} className={styles.swiperSlide}>
              <div className={styles.productCard}>
                {/* Product Image */}
                <div className={styles.imageContainer}>
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className={styles.productImage}
                    sizes="(max-width: 640px) 50vw, 33vw"
                    priority={product.id <= 3}
                    />
                   
                  {/* Wishlist Heart Icon */}
                  <button className={styles.wishlistBtn} aria-label="Add to wishlist">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                    </svg>
                  </button>
                </div>

                {/* Product Info */}
                <div className={styles.productInfo}>
                  <div className={styles.categoryBadge}>
                    <span className={styles.categoryText}>{product.category}</span>
                  </div>
                  <Link href={`/products/${product.id}`} className={styles.productLink}>
                    <h3 className={styles.productName}>{product.name}</h3>
                  </Link>
                  <div className={styles.priceWrapper}>
                    <span className={styles.price}>{formatPrice(product.price)}</span>
                    {/* Add to Cart Button */}
                    <button className={styles.addToCartBtn} aria-label="Add to cart">
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <circle cx="9" cy="21" r="1" />
                        <circle cx="20" cy="21" r="1" />
                        <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
