import BestSellers from '@/components/features/home/best-sellers/BestSellers';
import FAQ from '@/components/features/home/faq/FAQ';
import MirrorScrollLookbook from '@/components/features/home/lookbook/MirrorScrollLookbook';
import TheMarkettWay from '@/components/features/home/markett-way/TheMarkettWay';
import Newsletter from '@/components/features/home/newsletter/Newsletter';
import ProductSpotlight from '@/components/features/home/product-spotlight/ProductSpotlight';
import TopRated from '@/components/features/home/top-rated/TopRated';
import Hero from '@/components/ui/hero/Hero';
import { Box } from '@mui/material';

export default function Home() {
  return (
    <Box>
      <Hero />
      <MirrorScrollLookbook />
      <TopRated />
      <BestSellers />
      <ProductSpotlight />
      <TheMarkettWay />
      <FAQ />
      <Newsletter />
    </Box>
  );
}
