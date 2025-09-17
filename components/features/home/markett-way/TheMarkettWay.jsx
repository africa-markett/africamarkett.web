import React from 'react';
import styles from './TheMarkettWay.module.css';

const TheMarkettWay = () => {
  return (
    <section className={styles.container}>
      <div className={styles.content}>
        <h2 className={styles.mainTitle}>The Markett Way</h2>

        <div className={styles.cardsContainer}>
          {/* Authenticity Card */}
          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <span className={styles.cardNumber}>01.</span>
              <h3 className={styles.cardTitle}>Authenticity</h3>
            </div>
            <div className={styles.imageContainer}>
              <img
                src="/assests/imgs/way1.png"
                alt="African woman with traditional headwrap and jewelry"
                className={styles.cardImage}
              />
            </div>
            <p className={styles.cardDescription}>
              We celebrate true African craftsmanship, every product tells a story of heritage,
              culture, and creativity.
            </p>
          </div>

          {/* Affordability Card */}
          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <span className={styles.cardNumber}>02.</span>
              <h3 className={styles.cardTitle}>Affordability</h3>
            </div>
            <div className={styles.imageContainer}>
              <img
                src="/assests/imgs/way2.png"
                alt="Man in traditional African clothing"
                className={styles.cardImage}
              />
            </div>
            <p className={styles.cardDescription}>
              Quality should never be out of reach, we make art and crafts accessible at the best
              market prices.
            </p>
          </div>

          {/* Community Card */}
          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <span className={styles.cardNumber}>03.</span>
              <h3 className={styles.cardTitle}>Community</h3>
            </div>
            <div className={styles.imageContainer}>
              <img
                src="/assests/imgs/way3.png"
                alt="Women in colorful African dresses celebrating"
                className={styles.cardImage}
              />
            </div>
            <p className={styles.cardDescription}>
              Africa Markett is more than a marketplace; it's a hub that connects artisans with
              buyers and keeps culture alive.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TheMarkettWay;
