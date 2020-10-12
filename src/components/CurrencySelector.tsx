import React, { ChangeEventHandler } from 'react';
import { CurrenciesMap, CurrencyCode } from 'types';

const CurrencySelector: React.FC<{
  value: CurrencyCode;
  currencies: CurrenciesMap;
  onChange: ChangeEventHandler<HTMLSelectElement>;
}> = ({ currencies, onChange, value }) => {
  return (
    <select onChange={onChange} value={value}>
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