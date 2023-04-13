import { Box, Container, Grid } from '@mui/material';
import NotifyUser from '../../components/ui/NotifyUser';
import { Navbar } from '../../components/navbar/Navbar';
import { Helmet } from 'react-helmet-async';
import FilterField from '../../components/problems/FilterField';
import Table from '../../components/problems/Table';

const Problems = () => {
  return (
    <Box>
      <Helmet>
        <title>QuestSite | Problems</title>
      </Helmet>
      {/* Notifies the user */}
      <NotifyUser />
      <Box sx={{ boxShadow: '0 0 5px' }}>
        <Navbar />
      </Box>
      <Container>
        <Grid container gap={2} mt={5} mb={5}>
          <FilterField type="field" selectedField={'CS'} />
          <FilterField type="subject" selectedField={'DSA'} />
          <FilterField type="difficulty" selectedField={''} />
        </Grid>
        <Box py={1}>
          <Table />
        </Box>
      </Container>
    </Box>
  );
};

export default Problems;
