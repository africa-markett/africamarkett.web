/**
 * API Integration Layer for Reviews
 * Replace mock data with real database queries
 * 
 * Usage:
 * - Replace getProductReviews() with API call
 * - Use this as a reference for your backend API structure
 */

// ============================================================================
// PHASE 1: Development (Current - Using Mock Data)
// ============================================================================

export const mockReviewsDatabase = {
  '1': [],  // Add mock reviews as needed
  '8': [],  // Add mock reviews as needed
};

// ============================================================================
// PHASE 2: Production API Integration
// ============================================================================

/**
 * Get reviews for a specific product from your database
 * 
 * @param {string|number} productId - The product ID
 * @returns {Promise<Array>} Array of review objects
 * 
 * Backend API Endpoint: GET /api/products/{productId}/reviews
 * Expected Response:
 * {
 *   success: true,
 *   data: [
 *     {
 *       id: 1,
 *       productId: 1,
 *       name: "Customer Name",
 *       avatar: "👤",
 *       date: "11 Sep, 2025 • 10:04 AM",
 *       rating: 5,
 *       comment: "Review text here"
 *     },
 *     ...
 *   ]
 * }
 */
export const getProductReviews = async (productId) => {
  try {
    // TODO: Replace with your actual API endpoint
    const response = await fetch(`/api/reviews/product/${productId}`);
    
    if (!response.ok) {
      console.warn(`No reviews found for product ${productId}`);
      return [];
    }

    const result = await response.json();
    return result.data || [];
  } catch (error) {
    console.error('Failed to fetch reviews:', error);
    // Fallback to empty array
    return [];
  }
};

/**
 * Get product rating summary (average rating + counts)
 * This is optional but recommended for performance
 * 
 * Backend API Endpoint: GET /api/products/{productId}/rating-summary
 * Expected Response:
 * {
 *   success: true,
 *   data: {
 *     productId: 1,
 *     averageRating: 4.5,
 *     totalReviews: 10,
 *     ratingCounts: {
 *       5: 6,
 *       4: 2,
 *       3: 1,
 *       2: 1,
 *       1: 0
 *     }
 *   }
 * }
 */
export const getProductRatingSummary = async (productId) => {
  try {
    const response = await fetch(`/api/reviews/product/${productId}/summary`);
    
    if (!response.ok) {
      return {
        averageRating: 0,
        totalReviews: 0,
        ratingCounts: { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 },
      };
    }

    return await response.json();
  } catch (error) {
    console.error('Failed to fetch rating summary:', error);
    return {
      averageRating: 0,
      totalReviews: 0,
      ratingCounts: { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 },
    };
  }
};

/**
 * Get paginated reviews for a product
 * Recommended for performance when you have many reviews
 * 
 * @param {string|number} productId - The product ID
 * @param {number} page - Page number (starting from 0)
 * @param {number} limit - Reviews per page
 * @param {string} rating - Filter by rating ('all' or '1'-'5')
 * 
 * Backend API Endpoint: GET /api/reviews/product/{productId}?page={page}&limit={limit}&rating={rating}
 * Expected Response:
 * {
 *   success: true,
 *   data: {
 *     reviews: [...],
 *     totalCount: 50,
 *     page: 0,
 *     limit: 10,
 *     totalPages: 5
 *   }
 * }
 */
export const getProductReviewsPaginated = async (
  productId,
  page = 0,
  limit = 10,
  rating = 'all'
) => {
  try {
    const params = new URLSearchParams({
      page,
      limit,
      ...(rating !== 'all' && { rating }),
    });

    const response = await fetch(
      `/api/reviews/product/${productId}?${params.toString()}`
    );

    if (!response.ok) {
      return {
        reviews: [],
        totalCount: 0,
        page: 0,
        limit: 10,
        totalPages: 0,
      };
    }

    return await response.json();
  } catch (error) {
    console.error('Failed to fetch paginated reviews:', error);
    return {
      reviews: [],
      totalCount: 0,
      page: 0,
      limit: 10,
      totalPages: 0,
    };
  }
};

/**
 * Submit a new review for a product
 * 
 * Backend API Endpoint: POST /api/reviews
 * Expected Request Body:
 * {
 *   productId: 1,
 *   userId: "user-id" or null for anonymous,
 *   name: "Customer Name",
 *   email: "email@example.com",
 *   rating: 5,
 *   comment: "Review text"
 * }
 * 
 * Expected Response:
 * {
 *   success: true,
 *   message: "Review submitted successfully",
 *   data: {
 *     id: 123,
 *     productId: 1,
 *     ...reviewData
 *   }
 * }
 */
export const submitReview = async (reviewData) => {
  try {
    const response = await fetch('/api/reviews', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(reviewData),
    });

    if (!response.ok) {
      throw new Error('Failed to submit review');
    }

    return await response.json();
  } catch (error) {
    console.error('Error submitting review:', error);
    throw error;
  }
};

// ============================================================================
// Helper Functions (Unchanged)
// ============================================================================

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
