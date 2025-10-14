import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import {
  AppBar,
  Toolbar,
  Box,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemText,
  Divider,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import Image from 'next/image';

const NAV_ITEMS = [
  { label: 'Home', href: '/', icon: '' },
  { label: 'Products', href: '/products', icon: '/assests/icons/catlog-icon.png' },
  { label: 'About', href: '/about', icon: '' },
  { label: 'Contact', href: '/contact', icon: '' },
];

export default function Header({ styles, cartCount = 0 }) {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isAtTop, setIsAtTop] = useState(true);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const router = useRouter();
  const isActive = (href) => {
    if (!href) return false;
    if (href === '/') return router.asPath === '/';
    return router.asPath.startsWith(href);
  };

  useEffect(() => {
    const controlHeader = () => {
      const currentScrollY = window.scrollY;

      // Check if we're at the top
      setIsAtTop(currentScrollY < 50);

      // Always show header when at the very top
      if (currentScrollY < 50) {
        setIsVisible(true);
      } else {
        // Show/hide based on scroll direction
        if (currentScrollY > lastScrollY) {
          // Scrolling down - hide header
          setIsVisible(false);
        } else {
          // Scrolling up - show header
          setIsVisible(true);
        }
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', controlHeader);
    return () => {
      window.removeEventListener('scroll', controlHeader);
    };
  }, [lastScrollY]);

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setDrawerOpen(open);
  };

  return (
    <AppBar
      position="fixed"
      elevation={1}
      className={`${styles.header} ${isVisible ? styles.headerVisible : styles.headerHidden}`}
      style={{
        transform: isVisible ? 'translateY(0)' : 'translateY(-100%)',
        transition: 'transform 0.3s ease-in-out',
      }}
    >
      <Toolbar className="container mx-auto flex justify-between px-4 md:px-6 lg:px-[100px]">
        {/* Logo */}
        <Image
          src="/logo.png"
          alt="Africa Markett Logo"
          width={150}
          height={50}
          className="w-[120px] lg:w-[150px]"
        />

        {/* Desktop Nav - Hidden on tablet */}
        <Box className="hidden items-center gap-24 lg:flex">
          {NAV_ITEMS.map((item) => (
            <Box key={item.href} className={styles.navItems}>
              <Link
                href={item.href}
                className={`${styles.navLink} ${isActive(item.href) ? styles.navLinkActive : ''}`}
              >
                {item.label}
              </Link>
              {item.icon && (
                <Image src={item.icon} alt={item.label + ' icon'} width={16} height={16} />
              )}
            </Box>
          ))}
        </Box>

        {/* Desktop cart & contact us - Hidden on tablet */}
        <Box className="hidden items-center gap-4 lg:flex">
          {/* cart btn */}
          <Link href="/cart" aria-label="Cart" className={styles.cartBtn}>
            Cart <span className={styles.badge}>{cartCount}</span>
          </Link>

          <Link href="/contact-us" className={styles.contactUsBtn}>
            <Image
              src="/assests/icons/person-icon.png"
              alt="Contact us icon"
              width={16}
              height={16}
            />
            Contact us
          </Link>
        </Box>

        {/* Tablet Menu - Visible between md and lg */}
        <Box className="hidden items-center gap-4 md:flex lg:hidden">
          {/* Cart Button for Tablet */}
          <Link href="/cart" className={styles.tabletCartBtn}>
            <Image
              src="/assests/icons/catlog-icon.png"
              alt="Cart"
              width={24}
              height={24}
            />
            {cartCount > 0 && <span className={styles.tabletBadge}>{cartCount}</span>}
          </Link>

          {/* Hamburger Menu */}
          <IconButton
            edge="end"
            aria-label="menu"
            onClick={toggleDrawer(true)}
            className={styles.hamburgerBtn}
          >
            <MenuIcon className="text-brand-cream" fontSize="large" />
          </IconButton>
        </Box>
      </Toolbar>

      {/* Drawer for Tablet */}
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={toggleDrawer(false)}
        className={styles.drawer}
        PaperProps={{
          className: styles.drawerPaper,
        }}
      >
        <Box className={styles.drawerContent} role="presentation">
          {/* Drawer Header */}
          <Box className={styles.drawerHeader}>
            <Image
              src="/logo.png"
              alt="Africa Markett"
              width={120}
              height={40}
            />
            <IconButton onClick={toggleDrawer(false)} className={styles.closeBtn}>
              <CloseIcon />
            </IconButton>
          </Box>

          <Divider className={styles.drawerDivider} />

          {/* Navigation Items */}
          <List className={styles.drawerList}>
            {NAV_ITEMS.map((item) => (
              <ListItemButton
                key={item.href}
                onClick={() => {
                  router.push(item.href);
                  toggleDrawer(false)();
                }}
                className={`${styles.drawerItem} ${isActive(item.href) ? styles.drawerItemActive : ''}`}
              >
                {item.icon && (
                  <Image 
                    src={item.icon} 
                    alt={item.label} 
                    width={20} 
                    height={20} 
                    className="mr-3"
                  />
                )}
                <ListItemText 
                  primary={item.label}
                  primaryTypographyProps={{
                    className: styles.drawerItemText,
                  }}
                />
              </ListItemButton>
            ))}
          </List>

          <Divider className={styles.drawerDivider} />

          {/* Drawer Footer Actions */}
          <Box className={styles.drawerFooter}>
            <button
              onClick={() => {
                router.push('/cart');
                toggleDrawer(false)();
              }}
              className={styles.drawerCartBtn}
            >
              View Cart {cartCount > 0 && `(${cartCount})`}
            </button>
            <button
              onClick={() => {
                router.push('/contact-us');
                toggleDrawer(false)();
              }}
              className={styles.drawerContactBtn}
            >
              <Image
                src="/assests/icons/person-icon.png"
                alt="Contact us"
                width={16}
                height={16}
                className="mr-2"
              />
              Contact us
            </button>
          </Box>
        </Box>
      </Drawer>
    </AppBar>
  );
}
