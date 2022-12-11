import { useState } from 'react';

import { alpha } from '@mui/material/styles';
import { Box, Typography, Avatar, IconButton, Popover } from '@mui/material';

import account from '../../../default/account';
import { useAuthContext } from '../../../hooks/useAuthContext';


export default function AccountPopover() {
  const { userData } = useAuthContext();
  const [open, setOpen] = useState(null);

  console.log("userData in header", userData);

  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };

  return (
    <>
      <IconButton
        onClick={handleOpen}
        sx={{
          p: 0,
          ...(open && {
            '&:before': {
              zIndex: 1,
              content: "''",
              width: '100%',
              height: '100%',
              borderRadius: '50%',
              position: 'absolute',
              bgcolor: (theme) => alpha(theme.palette.grey[900], 0.8),
            },
          }),
        }}
      >
        <Avatar src={account.photoURL} alt="photoURL" />
      </IconButton>

      <Typography variant="h5" color="#000" sx={{ ml: 1 }}>
        Olá, {userData.first_name ?? "Usuário"}!
      </Typography>

      <Popover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: {
            p: 0,
            mt: 1.5,
            ml: 0.75,
            width: 180,
            '& .MuiMenuItem-root': {
              typography: 'body2',
              borderRadius: 0.75,
            },
          },
        }}
      >
        <Box sx={{ my: 1.5, px: 2.5 }}>
          <Typography variant="subtitle2" noWrap>
            {userData.first_name ?? "Usuário"}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
            {userData.email ?? "email@user.com"}
          </Typography>
        </Box>
      </Popover>
    </>
  );
}
