import { useTheme } from '@emotion/react';
import { Forum, LocationOnOutlined } from '@mui/icons-material';
import { BsFillCheckSquareFill } from 'react-icons/bs';
import {
  Avatar,
  Button,
  Chip,
  colors,
  Grid,
  IconButton,
  Stack,
  Typography,
} from '@mui/material';
import { useState, useEffect } from 'react';
import { config, USER_API } from '../../App';
import { useNotify } from '../../contexts/NotifyContext';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { _getItem } from '../../contexts/UserAuth';

const IconType = {
  solutions: (
    <BsFillCheckSquareFill fontSize="smaller" color={colors.lightBlue[600]} />
  ),
  discussions: <Forum fontSize="smaller" htmlColor={colors.deepPurple[600]} />,
};

export const ProfileAvatar = () => {
  // const { user } = useSelector(state => state.user);
  const [src, setSrc] = useState('');
  const { setSnackbar, refresh } = useNotify();
  const username = _getItem('username');

  useEffect(() => {
    const fetchAvatar = async () => {
      try {
        const response = await fetch(`${USER_API}/${username}/avatar`, config);
        const data = await response.json();
        if (!data.success) throw new Error(data.message);
        setSrc(data.url);
      } catch (error) {
        setSnackbar({
          open: true,
          severity: 'error',
          message: error.message,
        });
      }
    };

    fetchAvatar();
  }, [refresh]);

  return (
    <Avatar
      src={src}
      alt={''}
      variant="rounded"
      sx={{
        width: '100px',
        height: '100px',
        boxShadow: '0 0 4px',
        // transition: '2500',
        '&:hover': { boxShadow: '0 0 10px' },
      }}
    />
  );
};

export const EditProfileBtn = () => {
  // const user = useSelector(state => state.user);
  const theme = useTheme();
  const navigate = useNavigate();
  const username = _getItem('username');

  return (
    <Button
      fullWidth
      variant="contained"
      // must be updated to navigate to edit profile page
      onClick={() => navigate(`/${username}/profile`)}
      sx={{
        '&:hover': { backgroundColor: theme.palette.primary.dark },
      }}
    >
      Edit Profile
    </Button>
  );
};

export const UserLocation = ({ country }) => {
  return (
    <Grid item xs={12}>
      <Typography>
        <IconButton
          size="small"
          disableRipple
          disableTouchRipple
          disableFocusRipple
        >
          <LocationOnOutlined />
        </IconButton>
        {country}
      </Typography>
    </Grid>
  );
};

export const UserMetaData = ({ type, data }) => {
  return (
    <Grid item xs={12} sx={{ display: 'flex' }}>
      <IconButton size="small">{IconType[type.toLowerCase()]}</IconButton>
      <Typography
        variant="body2"
        color={colors.grey[700]}
        sx={{ display: 'flex', alignItems: 'center', fontWeight: 'bold' }}
      >
        {type}
      </Typography>
      <Typography
        sx={{
          display: 'flex',
          alignItems: 'center',
          fontWeight: 'bold',
          px: 0.5,
          mt: 0.2,
        }}
      >
        {data}
      </Typography>
    </Grid>
  );
};

export const UserChip = ({ tag }) => {
  return (
    <Stack direction={'row'} gap={'2px'} fontWeight={'bold'}>
      <Chip label={tag.name} />
      <Stack
        sx={{
          alignItems: 'center',
          fontWeight: 'bold',
          color: colors.grey[600],
          justifyContent: 'center',
          fontSize: '0.7rem',
        }}
      >
        x{tag.done}
      </Stack>
    </Stack>
  );
};

export const getSeparateProblems = problemsList => {
  const easyProblems = problemsList?.filter(pb => pb.difficulty === 'easy');
  const mediumProblems = problemsList?.filter(pb => pb.difficulty === 'medium');
  const hardProblems = problemsList?.filter(pb => pb.difficulty === 'hard');

  return [easyProblems.length, mediumProblems.length, hardProblems.length];
};

export const getSeparateUserPbs = problems => {
  const easyPbs = problems?.filter(
    pb => pb.difficulty === 'Easy' && pb.status !== 'Attempted'
  ).length;
  const mediumPbs = problems?.filter(
    pb => pb.difficulty === 'Medium' && pb.status !== 'Attempted'
  ).length;
  const hardPbs = problems?.filter(
    pb => pb.difficulty === 'Hard' && pb.status !== 'Attempted'
  ).length;

  return [easyPbs, mediumPbs, hardPbs];
};
