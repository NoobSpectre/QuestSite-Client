import {
  Button,
  FormControlLabel,
  Grid,
  Paper,
  Radio,
  RadioGroup,
  Stack,
  TextField,
  Tooltip,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { PROBLEMS_API, config } from '../../App';
import { useNotify } from '../../contexts/NotifyContext';
import { grey } from '@mui/material/colors';
import { _getItem, verifyUser } from '../../contexts/UserAuth';
import { LoadingButton } from '@mui/lab';

const SubmitAnswer = ({ pid, userAnswer, type }) => {
  const [loading, setLoading] = useState(false);
  const username = _getItem('username');
  const { setSnackbar } = useNotify();

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${PROBLEMS_API}/${pid}`, {
        ...config,
        method: 'POST',
        body: JSON.stringify({ username, userAnswer }),
      });

      const data = await response.json();
      if (!data.success) throw new Error('Submission failed!');
      const { message } = data;
      if (message === 'wrong') throw new Error('Wrong answer!');
      setLoading(false);
      setSnackbar({
        open: true,
        severity: 'success',
        message: 'Successful submission!',
      });
    } catch (error) {
      setLoading(false);
      setSnackbar({ open: true, severity: 'error', message: error.message });
    }
  };

  const TOOLTIP_TITLE = {
    mcq: 'Choose an option first!',
    nat: 'Write your answer first!',
  };

  return (
    <Stack direction={'row'} width={'100%'} justifyContent={'flex-end'}>
      {!verifyUser() && (
        <Tooltip title="Login or signup to submit" placement="top">
          <span>
            <Button variant="contained" disabled>
              Submit
            </Button>
          </span>
        </Tooltip>
      )}
      {userAnswer === '' && (
        <Tooltip title={TOOLTIP_TITLE[type]} placement="top">
          <span>
            <Button variant="contained" disabled>
              Submit
            </Button>
          </span>
        </Tooltip>
      )}
      {verifyUser() && !loading && userAnswer !== '' && (
        <LoadingButton
          loading={loading}
          variant="contained"
          onClick={handleSubmit}
        >
          Submit
        </LoadingButton>
      )}
    </Stack>
  );
};

const MCQ = ({ pid, options }) => {
  const [userAnswer, setUserAnswer] = useState('');
  let optA, optB, optC, optD;
  if (options) {
    [optA, optB, optC, optD] = options;
  }
  return (
    <Paper sx={{ py: 2, px: 3, width: '100%' }} elevation={3}>
      <RadioGroup
        aria-labelledby={pid}
        value={userAnswer}
        onChange={e => setUserAnswer(e.target.value)}
        sx={{ width: '100%' }}
      >
        <FormControlLabel
          value="A"
          control={<Radio />}
          label={optA?.A}
          sx={{ backgroundColor: grey[100], borderRadius: 1 }}
        />
        <FormControlLabel value="B" control={<Radio />} label={optB?.B} />
        <FormControlLabel
          value="C"
          control={<Radio />}
          label={optC?.C}
          sx={{ backgroundColor: grey[100], borderRadius: 1 }}
        />
        <FormControlLabel value="D" control={<Radio />} label={optD?.D} />
      </RadioGroup>
      <SubmitAnswer pid={pid} userAnswer={userAnswer} type="mcq" />
    </Paper>
  );
};

const NAT = ({ pid }) => {
  const [userAnswer, setUserAnswer] = useState('');

  return (
    <Paper
      component={Stack}
      sx={{ p: 5, width: '100%' }}
      elevation={3}
      justifyContent={'space-between'}
    >
      <TextField
        id="NAT"
        variant="standard"
        value={userAnswer}
        onChange={e => setUserAnswer(e.target.value)}
        placeholder="Write your answer here"
        helperText="Only write the value"
        autoComplete='off'
        autoCorrect='off'
      />
      <SubmitAnswer pid={pid} userAnswer={userAnswer} type="nat" />
    </Paper>
  );
};

const AnswerArea = ({ pid }) => {
  const [problem, setProblem] = useState({});
  const { setSnackbar } = useNotify();

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
  }, []);

  return (
    <Grid item container px={1} xs={12} md={6}>
      {problem.p_type === 'MCQ' ? (
        <MCQ pid={pid} options={problem.options} />
      ) : (
        <NAT pid={pid} />
      )}
    </Grid>
  );
};
export default AnswerArea;
