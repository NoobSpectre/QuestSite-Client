import { useDispatch, useSelector } from 'react-redux';
import { PROBLEMS_API } from '../../App';
import { setProblems } from '../../states/problems';
import { useNotify } from '../../contexts/NotifyContext';
import { useEffect } from 'react';
import { Grid } from '@mui/material';
import TableHeader from './TableHeader';
import TableRow from './TableRow';

const Table = () => {
  const problems = useSelector(state => state.problems);
  const dispatch = useDispatch();
  const { setSnackbar } = useNotify();

  const fetchAllProblems = async () => {
    try {
      const response = await fetch(`${PROBLEMS_API}/all`);
      const data = await response.json();
      if (!data.success) throw new Error(data.message);
      dispatch(setProblems(data.problems));
    } catch (error) {
      setSnackbar({ open: true, severity: 'error', message: error.message });
    }
  };

  let PROBLEMS = [];
  useEffect(() => {
    fetchAllProblems();
  }, []);

  if (problems && problems.problems) {
    for (let pb of problems.problems) {
      const { pid, p_desc, accepted, submissions, difficulty } = pb;
      const row = {
        pid,
        p_desc,
        difficulty,
        acceptance: submissions === 0 ? 0 : (accepted * 100) / submissions,
      };

      PROBLEMS.push(row);
    }
  }

  return (
    <Grid container>
      <TableHeader />
      <Grid item container>
        {PROBLEMS.map(problem => {
          return <TableRow key={problem.pid} problem={problem} />;
        })}
      </Grid>
    </Grid>
  );
};
export default Table;
