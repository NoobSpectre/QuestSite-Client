import { Grid, Paper, Stack, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useNotify } from '../../contexts/NotifyContext';
import { PROBLEMS_API } from '../../App';

const CommentRow = ({ comment, by }) => {
  return (
    <Grid item xs={12}>
      <Paper component={Stack} sx={{ py: 0.5, px: 2 }}>
        <Typography textAlign={'left'}>
          -<i>{by}</i>
        </Typography>
        <Typography>{comment}</Typography>
      </Paper>
    </Grid>
  );
};

export const Comments = ({ pid }) => {
  const [comments, setComments] = useState([]);
  const { refresh } = useNotify();

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await fetch(`${PROBLEMS_API}/${pid}/discussions`);
        const data = await res.json();
        setComments(data.discussions);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchComments();
  }, [refresh]);

  console.log('comments', comments);

  return (
    <Grid container sx={{ py: 4, px: 10, gap: 2 }}>
      {comments?.map(cmt => {
        return <CommentRow key={cmt._id} comment={cmt.comment} by={cmt.by} />;
      })}
    </Grid>
  );
};
