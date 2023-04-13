import { Box, useMediaQuery, useTheme } from '@mui/material';
import { Navigate } from 'react-router-dom';
import NotifyUser from '../../components/ui/NotifyUser';
import { Navbar } from '../../components/navbar/Navbar';
import { _getItem, verifyUser } from '../../contexts/UserAuth';
import { MobileLayout } from './MobileLayout';
import { DesktopLayout } from './DesktopLayout';
import { useProfile } from '../../states/user';
import { Helmet } from 'react-helmet-async';
import { useEffect, useState } from 'react';
import { PROBLEMS_API, config } from '../../App';
import { useNotify } from '../../contexts/NotifyContext';
import { getSeparateProblems } from './ProfileData';

const Profile = () => {
  const [problemsList, setProblemsList] = useState([]);
  const theme = useTheme();
  const { setSnackbar } = useNotify();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const { user } = useProfile();

  useEffect(() => {
    const fetchProblems = async () => {
      try {
        const res = await fetch(`${PROBLEMS_API}/all`, config);
        const data = await res.json();
        if (!data.success) throw new Error(data.message);
        setProblemsList(data.problems);
      } catch (error) {
        setSnackbar({ open: true, severity: 'error', message: error.message });
      }
    };

    fetchProblems();
  }, []);

  let easyProblems = 0,
    mediumProblems = 0,
    hardProblems = 0;
  if (problemsList) {
    [easyProblems, mediumProblems, hardProblems] =
      getSeparateProblems(problemsList);
  }

  if (!verifyUser()) {
    return <Navigate to={'/'} />;
  }

  return (
    <Box>
      <Helmet>
        <title>QuestSite | {user?.username}</title>
      </Helmet>
      {/* Notifies the user if registered successfully or there is error  */}
      <NotifyUser />
      <Box sx={{ boxShadow: '0 0 5px' }}>
        <Navbar />
      </Box>
      <Box sx={{ p: { xs: 1, sm: 2, md: 4, lg: 6 } }}>
        {isMobile ? (
          <MobileLayout
            user={user}
            easyProblems={easyProblems}
            mediumProblems={mediumProblems}
            hardProblems={hardProblems}
          />
        ) : (
          <DesktopLayout
            user={user}
            easyProblems={easyProblems}
            mediumProblems={mediumProblems}
            hardProblems={hardProblems}
          />
        )}
      </Box>
    </Box>
  );
};

export default Profile;
