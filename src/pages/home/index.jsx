import {
  Box,
  colors,
  Container,
  Grid,
  Typography,
  useTheme,
} from '@mui/material';
import { Image } from 'mui-image';
import { Navbar } from '../../components/navbar/Navbar';
import imgurl from '../../assets/images/main.jpg';
import { SignupBtn } from '../../components/ui/UiBtns';
import { verifyUser } from '../../contexts/UserAuth';
import { Helmet } from 'react-helmet-async';

const Home = () => {
  const theme = useTheme();

  return (
    <Box>
      <Helmet>
        <title>QuestSite | Home</title>
      </Helmet>
      <Navbar />
      <Grid container p={4}>
        <Grid item xs={12} md={6} sx={{ justifyContent: 'center', p: 2 }}>
          <Image src={imgurl} alt="main.jpg" duration={500} />
        </Grid>
        <Grid item xs={12} md={6} sx={{ justifyContent: 'center' }}>
          <Typography
            fontWeight={'bold'}
            sx={{
              [theme.breakpoints.up('lg')]: {
                mt: 12,
              },
              fontSize: 'clamp(0.8rem, 8vw, 3rem)',
              textAlign: 'center',
            }}
          >
            The Best Way To Learn
          </Typography>
          <Typography
            sx={{
              textAlign: 'center',
              color: colors.blueGrey[300],
              py: 2,
              [theme.breakpoints.up('sm')]: {
                px: 6,
                fontSize: '1.2rem',
              },
            }}
          >
            QuestSite is the first and best platform to enhance your knowledge &
            solving speed by practising, and crack any exam.
          </Typography>
          {!verifyUser() && (
            <Container
              sx={{
                display: 'flex',
                justifyContent: 'center',
                p: 2,
              }}
            >
              <SignupBtn />
            </Container>
          )}
        </Grid>
      </Grid>
    </Box>
  );
};

export default Home;
