import React from 'react';
import { CurrenciesMap, Holding } from 'types';
import { formatHolding } from '../data';

const HoldingDisplay: React.FC<{
  holding: Holding;
  currencies: CurrenciesMap;
}> = ({ holding, currencies }) => {
  return <>{formatHolding(holding, currencies)}</>;
};

export default HoldingDisplay;
