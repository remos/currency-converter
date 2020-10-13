import React from 'react';
import { CurrenciesMap, Holding } from 'types';
import HoldingDisplay from './HoldingDisplay';

const ConversionStep: React.FC<
  {
    from: Holding;
    to: Holding;
    currencies: CurrenciesMap;
  } & React.HTMLAttributes<HTMLDivElement>
> = ({ from, to, currencies, ...props }) => {
  return (
    <div {...props}>
      <HoldingDisplay holding={from} currencies={currencies} /> ={' '}
      <HoldingDisplay holding={to} currencies={currencies} />
    </div>
  );
};

export default ConversionStep;
