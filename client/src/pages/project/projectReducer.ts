import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  project: {}
};

export const projectSlice = createSlice({
  name: 'project',
  initialState,
  reducers: {
    setProject: (state, action) => {
      state.project = action;
    }
  },
});

// Action creators are generated for each case reducer function
export const { } = projectSlice.actions;

export const projectReducer = projectSlice.reducer;