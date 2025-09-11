import { useState, useMemo, useEffect, Fragment } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Box,
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  Divider,
  Badge,
  Button,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import Image from 'next/image';

const NAV_ITEMS = [
  { label: 'Home', href: '/', icon: '' },
  { label: 'Products', href: '/products', icon: '/assests/icons/catlog-icon.png' },
  { label: 'About', href: '/about', icon: '' },
  { label: 'Contact', href: '/contact', icon: '' },
];

export default function Header({ styles, cartCount = 0 }) {
  const [open, setOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isAtTop, setIsAtTop] = useState(true);

  const toggle = (val) => () => setOpen(val);

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

  // For accessibility: trap focus order for the drawer list.
  const drawerList = useMemo(
    () => (
      <Box
        role="presentation"
        className="flex h-full w-[88vw] max-w-sm flex-col bg-white"
        onClick={toggle(false)}
        onKeyDown={(e) => {
          if (e.key === 'Escape') setOpen(false);
        }}
      >
        <div className="flex justify-end px-4 py-3">
          <IconButton aria-label="Close menu">
            <CloseIcon />
          </IconButton>
        </div>

        <Divider />

        <List className="py-2">
          {NAV_ITEMS.map((item) => (
            <ListItemButton key={item.href} component={Link} href={item.href} className="py-3">
              <ListItemText
                primary={item.label}
                primaryTypographyProps={{
                  className: 'text-base font-medium text-ink',
                }}
              />
            </ListItemButton>
          ))}

          {/* Cart (mobile) */}
          <ListItemButton component={Link} href="/cart" className="py-3">
            <ShoppingCartOutlinedIcon className="mr-3" />
            <ListItemText
              primary="Cart"
              primaryTypographyProps={{
                className: 'text-base font-medium text-ink',
              }}
            />
            {cartCount > 0 && <Badge color="primary" badgeContent={cartCount} />}
          </ListItemButton>
        </List>

        <div className="mt-auto p-4">
          <Button
            fullWidth
            variant="contained"
            color="primary"
            component={Link}
            href="/catalog"
            className="!normal-case"
          >
            Explore Marketplace
          </Button>
        </div>
      </Box>
    ),
    [cartCount],
  );

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
      <Toolbar className="container mx-auto flex justify-between !px-4 lg:!px-[100px]">
        {/* Logo */}
        <Image
          src="/logo.png"
          alt="Africa Markett Logo"
          width={150}
          height={50}
          className="w-[120px] md:w-[150px]" // Responsive logo size
        />

        {/* Desktop Nav */}
        <Box className="hidden items-center gap-8 md:flex lg:gap-24">
          {NAV_ITEMS.map((item) => (
            <Box key={item.href} className={styles.navItems}>
              <Typography
                component={Link}
                href={item.href}
                className={`${styles.navLink} ${isActive(item.href) ? styles.navLinkActive : ''}`}
              >
                {item.label}
              </Typography>
              {item.icon && (
                <Image src={item.icon} alt={item.label + ' icon'} width={16} height={16} />
              )}
            </Box>
          ))}
        </Box>

        {/* cart & contact us */}
        <Box className="hidden items-center gap-4 md:flex">
          {/* cart btn */}
          <IconButton component={Link} href="/cart" aria-label="Cart" className={styles.cartBtn}>
            Cart <span className={styles.badge}>{cartCount}</span>
          </IconButton>

          <Button
            variant="contained"
            component={Link}
            href="/contact-us"
            className={styles.contactUsBtn}
          >
            <Image
              src="/assests/icons/person-icon.png"
              alt="Contact us icon"
              width={16}
              height={16}
            />
            <span className="hidden sm:inline">Contact us</span>
          </Button>
        </Box>

        {/* Mobile toggles */}
        <Box className="flex items-center gap-1 md:hidden">
          {/* cart btn */}
          <IconButton component={Link} href="/cart" aria-label="Cart" className={styles.cartBtn}>
            Cart <span className={styles.badge}>{cartCount}</span>
          </IconButton>
          <IconButton aria-label="Open menu" onClick={toggle(true)} edge="end">
            <MenuIcon className="text-brand-cream" />
          </IconButton>
        </Box>
      </Toolbar>

      <Drawer anchor="right" open={open} onClose={toggle(false)}>
        {drawerList}
      </Drawer>
    </AppBar>
  );
}
