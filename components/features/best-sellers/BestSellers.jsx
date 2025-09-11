import Link from 'next/link';
import Carousel from '@/components/ui/carousel/Carousel';
import ProductCard from '@/components/ui/product-card/ProductCard';
import styles from './BestSellers.module.css';

const MOCK_BEST_SELLERS_PRODUCTS = [
  {
    id: 1,
    name: 'The Monet Painting',
    price: 245599.99,
    category: 'Art & Collectibles',
    image: '/assests/products/5.png',
    rating: 5,
    badge: 'Best Seller',
  },
  {
    id: 2,
    name: 'Boubou',
    price: 45499.99,
    category: 'Clothing',
    image: '/assests/products/6.png',
    rating: 5,
    badge: 'Traditional',
  },
  {
    id: 3,
    name: 'Kiondo',
    price: 28699.0,
    category: 'Bags',
    image: '/assests/products/7.png',
    rating: 5,
    badge: 'Handmade',
  },
  {
    id: 4,
    name: 'Kente Sandals',
    price: 9999.99,
    category: 'Footwear',
    image: '/assests/products/8.png',
    rating: 5,
    badge: 'Popular',
  },
  {
    id: 5,
    name: 'African Print Dress',
    price: 15999.99,
    category: 'Clothing',
    image: '/assests/products/1.png',
    rating: 5,
    badge: 'New',
  },
  {
    id: 6,
    name: 'Handwoven Basket',
    price: 12499.99,
    category: 'Home & Decor',
    image: '/assests/products/2.png',
    rating: 5,
    badge: 'Trending',
  },
];

export default function BestSellers() {
  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <section className={styles.bestSellersSection}>
      <div className={styles.container}>
        {/* Header */}
        <div className={styles.header}>
          <h2 className={styles.title}>Best Sellers</h2>
          <Link href="/products" className={styles.viewAllBtn}>
            All product
          </Link>
        </div>

        {/* Carousel */}
        <Carousel
          itemsPerView={{ mobile: 2, tablet: 2, desktop: 3, large: 4 }}
          autoPlay={false}
          autoPlayInterval={4000}
          showNavigation={false}
          showDots={false}
          loop={true}
          gap="16px"
          freeMode={true}
        >
          {MOCK_BEST_SELLERS_PRODUCTS.map((product) => (
            <ProductCard key={product.id} product={product} formatPrice={formatPrice} />
          ))}
        </Carousel>
      </div>
    </section>
  );
}
