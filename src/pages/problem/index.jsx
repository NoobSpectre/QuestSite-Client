import { Box, Button, Grid, Stack } from '@mui/material';
import { Helmet } from 'react-helmet-async';
import { useLocation, useNavigate } from 'react-router-dom';
import NotifyUser from '../../components/ui/NotifyUser';
import { Navbar } from '../../components/navbar/Navbar';
import { grey } from '@mui/material/colors';
import { Description } from './Description';
import AnswerArea from './AnswerArea';

const Problem = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { pathname } = location;
  const title_pid = pathname.split('/').slice(-1)[0];

  return (
    <Box>
      <Helmet>
        <title>QuestSite | Problems | {title_pid}</title>
      </Helmet>
      {/* notifies user */}
      <NotifyUser />
      <Box sx={{ boxShadow: '0 0 5px' }}>
        <Navbar />
      </Box>
      <Stack direction={'row'} px={1.5} pt={1.5} gap={2}>
        <Button
          onClick={() => console.log('description')}
          sx={{
            backgroundColor: grey[200],
            color: grey[700],
            fontWeight: 'bold',
          }}
        >
          Description
        </Button>
        <Button
          onClick={() => navigate(`${pathname}/discussions`)}
          sx={{
            backgroundColor: grey[200],
            color: grey[700],
            fontWeight: 'bold',
          }}
        >
          Discussions
        </Button>
      </Stack>
      <Grid container px={1}>
        <Description pid={title_pid} />
        <AnswerArea pid={title_pid} />
      </Grid>
    </Box>
  );
};

export default Problem;
