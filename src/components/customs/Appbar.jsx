import { Box, colors, List, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import '@fontsource/kaushan-script';
import '@fontsource/edu-nsw-act-foundation';
import '@fontsource/inter';

export const AppbarContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '2px 3rem',
}));

export const AppbarHeader = styled(Typography)(() => ({
  padding: '4px',
  fontSize: '2.5rem',
  fontWeight: 'bold',
  fontFamily: `'inter', sans-serif`,
  color: colors.indigo[900],
}));

export const AppbarList = styled(List)(() => ({
  display: 'flex',
  flexGrow: 2,
  justifyContent: 'flex-end',
  alignItems: 'center',
  gap: '1rem',
}));
