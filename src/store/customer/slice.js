import { createSlice } from '@reduxjs/toolkit';

import { fetchCustomers, createCustomers, deleteCustomer, updateCustomer } from './thunks';

export default createSlice({
  name: 'customer',
  initialState: {
    customers: [],
    isLoading: false,
    isCreationLoading: false,
    isUpdatingLoading: false,
    error: false,
  },
  reducers: {},
  extraReducers: {
    [fetchCustomers.pending]: (state, action) => {
      state.isLoading = true;
      return state;
    },
    [fetchCustomers.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.customers = action.payload;
      return state;
    },
    [fetchCustomers.rejected]: (state, action) => {
      state.isLoading = false;
      return state;
    },
    [createCustomers.pending]: (state, action) => {
      state.isCreationLoading = true;
      state.error = false;
      return state;
    },
    [createCustomers.fulfilled]: (state, action) => {
      state.isCreationLoading = false;
      state.error = false;
      state.customers.push(action.payload);
      return state;
    },
    [createCustomers.rejected]: (state, action) => {
      state.isCreationLoading = false;
      state.error = true;
      return state;
    },
    [updateCustomer.pending]: (state, action) => {
      state.isUpdatingLoading = true;
      state.error = false;
      return state;
    },
    [updateCustomer.fulfilled]: (state, action) => {
      state.isUpdatingLoading = false;
      state.error = false;

      const index = state.customers.findIndex(({ id }) => (action.payload.id === id));
      state.customers[index] = { ...action.payload };

      return state;
    },
    [updateCustomer.rejected]: (state, action) => {
      state.isUpdatingLoading = false;
      state.error = true;
      return state;
    },
    [deleteCustomer.pending]: (state, action) => {
      state.error = false;
      return state;
    },
    [deleteCustomer.fulfilled]: (state, action) => {
      state.error = false;
      state.customers = state.customers
        .filter(({ id }) => (id !== action.payload))
      return state;
    },
    [deleteCustomer.rejected]: (state, action) => {
      state.error = true;
      return state;
    }
  }
});
