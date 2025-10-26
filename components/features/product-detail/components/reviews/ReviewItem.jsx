import { Rating, IconButton } from '@mui/material';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import Image from 'next/image';
import styles from './ReviewItem.module.css';

export default function ReviewItem({ review }) {
  return (
    <div className={styles.reviewItem}>
      <div className={styles.reviewHeader}>
        <div className={styles.reviewerAvatar}>
          <Image 
            src={review.avatar} 
            alt={review.name}
            width={36}
            height={36}
            className={styles.avatarImage}
          />
        </div>
        <div className={styles.reviewerInfo}>
          <div className={styles.reviewerName}>{review.name}</div>
          <div className={styles.reviewDate}>{review.date}</div>
        </div>
        <IconButton size="small" aria-label="Review options" sx={{ padding: 0 }}>
          <MoreHorizIcon fontSize="small" sx={{ color: '#999' }} />
        </IconButton>
      </div>
      <Rating value={review.rating} readOnly size="small" sx={{ my: 0 }} className='text-[#FF8C31]' />
      <p className={styles.reviewText}>{review.comment}</p>
    </div>
  );
}
