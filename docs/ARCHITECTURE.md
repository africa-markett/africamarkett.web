# System Architecture Diagram

## Data Flow

```
┌─────────────────────────────────────────────────────────────────┐
│                    USER VIEWS PRODUCT PAGE                      │
└─────────────────────────────────────────────────────────────────┘
                               ↓
┌─────────────────────────────────────────────────────────────────┐
│           ProductDetailContainer.jsx                             │
│  ├─ Gets product ID from URL: /products/[id]                   │
│  └─ Passes productId to ProductTabs                             │
└─────────────────────────────────────────────────────────────────┘
                               ↓
┌─────────────────────────────────────────────────────────────────┐
│              ProductTabs.jsx                                     │
│  ├─ Receives productId="1"                                      │
│  ├─ Calls: getProductReviews(productId)                         │
│  └─ Renders review components with reviews data                 │
└─────────────────────────────────────────────────────────────────┘
                               ↓
              ┌────────────────┴────────────────┐
              ↓                                 ↓
    ┌──────────────────────┐      ┌──────────────────────┐
    │   MOCK DATA (Today)  │      │  REAL DB (Later)     │
    │                      │      │                      │
    │  reviewAPI.js calls: │      │  API calls to:       │
    │  reviewsDatabase['1']│      │  /api/reviews/product/1
    │                      │      │                      │
    │  Returns:            │      │  Database query:     │
    │  [reviews...]        │      │  SELECT * FROM       │
    │                      │      │  reviews WHERE       │
    │                      │      │  productId = 1       │
    └──────────────────────┘      └──────────────────────┘
              ↓                                 ↓
              └────────────────┬────────────────┘
                               ↓
┌─────────────────────────────────────────────────────────────────┐
│             Review Data to Components                            │
│  {                                                               │
│    id: 1,                                                        │
│    productId: 1,    ← KEY: Links to product database            │
│    name: "Gary",                                                 │
│    rating: 5,                                                    │
│    comment: "..."                                                │
│  }                                                               │
└─────────────────────────────────────────────────────────────────┘
              ↓
    ┌─────────┴────────────┬────────────────┬─────────┐
    ↓                      ↓                ↓         ↓
┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐
│ Rating   │  │ Rating   │  │ Reviews  │  │ Review   │
│ Overview │  │ Filter   │  │ List     │  │ Item     │
│ 4.5 ⭐  │  │ Buttons  │  │ Container│  │ Card     │
└──────────┘  └──────────┘  └──────────┘  └──────────┘
    ↓              ↓              ↓            ↓
    └──────────────┴──────────────┴────────────┘
                    ↓
┌─────────────────────────────────────────────────────┐
│          USER SEES PRODUCT REVIEWS                   │
└─────────────────────────────────────────────────────┘
```

---

## Database to Frontend Connection

```
┌──────────────────────────────────────────────────────────┐
│           YOUR PRODUCT DATABASE                          │
├──────────────────────────────────────────────────────────┤
│  products table:                                         │
│  ├─ id: 1                                               │
│  ├─ name: "Balerie Baton"                               │
│  └─ price: 97,499.99                                    │
└──────────────────────────────────────────────────────────┘
               ↓
┌──────────────────────────────────────────────────────────┐
│           YOUR REVIEWS DATABASE (NEW)                    │
├──────────────────────────────────────────────────────────┤
│  reviews table:                                          │
│  ├─ id: 1                                               │
│  ├─ productId: 1        ← LINKS TO PRODUCT              │
│  ├─ name: "Gary"                                        │
│  ├─ email: "gary@..."                                   │
│  ├─ rating: 5                                           │
│  ├─ comment: "Stunning piece..."                        │
│  └─ createdAt: 2025-09-11                               │
│                                                          │
│  ├─ id: 2                                               │
│  ├─ productId: 1        ← LINKS TO PRODUCT              │
│  ├─ name: "Bella"                                       │
│  └─ ...                                                 │
│                                                          │
│  ├─ id: 11                                              │
│  ├─ productId: 2        ← LINKS TO DIFFERENT PRODUCT    │
│  ├─ name: "John"                                        │
│  └─ ...                                                 │
└──────────────────────────────────────────────────────────┘
               ↓
┌──────────────────────────────────────────────────────────┐
│         BACKEND API ENDPOINTS                            │
├──────────────────────────────────────────────────────────┤
│  GET /api/reviews/product/1                              │
│  ├─ Query: SELECT * FROM reviews WHERE productId = 1    │
│  └─ Returns: [review1, review2, ...]                    │
│                                                          │
│  GET /api/reviews/product/2                              │
│  ├─ Query: SELECT * FROM reviews WHERE productId = 2    │
│  └─ Returns: [review11, ...]                            │
└──────────────────────────────────────────────────────────┘
               ↓
┌──────────────────────────────────────────────────────────┐
│         FRONTEND ABSTRACTION LAYER                       │
│         (reviewAPI.js)                                   │
├──────────────────────────────────────────────────────────┤
│  getProductReviews(productId) {                          │
│    return fetch(`/api/reviews/product/${productId}`)     │
│  }                                                        │
└──────────────────────────────────────────────────────────┘
               ↓
┌──────────────────────────────────────────────────────────┐
│         REACT COMPONENT (ProductTabs.jsx)               │
├──────────────────────────────────────────────────────────┤
│  useEffect(() => {                                       │
│    const reviews = await getProductReviews(productId)   │
│    setProductReviews(reviews)                            │
│  }, [productId])                                         │
└──────────────────────────────────────────────────────────┘
               ↓
┌──────────────────────────────────────────────────────────┐
│         UI COMPONENTS RENDER REVIEWS                     │
│         ├─ RatingOverview (4.5 ⭐)                      │
│         ├─ RatingFilter (All, 5⭐, 4⭐, ...)            │
│         ├─ ReviewsList                                  │
│         └─ ReviewItem (Gary's 5⭐ review)               │
└──────────────────────────────────────────────────────────┘
```

