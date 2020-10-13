import { configureStore } from '@reduxjs/toolkit';
import React from 'react';

import conversion from '../store/conversion/reducer';
import { Provider } from 'react-redux';
import CurrencyConverter from './CurrencyConverter';
import { Meta, Story, StoryContext } from '@storybook/react';
import { conversionMap, currencies } from '../data';

function decorator(Story: Story, { args: { initialState } }: StoryContext) {
  const store = configureStore({
    reducer: {
      conversion: conversion,
    },
    preloadedState: initialState,
  });

  return (
    <Provider store={store}>
      <Story />
    </Provider>
  );
}

export default {
  title: 'Currency Converter',
  component: CurrencyConverter,
  decorators: [decorator],
} as Meta;

export const Base: Story = () => (
  <CurrencyConverter currencies={currencies} conversions={conversionMap} />
);

export const Error: Story = () => (
  <CurrencyConverter currencies={currencies} conversions={conversionMap} />
);
Error.args = {
  initialState: {
    conversion: {
      error: 'Error: There was an error converting',
      holdings: [],
    },
  },
};

export const WithConversion: Story = () => (
  <CurrencyConverter currencies={currencies} conversions={conversionMap} />
);
WithConversion.args = {
  initialState: {
    conversion: {
      error: null,
      holdings: [
        {
          amount: 1,
          currency: 'USD',
        },
        {
          amount: 2,
          currency: 'AUD',
        },
        {
          amount: 100,
          currency: 'JPY',
        },
      ],
    },
  },
};
