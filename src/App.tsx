import React from 'react';
import { createGlobalStyle } from 'styled-components';
import CurrencyConverter from './components/CurrencyConverter';
import FullscreenCenter from './components/FullscreenCenter';
import { conversionMap, currencies } from './data';

export const GlobalStyle = createGlobalStyle`
  body {
    font-family: sans-serif;
    font-size: 14px;
  }
`;

const App: React.FC = () => (
  <>
    <GlobalStyle />
    <FullscreenCenter>
      <CurrencyConverter currencies={currencies} conversions={conversionMap} />
    </FullscreenCenter>
  </>
);

export default App;
