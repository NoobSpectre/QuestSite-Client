import {
  Avatar,
  Box,
  Container,
  Divider,
  Drawer,
  IconButton,
  Link,
  List,
  Toolbar,
  useMediaQuery,
} from '@mui/material';
import { Menu, Close } from '@mui/icons-material';
import { AppbarHeader } from '../customs/Appbar';
import { ListBtn, LoginBtn, ProfileBtn } from '../ui/UiBtns';
import { verifyUser } from '../../contexts/UserAuth';
import logo from '../../assets/images/Logo.png';
import { useState } from 'react';

export const NavbarMobile = () => {
  const [open, setOpen] = useState(false);
  const isSmallScreen = useMediaQuery(`(max-width: 300px)`);

  const handleClickOnDrawerItem = () => {
    setOpen(false);
  };

  const handleMouseDownOnDrawerItem = () => {
    setOpen(false);
  };

  return (
    <Container maxWidth="xl" sx={{ display: 'flex' }}>
      <Box sx={{ display: 'flex', flexGrow: 1 }}>
        <Toolbar
          variant="dense"
          disableGutters
          sx={{
            display: isSmallScreen ? 'none' : 'flex',
            px: '5px',
          }}
        >
          <Link href="/">
            <Avatar variant="rounded" alt="Logo" src={logo} />
          </Link>
        </Toolbar>
        <AppbarHeader>QuestSite</AppbarHeader>
      </Box>
      <Box sx={{ display: 'flex' }}>
        <IconButton
          onClick={() => setOpen(opn => !opn)}
          disableRipple
          disableTouchRipple
          disableFocusRipple
        >
          <Menu />
        </IconButton>
      </Box>
      <Drawer anchor="top" open={open} onClose={() => setOpen(false)}>
        <Box role="presentation">
          <List>
            <Container
              sx={{
                display: 'flex',
                justifyContent: 'flex-end',
                pt: '4px',
                pb: '8px',
              }}
            >
              <IconButton
                onClick={() => setOpen(false)}
                onMouseDown={() => setOpen(false)}
              >
                <Close />
              </IconButton>
            </Container>
            <Divider variant="middle" />
            <Container
              sx={{
                display: 'flex',
                justifyContent: 'center',
              }}
            >
              <ListBtn primary={'Home'} setOpen={setOpen} />
            </Container>
            <Divider variant="middle" />
            <Container
              sx={{
                display: 'flex',
                justifyContent: 'center',
              }}
            >
              <ListBtn primary={'Problems'} setOpen={setOpen} />
            </Container>
            <Divider variant="middle" />
            <Container
              sx={{
                display: 'flex',
                justifyContent: 'center',
              }}
            >
              <ListBtn primary={'Feedback'} setOpen={setOpen} />
            </Container>
            <Divider variant="middle" />
            <Container
              sx={{
                display: 'flex',
                justifyContent: 'center',
                py: 1,
                mt: '8px',
              }}
            >
              {verifyUser() ? (
                <ProfileBtn
                  handleClickOnDrawerItem={handleClickOnDrawerItem}
                  handleMouseDownOnDrawerItem={handleMouseDownOnDrawerItem}
                />
              ) : (
                <LoginBtn
                  handleClickOnDrawerItem={handleClickOnDrawerItem}
                  handleMouseDownOnDrawerItem={handleMouseDownOnDrawerItem}
                />
              )}
            </Container>
          </List>
        </Box>
      </Drawer>
    </Container>
  );
};
