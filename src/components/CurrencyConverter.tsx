import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { ConversionsMap, CurrenciesMap, CurrencyCode, Holding, RootState } from 'types';
import { getDecimals } from '../data';
import CurrencySelector from './CurrencySelector';
import ConversionTrail from './ConversionTrail';
import { useDispatch, useSelector } from 'react-redux';
import { clearConversion, recalculateConversion } from '../store/conversion/actions';
import styled from 'styled-components';
import { sanitiseAmount } from '../data';
import { Dispatch } from 'redux';

export const triggerRecalculateIfNeeded = (
  dispatch: Dispatch,
  baseCurrency: CurrencyCode,
  baseAmount: number,
  term: CurrencyCode,
  conversions: ConversionsMap
): void => {
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

const AmountInput = styled.input`
  margin-right: 4px;
  text-align: right;
`;

const InputWrapper = styled.div``;

const ConversionTrailWrapper = styled.div`
  margin-top: 1rem;
`;

const Error = styled.div`
  color: red;
  margin-top: 1rem;
`;

const CurrencyConverter: React.FC<{
  conversions: ConversionsMap;
  currencies: CurrenciesMap;
}> = ({ conversions, currencies }) => {
  const error: string = useSelector<RootState, string>((state) => state.conversion.error);
  const holdings: Holding[] = useSelector<RootState, Holding[]>(
    (state) => state.conversion.holdings
  );
  const dispatch = useDispatch();

  const currencyCodes = Object.keys(currencies);

  const [baseValue, setBaseValue] = useState<string>('');
  const [baseCurrency, setBaseCurrency] = useState<CurrencyCode>(currencyCodes[0]);
  const [termCurrency, setTermCurrency] = useState<CurrencyCode>(currencyCodes[0]);

  const decimals = useMemo(() => getDecimals(baseCurrency, currencies), [baseCurrency]);

  useEffect(() => {
    const sanitised = sanitiseAmount(baseValue, decimals, false);
    if (sanitised !== false && sanitised !== baseValue) {
      setBaseValue(sanitised);
    }
  }, [decimals]);

  const checkRecalculate = useCallback(
    (baseCurrency, baseValue, termCurrency) => {
      triggerRecalculateIfNeeded(
        dispatch,
        baseCurrency,
        parseFloat(baseValue),
        termCurrency,
        conversions
      );
    },
    [dispatch, conversions]
  );

  return (
    <>
      <InputWrapper>
        <AmountInput
          name="base-amount"
          aria-label="base amount"
          type="text"
          value={baseValue}
          onChange={(e) => {
            const value = e.target.value;
            const sanitised = sanitiseAmount(value, decimals, true);

            if (sanitised === false) {
              setBaseValue(baseValue);
            } else {
              setBaseValue(sanitised);
              checkRecalculate(baseCurrency, sanitised, termCurrency);
            }
          }}
        />
        <CurrencySelector
          name="base-currency"
          aria-label="base currency"
          currencies={currencies}
          value={baseCurrency}
          onChange={(e) => {
            setBaseCurrency(e.target.value);
            checkRecalculate(e.target.value, baseValue, termCurrency);
          }}
        />
        <> to </>
        <CurrencySelector
          name="term-currency"
          aria-label="term currency"
          currencies={currencies}
          value={termCurrency}
          onChange={(e) => {
            setTermCurrency(e.target.value);
            checkRecalculate(baseCurrency, baseValue, e.target.value);
          }}
        />
      </InputWrapper>
      {error ? <Error>{error}</Error> : null}
      {holdings && holdings.length ? (
        <ConversionTrailWrapper>
          <ConversionTrail holdings={holdings} currencies={currencies} />
        </ConversionTrailWrapper>
      ) : null}
    </>
  );
};

export default CurrencyConverter;
