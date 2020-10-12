import React from 'react';
import { Holding } from 'types';
import ConversionStep from './ConversionStep';

const ConversionTrail: React.FC<{
  holdings: Holding[];
}> = ({ holdings }) => {
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
        <ConversionStep key={`${c[0].currency}-${c[1].currency}`} from={c[0]} to={c[1]} />
      ))}
      <hr />
      <ConversionStep from={holdings[0]} to={holdings[holdings.length - 1]} />
    </div>
  );
};

export default ConversionTrail;
