import { Grid, Typography } from '@mui/material';
import { PROBLEMS_API } from '../../App';
import { useNotify } from '../../contexts/NotifyContext';
import { useEffect, useState } from 'react';
import {
  ProblemChip,
  ProblemDesc,
  ProblemDislikes,
  ProblemLikes,
  ProblemStatus,
} from '../../components/problems/ProblemMetaData';

export const Description = ({ pid }) => {
  const [problem, setProblem] = useState({});
  const { setSnackbar, refresh } = useNotify();

  useEffect(() => {
    const fetchProblem = async () => {
      try {
        const response = await fetch(`${PROBLEMS_API}/${pid}`);
        const data = await response.json();
        if (!data.success) throw new Error(data.message);
        setProblem(data.problem);
      } catch (error) {
        setSnackbar({ open: true, severity: 'error', message: error.message });
      }
    };

    fetchProblem();
  }, [refresh]);

  return (
    <Grid item container p={1} xs={12} md={6} gap={1}>
      <Grid item xs={12} gap={1} alignItems={'center'}>
        <Typography fontWeight={'bold'}>{pid}.</Typography>
      </Grid>
      <Grid item container xs={12} px={1} gap={2} alignItems={'center'}>
        <ProblemChip difficulty={problem.difficulty} />
        <ProblemStatus pid={pid} />
        <ProblemLikes likes={problem.likes} pid={pid} />
        <ProblemDislikes dislikes={problem.dislikes} pid={pid} />
      </Grid>
      <Grid item xs={12}>
        <ProblemDesc problem={problem} />
      </Grid>
    </Grid>
  );
};
