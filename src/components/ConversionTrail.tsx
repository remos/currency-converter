import React from 'react';
import styled from 'styled-components';
import { CurrenciesMap, Holding } from 'types';
import ConversionStep from './ConversionStep';

const WrapperDiv = styled.div`
  font-family: monospace;
`;

const FinalStep = styled(ConversionStep)`
  font-weight: bold;
  font-size: 1.1em;
`;

const ConversionTrail: React.FC<{
  holdings: Holding[];
  currencies: CurrenciesMap;
}> = ({ holdings, currencies }) => {
  // Create an array of overlapping pairs to display (e.g. [[a, b], [b, c]])
  const conversionPairs = holdings.reduce<[Holding, Holding][]>((prev, current, i) => {
    if (prev.length > 0) {
      prev[prev.length - 1][1] = current;
    }

    if (i < holdings.length - 1) {
      prev.push([current, null]);
    }

    return prev;
  }, []);

  return (
    <WrapperDiv>
      {conversionPairs.map((c) => (
        <ConversionStep
          key={`${c[0].currency}-${c[1].currency}`}
          from={c[0]}
          to={c[1]}
          currencies={currencies}
        />
      ))}
      <hr />
      <FinalStep
        from={holdings[0]}
        to={holdings[holdings.length - 1]}
        currencies={currencies}
      />
    </WrapperDiv>
  );
};

export default ConversionTrail;
