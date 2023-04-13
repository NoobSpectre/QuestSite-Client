import {
  IconButton,
  InputAdornment,
  Paper,
  styled,
  TextField,
  useMediaQuery,
} from '@mui/material';
import {
  AccountCircle,
  Email,
  Visibility,
  VisibilityOff,
} from '@mui/icons-material';
import { forwardRef, useState } from 'react';
import MuiAlert from '@mui/material/Alert';

export const AccountPaper = styled(Paper)(({ theme }) => ({
  backgroundColor: '#fff',
  padding: '1.5rem',
  width: useMediaQuery(`(min-width: 400px)`) ? '22rem' : 'auto',
  [theme.breakpoints.up('sm')]: {
    width: '28rem',
  },
  [theme.breakpoints.up('md')]: {
    width: '32rem',
  },
}));

// const iconColor = colors.grey[600];

const FieldIcon = {
  Username: <AccountCircle />,
  Email: <Email />,
  Password: <VisibilityOff />,
  'Confirm password': <VisibilityOff />,
  showPassword: <Visibility />,
};

export const AccountField = ({ field, fieldProps, error, helperText }) => {
  const [showPwd, setShowPwd] = useState(false);
  const toggleShowPwd = () => {
    setShowPwd(prev => !prev);
  };

  const pwd =
    field === 'Password' || field === 'Confirm password' ? true : false;

  return (
    <TextField
      fullWidth
      {...fieldProps}
      error={error}
      helperText={helperText}
      type={pwd ? (showPwd ? 'text' : 'password') : 'text'}
      id={field.toLowerCase().replace(' ', '')}
      name={field.toLowerCase().replace(' ', '')}
      label={field}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end" onClick={pwd ? toggleShowPwd : null}>
            <IconButton aria-label={`${field}-Icon`}>
              {showPwd ? FieldIcon['showPassword'] : FieldIcon[field]}
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
};

export const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
