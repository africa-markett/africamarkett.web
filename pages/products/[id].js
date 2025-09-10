import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { Container, Grid, Typography, Button, Box, Card, CardMedia, Chip } from '@mui/material';
import { ShoppingCart, Favorite } from '@mui/icons-material';

export default function ProductDetail() {
  const router = useRouter();
  const { id } = router.query;
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (id) {
      // Simulate fetching product by ID
      const fetchProduct = async () => {
        setLoading(true);
        // Mock product data
        const mockProduct = {
          id: id,
          name: "African Print Dress",
          price: 45.99,
          images: ["/assets/imgs/hero-1.png", "/assets/imgs/hero-2.jpg"],
          description: "Beautiful traditional African print dress made from authentic fabrics. This stunning piece combines traditional African patterns with modern styling, perfect for both casual and formal occasions.",
          features: ["100% Cotton", "Hand-printed patterns", "Machine washable", "Available in multiple sizes"],
          inStock: true,
          category: "Clothing"
        };
        
        setTimeout(() => {
          setProduct(mockProduct);
          setLoading(false);
        }, 500);
      };

      fetchProduct();
    }
  }, [id]);

  const handleAddToCart = () => {
    // Add to cart logic here
    console.log(`Added ${quantity} of product ${id} to cart`);
  };

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Typography variant="h4">Loading...</Typography>
      </Container>
    );
  }

  if (!product) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Typography variant="h4">Product not found</Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Button onClick={() => router.back()} sx={{ mb: 2 }}>
        ← Back to Products
      </Button>
      
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardMedia
              component="img"
              height="400"
              image={product.images[0]}
              alt={product.name}
              sx={{ objectFit: 'cover' }}
            />
          </Card>
        </Grid>
        
        <Grid item xs={12} md={6}>
          <Box>
            <Chip label={product.category} color="primary" sx={{ mb: 2 }} />
            <Typography variant="h4" component="h1" gutterBottom>
              {product.name}
            </Typography>
            <Typography variant="h5" color="primary" sx={{ mb: 3 }}>
              ${product.price}
            </Typography>
            
            <Typography variant="body1" sx={{ mb: 3 }}>
              {product.description}
            </Typography>
            
            <Typography variant="h6" gutterBottom>
              Features:
            </Typography>
            <Box component="ul" sx={{ mb: 3 }}>
              {product.features.map((feature, index) => (
                <Typography component="li" key={index} variant="body2">
                  {feature}
                </Typography>
              ))}
            </Box>
            
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
              <Typography variant="body1">Quantity:</Typography>
              <Button 
                variant="outlined" 
                size="small" 
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
              >
                -
              </Button>
              <Typography variant="body1" sx={{ minWidth: '2ch', textAlign: 'center' }}>
                {quantity}
              </Typography>
              <Button 
                variant="outlined" 
                size="small" 
                onClick={() => setQuantity(quantity + 1)}
              >
                +
              </Button>
            </Box>
            
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Button 
                variant="contained" 
                size="large" 
                startIcon={<ShoppingCart />}
                onClick={handleAddToCart}
                disabled={!product.inStock}
              >
                {product.inStock ? 'Add to Cart' : 'Out of Stock'}
              </Button>
              <Button variant="outlined" size="large" startIcon={<Favorite />}>
                Wishlist
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}
