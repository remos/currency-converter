import React, { useState } from 'react';
import { CurrencyCode, Holding } from 'types';
import { convert, getDecimals } from '../data';

import currencies from '../data/currencies.json';
import CurrencySelector from './CurrencySelector';
import ConversionTrail from './ConversionTrail';

const CurrencyConverter: React.FC = () => {
  const startingCurrency = Object.keys(currencies)[0];
  const [baseValue, setBaseValue] = useState(0);
  const [baseCurrency, setBaseCurrency] = useState<CurrencyCode>(startingCurrency);
  const [termCurrency, setTermCurrency] = useState<CurrencyCode>(startingCurrency);

  let holdings: Holding[];
  if (baseCurrency && termCurrency) {
    holdings = convert(
      {
        currency: baseCurrency,
        amount: baseValue,
      },
      termCurrency
    );
  }

  const decimals = getDecimals(baseCurrency);
  const step = Math.pow(10, -decimals);

  return (
    <>
      <input
        type="number"
        value={baseValue}
        step={step}
        min={0}
        onChange={(e) => setBaseValue(parseFloat(e.target.value))}
      />
      {step}
      <CurrencySelector
        currencies={currencies}
        value={baseCurrency}
        onChange={(e) => setBaseCurrency(e.target.value)}
      />
      <> to </>
      <CurrencySelector
        currencies={currencies}
        value={termCurrency}
        onChange={(e) => setTermCurrency(e.target.value)}
      />
      {holdings && holdings.length ? <ConversionTrail holdings={holdings} /> : null}
    </>
  );
};

export default CurrencyConverter;
