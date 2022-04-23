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
