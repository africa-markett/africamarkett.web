import { useState, useCallback } from 'react';
import styles from './DeliveryLocationModal.module.css';

const NIGERIAN_STATES = [
    'Abia', 'Adamawa', 'Akwa Ibom', 'Anambra', 'Bauchi', 'Bayelsa', 'Benue', 'Borno',
    'Cross River', 'Delta', 'Ebonyi', 'Edo', 'Ekiti', 'Enugu', 'Federal Capital Territory',
    'Gombe', 'Imo', 'Jigawa', 'Kaduna', 'Kano', 'Katsina', 'Kebbi', 'Kogi', 'Kwara',
    'Lagos', 'Nasarawa', 'Niger', 'Ogun', 'Ondo', 'Osun', 'Oyo', 'Plateau', 'Rivers',
    'Sokoto', 'Taraba', 'Yobe', 'Zamfara'
];

export default function DeliveryLocationModal({
    isOpen,
    onClose,
    onSave,
    initialLocation,
}) {
    const [formData, setFormData] = useState(
        initialLocation || {
            name: '',
            phone: '',
            address: '',
            city: '',
            state: '',
            zipCode: '',
        }
    );

    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const validateForm = useCallback(() => {
        const newErrors = {};

        if (!formData.name.trim()) {
            newErrors.name = 'Full name is required';
        }

        if (!formData.phone.trim()) {
            newErrors.phone = 'Phone number is required';
        } else if (!/^\+?234\d{9,10}|^0\d{10}/.test(formData.phone.replace(/\s/g, ''))) {
            newErrors.phone = 'Invalid Nigerian phone number';
        }

        if (!formData.address.trim()) {
            newErrors.address = 'Address is required';
        }

        if (!formData.city.trim()) {
            newErrors.city = 'City is required';
        }

        if (!formData.state) {
            newErrors.state = 'State is required';
        }

        if (!formData.zipCode.trim()) {
            newErrors.zipCode = 'Postal code is required';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    }, [formData]);

    const handleInputChange = useCallback((e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
        // Clear error for this field when user starts typing
        if (errors[name]) {
            setErrors((prev) => ({
                ...prev,
                [name]: '',
            }));
        }
    }, [errors]);

    const handleSubmit = useCallback(async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        setIsSubmitting(true);

        try {
            // Simulate API call
            await new Promise((resolve) => setTimeout(resolve, 500));

            onSave(formData);
        } catch (error) {
            console.error('Error saving delivery location:', error);
            setErrors({ submit: 'Failed to save delivery location. Please try again.' });
        } finally {
            setIsSubmitting(false);
        }
    }, [formData, validateForm, onSave]);

    if (!isOpen) return null;

    return (
        <div className={styles.modalOverlay} onClick={onClose}>
            <div className={styles.modalWrapper} onClick={(e) => e.stopPropagation()}>
                <div className={styles.modalContent}>
                    {/* Header */}
                    <div className={styles.modalHeader}>
                        <button
                            className={styles.closeButton}
                            onClick={onClose}
                            aria-label="Close modal"
                            type="button"
                        >
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <line x1="18" y1="6" x2="6" y2="18"></line>
                                <line x1="6" y1="6" x2="18" y2="18"></line>
                            </svg>
                        </button>
                        <h2 className={styles.modalTitle}>Add Delivery Location</h2>
                        <div className={styles.headerSpacer}></div>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className={styles.form}>
                        {/* Full Name */}
                        <div className={styles.formGroup}>
                            <label htmlFor="name" className={styles.formLabel}>
                                Full Name
                            </label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                placeholder="Enter your full name"
                                className={`${styles.formInput} ${errors.name ? styles.formInputError : ''}`}
                                disabled={isSubmitting}
                            />
                            {errors.name && <span className={styles.errorMessage}>{errors.name}</span>}
                        </div>

                        {/* Phone Number */}
                        <div className={styles.formGroup}>
                            <label htmlFor="phone" className={styles.formLabel}>
                                Phone Number
                            </label>
                            <input
                                type="tel"
                                id="phone"
                                name="phone"
                                value={formData.phone}
                                onChange={handleInputChange}
                                placeholder="e.g., +234 XXX XXX XXXX"
                                className={`${styles.formInput} ${errors.phone ? styles.formInputError : ''}`}
                                disabled={isSubmitting}
                            />
                            {errors.phone && <span className={styles.errorMessage}>{errors.phone}</span>}
                        </div>

                        {/* Address */}
                        <div className={styles.formGroup}>
                            <label htmlFor="address" className={styles.formLabel}>
                                Street Address
                            </label>
                            <textarea
                                id="address"
                                name="address"
                                value={formData.address}
                                onChange={handleInputChange}
                                placeholder="Enter your street address"
                                className={`${styles.formTextarea} ${errors.address ? styles.formInputError : ''}`}
                                disabled={isSubmitting}
                                rows="3"
                            />
                            {errors.address && <span className={styles.errorMessage}>{errors.address}</span>}
                        </div>

                        {/* City */}
                        <div className={styles.formGroup}>
                            <label htmlFor="city" className={styles.formLabel}>
                                City
                            </label>
                            <input
                                type="text"
                                id="city"
                                name="city"
                                value={formData.city}
                                onChange={handleInputChange}
                                placeholder="Enter your city"
                                className={`${styles.formInput} ${errors.city ? styles.formInputError : ''}`}
                                disabled={isSubmitting}
                            />
                            {errors.city && <span className={styles.errorMessage}>{errors.city}</span>}
                        </div>

                        {/* State */}
                        <div className={styles.formGroup}>
                            <label htmlFor="state" className={styles.formLabel}>
                                State
                            </label>
                            <select
                                id="state"
                                name="state"
                                value={formData.state}
                                onChange={handleInputChange}
                                className={`${styles.formInput} ${errors.state ? styles.formInputError : ''}`}
                                disabled={isSubmitting}
                            >
                                <option value="">Select a state</option>
                                {NIGERIAN_STATES.map((state) => (
                                    <option key={state} value={state}>
                                        {state}
                                    </option>
                                ))}
                            </select>
                            {errors.state && <span className={styles.errorMessage}>{errors.state}</span>}
                        </div>

                        {/* Postal Code */}
                        <div className={styles.formGroup}>
                            <label htmlFor="zipCode" className={styles.formLabel}>
                                Postal Code
                            </label>
                            <input
                                type="text"
                                id="zipCode"
                                name="zipCode"
                                value={formData.zipCode}
                                onChange={handleInputChange}
                                placeholder="Enter your postal code"
                                className={`${styles.formInput} ${errors.zipCode ? styles.formInputError : ''}`}
                                disabled={isSubmitting}
                            />
                            {errors.zipCode && <span className={styles.errorMessage}>{errors.zipCode}</span>}
                        </div>

                        {/* Submit Error */}
                        {errors.submit && (
                            <div className={styles.submitError}>{errors.submit}</div>
                        )}

                        {/* Action Buttons */}
                        <div className={styles.formActions}>
                            <button
                                type="button"
                                onClick={onClose}
                                className={styles.cancelButton}
                                disabled={isSubmitting}
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className={styles.submitButton}
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? 'Saving...' : 'Save Location'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
