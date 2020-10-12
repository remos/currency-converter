import React from 'react';
import { Holding } from 'types';
import { formatHolding } from '../data';

const HoldingDisplay: React.FC<{
  holding: Holding;
}> = ({ holding }) => {
  return <>{formatHolding(holding)}</>;
};

export default HoldingDisplay;
