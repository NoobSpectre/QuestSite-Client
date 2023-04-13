import { Box, useMediaQuery, useTheme } from '@mui/material';
import { Navigate } from 'react-router-dom';
import { verifyUser } from '../../contexts/UserAuth';
import NotifyUser from '../../components/ui/NotifyUser';
import { Navbar } from '../../components/navbar/Navbar';
import { MobileLayout } from './MobileLayout';
import { DesktopLayout } from './DesktopLayout';
import { Helmet } from 'react-helmet-async';

const EditProfile = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  if (!verifyUser()) {
    return <Navigate to={'/'} />;
  }

  return (
    <Box>
      <Helmet>
        <title>QuestSite | Profile</title>
      </Helmet>
      {/* Notifies the user if registered successfully or there is error  */}
      <NotifyUser />
      <Box sx={{ boxShadow: '0 0 5px' }}>
        <Navbar />
      </Box>
      <Box position={'relative'}>
        {isMobile ? <MobileLayout /> : <DesktopLayout />}
      </Box>
    </Box>
  );
};

export default EditProfile;
