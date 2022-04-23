import { itemsSlice } from 'redux/Reducers/itemsSlice';
import { filterSlice } from 'redux/Reducers/filterSlice';

export const getItemsList = state => state.contacts.items.value;
export const itemsReducer = itemsSlice.reducer;
export const { addContact, editContact, deleteContact } = itemsSlice.actions;

export const getFilterQuery = state => state.contacts.filter.value;
export const filterReducer = filterSlice.reducer;
export const { changeQuery } = filterSlice.actions;
