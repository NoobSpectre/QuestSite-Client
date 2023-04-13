import { Grid, Typography, Stack } from '@mui/material';
import {
  Cluster,
  ClusterDivider,
  UserLinearProgress,
  UserOverallProgress,
} from '../../components/customs/Profile';
import {
  EditProfileBtn,
  ProfileAvatar,
  UserChip,
  UserLocation,
  UserMetaData,
} from './ProfileData';

const USER_SUBJECTS = [
  { name: 'Computer Networks', done: 5 },
  { name: 'DBMS', done: 3 },
  { name: 'Distributed Systems', done: 2 },
];
const USER_TOPICS = [
  { name: 'Memory', done: 7 },
  { name: 'Gantt Chart', done: 8 },
  { name: 'SQL', done: 5 },
  { name: 'B- Tree', done: 2 },
  { name: 'Parsers', done: 4 },
  { name: 'Translation', done: 6 },
  { name: 'Rotation', done: 5 },
];

export const MobileLayout = ({ user }) => {
  return (
    <Grid container>
      <Grid item container xs={12} p={1.5}>
        <Cluster>
          <Grid item>
            <ProfileAvatar user={user} />
          </Grid>
          <Grid item xs>
            <Typography variant="h5" fontWeight={'bold'}>
              {user.username}
            </Typography>
            <Typography
              variant="body2"
              fontWeight={'bold'}
              color={'text.secondary'}
            >
              {user.email}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <EditProfileBtn username={user.username} />
          </Grid>
          <Grid item xs={12}>
            {user.location.country !== '' && (
              <UserLocation country={user.location.country} />
            )}
          </Grid>
          {/* More grid items to be added if user has websites and platforms
            linked! - not yet implemented */}
        </Cluster>
      </Grid>
      <Grid item container xs={12} p={2}>
        <Cluster horizontalPos={'center'}>
          <Typography
            variant="h6"
            fontWeight={'bold'}
            sx={{ width: '100%', pl: '2px' }}
          >
            Community Stats
          </Typography>
          <UserMetaData type={'Solution'} data={user.total_solutions} />
          <UserMetaData type={'Discussion'} data={user.total_discussions} />
          <ClusterDivider />
          <Typography
            variant="h6"
            fontWeight={'bold'}
            sx={{ width: '100%', pl: '2px' }}
          >
            Subjects
          </Typography>
          <Grid item container gap={1.5} mb={1} ml={0.5}>
            {USER_SUBJECTS.map(subject => {
              return <UserChip key={subject.name} tag={subject} />;
            })}
          </Grid>
          <ClusterDivider />
          <Typography
            variant="h6"
            fontWeight={'bold'}
            sx={{ width: '100%', pl: '2px' }}
          >
            Topics
          </Typography>
          <Grid item container gap={1.5} mb={1} ml={0.5}>
            {USER_TOPICS.map(topic => {
              return <UserChip key={topic.name} tag={topic} />;
            })}
          </Grid>
        </Cluster>
      </Grid>
      <Grid item container xs={12} p={2}>
        <Cluster>
          <Grid item xs>
            <Typography sx={{ pl: 0.5, fontWeight: 'bold' }}>
              Solved Problems
            </Typography>
          </Grid>
          <Grid item container xs={12} gap={2} justifyContent={'center'}>
            <Grid item>
              <Stack
                position={'relative'}
                sx={{ justifyContent: 'center', alignItems: 'center', px: 1 }}
              >
                <UserOverallProgress solved={user.total_solved} />
                <Stack
                  position={'absolute'}
                  sx={{ justifyContent: 'center', alignItems: 'center' }}
                >
                  <Typography sx={{ fontWeight: 'bold', fontSize: '1.5rem' }}>
                    {user.total_solved}
                  </Typography>
                  <Typography sx={{ fontWeight: 'bold', fontSize: '0.8rem' }}>
                    Solved
                  </Typography>
                </Stack>
              </Stack>
            </Grid>
            <Grid item xs>
              <Stack spacing={2}>
                <Stack>
                  <Stack direction={'row'} justifyContent={'space-between'}>
                    <Typography
                      sx={{ fontSize: '0.7rem', p: 0.5, fontWeight: 'bold' }}
                    >
                      Easy
                    </Typography>
                    <Typography
                      sx={{ fontSize: '0.7rem', p: 0.5, fontWeight: 'bold' }}
                    >
                      28/80
                    </Typography>
                  </Stack>
                  <UserLinearProgress type={'easy'} solved={28} />
                </Stack>
                <Stack>
                  <Stack direction={'row'} justifyContent={'space-between'}>
                    <Typography
                      sx={{ fontSize: '0.7rem', p: 0.5, fontWeight: 'bold' }}
                    >
                      Medium
                    </Typography>
                    <Typography
                      sx={{ fontSize: '0.7rem', p: 0.5, fontWeight: 'bold' }}
                    >
                      11/80
                    </Typography>
                  </Stack>
                  <UserLinearProgress type={'medium'} solved={11} />
                </Stack>
                <Stack>
                  <Stack direction={'row'} justifyContent={'space-between'}>
                    <Typography
                      sx={{ fontSize: '0.7rem', p: 0.5, fontWeight: 'bold' }}
                    >
                      Hard
                    </Typography>
                    <Typography
                      sx={{ fontSize: '0.7rem', p: 0.5, fontWeight: 'bold' }}
                    >
                      3/80
                    </Typography>
                  </Stack>
                  <UserLinearProgress type={'hard'} solved={3} />
                </Stack>
              </Stack>
            </Grid>
          </Grid>
        </Cluster>
      </Grid>
      <Grid item container xs={12} p={2}>
        <Cluster>User Submissions, Solutions & Discussions</Cluster>
      </Grid>
    </Grid>
  );
};
