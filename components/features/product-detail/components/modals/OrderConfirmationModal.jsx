import { useState, useCallback } from 'react';
import Image from 'next/image';
import styles from './OrderConfirmationModal.module.css';
import DeliveryLocationModal from './DeliveryLocationModal';

export default function OrderConfirmationModal({
  isOpen,
  onClose,
  product,
  selectedDimension,
  onPaymentSuccess,
  onPaymentFailed
}) {
  const [quantity, setQuantity] = useState(1);
  const [selectedPayment, setSelectedPayment] = useState('afri-wallet');
  const [deliveryLocation, setDeliveryLocation] = useState(null);
  const [isDeliveryModalOpen, setIsDeliveryModalOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const totalPrice = selectedDimension ? selectedDimension.price * quantity : 0;
  const shippingFee = 7_499.99;
  const subtotal = totalPrice;
  const orderTotal = totalPrice + shippingFee;

  const formatPrice = useCallback((price) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(price);
  }, []);

  const handlePayment = useCallback(() => {
    if (!deliveryLocation) {
      alert('Please add a delivery location to proceed');
      return;
    }

    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);
      const isSuccess = Math.random() > 0.2;
      if (isSuccess) {
        onPaymentSuccess();
      } else {
        onPaymentFailed();
      }
    }, 1500);
  }, [deliveryLocation, onPaymentSuccess, onPaymentFailed]);

  const handleDeliveryLocationSave = useCallback((location) => {
    setDeliveryLocation(location);
    setIsDeliveryModalOpen(false);
  }, []);

  const generateOrderId = useCallback(() => {
    const timestamp = new Date();
    const year = timestamp.getFullYear();
    const month = String(timestamp.getMonth() + 1).padStart(2, '0');
    const day = String(timestamp.getDate()).padStart(2, '0');
    const hours = String(timestamp.getHours()).padStart(2, '0');
    const minutes = String(timestamp.getMinutes()).padStart(2, '0');
    const randomNum = Math.floor(Math.random() * 10000).toString().padStart(4, '0');

    return `ORD${year}${month}${day}-${hours}${minutes}${randomNum}`;
  }, []);

  const paymentMethods = [
    {
      id: 'afri-wallet',
      name: 'Afri Wallet (In app)',
      description: 'Convenient and secure in-app payments using Afri Wallet',
      icon: '/assests/icons/payment/wallet.png',
    },
    {
      id: 'paystack',
      name: 'Paystack (Nigeria)',
      description: 'Simple and secure payments through card or bank transfer',
      icon: '/assests/icons/payment/paystack.png',
    },
    {
      id: 'stripe',
      name: 'Stripe (Outside Nigeria)',
      description: 'Simple and secure payments through card or bank transfer',
      icon: '/assests/icons/payment/stripe.png',
    },
  ];

  if (!isOpen) return null;

  return (
    <>
      <div className={styles.modalOverlay} onClick={onClose}>
        <div className={styles.modalWrapper} onClick={(e) => e.stopPropagation()}>
          <div className={styles.modalContent}>
            {/* Drag Handle */}
            <div className={styles.dragHandle}></div>

            <h2 className={styles.modalTitle}>Order Confirmation</h2>

            {/* Order Quantity */}
            <div className={styles.section}>
              <h3 className={styles.sectionTitle}>Order Quantity</h3>
              <div className={styles.quantityControl}>
                <span className={styles.quantityLabel}>Quantity</span>
                <div className={styles.quantityButtons}>
                  <button
                    className={styles.quantityBtn}
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    disabled={quantity <= 1}
                    aria-label="Decrease quantity"
                  >
                    −
                  </button>
                  <span className={styles.quantityValue}>{quantity}</span>
                  <button
                    className={styles.quantityBtn}
                    onClick={() => setQuantity(quantity + 1)}
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            {/* Payment Method */}
            <div className={styles.section}>
              <h3 className={styles.sectionTitle}>Payment Method</h3>
              <div className={styles.paymentMethods}>
                {paymentMethods.map((method) => (
                  <button
                    key={method.id}
                    className={`${styles.paymentCard} ${selectedPayment === method.id ? styles.paymentCardActive : ''
                      }`}
                    onClick={() => setSelectedPayment(method.id)}
                    role="radio"
                    aria-checked={selectedPayment === method.id}
                  >
                    <div className={styles.paymentIcon}>
                      <Image
                        src={method.icon}
                        alt={method.name}
                        width={24}
                        height={24}
                        priority={false}
                      />
                    </div>
                    <div className={styles.paymentInfo}>
                      <div className={styles.paymentName}>{method.name}</div>
                      <div className={styles.paymentDescription}>{method.description}</div>
                    </div>
                    <div className={styles.paymentRadio}>
                      <input
                        type="radio"
                        checked={selectedPayment === method.id}
                        onChange={() => setSelectedPayment(method.id)}
                        aria-hidden="true"
                      />
                    </div>
                  </button>
                ))}
              </div>
            </div>

            { /* Delivery Location */}
            <div className={styles.section}>
              <h3 className={styles.sectionTitle}>Delivery Location</h3>
              <button
                className={`${styles.deliveryButton} ${deliveryLocation ? styles.deliveryButtonActive : ''
                  }`}
                onClick={() => setIsDeliveryModalOpen(true)}
                type="button"
              >
                <div className={styles.deliveryIcon}>
                  <Image
                    src="/assests/icons/payment/delivery-location.png"
                    alt="Delivery location"
                    width={24}
                    height={24}
                    priority={false}
                  />
                </div>
                {deliveryLocation ? (
                  <div className={styles.deliveryInfo}>
                    <div className={styles.deliveryTitle}>{deliveryLocation.name}</div>
                    <div className={styles.deliveryDescription}>{deliveryLocation.address}</div>
                  </div>
                ) : (
                  <div className={styles.deliveryInfo}>
                    <div className={styles.deliveryTitle}>Add delivery location</div>
                    <div className={styles.deliveryDescription}>
                      Provide your delivery address to proceed with your order
                    </div>
                  </div>
                )}
                <div className={styles.deliveryArrow}>
                  <Image
                    src="/assests/icons/payment/edit.png"
                    alt="Edit delivery location"
                    width={20}
                    height={20}
                    priority={false}
                  />
                </div>
              </button>
            </div>

            {/* Order Details */}
            <div className={styles.section}>
              <h3 className={styles.sectionTitle}>Order details</h3>
              <div className={styles.orderDetails}>
                <div className={styles.orderDetailRow}>
                  <span className={styles.orderDetailLabel}>Order ID</span>
                  <span className={styles.orderDetailValue}>{generateOrderId()}</span>
                </div>
                <div className={styles.orderDetailRow}>
                  <span className={styles.orderDetailLabel}>Subtotal</span>
                  <span className={styles.orderDetailValue}>{formatPrice(subtotal)}</span>
                </div>
                <div className={styles.orderDetailRow}>
                  <span className={styles.orderDetailLabel}>Shipping fee</span>
                  <span className={styles.orderDetailValue}>{formatPrice(shippingFee)}</span>
                </div>
                <div className={styles.orderDetailRowTotal}>
                  <span className={styles.orderDetailLabelTotal}>Total</span>
                  <span className={styles.orderDetailValueTotal}>{formatPrice(orderTotal)}</span>
                </div>
              </div>
            </div>

            {/* Spacer for fixed button */}
            <div className={styles.bottomSpacer}></div>
          </div>

          {/* Fixed Pay Button (Bottom Bar) */}
          <div className={styles.payButtonBar}>
            <button
              className={styles.payButton}
              onClick={handlePayment}
              disabled={isProcessing || !deliveryLocation}
              type="button"
            >
              {isProcessing ? 'Processing...' : `Pay (${formatPrice(orderTotal)})`}
            </button>
          </div>
        </div>
      </div>

      {/* Delivery Location Modal */}
      <DeliveryLocationModal
        isOpen={isDeliveryModalOpen}
        onClose={() => setIsDeliveryModalOpen(false)}
        onSave={handleDeliveryLocationSave}
        initialLocation={deliveryLocation}
      />
    </>
  );
}
