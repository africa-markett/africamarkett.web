import { useState } from 'react';
import ProductDimensions from '../product-info/ProductDimensions';
import ProductMedium from '../product-info/ProductMedium';
import ProductSurface from '../product-info/ProductSurface';
import ProductDescription from '../product-info/ProductDescription';
import ShippingDelivery from '../shipping/ShippingDelivery';
import ReturnPolicy from '../shipping/ReturnPolicy';
import RatingOverview from '../reviews/RatingOverview';
import RatingFilter from '../reviews/RatingFilter';
import ReviewsList from '../reviews/ReviewsList';
import { getProductReviews, calculateAverageRating } from '../../mockReviews';
import styles from './ProductTabs.module.css';

export default function ProductTabs({
  productId,
  description,
  dimensions,
  selectedDimension,
  onSelectDimension,
  mediums,
  selectedMedium,
  onSelectMedium,
  surfaces = ['Canvas', 'Wood Panel', 'Paper', 'Board', 'Glass'],
  selectedSurface: initialSurface,
  onSelectSurface
}) {
  const [activeTab, setActiveTab] = useState('product-details');
  const [selectedRating, setSelectedRating] = useState('all');

  // Get reviews for the specific product
  const productReviews = getProductReviews(productId);
  const averageRating = calculateAverageRating(productReviews);

  const tabs = [
    { id: 'product-details', label: 'Product details' },
    { id: 'shipping', label: 'Shipping & Delivery' },
    { id: 'reviews', label: 'Ratings & Reviews' },
  ];

  return (
    <div className={styles.tabsContainer}>
      {/* Tab Headers */}
      <div className={styles.tabHeaders}>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`${styles.tabButton} ${activeTab === tab.id ? styles.tabButtonActive : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className={styles.tabContent}>
        {activeTab === 'product-details' && (
          <div className={styles.productDetailsContent}>
            {/* Dimensions */}
            <ProductDimensions
              dimensions={dimensions}
              selectedDimension={selectedDimension}
              onSelectDimension={onSelectDimension}
            />

            <hr className='border-t-[1px] mx-[-16px] border-[#004C3F80] ' />

            {/* Medium */}
            <ProductMedium
              mediums={mediums}
              selectedMedium={selectedMedium}
              onSelectMedium={onSelectMedium}
            />
            <hr className='border-t-[1px] mx-[-16px] border-[#004C3F80] ' />

            {/* Surface */}
            <ProductSurface
              surfaces={surfaces}
              selectedSurface={initialSurface}
              onSelectSurface={onSelectSurface}
            />
            <hr className='border-t-[1px] mx-[-16px] border-[#004C3F80] ' />

            {/* Description */}
            <ProductDescription description={description} />
          </div>
        )}

        {activeTab === 'shipping' && (
          <div className={styles.shippingContent}>
            <ShippingDelivery />
            <hr className='border-t-[1px] mx-[-16px] border-[#004C3F80] ' />
            <ReturnPolicy />
          </div>
        )}

        {activeTab === 'reviews' && (
          <div className={styles.reviewsContent}>
            <hr className='border-t-[1px] mx-[-16px] border-[#737373] ' />

            <RatingOverview averageRating={averageRating} totalReviews={productReviews.length} />
            <hr className='border-t-[1px] mx-[-16px] border-[#737373] ' />

            <RatingFilter
              reviews={productReviews}
              selectedRating={selectedRating}
              onSelectRating={setSelectedRating}
            />


            <ReviewsList reviews={productReviews} selectedRating={selectedRating} />
          </div>
        )}
      </div>
    </div>
  );
}
