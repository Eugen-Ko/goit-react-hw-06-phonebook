import { createSlice } from '@reduxjs/toolkit';

export const filterSlice = createSlice({
  name: 'filter',
  initialState: { value: '' },
  reducers: {
    changeQuery(state, { payload }) {
      state.value = payload;
    },
  },
});

// export const filterReducer = filterSlice.reducer;
// export const { changeQuery } = filterSlice.actions;
