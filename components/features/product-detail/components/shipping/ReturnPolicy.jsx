import Image from 'next/image';
import styles from './ReturnPolicy.module.css';

export default function ReturnPolicy() {
  return (
    <div className={styles.returnSection}>
      <h3 className={styles.returnTitle}>Return Policy</h3>
      <div className={styles.returnCard}>
        <div className={styles.iconWrapper}>
          <Image
            src="/assests/icons/return.png"
            alt="Return Policy"
            width={32}
            height={32}
            className={styles.icon}
          />
        </div>
        <div className={styles.returnInfo}>
          <h5 className={styles.returnSubtitle}>Our Return Guarantee</h5>
          <p className={styles.returnDescription}>
            Our policy ensures hassle-free returns within{' '}
            <strong>3 days</strong> after delivery.{' '}
            <span className={styles.returnLink}>View Return Policy</span>
          </p>
        </div>
      </div>
    </div>
  );
}
