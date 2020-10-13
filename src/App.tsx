import React from 'react';
import CurrencyConverter from './components/CurrencyConverter';
import FullscreenCenter from './components/FullscreenCenter';
import { conversionMap, currencies } from './data';
import { GlobalStyle } from './GlobalStyle';

const App: React.FC = () => (
  <>
    <GlobalStyle />
    <FullscreenCenter>
      <CurrencyConverter currencies={currencies} conversions={conversionMap} />
    </FullscreenCenter>
  </>
);

export default App;
