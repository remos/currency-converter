import React from 'react';
import { Meta, Story } from '@storybook/react';

import ConversionTrail from './ConversionTrail';
import { currencies } from '../data';

export default {
  title: 'Conversion Trail',
  component: ConversionTrail,
  parameters: {
    controls: {
      hideNoControlsWarning: true,
    },
  },
} as Meta;

export const Base: Story = () => (
  <ConversionTrail
    currencies={currencies}
    holdings={[
      {
        currency: 'AUD',
        amount: 12,
      },
      {
        currency: 'USD',
        amount: 10,
      },
      {
        currency: 'JPY',
        amount: 1000,
      },
    ]}
  />
);
