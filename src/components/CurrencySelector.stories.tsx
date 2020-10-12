import React from 'react';
import { Meta, Story } from '@storybook/react';

import CurrencySelector from './CurrencySelector';
import { currencies } from '../data';

export default {
  title: 'Currency Selector',
  component: CurrencySelector,
  argTypes: {
    currencies: {
      defaultValue: currencies,
    },
    onChange: {
      action: 'changed',
    },
    value: {
      control: {
        type: 'text',
      },
    },
  },
} as Meta;

export const Base: Story = ({ currencies, onChange }) => (
  <CurrencySelector currencies={currencies} onChange={onChange} />
);

Base.argTypes = {
  value: {
    control: {
      type: null,
    },
  },
};

export const Controlled: Story = ({ currencies, onChange, value }) => (
  <CurrencySelector currencies={currencies} onChange={onChange} value={value} />
);

Controlled.args = {
  value: Object.keys(currencies)[0],
};
