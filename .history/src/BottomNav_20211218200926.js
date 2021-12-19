import * as React from 'react';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import RestoreIcon from '@mui/icons-material/Restore';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Link } from 'react-router-dom';

export default function SimpleBottomNavigation() {
  const [value, setValue] = React.useState(0);

  return (
    <Box sx={{ width: 500 }}>
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      >
          <Link className='links' to="/contact">
          <p>Borrowed Loans</p>
          </Link>
          <Link to="/about">
            <BottomNavigationAction label="About Us" icon={<FavoriteIcon />} />
          </Link>
      </BottomNavigation>
    </Box>
  );
}
