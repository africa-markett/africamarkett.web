import ProductCard from '@/components/ui/product-card/ProductCard';
import Carousel from '@/components/ui/carousel/Carousel';
import styles from './RelatedProducts.module.css';

const MOCK_RELATED_PRODUCTS = [
  {
    id: 7,
    name: 'African Print Shirt',
    price: 35999.99,
    category: 'Clothing',
    image: '/assests/products/1.png',
    rating: 5,
    badge: 'New',
  },
  {
    id: 8,
    name: 'Kente Cloth',
    price: 89999.99,
    category: 'Fabrics',
    image: '/assests/products/2.png',
    rating: 5,
    badge: 'Popular',
  },
  {
    id: 9,
    name: 'Beaded Necklace',
    price: 15999.99,
    category: 'Jewelry',
    image: '/assests/products/3.png',
    rating: 5,
    badge: 'Handmade',
  },
  {
    id: 10,
    name: 'Dashiki Top',
    price: 28999.99,
    category: 'Clothing',
    image: '/assests/products/4.png',
    rating: 5,
    badge: 'Trending',
  },
];

export default function RelatedProducts({ category }) {
  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <section className={styles.relatedSection}>
      <div className={styles.container}>
        <h2 className={styles.title}>You May Also Like</h2>

        <Carousel
          itemsPerView={{ mobile: 2, tablet: 2, desktop: 3, large: 4 }}
          autoPlay={false}
          showNavigation={true}
          showDots={false}
          loop={true}
          gap="16px"
          freeMode={true}
        >
          {MOCK_RELATED_PRODUCTS.map((product) => (
            <ProductCard key={product.id} product={product} formatPrice={formatPrice} />
          ))}
        </Carousel>
      </div>
    </section>
  );
}
