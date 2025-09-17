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
               <Image
                  src="/assests/icons/x.png"
                  alt="X (formerly Twitter) Icon"
                  width={24}
                  height={24}
                  className={styles.footerSocialIconSvg}
                />
              </Link>
              <Link href="#" className={styles.footerSocialIcon}>
                <Image
                  src="/assests/icons/fb.png"
                  alt="Facebook Icon"
                  width={24}
                  height={24}
                  className={styles.footerSocialIconSvg}
                />
              </Link>
              <Link href="#" className={styles.footerSocialIcon}>
                <Image
                  src="/assests/icons/ld.png"
                  alt="LinkedIn Icon"
                  width={24}
                  height={24}
                  className={styles.footerSocialIconSvg}
                />
              </Link>
              <Link href="#" className={styles.footerSocialIcon}>
                <Image
                  src="/assests/icons/ig.png"
                  alt="Instagram Icon"
                  width={24}
                  height={24}
                  className={styles.footerSocialIconSvg}
                />
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
