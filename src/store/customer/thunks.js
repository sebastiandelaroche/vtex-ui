import { createAsyncThunk } from '@reduxjs/toolkit';
import * as R from 'ramda';
import http from '../../utils/http';

const evolveCustomer = R.evolve({
  quote: (value) => +value,
  balanceQuote: (value) => +value,
  visitPercentage: (value) => +value
});

export const fetchCustomers = createAsyncThunk(
  'customer/fetch',
  () => {
    return http.get(`/customers`)
      .then(R.prop('data'));
  }
);

export const createCustomers = createAsyncThunk(
  'customer/create',
  (data) => {
    return http.post(`/customers`, evolveCustomer(data), {
      headers: { 'content-type': 'application/json' }
    }).then(R.prop('data'));
  }
);

export const deleteCustomer = createAsyncThunk(
  'customer/delete',
  (id) => {
    return http.delete(`/customers/${id}`)
      .then(R.prop('data'));
  }
);

export const updateCustomer = createAsyncThunk(
  'customer/update',
  (data) => {
    return http.patch(`/customers/${data.id}`, data, {
      headers: { 'content-type': 'application/json' }
    }).then(R.prop('data'));
  }
);
