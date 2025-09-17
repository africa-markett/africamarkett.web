import React, { useState } from 'react';
import styles from './FAQ.module.css';

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(0); // First FAQ is open by default

  const faqs = [
    {
      question: 'What is Africa Markett?',
      answer:
        'Africa Markett is an online marketplace where authentic African art, fashion, and crafts are sold at the best and most affordable prices.',
    },
    {
      question: 'Are the products original?',
      answer:
        'Yes, all our products are 100% authentic and sourced directly from African artisans and craftspeople. We ensure the authenticity and quality of every item on our platform.',
    },
    {
      question: 'How do I place an order?',
      answer:
        "Simply browse our products, add items to your cart, and proceed to checkout. You can create an account or checkout as a guest. We'll guide you through the entire process.",
    },
    {
      question: 'Do you deliver outside Africa?',
      answer:
        'Yes, we offer international shipping to most countries worldwide. Shipping costs and delivery times vary by location. Check our shipping policy for more details.',
    },
    {
      question: 'What payment methods are accepted?',
      answer:
        'We accept various payment methods including credit cards, debit cards, PayPal, and mobile money for African customers. All transactions are secure and encrypted.',
    },
    {
      question: 'Can I return a product?',
      answer:
        "Yes, we offer a return policy for items that don't meet your expectations. Please check our return policy for specific terms and conditions regarding returns and exchanges.",
    },
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };

  return (
    <section className={styles.container}>
      <div className={styles.content}>
        <div className={styles.header}>
          <span className={styles.subtitle}>FAQS</span>
          <h2 className={styles.title}>Have Inquiries? Find Answers Here</h2>
        </div>

        <div className={styles.faqList}>
          {faqs.map((faq, index) => (
            <div key={index} className={styles.faqItem}>
              <button
                className={`${styles.faqQuestion} ${openIndex === index ? styles.active : ''}`}
                onClick={() => toggleFAQ(index)}
              >
                <span className={styles.questionText}>{faq.question}</span>
                <span className={styles.icon}>{openIndex === index ? '−' : '+'}</span>
              </button>

              <div className={`${styles.faqAnswer} ${openIndex === index ? styles.open : ''}`}>
                <div className={styles.answerContent}>
                  <p>{faq.answer}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
