import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import styles from './ProductImageGallery.module.css';

export default function ProductImageGallery({ images, productName, onImageChange, externalImageIndex }) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState(null);
  const containerRef = useRef(null);

  // Sync with external image index changes (from pagination dots)
  useEffect(() => {
    if (externalImageIndex !== undefined && externalImageIndex !== selectedImage) {
      setSelectedImage(externalImageIndex);
    }
  }, [externalImageIndex]);

  // Minimum swipe distance (in px)
  const minSwipeDistance = 50;

  // Touch handlers
  const onTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe && selectedImage < images.length - 1) {
      const newIndex = selectedImage + 1;
      setSelectedImage(newIndex);
      onImageChange?.(newIndex);
    }
    if (isRightSwipe && selectedImage > 0) {
      const newIndex = selectedImage - 1;
      setSelectedImage(newIndex);
      onImageChange?.(newIndex);
    }
  };

  // Mouse drag handlers
  const onMouseDown = (e) => {
    setIsDragging(true);
    setDragStart(e.clientX);
  };

  const onMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
  };

  const onMouseUp = (e) => {
    if (!isDragging || !dragStart) return;
    
    setIsDragging(false);
    const distance = dragStart - e.clientX;
    const isLeftDrag = distance > minSwipeDistance;
    const isRightDrag = distance < -minSwipeDistance;

    if (isLeftDrag && selectedImage < images.length - 1) {
      const newIndex = selectedImage + 1;
      setSelectedImage(newIndex);
      onImageChange?.(newIndex);
    }
    if (isRightDrag && selectedImage > 0) {
      const newIndex = selectedImage - 1;
      setSelectedImage(newIndex);
      onImageChange?.(newIndex);
    }
    
    setDragStart(null);
  };

  const onMouseLeave = () => {
    if (isDragging) {
      setIsDragging(false);
      setDragStart(null);
    }
  };

  return (
    <div 
      className={styles.galleryContainer}
      ref={containerRef}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
      onMouseDown={onMouseDown}
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
      onMouseLeave={onMouseLeave}
      style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
    >
      {/* Main Image Carousel */}
      <div className={styles.mainImageWrapper}>
        <div 
          className={styles.imageTrack}
          style={{
            transform: `translateX(-${selectedImage * 100}%)`,
            transition: 'transform 0.3s ease-out'
          }}
        >
          {images.map((image, index) => (
            <div key={index} className={styles.mainImage}>
              <Image
                src={image}
                alt={`${productName} - Image ${index + 1}`}
                fill
                className={styles.image}
                sizes="100vw"
                priority={index === 0}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
