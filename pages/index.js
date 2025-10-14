import BestSellers from '@/components/features/home/best-sellers/BestSellers';
import FAQ from '@/components/features/home/faq/FAQ';
import MirrorScrollLookbook from '@/components/features/home/lookbook/MirrorScrollLookbook';
import TheMarkettWay from '@/components/features/home/markett-way/TheMarkettWay';
import Newsletter from '@/components/features/home/newsletter/Newsletter';
import ProductSpotlight from '@/components/features/home/product-spotlight/ProductSpotlight';
import TopRated from '@/components/features/home/top-rated/TopRated';
import Hero from '@/components/ui/hero/Hero';
import MobileHomeHeader from '@/components/ui/mobile/mobile-home-header/MobileHomeHeader';
import MobileBestSellerCarousel from '@/components/ui/mobile/mobile-best-seller-carousel/MobileBestSellerCarousel';
import { Box, useMediaQuery } from '@mui/material';

// Mock data for mobile carousels
const MOCK_TOP_RATED_PRODUCTS = [
  {
    id: 1,
    name: 'The Monet Painting',
    price: 245599.99,
    category: 'Art & Collectibles',
    image: '/assests/products/1.png',
  },
  {
    id: 2,
    name: 'Boubou',
    price: 45499.99,
    category: 'Clothing',
    image: '/assests/products/2.png',
  },
  {
    id: 3,
    name: 'Kiondo',
    price: 28699.0,
    category: 'Bags',
    image: '/assests/products/3.png',
  },
  {
    id: 4,
    name: 'Kente Sandals',
    price: 9999.99,
    category: 'Footwear',
    image: '/assests/products/4.png',
  },
  {
    id: 5,
    name: 'African Print Dress',
    price: 15999.99,
    category: 'Clothing',
    image: '/assests/products/5.png',
  },
  {
    id: 6,
    name: 'Handwoven Basket',
    price: 12499.99,
    category: 'Home & Decor',
    image: '/assests/products/6.png',
  },
];

const MOCK_BEST_SELLERS_PRODUCTS = [
  {
    id: 7,
    name: 'Balerie Baton',
    price: 97499.99,
    category: 'Art & Craft',
    image: '/assests/products/5.png',
  },
  {
    id: 8,
    name: 'Boubou Gown',
    price: 46680.99,
    category: 'Clothing',
    image: '/assests/products/6.png',
  },
  {
    id: 9,
    name: 'Adire Bag',
    price: 28500.00,
    category: 'Bags',
    image: '/assests/products/7.png',
  },
  {
    id: 10,
    name: 'Kente Sandals',
    price: 9999.99,
    category: 'Footwear',
    image: '/assests/products/8.png',
  },
  {
    id: 11,
    name: 'African Print Dress',
    price: 15999.99,
    category: 'Clothing',
    image: '/assests/products/1.png',
  },
  {
    id: 12,
    name: 'Handwoven Basket',
    price: 12499.99,
    category: 'Home & Decor',
    image: '/assests/products/2.png',
  },
];

export default function Home() {

   const isMobile = useMediaQuery('(max-width:767px)');
  return (
    <Box>
      <MobileHomeHeader hasNotifications={true} />
      <Hero />
      <MirrorScrollLookbook />
      
      {/* Top Rated - Desktop version (hidden on mobile) */}
      <TopRated />
      
      {/* Best Sellers - Mobile version (hidden on desktop) */}
      <MobileBestSellerCarousel 
        products={MOCK_BEST_SELLERS_PRODUCTS}
        title="Best Seller"
        showViewAll={true}
      />
      
      {/* Top Rated - Mobile version (hidden on desktop) */}
      <MobileBestSellerCarousel 
        products={MOCK_TOP_RATED_PRODUCTS}
        title="Top Rated"
        showViewAll={true}
      />
      
      {/* Best Sellers - Desktop version (hidden on mobile) */}
      <BestSellers />
      
      
      <ProductSpotlight />
      <TheMarkettWay />
      <FAQ />
      <Newsletter />
    </Box>
  );
}
