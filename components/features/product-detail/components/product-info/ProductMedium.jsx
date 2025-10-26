import { useState } from 'react';
import styles from './ProductMedium.module.css';

export default function ProductMedium({ mediums, selectedMedium, onSelectMedium }) {
  return (
    <div className={styles.mediumSection}>
      <h3 className={styles.sectionTitle}>Medium</h3>
      <div className={styles.mediumGrid}>
        {mediums.map((medium) => (
          <button
            key={medium.id}
            className={`${styles.mediumButton} ${
              selectedMedium?.id === medium.id ? styles.mediumButtonActive : ''
            }`}
            onClick={() => onSelectMedium(medium)}
          >
            {medium.name}
          </button>
        ))}
      </div>
    </div>
  );
}
