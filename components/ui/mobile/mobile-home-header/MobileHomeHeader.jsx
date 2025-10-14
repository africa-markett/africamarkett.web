import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Box, IconButton, TextField, InputAdornment } from '@mui/material';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import styles from './MobileHomeHeader.module.css';

export default function MobileHomeHeader({ 
  userName = 'Diana Jakobs', 
  userAvatar = '/user-avatar.png',
  hasNotifications = false // Add prop to show notification dot
}) {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    // Handle search logic here
    console.log('Search query:', searchQuery);
  };

  return (
    <Box className={styles.mobileHeaderContainer}>
      {/* User Welcome Section */}
      <Box className={styles.welcomeSection}>
        <Box className={styles.userInfo}>
          <Image
            src={userAvatar}
            alt={userName}
            width={60}
            height={60}
            className={styles.userAvatar}
          />
          <Box className={styles.welcomeText}>
            <span className={styles.welcomeBack}>Welcome back</span>
            <h2 className={styles.userName}>{userName}</h2>
          </Box>
        </Box>

        <Box className={styles.actionIcons}>
          <IconButton 
            component={Link} 
            href="/notifications" 
            aria-label="Notifications"
            className={styles.iconButton}
          >
            <NotificationsNoneOutlinedIcon className={styles.icon} />
            {hasNotifications && <span className={styles.notificationDot}></span>}
          </IconButton>
          <IconButton 
            component={Link} 
            href="/wishlist" 
            aria-label="Wishlist"
            className={styles.iconButton}
          >
            <FavoriteBorderOutlinedIcon className={styles.icon} />
          </IconButton>
        </Box>
      </Box>

      {/* Search Section */}
      <Box className={styles.searchSection}>
        <form onSubmit={handleSearchSubmit} className={styles.searchForm}>
          <TextField
            fullWidth
            placeholder="Search for product"
            value={searchQuery}
            onChange={handleSearchChange}
            className={styles.searchInput}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Image
                    src="/assests/icons/mobile/search.png"
                    alt="Search"
                    width={20}
                    height={20}
                    className={styles.searchIcon}
                  />
                </InputAdornment>
              ),
              className: styles.inputField,
            }}
          />
        </form>
        
        <IconButton 
          aria-label="Filter" 
          className={styles.filterButton}
        >
          <Image
            src="/assests/icons/mobile/filter.png"
            alt="Filter"
            width={24}
            height={24}
          />
        </IconButton>
      </Box>
    </Box>
  );
}
