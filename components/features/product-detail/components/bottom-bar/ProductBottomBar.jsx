import { useRouter } from 'next/router';
import styles from './ProductBottomBar.module.css';

export default function ProductBottomBar({ price, onBuyNow, showBar = true }) {
  const router = useRouter();

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(price);
  };

  if (!showBar) return null;

  return (
    <div className={styles.bottomBar}>
      <div className={styles.container}>
        <button
          className={styles.cartButton}
          onClick={() => router.push('/cart')}
          aria-label="View cart"
        >
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
            <circle cx="9" cy="21" r="1" />
            <circle cx="20" cy="21" r="1" />
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
          </svg>
        </button>

        <button className={styles.buyButton} onClick={onBuyNow}>
          Buy Now
        </button>
      </div>
    </div>
  );
}
