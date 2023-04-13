import { createContext, useContext, useState } from 'react';

const NotifyContext = createContext();

export const useNotify = () => useContext(NotifyContext);

const NotifyProvider = ({ children }) => {
  const [snackbar, setSnackbar] = useState({
    open: false,
    severity: '',
    message: '',
  });

  const [refresh, setRefresh] = useState(false);

  const handleClose = (e, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setSnackbar({
      ...snackbar,
      open: false,
    });
  };

  return (
    <NotifyContext.Provider
      value={{
        snackbar,
        setSnackbar,
        handleClose,
        refresh,
        setRefresh,
      }}
    >
      {children}
    </NotifyContext.Provider>
  );
};

export default NotifyProvider;
