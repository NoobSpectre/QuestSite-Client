import { BrowserRouter } from 'react-router-dom';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { theme } from './assets/styles/theme';
import { _getItem } from './contexts/UserAuth';
import { Routes } from './routes/routes';
import { useEffect } from 'react';
import { useProfile } from './states/user';
import { useNotify } from './contexts/NotifyContext';

export const USER_API = 'http://localhost:4001/api/v1/users';
export const PROBLEMS_API = 'http://localhost:4001/api/v1/problems';

export const config = {
  method: 'GET',
  withCredentials: true,
  credentials: 'include',
  headers: {
    'Content-Type': 'application/json',
  },
};

export default function App() {
  const { setUser, unSetUser } = useProfile();
  const { setSnackbar, refresh } = useNotify();

  const fetchUser = async username => {
    console.log('app.js');
    try {
      const res = await fetch(`${USER_API}/${username}`, config);
      const data = await res.json();
      if (!data.success) throw new Error(data.message);
      setUser(data.user);
    } catch (error) {
      unSetUser();
      setSnackbar({ open: true, severity: 'error', message: error.message });
    }
  };

  useEffect(() => {
    const username = _getItem('username');
    if (username) fetchUser(username);
  }, [refresh]);

  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Routes />
      </ThemeProvider>
    </BrowserRouter>
  );
}
