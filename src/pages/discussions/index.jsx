import { Box, Button, Container, Grid, Stack, TextField } from '@mui/material';
import { Helmet } from 'react-helmet-async';
import { useLocation, useNavigate } from 'react-router-dom';
import NotifyUser from '../../components/ui/NotifyUser';
import { Navbar } from '../../components/navbar/Navbar';
import { grey } from '@mui/material/colors';
import { Form } from './Form';
import { Comments } from './Comments';

const Discussion = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const title_pid = pathname.split('/')[2];

  return (
    <Box>
      <Helmet>
        <title>QuestSite | Problem | {title_pid} | Discussions</title>
      </Helmet>
      {/* notifies user */}
      <NotifyUser />
      <Box sx={{ boxShadow: '0 0 5px' }}>
        <Navbar />
      </Box>
      <Stack direction={'row'} p={1.5} gap={2}>
        <Button
          onClick={() => navigate(`/problems/${title_pid}`)}
          sx={{
            backgroundColor: grey[200],
            color: grey[700],
            fontWeight: 'bold',
          }}
        >
          Description
        </Button>
        <Button
          sx={{
            backgroundColor: grey[200],
            color: grey[700],
            fontWeight: 'bold',
          }}
        >
          Discussions
        </Button>
      </Stack>
      <Container maxWidth="xl" sx={{ px: 15 }}>
        <Form pid={title_pid} />
      </Container>
      <Comments pid={title_pid} />
    </Box>
  );
};
export default Discussion;
