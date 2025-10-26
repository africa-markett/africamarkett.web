import { useRouter } from 'next/router';
import styles from './PaymentStatusModal.module.css';

export default function PaymentStatusModal({ isOpen, status, onClose }) {
  const router = useRouter();

  if (!isOpen) return null;

  const isSuccess = status === 'success';

  const handleButtonClick = () => {
    if (isSuccess) {
      router.push('/'); // Go to home or order history
    } else {
      onClose(); // Close modal and try again
    }
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        {/* Drag Handle */}
        <div className={styles.dragHandle}></div>

        {/* Status Icon */}
        <div className={`${styles.iconWrapper} ${isSuccess ? styles.iconSuccess : styles.iconError}`}>
          {isSuccess ? (
            <svg
              width="48"
              height="48"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="20 6 9 17 4 12" />
            </svg>
          ) : (
            <svg
              width="48"
              height="48"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          )}
        </div>

        {/* Status Title */}
        <h2 className={styles.statusTitle}>
          {isSuccess ? 'Payment Successful' : 'Payment Failed'}
        </h2>

        {/* Status Message */}
        <p className={styles.statusMessage}>
          {isSuccess ? (
            <>
              Payment successful, Check your <span className={styles.link}>Order History</span> to
              view your order.
            </>
          ) : (
            <>Payment unsuccessful, Please retry or choose a different option.</>
          )}
        </p>

        {/* Action Button */}
        <button className={styles.actionButton} onClick={handleButtonClick}>
          {isSuccess ? 'Back to Home' : 'Try again'}
        </button>
      </div>
    </div>
  );
}
