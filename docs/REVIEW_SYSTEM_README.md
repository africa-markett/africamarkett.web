# Review System - Scalability Guide

## Overview
The review system is now **fully scalable** for individual products. Each product can have its own unique reviews, ratings, and comments.

## Architecture

### File Structure
```
components/features/product-detail/
├── mockReviews.js          # Review data & helper functions (organized by productId)
├── ProductTabs.jsx         # Main tabs component (now accepts productId)
├── RatingOverview.jsx      # Rating display component
├── RatingFilter.jsx        # Interactive rating filter
├── ReviewItem.jsx          # Individual review card
├── ReviewsList.jsx         # Reviews list container
└── ProductDetailContainer.jsx  # Passes productId to ProductTabs
```

## How It Works

### 1. Data Organization (mockReviews.js)
Reviews are stored in a **database object organized by productId**:

```javascript
export const reviewsDatabase = {
  '1': [reviews for product 1],
  '2': [reviews for product 2],
  '3': [reviews for product 3],
  // ... add more products
};
```

### 2. Getting Product Reviews
Use the `getProductReviews()` function to fetch reviews for any product:

```javascript
import { getProductReviews } from './mockReviews';

// Get reviews for product with ID "1"
const productReviews = getProductReviews('1');
```

### 3. ProductTabs Component
Now accepts `productId` as a prop:

```jsx
<ProductTabs
  productId={id}  // ← Product ID is passed here
  description={product.description}
  dimensions={product.dimensions}
  // ... other props
/>
```

### 4. Automatic Review Fetching
Inside ProductTabs, reviews are automatically fetched and filtered:

```javascript
const productReviews = getProductReviews(productId);
const averageRating = calculateAverageRating(productReviews);
```

## Helper Functions

### `getProductReviews(productId)`
Returns reviews for a specific product.
```javascript
const reviews = getProductReviews('1'); // Returns array of reviews or []
```

### `calculateAverageRating(reviews)`
Calculates average rating from reviews.
```javascript
const avgRating = calculateAverageRating(reviews); // Returns "4.5"
```

### `filterReviewsByRating(reviews, rating)`
Filters reviews by rating (1-5 or 'all').
```javascript
const fiveStarReviews = filterReviewsByRating(reviews, '5');
const allReviews = filterReviewsByRating(reviews, 'all');
```

### `paginateReviews(reviews, page, limit)`
For pagination/lazy loading support.
```javascript
const page1 = paginateReviews(reviews, 0, 5);  // First 5 reviews
const page2 = paginateReviews(reviews, 1, 5);  // Next 5 reviews
```

### `getRatingCounts(reviews)`
Gets breakdown of reviews by rating.
```javascript
const counts = getRatingCounts(reviews);
// Returns: { all: 10, 5: 6, 4: 2, 3: 1, 2: 1, 1: 0 }
```

## Adding Reviews for New Products

### Step 1: Add Product Review Data
Add a new entry in `mockReviews.js`:

```javascript
export const reviewsDatabase = {
  '1': [...existingReviews],
  '2': [...existingReviews],
  '3': [  // ← New product
    {
      id: 21,
      productId: '3',
      name: 'John Doe',
      avatar: '👤',
      date: '15 Sep, 2025 • 3:20 PM',
      rating: 5,
      comment: 'Amazing product! Love it.',
    },
    // ... more reviews
  ],
};
```

### Step 2: That's It!
The component will automatically fetch and display reviews for product ID "3".

## Migration to API

When you're ready to use real reviews from your backend, simply update the `getProductReviews()` function:

### Before (Mock Data)
```javascript
export const getProductReviews = (productId) => {
  return reviewsDatabase[productId] || [];
};
```

### After (API Call)
```javascript
export const getProductReviews = async (productId) => {
  try {
    const response = await fetch(`/api/products/${productId}/reviews`);
    return await response.json();
  } catch (error) {
    console.error('Failed to fetch reviews:', error);
    return [];
  }
};
```

Then update ProductTabs to use async/await:

```javascript
const [productReviews, setProductReviews] = useState([]);

useEffect(() => {
  const fetchReviews = async () => {
    const reviews = await getProductReviews(productId);
    setProductReviews(reviews);
  };
  fetchReviews();
}, [productId]);
```

## Features Included

✅ **Per-Product Reviews** - Each product ID has its own reviews  
✅ **Star Rating Display** - MUI Rating components with proper visualization  
✅ **Interactive Filters** - Filter by rating (All, 5⭐, 4⭐, etc.)  
✅ **Average Rating** - Dynamically calculated  
✅ **Pagination Ready** - Helper function for pagination support  
✅ **Mock Data** - Perfect for development and testing  
✅ **Easy API Integration** - Simple swap from mock to real data  
✅ **Scalable** - Add unlimited products and reviews  

## Example Usage

```javascript
// In ProductDetailContainer or any page showing product details
<ProductTabs
  productId={productId}  // Pass the product ID
  description={product.description}
  // ... other props
/>

// Inside ProductTabs (automatic)
const productReviews = getProductReviews(productId);
const averageRating = calculateAverageRating(productReviews);

// Display with components
<RatingOverview averageRating={averageRating} totalReviews={productReviews.length} />
<RatingFilter reviews={productReviews} selectedRating={selectedRating} onSelectRating={setSelectedRating} />
<ReviewsList reviews={productReviews} selectedRating={selectedRating} />
```

## Summary

The review system is now **production-ready** and **scalable**:
- ✅ Organized by product ID
- ✅ Easy to add new products
- ✅ Simple migration path to real API
- ✅ Handles pagination
- ✅ Beautiful MUI components
- ✅ Fully functional with mock data
