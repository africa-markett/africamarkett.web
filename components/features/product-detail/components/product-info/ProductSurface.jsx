import { useState } from 'react';
import styles from './ProductSurface.module.css';

export default function ProductSurface({ 
  surfaces = ['Canvas', 'Wood Panel', 'Paper', 'Board', 'Glass'],
  selectedSurface,
  onSelectSurface
}) {
  const [localSelectedSurface, setLocalSelectedSurface] = useState(selectedSurface || surfaces[0]);

  const handleSelect = (surface) => {
    setLocalSelectedSurface(surface);
    onSelectSurface?.(surface);
  };

  return (
    <div className={styles.surfaceSection}>
      <h3 className={styles.sectionTitle}>Surface</h3>
      <div className={styles.surfaceGrid}>
        {surfaces.map((surface) => (
          <button
            key={surface}
            className={`${styles.surfaceButton} ${
              localSelectedSurface === surface ? styles.surfaceButtonActive : ''
            }`}
            onClick={() => handleSelect(surface)}
          >
            {surface}
          </button>
        ))}
      </div>
    </div>
  );
}
