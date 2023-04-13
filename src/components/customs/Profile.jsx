import {
  CircularProgress,
  circularProgressClasses,
  colors,
  Divider,
  Grid,
  LinearProgress,
  linearProgressClasses,
  Paper,
  styled,
  useMediaQuery,
} from '@mui/material';

export const Cluster = ({ horizontalPos, children }) => {
  return (
    <Paper
      component={Grid}
      item
      container
      justifyContent={horizontalPos ? horizontalPos : ''}
      sx={{ width: '100%', p: 1, backgroundColor: '#efefef', gap: 1 }}
    >
      {children}
    </Paper>
  );
};

export const ClusterDivider = styled(Divider)(() => ({
  width: '97%',
  borderBottomWidth: 2,
}));

export const UserOverallProgress = ({ solved }) => {
  const isSmallScreen = useMediaQuery('max-width: 380px');
  const _size = isSmallScreen ? '4rem' : '7rem';

  const TOTAL_PROBLEMS = 80;
  let value = 0;
  if (TOTAL_PROBLEMS > 0) value = (solved / TOTAL_PROBLEMS) * 100;

  return (
    <CircularProgress
      variant="determinate"
      value={value}
      size={_size}
      thickness={2.2}
      sx={{
        m: '1rem auto',
        position: 'relative',
        backgroundColor: 'red',
        borderRadius: '100%',
        color: colors.orange[700],
        [`&.${circularProgressClasses.colorPrimary}`]: {
          backgroundColor: '#ccc',
        },
        [`& .${circularProgressClasses.circle}`]: {
          strokeLinecap: 'round',
        },
        '&::before': {
          content: '""',
          position: 'absolute',
          inset: 6,
          borderRadius: '100%',
          backgroundColor: '#efefef',
          zIndex: -1,
        },
      }}
    />
  );
};

const problemType = {
  easy: {
    bgColor: 'rgba(116, 242, 150, 0.7)',
    barColor: 'rgba(8, 150, 8)',
  },
  medium: {
    bgColor: 'rgba(247, 231, 82, 0.7)',
    barColor: 'rgba(250, 153, 7)',
  },
  hard: {
    bgColor: 'rgba(245, 164, 171, 0.7)',
    barColor: 'rgba(250, 5, 5)',
  },
};

export const UserLinearProgress = ({ type, solved, problems }) => {
  let value = 0;
  if (problems > 0) value = (solved / problems) * 100;

  return (
    <LinearProgress
      variant="determinate"
      value={value}
      sx={{
        height: 5,
        borderRadius: 10,
        height: '8px',
        [`&.${linearProgressClasses.colorPrimary}`]: {
          backgroundColor: problemType[type].bgColor,
        },
        [`& .${linearProgressClasses.bar}`]: {
          borderRadius: 10,
          backgroundColor: problemType[type].barColor,
        },
      }}
    />
  );
};
