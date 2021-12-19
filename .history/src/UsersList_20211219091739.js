import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import MailIcon from '@mui/icons-material/Mail';

export default function AccessibleBadges() {
  return (
      <div>
    <IconButton aria-label={notificationsLabel(100)}>
      <Badge badgeContent={100} color="secondary">
        <MailIcon />
      </Badge>
    </IconButton>
      </div>

  );
}
