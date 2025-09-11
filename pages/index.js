import MirrorScrollLookbook from '@/components/features/lookbook/MirrorScrollLookbook';
import Hero from '@/components/ui/hero/Hero';
import TopRated from '@/components/features/top-rated/TopRated';
import { Box } from '@mui/material';
import BestSellers from '@/components/features/best-sellers/BestSellers';

export default function Home() {
  return (
    <Box>
      <Hero />
      <MirrorScrollLookbook />
      <TopRated />
      <BestSellers />
    </Box>
  );
}
