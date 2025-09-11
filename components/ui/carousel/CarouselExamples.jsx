import Carousel from '@/components/ui/carousel/Carousel';
import ProductCard from '@/components/ui/product-card/ProductCard';

// Example usage of the reusable carousel component

// 1. Basic usage with products
export function ProductCarousel({ products, title }) {
  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <section>
      {title && <h2>{title}</h2>}
      <Carousel
        itemsPerView={{ mobile: 1, tablet: 2, desktop: 3, large: 4 }}
        autoPlay={true}
        autoPlayInterval={5000}
        showNavigation={true}
        showDots={true}
        loop={true}
        gap="16px"
      >
        {products.map((product) => (
          <ProductCard key={product.id} product={product} formatPrice={formatPrice} />
        ))}
      </Carousel>
    </section>
  );
}

// 2. Image gallery carousel
export function ImageCarousel({ images, autoPlay = false }) {
  return (
    <Carousel
      itemsPerView={{ mobile: 1, tablet: 1, desktop: 1, large: 1 }}
      autoPlay={autoPlay}
      autoPlayInterval={6000}
      showNavigation={true}
      showDots={true}
      loop={true}
      gap="0px"
    >
      {images.map((image, index) => (
        <div key={index} className="relative h-96 w-full">
          <img src={image.src} alt={image.alt} className="h-full w-full rounded-lg object-cover" />
          {image.caption && (
            <div className="absolute bottom-4 left-4 rounded bg-black bg-opacity-70 p-2 text-white">
              {image.caption}
            </div>
          )}
        </div>
      ))}
    </Carousel>
  );
}

// 3. Text/Card carousel for testimonials, features, etc.
export function TestimonialCarousel({ testimonials }) {
  return (
    <Carousel
      itemsPerView={{ mobile: 1, tablet: 1, desktop: 2, large: 3 }}
      autoPlay={true}
      autoPlayInterval={7000}
      showNavigation={true}
      showDots={true}
      loop={true}
      gap="24px"
    >
      {testimonials.map((testimonial, index) => (
        <div key={index} className="rounded-xl bg-white p-6 shadow-md">
          <p className="mb-4 text-gray-600">"{testimonial.text}"</p>
          <div className="flex items-center">
            <img
              src={testimonial.avatar}
              alt={testimonial.author}
              className="mr-3 h-10 w-10 rounded-full"
            />
            <div>
              <h4 className="font-semibold">{testimonial.author}</h4>
              <p className="text-sm text-gray-500">{testimonial.title}</p>
            </div>
          </div>
        </div>
      ))}
    </Carousel>
  );
}

// 4. Custom content carousel (most flexible)
export function CustomCarousel({ children, config = {} }) {
  const defaultConfig = {
    itemsPerView: { mobile: 1, tablet: 2, desktop: 3, large: 4 },
    autoPlay: false,
    autoPlayInterval: 4000,
    showNavigation: true,
    showDots: true,
    loop: true,
    gap: '16px',
  };

  const carouselConfig = { ...defaultConfig, ...config };

  return <Carousel {...carouselConfig}>{children}</Carousel>;
}

// Usage examples:
/*

// 1. Product carousel
<ProductCarousel 
  products={topRatedProducts} 
  title="Top Rated Products" 
/>

// 2. Image gallery
<ImageCarousel 
  images={[
    { src: '/img1.jpg', alt: 'Image 1', caption: 'Beautiful scenery' },
    { src: '/img2.jpg', alt: 'Image 2', caption: 'Amazing view' }
  ]}
  autoPlay={true}
/>

// 3. Testimonials
<TestimonialCarousel 
  testimonials={[
    {
      text: "Amazing product quality!",
      author: "John Doe",
      title: "Customer",
      avatar: "/avatar1.jpg"
    }
  ]}
/>

// 4. Custom content with any JSX
<CustomCarousel 
  config={{
    itemsPerView: { mobile: 1, tablet: 1, desktop: 2, large: 3 },
    autoPlay: true,
    loop: false
  }}
>
  <div className="custom-card">Custom Content 1</div>
  <div className="custom-card">Custom Content 2</div>
  <div className="custom-card">Custom Content 3</div>
</CustomCarousel>

*/
