import { Button, Box } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import { getRatingCounts } from '../../mockReviews';
import styles from './RatingFilter.module.css';

export default function RatingFilter({ reviews, selectedRating, onSelectRating }) {
  const ratingCounts = getRatingCounts(reviews);

  const filterOptions = [
    { id: 'all', label: 'All' },
    { id: '5', rating: 5 },
    { id: '4', rating: 4 },
    { id: '3', rating: 3 },
    { id: '2', rating: 2 },
    { id: '1', rating: 1 },
  ];

  return (
    <Box className={styles.filterContainer}>
      {filterOptions.map((option) => (
        <Button
          key={option.id}
          variant={selectedRating === option.id ? 'contained' : 'outlined'}
          onClick={() => onSelectRating(option.id)}
          sx={{
            borderColor: selectedRating === option.id ? '#737373' : '',
            backgroundColor: selectedRating === option.id ? '#004C3F' : 'transparent',
            color: selectedRating === option.id ? '#FFE6B3' : '#737373',
            borderRadius: '4px',
            textTransform: 'none',
            fontSize: '11px',
            fontWeight: 500,
            padding: '8px 0px !important',
            whiteSpace: 'nowrap',
              flexShrink: 0,
            transition: 'all 0.2s duration-200',
            '&:hover': {
              borderColor: '#004C3F',
            },
          }}
        >
          {option.label || (
            <>
              {option.rating} <StarIcon sx={{ ml: 0.5, fontSize: '0.875rem' }} />
            </>
          )}
        </Button>
      ))}
    </Box>
  );
}
