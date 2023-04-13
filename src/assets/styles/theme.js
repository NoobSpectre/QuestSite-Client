import { colors, createTheme } from '@mui/material';
import '@fontsource/pt-sans';

/* palette & typography - to be implemented later */

export const theme = createTheme({
  typography: {
    fontFamily: `'PT Sans', sans-serif`,
  },
  components: {
    MuiButton: {
      defaultProps: {
        disableRipple: true,
        disableFocusRipple: true,
        disableTouchRipple: true,
        disableElevation: true,
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          height: '19rem',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root.Mui-focused': {
            '& > fieldset': {
              borderColor: colors.grey[500],
            },
          },
          '& .MuiOutlinedInput-root:hover': {
            '& > fieldset': {
              borderColor: colors.grey[500],
            },
          },
          '& .MuiFormLabel-root': {
            color: colors.grey[700],
          },
          '& .MuiFormLabel-root.Mui-focused': {
            color: colors.grey[700],
          },
          '& .input': {
            color: colors.grey[600],
          },
        },
      },
    },
  },
});
