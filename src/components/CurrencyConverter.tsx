import React, { useState } from 'react';
import { ConversionsMap, CurrenciesMap, CurrencyCode, Holding, RootState } from 'types';
import { getDecimals, currencies as defaultCurrencies, conversionMap } from '../data';
import CurrencySelector from './CurrencySelector';
import ConversionTrail from './ConversionTrail';
import { useSelector } from 'react-redux';
import { dispatch } from '../store';
import { clearConversion, recalculateConversion } from '../store/conversion/actions';

const triggerRecalculateIfNeeded = (
  baseCurrency: CurrencyCode,
  baseAmount: number,
  term: CurrencyCode,
  conversions: ConversionsMap
) => {
  if (!baseCurrency || isNaN(baseAmount) || !term) {
    dispatch(clearConversion());
  } else {
    dispatch(
      recalculateConversion({
        base: {
          currency: baseCurrency,
          amount: baseAmount,
        },
        term,
        conversions,
      })
    );
  }
};

const CurrencyConverter: React.FC<{
  conversions: ConversionsMap;
  currencies: CurrenciesMap;
}> = ({ conversions = conversionMap, currencies = defaultCurrencies }) => {
  const holdings: Holding[] = useSelector<RootState, Holding[]>(
    (state) => state.conversion
  );

  const [baseValue, setBaseValue] = useState(0);
  const [baseCurrency, setBaseCurrency] = useState<CurrencyCode>();
  const [termCurrency, setTermCurrency] = useState<CurrencyCode>();

  const decimals = getDecimals(baseCurrency, currencies);
  const step = isNaN(decimals) ? 1 : 10 ** -decimals;

  return (
    <>
      <input
        type="number"
        value={baseValue}
        step={step}
        min={0}
        onChange={(e) => {
          const amount = parseFloat(e.target.value);
          setBaseValue(amount);
          triggerRecalculateIfNeeded(baseCurrency, amount, termCurrency, conversions);
        }}
      />
      <CurrencySelector
        currencies={currencies}
        value={baseCurrency}
        onChange={(e) => {
          setBaseCurrency(e.target.value);
          triggerRecalculateIfNeeded(
            e.target.value,
            baseValue,
            termCurrency,
            conversions
          );
        }}
      />
      <> to </>
      <CurrencySelector
        currencies={currencies}
        value={termCurrency}
        onChange={(e) => {
          setTermCurrency(e.target.value);
          triggerRecalculateIfNeeded(
            baseCurrency,
            baseValue,
            e.target.value,
            conversions
          );
        }}
      />
      {holdings && holdings.length ? (
        <ConversionTrail holdings={holdings} currencies={currencies} />
      ) : null}
    </>
  );
};

export default CurrencyConverter;
