
import Footer from './Footer';
import Header from './Header';
import MobileBottomNav from '../ui/mobile/mobile-bottom-nav/MobileBottomNav';
import styles from './Layout.module.css'

export default function Layout({ children, cartCount = 0 }) {

  return (
    <div className="">
      {/* Desktop Header - Hidden on mobile using CSS only */}
      <div className={styles.desktopHeaderWrapper}>
        <Header styles={styles} cartCount={cartCount} />
      </div>

      <main className="flex-1 pb-20 md:pb-0">{children}</main>
      
      <Footer styles={styles} />
      
      {/* Mobile Bottom Navigation - Hidden on desktop */}
      <MobileBottomNav cartCount={cartCount} />
    </div>
  );
}
