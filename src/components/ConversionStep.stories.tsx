import React from 'react';
import { Meta, Story } from '@storybook/react';

import ConversionStep from './ConversionStep';
import { currencies } from '../data';

const currencyCodes = Object.keys(currencies);

export default {
  title: 'Conversion Step',
  component: ConversionStep,
  argTypes: {
    baseCurrency: {
      name: 'Base Currency',
      control: {
        type: 'select',
        options: currencyCodes,
      },
    },
    baseAmount: {
      name: 'Base Amount',
      control: {
        type: 'number',
      },
    },
    termCurrency: {
      name: 'Term Currency',
      control: {
        type: 'select',
        options: currencyCodes,
      },
    },
    termAmount: {
      name: 'Term Amount',
      control: {
        type: 'number',
      },
    },
    currencies: {
      name: 'Currencies',
      control: {
        type: 'object',
      },
    },
    from: { control: { type: null } },
    to: { control: { type: null } },
  },
} as Meta;

export const Base: Story = ({
  baseCurrency,
  baseAmount,
  termCurrency,
  termAmount,
  currencies,
}) => (
  <ConversionStep
    from={{
      currency: baseCurrency,
      amount: baseAmount,
    }}
    to={{
      currency: termCurrency,
      amount: termAmount,
    }}
    currencies={currencies}
  />
);

Base.args = {
  baseCurrency: currencyCodes[0],
  baseAmount: 0,
  termCurrency: currencyCodes[currencyCodes.length - 1],
  termAmount: 0,
  currencies: currencies,
};
