import { Box, Button, Grid, Tooltip, Typography } from '@mui/material';
import { useProfile } from '../../states/user';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { _getItem } from '../../contexts/UserAuth';
import { USER_API, config } from '../../App';

const BoxStyle = {
  py: 1,
  px: 0.5,
  cursor: 'default',
  outline: '2px solid black',
  outlineOffset: -2.5,
};

const RowStyle = {
  fontSize: { xs: '0.8rem', sm: '1rem' },
  textAlign: 'center',
};

const StatusCol = ({ pid }) => {
  const username = _getItem('username');
  const [status, setStatus] = useState('');

  const Stat = {
    Solved: { icon: 'S', msg: 'solved' },
    Attempted: { icon: 'A', msg: 'attempted' },
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch(`${USER_API}/${username}`, { ...config });
        const data = await res.json();
        if (!data.success) throw new Error(data.message);
        const pbStat = data.user?.problems?.find(pb => pb.pid === pid);
        if (pbStat) setStatus(pbStat?.status);
        // console.log('pbStat', pbStat);
      } catch (error) {
        console.log(error.message);
      }
    };
    if (username) fetchUser();
  }, []);

  return (
    <Grid item xs={2} sm={1}>
      <Box sx={BoxStyle}>
        {status === '' ? (
          <Typography
            overflow={'hidden'}
            sx={{ ...RowStyle, cursor: 'default' }}
          >
            <span
              style={{ color: 'transparent' }}
              onClick={() => console.log('null')}
            >
              null
            </span>
          </Typography>
        ) : (
          <Typography
            sx={{ ...RowStyle, cursor: 'default' }}
          >
            <Tooltip title={Stat[status]?.msg} placement='left'>
              <span sx={{color: 'black', fontSize: '0.7rem', p: 0}} size='small'>
                {Stat[status]?.icon}
              </span>
            </Tooltip>
          </Typography>
        )}
      </Box>
    </Grid>
  );
};

const ProblemCol = ({ pid, problem }) => {
  const navigate = useNavigate();
  return (
    <Grid item xs overflow={'hidden'}>
      <Typography
        onClick={() => navigate(`/problems/${pid}`)}
        sx={{
          ...RowStyle,
          overflow: 'hidden',
          textAlign: 'left',
          whiteSpace: 'nowrap',
          textOverflow: 'ellipsis',
          cursor: 'pointer',
          outline: '2px solid black',
          outlineOffset: -2.5,
          p: 1,
        }}
      >
        {pid}. {problem}
      </Typography>
    </Grid>
  );
};

const DifficultyCol = ({ difficulty }) => {
  return (
    <Grid item xs={2} sm={1}>
      <Box sx={BoxStyle}>
        <Typography overflow={'hidden'} sx={RowStyle}>
          {difficulty}
        </Typography>
      </Box>
    </Grid>
  );
};

const AcceptanceCol = ({ acceptance }) => {
  return (
    <Grid item xs={2} sm={1}>
      <Box sx={BoxStyle}>
        <Typography overflow={'hidden'} sx={RowStyle}>
          {acceptance} %
        </Typography>
      </Box>
    </Grid>
  );
};

const TableRow = ({ problem }) => {
  return (
    <Grid item container xs={12}>
      <StatusCol pid={problem.pid} />
      <ProblemCol pid={problem.pid} problem={problem.p_desc} />
      <DifficultyCol difficulty={problem.difficulty} />
      <AcceptanceCol acceptance={problem.acceptance} />
    </Grid>
  );
};

export default TableRow;
