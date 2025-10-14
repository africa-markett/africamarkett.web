import { useRouter } from 'next/router';
import Link from 'next/link';
import { BottomNavigation, BottomNavigationAction, Paper } from '@mui/material';
import Image from 'next/image';
import styles from './MobileBottomNav.module.css';

export default function MobileBottomNav({ cartCount = 0 }) {
  const router = useRouter();

  // Determine active tab based on current route
  const getActiveValue = () => {
    const path = router.pathname;
    if (path === '/') return 0;
    if (path.startsWith('/cart')) return 1;
    if (path.startsWith('/orders')) return 2;
    if (path.startsWith('/wallet')) return 3;
    return 0;
  };

  const handleNavigation = (event, newValue) => {
    const routes = ['/', '/cart', '/orders', '/wallet'];
    router.push(routes[newValue]);
  };

  const activeValue = getActiveValue();

  return (
    <Paper
      className={styles.bottomNav}
      elevation={3}
      sx={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        display: { xs: 'block', md: 'none' }, // Only show on mobile screens
        zIndex: 1000,
      }}
    >
      <BottomNavigation
        value={activeValue}
        onChange={handleNavigation}
        showLabels
        className={styles.bottomNavigation}
        sx={{
          '& .MuiBottomNavigationAction-root': {
            color: '#737373',
            fontSize: '10px',
          },
          '& .Mui-selected': {
            color: '#004C3F !important',
          },
          '& .MuiBottomNavigationAction-label': {
            fontSize: '10px',
          },
          '& .Mui-selected .MuiBottomNavigationAction-label': {
            color: '#004C3F !important',
            fontSize: '10px',
          },
        }}
      >
        <BottomNavigationAction
          label="Home"
          icon={
            <div className={styles.cartIconWrapper}>
            <Image
              src={`/assests/icons/mobile/home${activeValue === 0 ? '-c' : ''}.png`}
              alt="Home"
              width={24}
              height={24}
              />
              </div>
          }
          className={styles.navAction}
        />
        <BottomNavigationAction
          label="Cart"
          icon={
            <div className={styles.cartIconWrapper}>
              <Image
                src={`/assests/icons/mobile/cart${activeValue === 1 ? '-c' : ''}.png`}
                alt="Cart"
                width={24}
                height={24}
              />
              {cartCount > 0 && <span className={styles.cartBadge}>{cartCount}</span>}
            </div>
          }
          className={styles.navAction}
        />
        <BottomNavigationAction
          label="Orders"
          icon={
            <div className={styles.cartIconWrapper}>
            <Image
              src={`/assests/icons/mobile/orders${activeValue === 2 ? '-c' : ''}.png`}
              alt="Orders"
              width={24}
              height={24}
              />
              </div>
          }
          className={styles.navAction}
        />
        <BottomNavigationAction
          label="Wallet"
          icon={
            <div className={styles.cartIconWrapper}>
            <Image
              src={`/assests/icons/mobile/wallet${activeValue === 3 ? '-c' : ''}.png`}
              alt="Wallet"
              width={24}
              height={24}
              />
              </div>
          }
          className={styles.navAction}
        />
      </BottomNavigation>
    </Paper>
  );
}
