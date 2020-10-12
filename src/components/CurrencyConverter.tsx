import React, { useState } from 'react';
import { ConversionsMap, CurrenciesMap, CurrencyCode, Holding, RootState } from 'types';
import { getDecimals, currencies as defaultCurrencies, conversionMap } from '../data';
import CurrencySelector from './CurrencySelector';
import ConversionTrail from './ConversionTrail';
import { useSelector } from 'react-redux';
import { dispatch } from '../store';
import { clearConversion, recalculateConversion } from '../store/conversion/actions';
import styled from 'styled-components';

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

const InputWrapper = styled.div`
  margin: 1rem;
`;

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

  const [baseValue, setBaseValue] = useState(0);
  const [baseCurrency, setBaseCurrency] = useState<CurrencyCode>();
  const [termCurrency, setTermCurrency] = useState<CurrencyCode>();

  const decimals = getDecimals(baseCurrency, currencies);
  const step = isNaN(decimals) ? 1 : 10 ** -decimals;

  return (
    <Wrapper>
      <InputWrapper>
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
