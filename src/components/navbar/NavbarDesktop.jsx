// import { Typography } from '@mui/material';
import { Avatar, Box, Link, Toolbar } from '@mui/material';
import {
  AppbarContainer,
  AppbarHeader,
  AppbarList,
} from '../../components/customs/Appbar';
import { ListBtn, LoginBtn, ProfileBtn } from '../../components/ui/UiBtns';
import logo from '../../assets/images/Logo.png';
import { verifyUser } from '../../contexts/UserAuth';

export const NavbarDesktop = () => {
  return (
    <AppbarContainer>
      <Box sx={{ display: 'flex', flexGrow: 1 }}>
        <Toolbar variant="dense" disableGutters sx={{ px: '5px' }}>
          <Link href="/">
            <Avatar variant="rounded" alt="Logo" src={logo} />
          </Link>
        </Toolbar>
        <AppbarHeader>QuestSite</AppbarHeader>
      </Box>
      <AppbarList type="row">
        <ListBtn primary={'Home'} />
        <ListBtn primary={'Problems'} />
        <ListBtn primary={'Feedback'} />
        {verifyUser() ? <ProfileBtn /> : <LoginBtn />}
      </AppbarList>
    </AppbarContainer>
  );
};
