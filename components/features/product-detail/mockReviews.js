// Mock reviews organized by product ID
// In production, this would be fetched from your API based on productId
export const reviewsDatabase = {
  // Example: Product 1 reviews
  '8': [
    {
      id: 1,
      productId: '8',
      name: 'Gary Henderson',
      avatar: '/assests/imgs/user.png',
      date: '11 Sep, 2025 • 10:04 AM',
      rating: 5,
      comment: 'Absolutely stunning piece, even more beautiful in person. It brightens up my living room perfectly.',
    },
    {
      id: 2,
      productId: '8',
      name: 'Bella Dew',
      avatar: '/assests/imgs/user.png',
      date: '11 Sep, 2025 • 10:04 AM',
      rating: 5,
      comment: 'Absolutely stunning piece, even more beautiful in person. It brightens up my living room perfectly.',
    },
    {
      id: 3,
      productId: '1',
      name: 'James Wilson',
      avatar: '/assests/imgs/user.png',
      date: '10 Sep, 2025 • 3:45 PM',
      rating: 4,
      comment: 'Great quality artwork. The colors are vibrant and the packaging was excellent. Highly recommended!',
    },
    {
      id: 4,
      productId: '1',
      name: 'Sarah Ahmed',
      avatar: '/assests/imgs/user.png',
      date: '9 Sep, 2025 • 2:20 PM',
      rating: 5,
      comment: 'Perfect gift for my sister. She absolutely loves it. The customer service was also very helpful.',
    },
    {
      id: 5,
      productId: '1',
      name: 'Marcus Chen',
      avatar: '/assests/imgs/user.png',
      date: '8 Sep, 2025 • 11:30 AM',
      rating: 4,
      comment: 'Beautiful piece with good quality. Slightly smaller than expected but very happy with the purchase.',
    },
    {
      id: 6,
      productId: '1',
      name: 'Nneka Okonkwo',
      avatar: '/assests/imgs/user.png',
      date: '7 Sep, 2025 • 9:15 AM',
      rating: 5,
      comment: 'Exceptional quality and attention to detail. Worth every naira. Will definitely order again!',
    },
    {
      id: 7,
      productId: '1',
      name: 'David Kofi',
      avatar: '/assests/imgs/user.png',
      date: '6 Sep, 2025 • 4:50 PM',
      rating: 3,
      comment: 'Good artwork but took longer to arrive than expected. Quality is still good though.',
    },
    {
      id: 8,
      productId: '1',
      name: 'Amina Hassan',
      avatar: '/assests/imgs/user.png',
      date: '5 Sep, 2025 • 1:00 PM',
      rating: 5,
      comment: 'Absolutely gorgeous! The colors pop beautifully on my wall. Very satisfied with this purchase.',
    },
    {
      id: 9,
      productId: '1',
      name: 'Tunde Adeyemi',
      avatar: '/assests/imgs/user.png',
      date: '4 Sep, 2025 • 6:30 PM',
      rating: 4,
      comment: 'Nice piece. Quality is great. Shipping was fast. Would have appreciated better packaging though.',
    },
    {
      id: 10,
      productId: '1',
      name: 'Zainab Ibrahim',
      avatar: '/assests/imgs/user.png',
      date: '3 Sep, 2025 • 12:45 PM',
      rating: 2,
      comment: 'The artwork arrived with a small scratch. Customer service was helpful in resolving it.',
    },
  ],
  // Example: Product 2 reviews (different product)
  '2': [
    {
      id: 11,
      productId: '2',
      name: 'Chioma Nwankwo',
      avatar: '/assests/imgs/user.png',
      date: '12 Sep, 2025 • 2:30 PM',
      rating: 5,
      comment: 'Amazing quality! This is my second purchase from them. Never disappointed.',
    },
    {
      id: 12,
      productId: '2',
      name: 'Ahmed Hassan',
      avatar: '/assests/imgs/user.png',
      date: '11 Sep, 2025 • 5:15 PM',
      rating: 4,
      comment: 'Good value for money. Delivery was faster than expected.',
    },
  ],
};

/**
 * Get all reviews for a specific product
 * @param {string} productId - The product ID
 * @returns {Array} Array of reviews for the product
 */
export const getProductReviews = (productId) => {
  return reviewsDatabase[productId] || [];
};

/**
 * Calculate average rating from reviews
 * @param {Array} reviews - Array of review objects
 * @returns {string} Average rating rounded to 1 decimal
 */
export const calculateAverageRating = (reviews) => {
  if (reviews.length === 0) return 0;
  const sum = reviews.reduce((acc, review) => acc + review.rating, 0);
  return (sum / reviews.length).toFixed(1);
};

/**
 * Get count of reviews by rating
 * @param {Array} reviews - Array of review objects
 * @returns {Object} Object with count for each rating level
 */
export const getRatingCounts = (reviews) => {
  const counts = {
    all: reviews.length,
    5: 0,
    4: 0,
    3: 0,
    2: 0,
    1: 0,
  };

  reviews.forEach((review) => {
    counts[review.rating]++;
  });

  return counts;
};

/**
 * Filter reviews by rating
 * @param {Array} reviews - Array of review objects
 * @param {string} rating - Rating filter ('all' or '1'-'5')
 * @returns {Array} Filtered reviews
 */
export const filterReviewsByRating = (reviews, rating) => {
  if (rating === 'all') return reviews;
  return reviews.filter((review) => review.rating === parseInt(rating));
};

/**
 * Paginate reviews for lazy loading
 * @param {Array} reviews - Array of review objects
 * @param {number} page - Page number (starting from 0)
 * @param {number} limit - Number of reviews per page
 * @returns {Array} Paginated reviews
 */
export const paginateReviews = (reviews, page = 0, limit = 5) => {
  const start = page * limit;
  return reviews.slice(start, start + limit);
};

/**
 * Get total pages for reviews
 * @param {Array} reviews - Array of review objects
 * @param {number} limit - Number of reviews per page
 * @returns {number} Total number of pages
 */
export const getTotalPages = (reviews, limit = 5) => {
  return Math.ceil(reviews.length / limit);
};
