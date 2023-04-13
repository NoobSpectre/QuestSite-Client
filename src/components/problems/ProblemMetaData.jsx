import {
  Chip,
  Grid,
  IconButton,
  Menu,
  MenuItem,
  Select,
  Stack,
  Tooltip,
  Typography,
} from '@mui/material';
import { ThumbUpOutlined, ThumbDownOutlined } from '@mui/icons-material';
import { amber, blue, green, red, teal } from '@mui/material/colors';
import { useProfile } from '../../states/user';
import { useEffect, useRef, useState } from 'react';

const DIFF = {
  easy: {
    color: green[800],
  },
  medium: {
    color: amber[800],
  },
  hard: {
    color: red[800],
  },
};

export const ProblemChip = ({ difficulty }) => {
  return (
    <Grid item>
      <Chip
        label={difficulty}
        sx={{
          fontWeight: 'bold',
          color: DIFF[difficulty?.toLowerCase()],
          backgroundColor: teal[50],
        }}
      />
    </Grid>
  );
};

export const ProblemStatus = ({ pid }) => {
  const { user } = useProfile();
  const [status, setStatus] = useState('');

  const Stat = {
    solved: { icon: 'S', msg: 'solved' },
    attempted: { icon: 'A', msg: 'attempted' },
  };

  useEffect(() => {
    const pbStat = user.problems?.find(pb => pb.pid === pid);
    if (pbStat) setStatus(pbStat.status);
  }, []);

  if (status === '') return null;

  return (
    <Grid item>
      <Chip label={Stat[status]?.icon} />
    </Grid>
  );
};

export const ProblemLikes = ({ pid, likes }) => {
  return (
    <Grid item>
      <Stack direction={'row'} alignItems={'center'}>
        <IconButton size="small">
          <ThumbUpOutlined htmlColor={blue[500]} fontSize="" />
        </IconButton>
        <Typography color={blue[600]}>{likes}</Typography>
      </Stack>
    </Grid>
  );
};

export const ProblemDislikes = ({ pid, dislikes }) => {
  return (
    <Grid item>
      <Stack direction={'row'} alignItems={'center'}>
        <IconButton size="small">
          <ThumbDownOutlined htmlColor={blue[500]} fontSize="" />
        </IconButton>
        <Typography color={blue[600]}>{dislikes}</Typography>
      </Stack>
    </Grid>
  );
};

export const ProblemDesc = ({ problem }) => {
  const [topic, setTopic] = useState('Topics');

  return (
    <Grid item container gap={2}>
      <Grid item xs={12}>
        <Typography p={1} fontSize={'1.2rem'}>
          {problem?.p_desc}
        </Typography>
      </Grid>
      <Grid item container xs={12} gap={1} alignItems={'center'}>
        <Grid item xs={12} sm={'auto'}>
          <Tooltip title="field" placement="bottom">
            <Chip label={problem.field} sx={{ mx: 1 }} />
          </Tooltip>
        </Grid>
        <Grid item xs={12} sm={'auto'}>
          <Tooltip title="subject" placement="bottom">
            <Chip label={problem.subject} sx={{ mx: 1 }} />
          </Tooltip>
        </Grid>
        <Grid item xs={12} sm={'auto'}>
          {problem?.topics && (
            <Select
              value={topic}
              onChange={() => setTopic('Topics')}
              sx={{ fontSize: '1rem' }}
              size='small'
              fullWidth
            >
              <MenuItem key={'placeholder'} value="Topics" disabled>
                Topics
              </MenuItem>
              {problem?.topics?.map(tp => {
                return (
                  <MenuItem key={tp} value={tp}>
                    {tp}
                  </MenuItem>
                );
              })}
            </Select>
          )}
        </Grid>
      </Grid>
    </Grid>
  );
};
