import Link from 'next/link';
import styles from './Layout.module.css';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      

      <div className={styles.footerContainer}>
        {/* Main footer content */}
        <div className={styles.footerContent}>
          {/* Brand section */}
          <div className={styles.footerBrandSection}>
            <div className={styles.footerBrandHeader}>
              {/* Logo */}
              <Image
                src="/logo.png"
                alt="Africa Markett Logo"
                width={150}
                height={50}
                className="w-[120px] md:w-[150px]" // Responsive logo size
              />
            </div>
            <p className={styles.footerBrandDescription}>
              Africa Markett is your one-stop marketplace for authentic African art, fashion, and
              crafts. Making them affordable, accessible, and full of culture.
            </p>

            {/* Social media icons */}
            <div className={styles.footerSocialIcons}>
              <Link href="#" className={styles.footerSocialIcon}>
                <svg className={styles.footerSocialIconSvg} fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </Link>
              <Link href="#" className={styles.footerSocialIcon}>
                <svg className={styles.footerSocialIconSvg} fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                </svg>
              </Link>
              <Link href="#" className={styles.footerSocialIcon}>
                <svg className={styles.footerSocialIconSvg} fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z" />
                </svg>
              </Link>
              <Link href="#" className={styles.footerSocialIcon}>
                <svg className={styles.footerSocialIconSvg} fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </Link>
            </div>
            {/* copyright */}
            <p className={styles.footerCopyright}>© 2025 Africa Markett. All rights reserved.</p>
          </div>

          {/* Quick links */}
          <div>
            <h4 className={styles.footerSectionTitle}>Quick links</h4>
            <ul className={styles.footerSectionList}>
              <li>
                <Link href="/" className={styles.footerSectionLink}>
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className={styles.footerSectionLink}>
                  About
                </Link>
              </li>
              <li>
                <Link href="/catalog" className={styles.footerSectionLink}>
                  Catalog
                </Link>
              </li>
              <li>
                <Link href="/faqs" className={styles.footerSectionLink}>
                  FAQs
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className={styles.footerSectionTitle}>Support</h4>
            <ul className={styles.footerSectionList}>
              <li>
                <Link href="/terms" className={styles.footerSectionLink}>
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link href="/privacy" className={styles.footerSectionLink}>
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/returns" className={styles.footerSectionLink}>
                  Return Policy
                </Link>
              </li>
              <li>
                <Link href="/shipping" className={styles.footerSectionLink}>
                  Shipping and Delivery
                </Link>
              </li>
              <li>
                <Link href="/payment" className={styles.footerSectionLink}>
                  Payment Methods
                </Link>
              </li>
            </ul>
          </div>

          {/* Need Help? */}
          <div>
            <h4 className={styles.footerSectionTitle}>Need Help?</h4>
            <ul className={styles.footerSectionList}>
              <li>
                <Link href="/help" className={styles.footerSectionLink}>
                  Help Center
                </Link>
              </li>
              <li>
                <Link href="/contact" className={styles.footerSectionLink}>
                  Contact Support
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom section */}

        <div className={styles.footerTaglineWrapper}>
          <p className={styles.footerTagline}>CRAFTED IN AFRICA. PRICED FOR YOU.</p>
        </div>
      </div>
    </footer>
  );
}
