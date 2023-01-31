import { configureStore } from '@reduxjs/toolkit';
import { projectApi, projectReducer } from '../pages';

export const store = configureStore({
  reducer: {
    project: projectReducer,
    [projectApi.reducerPath]: projectApi.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(projectApi.middleware)
});