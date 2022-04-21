import { createSlice } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import { contacts } from 'contactData/contacts';
import { nanoid } from 'nanoid';

import storage from 'redux-persist/lib/storage';

const contactSlice = createSlice({
  name: 'contact',
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
      const contactIndex = state.value.findIndex(el => el.id === payload);
      state.value[contactIndex] = {
        ...state.value[contactIndex],
        name: 'qqq',
        phone: '000-000-0000',
      };
    },
    deleteContact(state, { payload }) {
      state.value = state.value.filter(el => el.id !== payload);
    },
  },
});

const persistConfig = {
  key: 'contact',
  storage,
  whitelist: ['value'],
};

export const contactReducer = persistReducer(
  persistConfig,
  contactSlice.reducer
);

export const { addContact, editContact, deleteContact } = contactSlice.actions;
export const getContactList = state => state.value;
