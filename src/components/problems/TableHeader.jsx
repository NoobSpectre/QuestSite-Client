import { Box, Grid, Tooltip, Typography } from '@mui/material';

const TableHeader = () => {
  const BoxStyle = {
    py: 1,
    px: 0.5,
    cursor: 'default',
    outline: '2px solid black',
    outlineOffset: -2.5,
  };

  const HeaderDataStyle = {
    fontSize: { xs: '0.8rem', sm: '1rem' },
    textAlign: 'center',
  };

  return (
    <Grid item container>
      <Grid item xs={2} sm={1}>
        <Box sx={BoxStyle}>
          <Tooltip title="Status" placement="top" arrow>
            <Typography overflow={'hidden'} sx={HeaderDataStyle}>
              Status
            </Typography>
          </Tooltip>
        </Box>
      </Grid>
      <Grid item xs>
        <Box sx={BoxStyle}>
          <Tooltip title="Problem" placement="top" arrow followCursor>
            <Typography
              overflow={'hidden'}
              sx={{ ...HeaderDataStyle, textAlign: 'left', px: 0.6 }}
            >
              Problem
            </Typography>
          </Tooltip>
        </Box>
      </Grid>
      <Grid item xs={2} sm={1}>
        <Box sx={BoxStyle}>
          <Tooltip title="Difficulty" placement="top" arrow>
            <Typography overflow={'hidden'} sx={HeaderDataStyle}>
              Difficulty
            </Typography>
          </Tooltip>
        </Box>
      </Grid>
      <Grid item xs={2} sm={1}>
        <Box sx={BoxStyle}>
          <Tooltip title="Acceptance" placement="top" arrow>
            <Typography overflow={'hidden'} sx={HeaderDataStyle}>
              Acceptance
            </Typography>
          </Tooltip>
        </Box>
      </Grid>
    </Grid>
  );
};
export default TableHeader;
