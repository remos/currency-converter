import React from 'react';
import { CurrenciesMap, Holding } from 'types';
import ConversionStep from './ConversionStep';

const ConversionTrail: React.FC<{
  holdings: Holding[];
  currencies: CurrenciesMap;
}> = ({ holdings, currencies }) => {
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
    <div>
      {conversionPairs.map((c) => (
        <ConversionStep
          key={`${c[0].currency}-${c[1].currency}`}
          from={c[0]}
          to={c[1]}
          currencies={currencies}
        />
      ))}
      <hr />
      <ConversionStep
        from={holdings[0]}
        to={holdings[holdings.length - 1]}
        currencies={currencies}
      />
    </div>
  );
};

export default ConversionTrail;
