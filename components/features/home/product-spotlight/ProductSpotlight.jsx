import React from 'react';
import Link from 'next/link';
import styles from './ProductSpotlight.module.css';

const ProductSpotlight = () => {
  return (
    <section className={styles.container}>
      <div className={styles.content}>
        <div className={styles.textSection}>
          <h2 className={styles.title}>Product Spotlight Of The Week</h2>
          <div className={styles.textContent}>
            <p className={styles.description}>
              From artisan hands to your home: this week's cultural treasure, crafted with heritage
              and priced for you.
            </p>
            <Link href="/products">
              <button className={styles.shopButton}>Shop now</button>
            </Link>
          </div>
        </div>

        <div className={styles.imageSection}>
          <div className={styles.imageContainer}>
            <img
              src="/assests/imgs/spotlight.png"
              alt="Product Spotlight - African Art Display"
              className={styles.spotlightImage}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductSpotlight;
