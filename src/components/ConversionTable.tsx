import React from 'react';
import styled from 'styled-components';
import { ConversionsMap, CurrenciesMap } from 'types';
import { getRate } from '../data';
import classNames from 'classnames';

const Table = styled.table`
  &,
  & th,
  & td {
    border: 1px solid black;
    border-collapse: collapse;
  }

  & th {
    background-color: #ddd;
  }

  & th,
  & td {
    padding: 2px 5px;
  }

  & td.unity {
    opacity: 0.5;
  }

  & td.numerical {
    font-weight: bold;
  }
`;

const ConversionTable: React.FC<{
  currencies: CurrenciesMap;
  conversions: ConversionsMap;
  decimals: number;
}> = ({ currencies, conversions, decimals = 4 }) => {
  const currencyCodes = Object.keys(currencies);

  return (
    <Table>
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
                <td
                  key={topCurrency}
                  className={classNames({
                    unity: rate === 1,
                    numerical: typeof rate === 'number',
                  })}
                >
                  {typeof rate === 'number' ? rate.toFixed(decimals) : rate}
                </td>
              );
            })}
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default ConversionTable;
