
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import GlobalScriptsAndStyles from './GlobalScriptsAndStyles';
import App from './App';
import { DataProvider } from './DataProvider';

const ReportCardGenerator = () => (
  <>
    <GlobalScriptsAndStyles />
    <BrowserRouter>
      <DataProvider>
        <App />
      </DataProvider>
    </BrowserRouter>
  </>
);

export default ReportCardGenerator;
