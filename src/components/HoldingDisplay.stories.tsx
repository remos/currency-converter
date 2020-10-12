import React from 'react';
import { Meta, Story } from '@storybook/react';

import HoldingDisplay from './HoldingDisplay';
import { currencies } from '../data';

export default {
  title: 'Holding Display',
  component: HoldingDisplay,
  argTypes: {
    holdingCurrency: {
      control: {
        type: 'text',
      },
      defaultValue: Object.keys(currencies)[0],
    },
    holdingAmount: {
      control: {
        type: 'number',
      },
      defaultValue: 1.23,
    },
    currencies: {
      defaultValue: currencies,
    },
    holding: {
      control: {
        type: null,
      },
    },
  },
} as Meta;

export const Base: Story = ({ currencies, holdingCurrency, holdingAmount }) => (
  <HoldingDisplay
    holding={{
      currency: holdingCurrency,
      amount: holdingAmount,
    }}
    currencies={currencies}
  />
);
