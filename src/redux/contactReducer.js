// import {  } from 'redux/Reducers/itemsSlice';
import { itemsReducer, filterReducer } from 'redux/dataSelector';
import { combineReducers } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
  key: 'contacts',
  storage,
  // whitelist: ['items', 'filter'],
};

const contactsReducer = combineReducers({
  items: itemsReducer,
  filter: filterReducer,
});

export const persistedContactReducer = persistReducer(
  persistConfig,
  contactsReducer
);
