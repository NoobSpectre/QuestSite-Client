import {
  Box,
  Grid,
  Paper,
  Stack,
  Typography,
  colors,
} from '@mui/material';
import { ProfileAvatar } from '../profile/ProfileData';
import {
  DeleteBtn,
  UploadBtn,
  UserAvatarData,
} from '../../components/customs/EditProfile';
import NotifyUser from '../../components/ui/NotifyUser';
import { EditProfileBox } from './EditComponents';

export const DesktopLayout = () => {
  return (
    <>
      <NotifyUser />
      <Stack
        sx={{ p: 8, alignItems: 'center', backgroundColor: colors.grey[900] }}
      >
        <Stack>
          <Stack direction={'row'} spacing={2}>
            <Box sx={{ boxShadow: '0 0 5px' }}>
              <ProfileAvatar />
            </Box>
            <Stack justifyContent={'space-around'}>
              <UploadBtn />
              <DeleteBtn />
            </Stack>
          </Stack>
          <UserAvatarData />
        </Stack>
      </Stack>
      <Grid container position={'relative'} justifyContent={'center'}>
        <Paper
          component={Grid}
          item
          sx={{
            display: { xs: 12, md: 8 },
            position: 'absolute',
            width: {xs: '100%', md: '60%'},
            top: -40,
            px: 3,
            py: 1,
          }}
        >
          <Typography sx={{ fontWeight: 'bold', color: '#444' }}>
            Profile
          </Typography>
          <Stack>
            <EditProfileBox />
          </Stack>
        </Paper>
      </Grid>
    </>
  );
};
