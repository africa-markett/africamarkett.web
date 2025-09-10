import { useState, useEffect } from 'react';
import { Grid, Card, CardMedia, CardContent, Typography, Button, Box, Container } from '@mui/material';

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching products
    const fetchProducts = async () => {
      setLoading(true);
      // This would be replaced with actual API call
      const mockProducts = [
        {
          id: 1,
          name: "African Print Dress",
          price: 45.99,
          image: "/assets/imgs/hero-1.png",
          description: "Beautiful traditional African print dress"
        },
        {
          id: 2,
          name: "Handwoven Basket",
          price: 25.50,
          image: "/assets/imgs/hero-2.jpg",
          description: "Authentic handwoven basket from Ghana"
        },
        {
          id: 3,
          name: "Kente Cloth",
          price: 89.99,
          image: "/assets/imgs/hero-3.png",
          description: "Traditional Kente cloth with vibrant patterns"
        }
      ];
      
      setTimeout(() => {
        setProducts(mockProducts);
        setLoading(false);
      }, 1000);
    };

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Loading Products...
        </Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Our Products
      </Typography>
      <Typography variant="subtitle1" color="text.secondary" sx={{ mb: 4 }}>
        Discover authentic African products and crafts
      </Typography>
      
      <Grid container spacing={3}>
        {products.map((product) => (
          <Grid item xs={12} sm={6} md={4} key={product.id}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <CardMedia
                component="img"
                height="200"
                image={product.image}
                alt={product.name}
                sx={{ objectFit: 'cover' }}
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h6" component="h2">
                  {product.name}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  {product.description}
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography variant="h6" color="primary">
                    ${product.price}
                  </Typography>
                  <Button variant="contained" size="small">
                    Add to Cart
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
