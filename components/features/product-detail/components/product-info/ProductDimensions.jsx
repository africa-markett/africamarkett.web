import { useState } from 'react';
import styles from './ProductDimensions.module.css';

export default function ProductDimensions({ dimensions, selectedDimension, onSelectDimension }) {
  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(price);
  };

  return (
    <div className={styles.dimensionsSection}>
      <h3 className={styles.sectionTitle}>Available size dimensions</h3>
      <div className={styles.dimensionsScroll}>
        {dimensions.map((dimension) => (
          <button
            key={dimension.id}
            className={`${styles.dimensionCard} ${
              selectedDimension?.id === dimension.id ? styles.dimensionCardActive : ''
            }`}
            onClick={() => onSelectDimension(dimension)}
          >
                <div className={styles.dimensionSize}>{dimension.size}</div>
                <hr className={styles.line} />
            <div className={styles.dimensionPrice}>{formatPrice(dimension.price)}</div>
            <div className={styles.dimensionStock}>
              {dimension.inStock ? `Only ${dimension.stock} left in stock` : 'Out of stock'}
            </div>
            <div className={styles.orderNow}>order now</div>
          </button>
        ))}
      </div>
     
    </div>
  );
}
