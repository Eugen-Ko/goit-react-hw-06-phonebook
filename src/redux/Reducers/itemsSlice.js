import { createSlice } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import { contacts } from 'contactData/contacts';
import { nanoid } from 'nanoid';

import storage from 'redux-persist/lib/storage';

const itemsSlice = createSlice({
  name: 'items',
  initialState: { value: contacts },
  reducers: {
    addContact(state, { payload }) {
      state.value = [
        {
          createdAt: Date.now(),
          id: nanoid(),
          name: payload.name,
          email: payload.email,
          phone: payload.phone,
        },
        ...state.value,
      ];
    },
    editContact(state, { payload }) {
      const contactIndex = state.value.findIndex(el => el.id === payload.id);
      state.value[contactIndex] = {
        ...state.value[contactIndex],
        name: payload.name,
        email: payload.email,
        phone: payload.phone,
      };
    },
    deleteContact(state, { payload }) {
      state.value = state.value.filter(el => el.id !== payload);
    },
  },
});

const persistConfig = {
  key: 'items',
  storage,
  whitelist: ['value'],
};

export const itemsReducer = persistReducer(
  persistConfig,
  itemsSlice.reducer
);

export const { addContact, editContact, deleteContact } = itemsSlice.actions;
export const getItemsList = state => state.value;
