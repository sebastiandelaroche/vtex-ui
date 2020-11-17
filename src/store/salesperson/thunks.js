import { createAsyncThunk } from '@reduxjs/toolkit';
import * as R from 'ramda';
import http from '../../utils/http';

export const fetchSalespersons = createAsyncThunk(
  'salespersons/fetch',
  () => {
    return http.get(`/salesperson`)
      .then(R.prop('data'));
  }
);
