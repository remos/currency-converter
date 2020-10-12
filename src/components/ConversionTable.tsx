import React from 'react';
import { ConversionsMap, CurrenciesMap } from 'types';
import { getRate } from '../data';

const ConversionTable: React.FC<{
  currencies: CurrenciesMap;
  conversions: ConversionsMap;
  decimals: number;
}> = ({ currencies, conversions, decimals = 4 }) => {
  const currencyCodes = Object.keys(currencies);

  return (
    <table>
      <tbody>
        <tr>
          <th>/</th>
          {currencyCodes.map((topCurrency) => (
            <th key={topCurrency}>{topCurrency}</th>
          ))}
        </tr>
        {currencyCodes.map((leftCurrency) => (
          <tr key={leftCurrency}>
            <th>{leftCurrency}</th>
            {currencyCodes.map((topCurrency) => {
              const rate = getRate(leftCurrency, topCurrency, conversions);
              return (
                <td key={topCurrency}>
                  {typeof rate === 'number' ? rate.toFixed(decimals) : rate}
                </td>
              );
            })}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ConversionTable;