---

## Three Key Points That Make This Scalable

### 1. ProductId is the Link
```
Product 1 → Reviews WHERE productId = 1
Product 2 → Reviews WHERE productId = 2
Product N → Reviews WHERE productId = N
```

### 2. API Layer Abstraction
```
reviewAPI.js = Interface between:
  ├─ Frontend (React components)
  └─ Backend (Database & API)

Can swap:
  ❌ Mock data → ✅ Real API
Without changing component code!
```

### 3. Automatic Product Isolation
```
When user visits /products/1
├─ ProductDetailContainer gets id = "1"
├─ Passes productId="1" to ProductTabs
├─ ProductTabs calls getProductReviews("1")
├─ Only reviews for product 1 are fetched
└─ Only reviews for product 1 are displayed

When user visits /products/2
├─ ProductDetailContainer gets id = "2"
├─ Passes productId="2" to ProductTabs
├─ ProductTabs calls getProductReviews("2")
├─ Only reviews for product 2 are fetched
└─ Only reviews for product 2 are displayed
```

---

## Code Flow Example

### Scenario: User views Product ID 5

```javascript
// 1. Page loads with URL: /products/5
// ProductDetailContainer.jsx
const router = useRouter();
const { id } = router.query; // id = "5"

// 2. Pass to ProductTabs
<ProductTabs productId={id} ... />

// 3. Inside ProductTabs
useEffect(() => {
  const reviews = await getProductReviews("5");
  // Makes API call: GET /api/reviews/product/5
  
  // Backend queries database:
  // SELECT * FROM reviews WHERE productId = 5
  
  // Response: Reviews for product 5 only
  setProductReviews(reviews);
}, [productId]); // ← Runs when productId changes

// 4. Calculate average
const avgRating = calculateAverageRating(reviews); // "4.5"

// 5. Render components
<RatingOverview averageRating={avgRating} totalReviews={reviews.length} />
<RatingFilter reviews={reviews} ... />
<ReviewsList reviews={reviews} ... />

// 6. User sees reviews for Product 5 only! ✅
```

---

## File Organization

```
components/features/product-detail/
│
├── 📄 PRODUCTION_READY.md (← You are here)
│
├── Core Components
│   ├── ReviewItem.jsx .................. Single review card
│   ├── ReviewsList.jsx ................ Reviews container
│   ├── RatingOverview.jsx ............. Average rating display
│   └── RatingFilter.jsx ............... Rating filter buttons
│
├── Integration
│   ├── ProductTabs.jsx ................ Main tabs (calls getProductReviews)
│   ├── ProductDetailContainer.jsx .... Passes productId
│   └── reviewAPI.js ................... API layer (mock → real)
│
├── Data
│   └── mockReviews.js ................. Mock data (organized by productId)
│
└── Documentation
    ├── BACKEND_API_GUIDE.md ........... API specification
    ├── MIGRATION_GUIDE.md ............. How to migrate to real DB
    ├── REVIEW_SYSTEM_README.md ........ System overview
    └── PRODUCTION_READY.md ............ This file
```

---

## Summary

✅ **ProductId is the key** - Links reviews to products in database  
✅ **API layer ready** - reviewAPI.js handles mock → real transition  
✅ **Components scalable** - Each product gets unique reviews  
✅ **Frontend abstracted** - No changes needed when switching to real API  
✅ **Production ready** - Ready for database integration  

All you need to do:
1. Create reviews table with productId foreign key
2. Build API endpoints that query by productId
3. Update reviewAPI.js with API URLs
4. Done! 🚀

Every product will automatically display its own reviews from your database!
