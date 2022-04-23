import { configureStore } from '@reduxjs/toolkit';
import { itemsReducer } from './Reducers/itemsSlice';

export const store = configureStore({
  reducer: itemsReducer,
});
