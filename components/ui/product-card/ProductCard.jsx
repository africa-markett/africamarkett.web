import Link from 'next/link';
import Image from 'next/image';
import styles from './ProductCard.module.css';

export default function ProductCard({ product, formatPrice }) {
  const defaultFormatPrice = (price) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const priceFormatter = formatPrice || defaultFormatPrice;

  return (
    <Link href={`/products/${product.id}`} className={styles.productCard}>
      <div className={styles.imageContainer}>
        <Image
          src={product.image}
          alt={product.name}
          fill
          className={styles.productImage}
          sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
        />
        <button className={styles.shopNowBtn}>Shop now</button>
      </div>

      <div className={styles.productInfo}>
        <div className={styles.categoryWrapper}>
          <span className={styles.category}>{product.category}</span>
        </div>
        <div className={styles.priceWrapper}>
          <span className={styles.productName}>{product.name}</span>
          <p className={styles.price}>{priceFormatter(product.price)}</p>
        </div>
      </div>
    </Link>
  );
}
