import ReviewItem from './ReviewItem';
import { filterReviewsByRating } from '../../mockReviews';
import styles from './ReviewsList.module.css';
import React from 'react';

export default function ReviewsList({ reviews, selectedRating }) {
  const filteredReviews = filterReviewsByRating(reviews, selectedRating);

  if (filteredReviews.length === 0) {
    return (
      <div className={styles.emptyState}>
        <p className={styles.emptyText}>No reviews found for this rating.</p>
      </div>
    );
  }

  return (
    <div className={styles.reviewsList}>
      {filteredReviews.map((review) => (
        <React.Fragment key={review.id}>
          <hr className='border-t-[1px] mx-[-16px] border-[#737373] ' />
          <ReviewItem review={review} />
        </React.Fragment>
      ))}
    </div>
  );
}
