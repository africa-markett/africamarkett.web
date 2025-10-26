import Image from 'next/image';
import styles from './ShippingDelivery.module.css';

export default function ShippingDelivery() {
    return (
      <div className={styles.shippingSection}>
            
          <h3 className={styles.deliveryTitle}>Shipping and Delivery Locations</h3>
      <div className={styles.shippingCard}>
      <div className={styles.iconWrapper}>
        <Image
          src="/assests/icons/location.png"
          alt="Shipping & Delivery"
          width={32}
          height={32}
          className={styles.icon}
          />
      </div>
      <div className={styles.shippingInfo}>
        <h4 className={styles.shippingTitle}>Global Shipping & Delivery</h4>
        <p className={styles.shippingDescription}>
          Reliable shipping services available to customers across the globe, with real-time tracking for every delivery.
        </p>
      </div>
    </div>
          </div>
  );
}
