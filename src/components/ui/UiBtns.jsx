import {
  Avatar,
  Button,
  colors,
  IconButton,
  Link,
  ListItemText,
  Menu,
  MenuItem,
  Typography,
  useTheme,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useLocation, useNavigate } from 'react-router-dom';
import { NavigateNext } from '@mui/icons-material';
import { useEffect, useState } from 'react';
import { useNotify } from '../../contexts/NotifyContext';
import { _getItem, getUser } from '../../contexts/UserAuth';
import { config, USER_API } from '../../App';
import { useDispatch, useSelector } from 'react-redux';
import { unAuthenticate, useProfile } from '../../states/user';

export const ListBtn = ({ primary, setOpen }) => {
  const url = '/' + primary.toLowerCase().trim();

  return (
    <ListItemText sx={{ maxWidth: '10rem' }}>
      <Typography
        onClick={() => {
          if (setOpen) setOpen(false);
        }}
        onMouseDown={() => {
          if (setOpen) setOpen(false);
        }}
        variant="h6"
        sx={{ letterSpacing: 1 }}
      >
        <Link
          href={url}
          sx={{
            display: 'flex',
            justifyContent: 'center',
            textDecoration: 'none',
            borderRadius: 10,
            py: 1,
            color: colors.deepPurple[400],
            '&:hover, &:focus': {
              outline: 'transparent',
              backgroundColor: colors.deepPurple[500],
              color: '#fff',
              transition: '0.5s',
            },
          }}
        >
          {primary}
        </Link>
      </Typography>
    </ListItemText>
  );
};

export const LoginBtn = ({
  handleClickOnDrawerItem,
  handleMouseDownOnDrawerItem,
}) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { pathname: location } = useLocation();
  const isLoginPage = location === '/accounts/login';

  const handleClick = () => {
    if (handleClickOnDrawerItem) handleClickOnDrawerItem();

    if (isLoginPage) {
      navigate('/accounts/signup');
    } else {
      navigate('/accounts/login');
    }
    return;
  };

  return (
    <Button
      variant="outlined"
      onClick={handleClick}
      onMouseDown={handleMouseDownOnDrawerItem}
      sx={{
        [theme.breakpoints.up('md')]: {
          ml: 4,
        },
        fontSize: '1.05rem',
        color: colors.amber[900],
        borderColor: colors.amber[900],
        borderRadius: 5,
        '&:hover, &:focus': {
          backgroundColor: colors.amber[900],
          borderColor: colors.amber[900],
          color: '#fff',
        },
      }}
    >
      {isLoginPage ? 'Sign up' : 'Login'}
    </Button>
  );
};

export const SignupBtn = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  return (
    <Button
      onClick={() => navigate('/accounts/signup')}
      variant="contained"
      size="large"
      sx={{
        [theme.breakpoints.up('md')]: {
          fontSize: '1.5rem',
        },
        [theme.breakpoints.down('md')]: {
          fontSize: '1.2rem',
        },
        [theme.breakpoints.down('sm')]: {
          fontSize: '1rem',
        },
        borderRadius: 10,
        '&:hover, &:focus': {
          backgroundColor: theme.palette.primary.dark,
        },
      }}
      endIcon={<NavigateNext />}
    >
      Sign up
    </Button>
  );
};

export const SubmitBtn = ({ isSubmitting }) => {
  return (
    <LoadingButton
      loading={isSubmitting}
      type="submit"
      variant="contained"
      sx={{
        borderColor: colors.indigo[800],
        backgroundColor: colors.indigo[800],
        fontSize: '1.1rem',
        '&:hover': {
          borderColor: colors.indigo[900],
          backgroundColor: colors.indigo[900],
        },
      }}
    >
      Submit
    </LoadingButton>
  );
};

/* PROFILE BUTTON */
export const ProfileBtn = ({
  handleClickOnDrawerItem,
  handleMouseDownOnDrawerItem,
}) => {
  const username = _getItem('username');
  const [src, setSrc] = useState('');
  const [anchorElUser, setAnchorElUser] = useState(null);
  const { setSnackbar, refresh } = useNotify();

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

  const handleOpenUserMenu = event => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
    if (handleClickOnDrawerItem) handleClickOnDrawerItem();
  };

  return (
    <>
      <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
        <Avatar src={src} alt="" />
      </IconButton>
      <Menu
        sx={{ mt: '45px' }}
        id="menu-appbar"
        anchorEl={anchorElUser}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={Boolean(anchorElUser)}
        onClose={handleCloseUserMenu}
        onMouseDown={handleMouseDownOnDrawerItem}
      >
        <MenuItem
          key="profile"
          onClick={handleCloseUserMenu}
          onMouseDown={handleMouseDownOnDrawerItem}
        >
          <Typography textAlign="center" sx={{ p: '2px 10px' }}>
            <Link
              href={`/${username}`}
              sx={{ textDecoration: 'none', color: colors.blueGrey[900] }}
            >
              Profile
            </Link>
          </Typography>
        </MenuItem>
        <LogoutMenuItem />
      </Menu>
    </>
  );
};

const LogoutMenuItem = () => {
  const { setSnackbar } = useNotify();
  const { unSetUser } = useProfile();

  const handleLogout = async () => {
    try {
      const response = await fetch(`${USER_API}/logout`, config);
      const data = await response.json();
      if (!data.success) throw new Error(data.message);
      setSnackbar({
        open: true,
        severity: 'success',
        message: data.message,
      });
      unSetUser();
    } catch (error) {
      setSnackbar({
        open: true,
        severity: 'error',
        message: error.message,
      });
    }
  };

  return (
    <MenuItem key="Logout" onClick={() => handleLogout()}>
      <Typography textAlign="center" sx={{ p: '2px 10px' }}>
        <Link
          href="/"
          sx={{ textDecoration: 'none', color: colors.blueGrey[900] }}
        >
          Logout
        </Link>
      </Typography>
    </MenuItem>
  );
};
