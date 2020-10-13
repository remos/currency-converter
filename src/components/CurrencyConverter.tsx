import React, { useEffect, useMemo, useState } from 'react';
import { ConversionsMap, CurrenciesMap, CurrencyCode, Holding, RootState } from 'types';
import { getDecimals, currencies as defaultCurrencies, conversionMap } from '../data';
import CurrencySelector from './CurrencySelector';
import ConversionTrail from './ConversionTrail';
import { useSelector } from 'react-redux';
import { dispatch } from '../store';
import { clearConversion, recalculateConversion } from '../store/conversion/actions';
import styled from 'styled-components';
import { sanitiseAmount } from '../data/sanitisation';

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

const Wrapper = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 4px;
  border: 1px solid #aaa;
`;

const AmountInput = styled.input`
  margin-right: 4px;
`;

const InputWrapper = styled.div``;

const ConversionTrailWrapper = styled.div`
  margin-top: 1rem;
`;

const Error = styled.span`
  color: red;
`;

const CurrencyConverter: React.FC<{
  conversions: ConversionsMap;
  currencies: CurrenciesMap;
}> = ({ conversions = conversionMap, currencies = defaultCurrencies }) => {
  const error: string = useSelector<RootState, string>((state) => state.conversion.error);
  const holdings: Holding[] = useSelector<RootState, Holding[]>(
    (state) => state.conversion.holdings
  );

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

  useEffect(() => {
    triggerRecalculateIfNeeded(
      baseCurrency,
      parseFloat(baseValue),
      termCurrency,
      conversions
    );
  }, [baseValue, baseCurrency, termCurrency]);

  return (
    <Wrapper>
      <InputWrapper>
        <AmountInput
          name="base-amount"
          type="text"
          value={baseValue}
          onChange={(e) => {
            const value = e.target.value;
            const sanitised = sanitiseAmount(value, decimals, true);

            if (sanitised === false) {
              setBaseValue(baseValue);
            } else {
              setBaseValue(sanitised);
            }
          }}
        />
        <CurrencySelector
          name="base-currency"
          currencies={currencies}
          value={baseCurrency}
          onChange={(e) => {
            setBaseCurrency(e.target.value);
          }}
        />
        <> to </>
        <CurrencySelector
          name="term-currency"
          currencies={currencies}
          value={termCurrency}
          onChange={(e) => {
            setTermCurrency(e.target.value);
          }}
        />
      </InputWrapper>
      {error ? <Error>{error}</Error> : null}
      {holdings && holdings.length ? (
        <ConversionTrailWrapper>
          <ConversionTrail holdings={holdings} currencies={currencies} />
        </ConversionTrailWrapper>
      ) : null}
    </Wrapper>
  );
};

export default CurrencyConverter;
