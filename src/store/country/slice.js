import { createSlice } from '@reduxjs/toolkit';

import { fetchCountries } from './thunks';

export default createSlice({
  name: 'countries',
  initialState: {
    countries: [],
    isLoading: false,
    error: false,
  },
  reducers: {},
  extraReducers: {
    [fetchCountries.pending]: (state, action) => {
      state.isLoading = true;
      return state;
    },
    [fetchCountries.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.countries = action.payload;
      return state;
    },
    [fetchCountries.rejected]: (state, action) => {
      state.isLoading = false;
      return state;
    }
  }
});
