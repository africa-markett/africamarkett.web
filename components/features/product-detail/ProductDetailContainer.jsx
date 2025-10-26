import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { ProductImageGallery } from './components/gallery';
import { ProductBottomBar } from './components/bottom-bar';
import { OrderConfirmationModal, PaymentStatusModal } from './components/modals';
import ProductTabs from './components/product-tabs/ProductTabs';
import RelatedProducts from './RelatedProducts';
import styles from './ProductDetailContainer.module.css';

export default function ProductDetailContainer() {
  const router = useRouter();
  const { id } = router.query;
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedDimension, setSelectedDimension] = useState(null);
  const [selectedMedium, setSelectedMedium] = useState(null);
  const [showOrderModal, setShowOrderModal] = useState(false);
  const [showPaymentStatus, setShowPaymentStatus] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState(''); // 'success' or 'failed'
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    if (id) {
      // Simulate fetching product by ID
      const fetchProduct = async () => {
        setLoading(true);
        // Mock product data - replace with actual API call
        const mockProduct = {
          id: id,
          name: 'Balerie Baton',
          price: 97499.99,
          category: 'Art & Craft',
          images: [
            '/assests/products/1.png',
            '/assests/products/2.png',
            '/assests/products/3.png',
            '/assests/products/4.png',
          ],
          description:
            'Beautiful traditional African print dress made from authentic fabrics. This stunning piece combines traditional African patterns with modern styling, perfect for both casual and formal occasions. Handcrafted by skilled artisans, each piece tells a unique story of African heritage and craftsmanship.',
          dimensions: [
            { id: 1, size: '24" x 19W"', price: 97499.99, stock: 5, inStock: true },
            { id: 2, size: '30L" x 28W"', price: 167000.0, stock: 10, inStock: true },
            { id: 3, size: '42L" x 34W"', price: 196500.0, stock: 3, inStock: true },
            { id: 4, size: '52L" x 66W"', price: 224999.99, stock: 2, inStock: true },
            { id: 5, size: '60L" x 54W"', price: 250000.0, stock: 8, inStock: true },
          ],
          mediums: [
            { id: 1, name: 'Watercolor' },
            { id: 2, name: 'Oil' },
            { id: 3, name: 'Acrylic' },
            { id: 4, name: 'Mixed Media' },
          ],
          surface: 'Canvas',
          features: [
            '100% Cotton',
            'Hand-printed patterns',
            'Machine washable',
            'Available in multiple sizes',
            'Authentic African design',
          ],
          specifications: {
            Material: '100% Cotton',
            Origin: 'Ghana',
            Pattern: 'Traditional African Print',
            Care: 'Machine wash cold, tumble dry low',
            Sizes: 'XS, S, M, L, XL, XXL',
            Color: 'Multi-color',
          },
          shippingInfo: {
            deliveryTime: '3-5 business days',
            cost: 'Free shipping on orders over ₦50,000',
            returnPolicy: '30-day return policy',
          },
          inStock: true,
        };

        // Set default selections
        setSelectedDimension(mockProduct.dimensions[0]);
        setSelectedMedium(mockProduct.mediums[0]);

        setTimeout(() => {
          setProduct(mockProduct);
          setLoading(false);
        }, 500);
      };

      fetchProduct();
    }
  }, [id]);

  const handleBuyNow = () => {
    if (!selectedDimension || !selectedMedium) {
      alert('Please select a dimension and medium');
      return;
    }
    setShowOrderModal(true);
  };

  const handlePaymentSuccess = () => {
    setShowOrderModal(false);
    setPaymentStatus('success');
    setShowPaymentStatus(true);
  };

  const handlePaymentFailed = () => {
    setShowOrderModal(false);
    setPaymentStatus('failed');
    setShowPaymentStatus(true);
  };

  const handleBackClick = () => {
    router.back();
  };

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.pageWrapper}>
          {/* Hero Image Skeleton */}
          <div className={styles.heroSection}>
            <button className={styles.backButton} disabled>
              ←
            </button>
            <div className={styles.skeletonImage}></div>
          </div>

          {/* Content Section */}
          <div className={styles.contentSection}>
            {/* Pagination Dots Skeleton */}
            <div className={styles.paginationDots}>
              {[...Array(4)].map((_, i) => (
                <div key={i} className={styles.skeletonDot}></div>
              ))}
            </div>

            {/* Product Header Skeleton */}
            <div className={styles.productHeaderSkeleton}>
              <div className={styles.headerLeftSkeleton}>
                <div className={styles.skeletonBadge}></div>
                <div className={styles.skeletonTitle}></div>
              </div>
              <div className={styles.skeletonPrice}></div>
            </div>

            {/* Tabs Skeleton */}
            <div className={styles.tabsSkeleton}>
              <div className={styles.tabButtonsSkeleton}>
                {[...Array(3)].map((_, i) => (
                  <div key={i} className={styles.skeletonTab}></div>
                ))}
              </div>
              <div className={styles.tabContentSkeleton}>
                <div className={styles.skeletonLine}></div>
                <div className={styles.skeletonLine} style={{ width: '80%' }}></div>
                <div className={styles.skeletonLine}></div>
                <div className={styles.skeletonLine} style={{ width: '70%' }}></div>
              </div>
            </div>

            {/* Bottom Spacing */}
            <div className={styles.bottomSpacing}></div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className={styles.errorContainer}>
        <h2 className={styles.errorTitle}>Product not found</h2>
        <button onClick={handleBackClick} className={styles.backBtn}>
          ← Back to Products
        </button>
      </div>
    );
  }

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(price);
  };

  return (
    <>
      <div className={styles.pageWrapper}>
        {/* Hero Image Section */}
        <div className={styles.heroSection}>
          <button onClick={handleBackClick} className={styles.backButton}>
            ←
          </button>
          <ProductImageGallery
            images={product.images}
            productName={product.name}
            onImageChange={setCurrentImageIndex}
            externalImageIndex={currentImageIndex}
          />
        </div>

        {/* Content Section */}
        <div className={styles.contentSection}>
          {/* Pagination Dots */}
          {product.images.length > 1 && (
            <div className={styles.paginationDots}>
              {product.images.map((_, index) => (
                <span
                  key={index}
                  className={`${styles.dot} ${currentImageIndex === index ? styles.dotActive : ''
                    }`}
                  onClick={() => setCurrentImageIndex(index)}
                />
              ))}
            </div>
          )}

          {/* Product Header */}
          <div className={styles.productHeader}>
            <div className={styles.headerLeft}>
              <div className={styles.categoryBadge}>
                <span className={styles.categoryIcon}>
                  <Image
                    src="/assests/icons/bag.png"
                    alt="Category"
                    width={16}
                    height={16}
                    className='w-4 h-4 object-contain'
                  />
                </span>
                <span>{product.category}</span>
              </div>
              <h1 className={styles.productTitle}>{product.name}</h1>
            </div>
            <div className={styles.priceTag}>
              {formatPrice(selectedDimension?.price || product.price)}
            </div>
          </div>

          {/* Product Tabs */}
          <div className={styles.tabsWrapper}>
            <ProductTabs
              productId={id}
              description={product.description}
              specifications={product.specifications}
              shippingInfo={product.shippingInfo}
              dimensions={product.dimensions}
              selectedDimension={selectedDimension}
              onSelectDimension={setSelectedDimension}
              mediums={product.mediums}
              selectedMedium={selectedMedium}
              onSelectMedium={setSelectedMedium}
              surface={product.surface}
              selectedSurface={product.surface}
              onSelectSurface={() => { }}
            />
          </div>

          {/* Bottom spacing for fixed bar */}
          <div className={styles.bottomSpacing}></div>
        </div>
      </div>

      {/* Bottom App Bar */}
      <ProductBottomBar
        price={selectedDimension?.price || product.price}
        onBuyNow={handleBuyNow}
        showBar={!showOrderModal && !showPaymentStatus}
      />

      {/* Order Confirmation Modal */}
      <OrderConfirmationModal
        isOpen={showOrderModal}
        onClose={() => setShowOrderModal(false)}
        product={product}
        selectedDimension={selectedDimension}
        onPaymentSuccess={handlePaymentSuccess}
        onPaymentFailed={handlePaymentFailed}
      />

      {/* Payment Status Modal */}
      <PaymentStatusModal
        isOpen={showPaymentStatus}
        status={paymentStatus}
        onClose={() => setShowPaymentStatus(false)}
      />

      {/* Related Products */}
      {/* <RelatedProducts category={product.category} /> */}
    </>
  );
}
