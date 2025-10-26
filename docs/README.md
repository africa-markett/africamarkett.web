# Product Detail Components

This folder contains all the UI components for the single product detail page.

## Component Structure

```
product-detail/
├── ProductDetailContainer.jsx       # Main orchestrator component
├── ProductImageGallery.jsx          # Image gallery with thumbnails
├── ProductInfo.jsx                  # Product details and purchase controls
├── ProductTabs.jsx                  # Tabbed interface for additional info
├── RelatedProducts.jsx              # Related products carousel
├── index.js                         # Barrel exports
└── README.md                        # Documentation
```

## Components

### 1. ProductDetailContainer
The main container component that orchestrates all product detail components.
- Handles data fetching from API or mock data
- Manages loading and error states
- Coordinates between child components
- Implements "Add to Cart" functionality

**Props:** None (gets product ID from router)

### 2. ProductImageGallery
Displays product images with thumbnail navigation.
- Main image display with responsive sizing
- Thumbnail navigation for multiple images
- Active thumbnail highlighting
- Smooth image transitions

**Props:**
- `images` (array): Array of image URLs
- `productName` (string): Product name for alt text

### 3. ProductInfo
Displays product information and purchase controls.
- Product name and category badge
- Price display with stock status
- Product description
- Features list with checkmarks
- Quantity selector with +/- buttons
- Add to cart and wishlist buttons
- Responsive design

**Props:**
- `product` (object): Product data object
- `onAddToCart` (function): Callback for add to cart action

### 4. ProductTabs
Tabbed interface for additional product information.
- Description tab
- Specifications tab (table format)
- Shipping information tab
- Smooth tab transitions

**Props:**
- `description` (string): Product description
- `specifications` (object): Key-value pairs of specs
- `shippingInfo` (object): Shipping details

### 5. RelatedProducts
Shows related products carousel.
- Displays products from same or related categories
- Uses existing ProductCard component
- Responsive carousel
- Navigation controls

**Props:**
- `category` (string): Product category for filtering

## Usage

### Basic Usage (Recommended)
```jsx
import ProductDetailContainer from '@/components/features/product-detail/ProductDetailContainer';

export default function ProductPage() {
  return <ProductDetailContainer />;
}
```

### Advanced Usage (Custom Components)
```jsx
import {
  ProductImageGallery,
  ProductInfo,
  ProductTabs,
  RelatedProducts
} from '@/components/features/product-detail';

export default function CustomProductPage() {
  const product = useProduct(); // Your custom hook

  return (
    <div>
      <ProductImageGallery images={product.images} productName={product.name} />
      <ProductInfo product={product} onAddToCart={handleAddToCart} />
      <ProductTabs {...product} />
      <RelatedProducts category={product.category} />
    </div>
  );
}
```

## Future Components to Add

You can extend this folder with additional components like:

- **ProductReviews.jsx** - Customer reviews and ratings section
  - Star ratings
  - Review list with pagination
  - Review submission form
  
- **ProductBreadcrumb.jsx** - Breadcrumb navigation
  - Home > Category > Subcategory > Product
  
- **ProductSpecifications.jsx** - Detailed specifications table
  - Expandable sections
  - Comparison feature
  
- **ProductShipping.jsx** - Shipping calculator
  - Delivery estimates by location
  - Shipping method selection
  
- **ProductSizeGuide.jsx** - Size chart for clothing
  - Size measurement guide
  - Fit recommendations
  
- **SocialShare.jsx** - Social media sharing
  - Share to Facebook, Twitter, WhatsApp
  - Copy link functionality
  
- **ProductZoom.jsx** - Image zoom functionality
  - Magnifying glass on hover
  - Lightbox for full-screen view
  
- **ProductVideo.jsx** - Product video player
  - Embedded video player
  - Multiple video support

- **ProductWishlist.jsx** - Wishlist functionality
  - Add/remove from wishlist
  - Wishlist count badge

## Styling

Each component has its own module CSS file following the naming convention:
- `ComponentName.jsx`
- `ComponentName.module.css`

The project uses Tailwind CSS with the `@apply` directive for consistent styling.

### Custom Colors
- `brand-green` - Primary brand color
- `brand-cream` - Secondary brand color

### Responsive Breakpoints
- `mobile`: < 640px
- `tablet`: 640px - 768px
- `desktop`: 768px - 1024px
- `large`: > 1024px

## API Integration

To connect to a real API, update the `fetchProduct` function in `ProductDetailContainer.jsx`:

```jsx
const fetchProduct = async () => {
  setLoading(true);
  try {
    const response = await fetch(`/api/products/${id}`);
    const data = await response.json();
    setProduct(data);
  } catch (error) {
    console.error('Error fetching product:', error);
  } finally {
    setLoading(false);
  }
};
```

## State Management

For global state management (cart, wishlist), consider integrating:
- **Context API** - For simple state
- **Redux Toolkit** - For complex state
- **Zustand** - Lightweight alternative

## Testing

Test components individually:
```bash
npm test ProductImageGallery
npm test ProductInfo
npm test ProductTabs
```

## Performance

- Images use Next.js `<Image>` component for optimization
- Lazy loading for related products
- Memoization for expensive calculations
- Code splitting for tabs content
