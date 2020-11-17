import React, { lazy, Suspense } from 'react';
import { Route, Redirect } from 'react-router-dom';

import Header from '../../components/Header';

const Customers = lazy(() => import('../Customers'));

const Root = () => {
  return (
    <>
      <Header />
      <div>
        <Suspense fallback={<div>Loading...</div>}>
          <Route path='/customers' exact component={Customers} />
          <Route path='/customers/:id' exact component={Customers} />
          <Redirect to='/customers' />
        </Suspense>
      </div>
    </>
  );
}

export default Root;
