import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

import BorrowedLoans from "./BorrowedLoans"

ReactDOM.render(
  <React.StrictMode>
    {/* <App /> */}
    <BorrowedLoans />
  </React.StrictMode>,
  document.getElementById('root')
);