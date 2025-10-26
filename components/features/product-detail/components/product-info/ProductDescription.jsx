import styles from './ProductDescription.module.css';

export default function ProductDescription({ description }) {
  if (!description) return null;

  return (
    <div className={styles.descriptionSection}>
      <h3 className={styles.sectionTitle}>Description</h3>
      <p className={styles.descriptionText}>{description}</p>
    </div>
  );
}
