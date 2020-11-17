import { createAsyncThunk } from '@reduxjs/toolkit';
import * as R from 'ramda';
import http from '../../utils/http';

export const fetchCountries = createAsyncThunk(
  'countries/fetch',
  () => {
    return http.get(`/countries`)
      .then(R.prop('data'));
  }
);
