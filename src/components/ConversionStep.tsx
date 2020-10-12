import React from 'react';
import { Holding } from 'types';
import HoldingDisplay from './HoldingDisplay';

const ConversionStep: React.FC<{
  from: Holding;
  to: Holding;
}> = ({ from, to }) => {
  return (
    <div>
      <HoldingDisplay holding={from} /> = <HoldingDisplay holding={to} />
    </div>
  );
};

export default ConversionStep;
