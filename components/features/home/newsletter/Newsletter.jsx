import React, { useState } from 'react';
import styles from './Newsletter.module.css';

const Newsletter = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle newsletter signup logic here
    console.log('Newsletter signup:', email);
    setEmail('');
  };

  return (
    <section className={styles.container}>
      {/* Single Background Image */}
      <div className={styles.backgroundImage}></div>

      {/* Overlay */}
      <div className={styles.overlay}>
        <div className={styles.content}>
          <h2 className={styles.title}>
            Shop Authentic. Shop Affordable.
            <br />
            Shop Africa Markett.
          </h2>

          <p className={styles.description}>
            Be the first to know about weekly spotlights, discounts, new arrivals and authentic
           
            African finds. Straight to your inbox!
          </p>

          <form className={styles.form} onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="Your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={styles.emailInput}
              required
            />
            <button type="submit" className={styles.submitButton}>
              Get early access
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
