import React from 'react';
import styled from 'styled-components';
import CurrencyConverter from './components/CurrencyConverter';
import FullscreenCenter from './components/FullscreenCenter';
import { conversionMap, currencies } from './data';
import { GlobalStyle } from './GlobalStyle';

const Wrapper = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 0.5em;
  border: 1px solid #333;
  text-align: center;
  transition: height 1s;
`;

const App: React.FC = () => (
  <>
    <GlobalStyle />
    <FullscreenCenter>
      <Wrapper>
        <CurrencyConverter currencies={currencies} conversions={conversionMap} />
      </Wrapper>
    </FullscreenCenter>
  </>
);

export default App;
