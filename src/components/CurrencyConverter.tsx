import React, { useState } from 'react';
import { ConversionsMap, CurrenciesMap, CurrencyCode, Holding } from 'types';
import {
  convert,
  getDecimals,
  currencies as defaultCurrencies,
  conversionMap,
} from '../data';
import CurrencySelector from './CurrencySelector';
import ConversionTrail from './ConversionTrail';

const CurrencyConverter: React.FC<{
  conversions: ConversionsMap;
  currencies: CurrenciesMap;
}> = ({ conversions = conversionMap, currencies = defaultCurrencies }) => {
  const [baseValue, setBaseValue] = useState(0);
  const [baseCurrency, setBaseCurrency] = useState<CurrencyCode>();
  const [termCurrency, setTermCurrency] = useState<CurrencyCode>();

  let holdings: Holding[];
  if (baseCurrency && termCurrency) {
    holdings = convert(
      {
        currency: baseCurrency,
        amount: baseValue,
      },
      termCurrency,
      conversions
    );
  }

  const decimals = getDecimals(baseCurrency, currencies);
  const step = isNaN(decimals) ? 1 : Math.pow(10, -decimals);

  return (
    <>
      <input
        type="number"
        value={baseValue}
        step={step}
        min={0}
        onChange={(e) => setBaseValue(parseFloat(e.target.value))}
      />
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
      {holdings && holdings.length ? (
        <ConversionTrail holdings={holdings} currencies={currencies} />
      ) : null}
    </>
  );
};

export default CurrencyConverter;
