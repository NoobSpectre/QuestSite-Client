import { Snackbar } from '@mui/material';
import { useNotify } from '../../contexts/NotifyContext';
import { Alert } from '../customs/accounts';

const NotifyUser = () => {
  const { snackbar, handleClose } = useNotify();

  return (
    <Snackbar
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      open={snackbar.open}
      autoHideDuration={2000}
      onClose={handleClose}
      message={snackbar.message}
    >
      <Alert
        onClose={handleClose}
        severity={snackbar.severity}
        sx={{ width: '100%' }}
      >
        {snackbar.message}
      </Alert>
    </Snackbar>
  );
};

export default NotifyUser;
