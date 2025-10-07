
import React from 'react';
import { HashRouter } from 'react-router-dom';
import GlobalScriptsAndStyles from './GlobalScriptsAndStyles';
import App from './App';
import { DataProvider } from './DataProvider';

const ReportCardGenerator = () => (
  <>
    <GlobalScriptsAndStyles />
    <HashRouter>
      <DataProvider>
        <App />
      </DataProvider>
    </HashRouter>
  </>
);

export default ReportCardGenerator;
