import { Rating, Box, Typography } from '@mui/material';
import styles from './RatingOverview.module.css';

export default function RatingOverview({ averageRating, totalReviews }) {
  return (
      <Box className={styles.ratingOverviewContainer}>
          <div className={styles.ratingOverview}>
              
      <Typography variant="h2" className={styles.ratingScore}>
        {averageRating}
      </Typography>
      <Rating value={parseFloat(averageRating)} readOnly precision={0.5} size="small"  className='text-[#FF8C31]' />
          </div>
      <Typography className={styles.ratingText}>
        From {totalReviews} happy customers
      </Typography>
    </Box>
  );
}
