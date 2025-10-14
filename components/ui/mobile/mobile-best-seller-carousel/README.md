# Mobile Best Seller Carousel

A professional, mobile-only carousel component for displaying best-selling products with smooth touch interactions and modern design.

## Features

- 📱 **Mobile-Only**: Automatically hidden on desktop (768px+)
- 🎨 **Beautiful Design**: Matches the exact design from the reference image
- 👆 **Smooth Touch**: Free-mode swiping with momentum
- ❤️ **Wishlist Button**: Heart icon for favoriting products
- 🛒 **Quick Add to Cart**: Circular cart button for fast purchases
- 🎯 **Responsive**: Adapts to different mobile screen sizes
- ⚡ **Performance**: Optimized with proper image loading and transforms
- ♿ **Accessible**: Proper ARIA labels and focus states

## Usage

```jsx
import MobileBestSellerCarousel from '@/components/ui/mobile/mobile-best-seller-carousel/MobileBestSellerCarousel';

// Your product data
const products = [
  {
    id: 1,
    name: 'Balerie Baton',
    price: 97499.99,
    category: 'Art & Craft',
    image: '/assests/products/1.png',
  },
  {
    id: 2,
    name: 'Boubou Gown',
    price: 46680.99,
    category: 'Clothing',
    image: '/assests/products/2.png',
  },
  {
    id: 3,
    name: 'Adire Bag',
    price: 28500.00,
    category: 'Bags',
    image: '/assests/products/3.png',
  },
  // Add more products...
];

function MyComponent() {
  return (
    <MobileBestSellerCarousel 
      products={products}
      title="Best Seller"
      showViewAll={true}
    />
  );
}
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `products` | Array | **Required** | Array of product objects with id, name, price, category, and image |
| `title` | String | "Best Seller" | Section title displayed at the top |
| `showViewAll` | Boolean | `true` | Show/hide "See all" link in header |

## Product Object Structure

```javascript
{
  id: Number,          // Unique product identifier
  name: String,        // Product name
  price: Number,       // Price in NGN
  category: String,    // Product category
  image: String,       // Image path/URL
}
```

## Integration Examples

### In a Home Page Section

```jsx
// pages/index.js
import MobileBestSellerCarousel from '@/components/ui/mobile/mobile-best-seller-carousel/MobileBestSellerCarousel';
import BestSellers from '@/components/features/home/best-sellers/BestSellers';

export default function Home() {
  const bestSellerProducts = [
    // Your products...
  ];

  return (
    <div>
      {/* Desktop version */}
      <BestSellers />
      
      {/* Mobile version - will auto-hide on desktop */}
      <MobileBestSellerCarousel products={bestSellerProducts} />
    </div>
  );
}
```

### With Dynamic Data

```jsx
import { useEffect, useState } from 'react';
import MobileBestSellerCarousel from '@/components/ui/mobile/mobile-best-seller-carousel/MobileBestSellerCarousel';

export default function BestSellersSection() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProducts() {
      const response = await fetch('/api/products/best-sellers');
      const data = await response.json();
      setProducts(data);
      setLoading(false);
    }
    fetchProducts();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <MobileBestSellerCarousel 
      products={products}
      title="Best Seller"
    />
  );
}
```

## Styling

The component uses CSS modules with Tailwind CSS. Color scheme:

- **Background**: `#FFE6B3` (warm cream)
- **Card Background**: `#FFF3DA` (lighter cream)
- **Primary Text**: `#1B4332` (dark green)
- **Secondary Text**: `#52796F` (medium green)
- **Primary Button**: `#1B4332` (dark green)

To customize, edit `MobileBestSellerCarousel.module.css`.

## Dependencies

- `swiper` (already in your project)
- `next/image` and `next/link`

## Performance Notes

- Images are optimized with Next.js Image component
- First 3 products have `priority` loading
- Hardware acceleration with `translateZ(0)`
- Smooth scrolling with `-webkit-overflow-scrolling: touch`

## Accessibility

- ARIA labels on interactive buttons
- Keyboard focus indicators
- Proper semantic HTML structure
- Touch-optimized tap targets (minimum 44x44px)

## Browser Support

- iOS Safari 12+
- Chrome Mobile 80+
- Samsung Internet 12+
- All modern mobile browsers
