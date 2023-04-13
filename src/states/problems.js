import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  problems: [],
};

export const problemsSlice = createSlice({
  name: 'problems',
  initialState,
  reducers: {
    setProblems: (state, action) => {
      const pbs = action.payload;
      state.problems = pbs;
    },
  },
});

export const { setProblems } = problemsSlice.actions;

export default problemsSlice.reducer;
