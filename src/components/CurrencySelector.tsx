import React, { SelectHTMLAttributes } from 'react';
import { CurrenciesMap, CurrencyCode } from 'types';

const CurrencySelector: React.FC<
  {
    currencies: CurrenciesMap;
    value?: CurrencyCode;
  } & SelectHTMLAttributes<HTMLSelectElement>
> = ({ currencies, value, ...rest }) => {
  return (
    <select value={value} {...rest}>
      <option />
      {Object.keys(currencies).map((code) => (
        <option value={code} key={code}>
          {code}
        </option>
      ))}
    </select>
  );
};

export default CurrencySelector;
