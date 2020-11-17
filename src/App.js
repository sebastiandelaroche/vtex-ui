import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import './App.css';
import Root from "./containers/Root";

const App = () => (
  <BrowserRouter>
    <Root />
  </BrowserRouter>
);

export default App;
