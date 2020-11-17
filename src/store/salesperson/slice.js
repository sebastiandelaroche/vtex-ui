import { createSlice } from '@reduxjs/toolkit';

import { fetchSalespersons } from './thunks';

export default createSlice({
  name: 'salespersons',
  initialState: {
    salespersons: [],
    isLoading: false,
    error: false,
  },
  reducers: {},
  extraReducers: {
    [fetchSalespersons.pending]: (state, action) => {
      state.isLoading = true;
      return state;
    },
    [fetchSalespersons.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.salespersons = action.payload;
      return state;
    },
    [fetchSalespersons.rejected]: (state, action) => {
      state.isLoading = false;
      return state;
    },
  }
});
