import { configureStore } from '@reduxjs/toolkit';
import modeReducer from './mode';
import problemsReducer from './problems';

const store = configureStore({
  reducer: {
    mode: modeReducer,
    problems: problemsReducer,
  },
});

export default store;
