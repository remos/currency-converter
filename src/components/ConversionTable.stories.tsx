import React from 'react';
import { Meta, Story } from '@storybook/react';

import ConversionTable from './ConversionTable';
import { conversionMap, currencies } from '../data';

export default {
  title: 'Conversion Table',
  component: ConversionTable,
} as Meta;

export const Base: Story = ({ currencies, conversions, decimals }) => (
  <ConversionTable
    currencies={currencies}
    conversions={conversions}
    decimals={decimals}
  />
);

Base.args = {
  decimals: 4,
  currencies: currencies,
  conversions: conversionMap,
};
