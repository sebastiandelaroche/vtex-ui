import { configureStore } from '@reduxjs/toolkit';

import customerReducer from './customer/reducers';
import countryReducer from './country/reducers';
import salespersonReducer from './salesperson/reducers';

export default configureStore({
  reducer: {
    customers: customerReducer,
    countries: countryReducer,
    salespersons: salespersonReducer,
  },
});
