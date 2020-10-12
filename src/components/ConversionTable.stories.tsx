import React from 'react';
import { Meta, Story } from '@storybook/react';

import ConversionTable from './ConversionTable';
import { conversionMap, currencies } from '../data';

export default {
  title: 'Conversion Table',
  component: ConversionTable,
} as Meta;

export const Base: Story = () => (
  <ConversionTable currencies={currencies} conversions={conversionMap} decimals={4} />
);
