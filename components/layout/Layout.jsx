
import Footer from './Footer';
import Header from './Header';
import MobileBottomNav from '../ui/mobile/mobile-bottom-nav/MobileBottomNav';
import styles from './Layout.module.css'

export default function Layout({ children, cartCount = 0, hideMobileNav = false }) {

  return (
    <div className="">
      {/* Desktop Header - Hidden on mobile using CSS only */}
      <div className={styles.desktopHeaderWrapper}>
        <Header styles={styles} cartCount={cartCount} />
      </div>

      <main className={`flex-1 md:pb-0 ${hideMobileNav ? 'pb-0' : 'pb-20'}`}>{children}</main>
      
      <Footer styles={styles} />
      
      {/* Mobile Bottom Navigation - Hidden on desktop */}
      {!hideMobileNav && <MobileBottomNav cartCount={cartCount} />}
    </div>
  );
}
