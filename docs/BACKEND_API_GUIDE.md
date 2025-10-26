# Backend API Endpoints for Reviews

This guide shows you how to structure your backend API to work with the review system.

## Database Structure

### Reviews Table
```sql
CREATE TABLE reviews (
  id INT PRIMARY KEY AUTO_INCREMENT,
  productId INT NOT NULL,
  userId INT,  -- Optional: for authenticated users
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255),
  rating INT NOT NULL CHECK (rating BETWEEN 1 AND 5),
  comment TEXT NOT NULL,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (productId) REFERENCES products(id) ON DELETE CASCADE,
  INDEX idx_productId (productId),
  INDEX idx_rating (rating),
  INDEX idx_createdAt (createdAt DESC)
);
```

### Product Ratings Table (Optional but Recommended)
```sql
CREATE TABLE product_ratings (
  productId INT PRIMARY KEY,
  averageRating DECIMAL(3,2) DEFAULT 0,
  totalReviews INT DEFAULT 0,
  rating_5_count INT DEFAULT 0,
  rating_4_count INT DEFAULT 0,
  rating_3_count INT DEFAULT 0,
  rating_2_count INT DEFAULT 0,
  rating_1_count INT DEFAULT 0,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (productId) REFERENCES products(id) ON DELETE CASCADE
);
```

---

## API Endpoints

### 1. Get All Reviews for a Product

**Endpoint:** `GET /api/reviews/product/{productId}`

**Query Parameters:**
- `page` (optional): Page number (default: 0)
- `limit` (optional): Reviews per page (default: 10)
- `rating` (optional): Filter by rating 1-5 or 'all'
- `sortBy` (optional): 'recent', 'oldest', 'highest', 'lowest' (default: 'recent')

**Example Request:**
```bash
GET /api/reviews/product/1
GET /api/reviews/product/1?page=0&limit=10&rating=5&sortBy=recent
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "productId": 1,
      "name": "Gary Henderson",
      "email": "gary@example.com",
      "rating": 5,
      "comment": "Absolutely stunning piece, even more beautiful in person.",
      "createdAt": "2025-09-11T10:04:00Z"
    },
    {
      "id": 2,
      "productId": 1,
      "name": "Bella Dew",
      "email": "bella@example.com",
      "rating": 5,
      "comment": "Absolutely stunning piece, even more beautiful in person.",
      "createdAt": "2025-09-11T10:04:00Z"
    }
  ],
  "pagination": {
    "page": 0,
    "limit": 10,
    "totalCount": 50,
    "totalPages": 5
  }
}
```

**Response (No Reviews - 200 OK):**
```json
{
  "success": true,
  "data": [],
  "pagination": {
    "page": 0,
    "limit": 10,
    "totalCount": 0,
    "totalPages": 0
  }
}
```

---

### 2. Get Rating Summary for a Product

**Endpoint:** `GET /api/reviews/product/{productId}/summary`

**Example Request:**
```bash
GET /api/reviews/product/1/summary
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "productId": 1,
    "averageRating": 4.5,
    "totalReviews": 10,
    "ratingCounts": {
      "5": 6,
      "4": 2,
      "3": 1,
      "2": 1,
      "1": 0
    }
  }
}
```

---

### 3. Submit a New Review

**Endpoint:** `POST /api/reviews`

**Headers:**
```
Content-Type: application/json
Authorization: Bearer {token} (optional, for authenticated users)
```

**Request Body:**
```json
{
  "productId": 1,
  "userId": null,
  "name": "John Doe",
  "email": "john@example.com",
  "rating": 5,
  "comment": "Amazing product! Love it.",
  "images": ["image-url-1", "image-url-2"]  // Optional
}
```

**Response (201 Created):**
```json
{
  "success": true,
  "message": "Review submitted successfully",
  "data": {
    "id": 51,
    "productId": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "rating": 5,
    "comment": "Amazing product! Love it.",
    "createdAt": "2025-09-15T14:30:00Z"
  }
}
```

**Response (Validation Error - 400 Bad Request):**
```json
{
  "success": false,
  "message": "Validation error",
  "errors": {
    "rating": "Rating must be between 1 and 5",
    "comment": "Comment is required and must be at least 10 characters"
  }
}
```

---

### 4. Update a Review

**Endpoint:** `PUT /api/reviews/{reviewId}`

**Headers:**
```
Content-Type: application/json
Authorization: Bearer {token}  (required)
```

**Request Body:**
```json
{
  "rating": 4,
  "comment": "Updated review text"
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Review updated successfully",
  "data": {
    "id": 1,
    "productId": 1,
    "rating": 4,
    "comment": "Updated review text",
    "updatedAt": "2025-09-15T15:00:00Z"
  }
}
```

