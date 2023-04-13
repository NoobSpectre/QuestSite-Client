import { Box, Button, Stack, TextField, Tooltip } from '@mui/material';
import { useRef, useState } from 'react';
import { PROBLEMS_API, config } from '../../App';
import { _getItem, verifyUser } from '../../contexts/UserAuth';
import { useNotify } from '../../contexts/NotifyContext';

export const Form = ({ pid }) => {
  const [msg, setMsg] = useState('');
  const msgRef = useRef();
  const username = _getItem('username');
  const { setSnackbar, setRefresh } = useNotify();

  const handleSubmit = async () => {
    try {
      const res = await fetch(`${PROBLEMS_API}/${pid}/discussions`, {
        ...config,
        method: 'PATCH',
        body: JSON.stringify({ comment: msg, username }),
      });

      const data = await res.json();
      if (!data.success) throw new Error(data.message);
      setRefresh(prev => !prev);
      setSnackbar({ open: true, severity: 'success', message: data.message });
    } catch (error) {
      setSnackbar({ open: true, severity: 'error', message: error.message });
    }
  };

  return (
    <Box component={'form'}>
      <TextField
        ref={msgRef}
        id="discussion-textarea"
        value={msg}
        onChange={e => setMsg(e.target.value)}
        placeholder="Write your message here..."
        multiline
        fullWidth
      />
      <Stack direction={'row'} justifyContent={'flex-end'} gap={2} py={1}>
        <Button
          variant="contained"
          onClick={() => {
            setMsg('');
            msgRef.current.focus();
          }}
        >
          reset
        </Button>
        {!verifyUser() && (
          <Tooltip title="Login or signup to join the discussion!">
            <span>
              <Button variant="contained" disabled>
                submit
              </Button>
            </span>
          </Tooltip>
        )}
        {msg === '' && verifyUser() && (
          <Tooltip title="Can't send empty message!">
            <span>
              <Button variant="contained" disabled>
                submit
              </Button>
            </span>
          </Tooltip>
        )}
        {verifyUser() && msg !== '' && (
          <Button variant="contained" onClick={handleSubmit}>
            submit
          </Button>
        )}
      </Stack>
    </Box>
  );
};
