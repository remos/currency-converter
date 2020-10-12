import React from 'react';
import { createGlobalStyle } from 'styled-components';
import CurrencyConverter from './components/CurrencyConverter';

const GlobalStyle = createGlobalStyle`
  html {
    height: 100%;
  }
  body, #root {
    min-height: 100%;
    margin: 0;
  }
`;

const App: React.FC = () => (
  <>
    <GlobalStyle />
    <CurrencyConverter />
  </>
);

export default App;