---

### 5. Delete a Review

**Endpoint:** `DELETE /api/reviews/{reviewId}`

**Headers:**
```
Authorization: Bearer {token}  (required)
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Review deleted successfully"
}
```

---

## Frontend Integration Steps

### Step 1: Update `reviewAPI.js`

Replace the mock data functions with actual API calls (already provided):

```javascript
export const getProductReviews = async (productId) => {
  try {
    const response = await fetch(`/api/reviews/product/${productId}`);
    if (!response.ok) return [];
    const result = await response.json();
    return result.data || [];
  } catch (error) {
    console.error('Failed to fetch reviews:', error);
    return [];
  }
};
```

### Step 2: Update `ProductTabs.jsx`

Make reviews async:

```javascript
import { useEffect, useState } from 'react';
import { getProductReviews } from './reviewAPI';

export default function ProductTabs({ productId, ...props }) {
  const [productReviews, setProductReviews] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchReviews = async () => {
      setLoading(true);
      const reviews = await getProductReviews(productId);
      setProductReviews(reviews);
      setLoading(false);
    };

    if (productId) {
      fetchReviews();
    }
  }, [productId]);

  const averageRating = calculateAverageRating(productReviews);

  return (
    // Use productReviews instead of mockReviews
    // ... rest of component
  );
}
```

### Step 3: Test with Your API

1. Create the database tables
2. Create the API endpoints (Node.js/Express, Python/Django, PHP/Laravel, etc.)
3. Update `reviewAPI.js` with your API endpoint URLs
4. Test in development

---

## Example Backend Implementation (Node.js/Express)

```javascript
// routes/reviews.js
const express = require('express');
const router = express.Router();
const db = require('../db');

// Get reviews for a product
router.get('/product/:productId', async (req, res) => {
  try {
    const { productId } = req.params;
    const { page = 0, limit = 10, rating = 'all', sortBy = 'recent' } = req.query;

    let query = 'SELECT * FROM reviews WHERE productId = ?';
    const params = [productId];

    // Filter by rating
    if (rating !== 'all') {
      query += ' AND rating = ?';
      params.push(parseInt(rating));
    }

    // Sort
    if (sortBy === 'highest') {
      query += ' ORDER BY rating DESC';
    } else if (sortBy === 'lowest') {
      query += ' ORDER BY rating ASC';
    } else if (sortBy === 'oldest') {
      query += ' ORDER BY createdAt ASC';
    } else {
      query += ' ORDER BY createdAt DESC';
    }

    // Pagination
    const offset = page * limit;
    const countQuery = query.replace('SELECT *', 'SELECT COUNT(*) as count');
    const countResult = await db.query(countQuery, params);
    const totalCount = countResult[0].count;

    query += ' LIMIT ? OFFSET ?';
    params.push(parseInt(limit), offset);

    const reviews = await db.query(query, params);

    res.json({
      success: true,
      data: reviews,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        totalCount,
        totalPages: Math.ceil(totalCount / limit),
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Get rating summary
router.get('/product/:productId/summary', async (req, res) => {
  try {
    const { productId } = req.params;
    const query = `
      SELECT 
        COUNT(*) as totalReviews,
        AVG(rating) as averageRating,
        SUM(CASE WHEN rating = 5 THEN 1 ELSE 0 END) as rating_5_count,
        SUM(CASE WHEN rating = 4 THEN 1 ELSE 0 END) as rating_4_count,
        SUM(CASE WHEN rating = 3 THEN 1 ELSE 0 END) as rating_3_count,
        SUM(CASE WHEN rating = 2 THEN 1 ELSE 0 END) as rating_2_count,
        SUM(CASE WHEN rating = 1 THEN 1 ELSE 0 END) as rating_1_count
      FROM reviews
      WHERE productId = ?
    `;
    
    const result = await db.query(query, [productId]);
    
    res.json({
      success: true,
      data: {
        productId,
        averageRating: result[0].averageRating?.toFixed(2) || 0,
        totalReviews: result[0].totalReviews,
        ratingCounts: {
          5: result[0].rating_5_count || 0,
          4: result[0].rating_4_count || 0,
          3: result[0].rating_3_count || 0,
          2: result[0].rating_2_count || 0,
          1: result[0].rating_1_count || 0,
        },
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
```

---

## Summary

✅ **Frontend is ready** - Uses `reviewAPI.js` layer  
✅ **Easy migration** - Just update API endpoints  
✅ **Scalable** - Each product gets its own reviews  
✅ **Flexible** - Support for pagination, filtering, sorting  
✅ **Production-ready** - All error handling in place  

Now you can build your backend database and API endpoints!
