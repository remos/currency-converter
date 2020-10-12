import React from 'react';
import { createGlobalStyle } from 'styled-components';
import CurrencyConverter from './components/CurrencyConverter';
import { conversionMap, currencies } from './data';

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
    <CurrencyConverter currencies={currencies} conversions={conversionMap} />
  </>
);

export default App;
