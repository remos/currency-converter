import { configureStore } from '@reduxjs/toolkit';
import React from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ConversionsMap, RootState } from 'types';

import conversion from '../store/conversion/reducer';
import { Provider } from 'react-redux';
import CurrencyConverter, { triggerRecalculateIfNeeded } from './CurrencyConverter';
import { clearConversion, recalculateConversion } from '../store/conversion/actions';
import { conversionMap, currencies } from '../data';

function wrappedRender(
  ui: React.ReactElement,
  {
    initialState,
    ...renderOptions
  }: {
    initialState?: RootState;
  } = {}
) {
  const store = configureStore({
    reducer: {
      conversion: conversion,
    },
    preloadedState: initialState,
  });

  const Wrapper: React.FC = ({ children }) => (
    <Provider store={store}>{children}</Provider>
  );

  return render(ui, { wrapper: Wrapper, ...renderOptions });
}

function setupCurrencyConverter(
  baseAmount: string,
  baseCurrency: string,
  termCurrency: string,
  conversions: ConversionsMap = conversionMap
) {
  const rendered = wrappedRender(
    <CurrencyConverter currencies={currencies} conversions={conversions} />
  );

  const { getByRole } = rendered;

  const baseAmountInput = getByRole('textbox', { name: 'base amount' });
  const baseCurrencySelect = getByRole('combobox', { name: 'base currency' });
  const termCurrencySelect = getByRole('combobox', { name: 'term currency' });

  userEvent.type(baseAmountInput, baseAmount);
  userEvent.selectOptions(baseCurrencySelect, baseCurrency);
  userEvent.selectOptions(termCurrencySelect, termCurrency);

  return rendered;
}

describe('CurrencyConverter', () => {
  it('Valid conversion', () => {
    const { container, getByRole } = setupCurrencyConverter('12', 'CAD', 'DKK');

    const baseAmountInput = getByRole('textbox', { name: 'base amount' });
    const baseCurrencySelect = getByRole('combobox', { name: 'base currency' });
    const termCurrencySelect = getByRole('combobox', { name: 'term currency' });

    expect(baseAmountInput).toHaveValue('12');
    expect(baseCurrencySelect).toHaveValue('CAD');
    expect(termCurrencySelect).toHaveValue('DKK');

    expect(container).toMatchSnapshot();
  });

  it('Unsanitary value', () => {
    const { container, getByRole } = setupCurrencyConverter('12a', 'CAD', 'DKK');

    const baseAmountInput = getByRole('textbox', { name: 'base amount' });
    const baseCurrencySelect = getByRole('combobox', { name: 'base currency' });
    const termCurrencySelect = getByRole('combobox', { name: 'term currency' });

    expect(baseAmountInput).toHaveValue('12');
    expect(baseCurrencySelect).toHaveValue('CAD');
    expect(termCurrencySelect).toHaveValue('DKK');

    expect(container).toMatchSnapshot();
  });

  it('Dropped decimals when changing base currency', () => {
    const { container, getByRole } = setupCurrencyConverter('12.12', 'CAD', 'DKK');

    const baseAmountInput = getByRole('textbox', { name: 'base amount' });
    const baseCurrencySelect = getByRole('combobox', { name: 'base currency' });
    const termCurrencySelect = getByRole('combobox', { name: 'term currency' });

    expect(baseAmountInput).toHaveValue('12.12');
    expect(baseCurrencySelect).toHaveValue('CAD');
    expect(termCurrencySelect).toHaveValue('DKK');

    expect(container).toMatchSnapshot();

    userEvent.selectOptions(baseCurrencySelect, 'JPY');

    expect(baseAmountInput).toHaveValue('12');
    expect(baseCurrencySelect).toHaveValue('JPY');
    expect(termCurrencySelect).toHaveValue('DKK');
  });
});

describe('triggerRecalculateIfNeeded', () => {
  it('dispatches clear with invalid inputs', () => {
    const dispatch = jest.fn();
    triggerRecalculateIfNeeded(dispatch, '', 15, 'AUD', {});
    expect(dispatch).toHaveBeenLastCalledWith(clearConversion());

    triggerRecalculateIfNeeded(dispatch, 'AUD', Number.NaN, 'AUD', {});
    expect(dispatch).toHaveBeenLastCalledWith(clearConversion());

    triggerRecalculateIfNeeded(dispatch, 'AUD', 15, '', {});
    expect(dispatch).toHaveBeenLastCalledWith(clearConversion());

    triggerRecalculateIfNeeded(dispatch, '', Number.NaN, '', {});
    expect(dispatch).toHaveBeenLastCalledWith(clearConversion());

    triggerRecalculateIfNeeded(dispatch, 'AUD', Number.NaN, '', {});
    expect(dispatch).toHaveBeenLastCalledWith(clearConversion());

    triggerRecalculateIfNeeded(dispatch, '', Number.NaN, 'AUD', {});
    expect(dispatch).toHaveBeenLastCalledWith(clearConversion());

    triggerRecalculateIfNeeded(dispatch, '', 15, '', {});
    expect(dispatch).toHaveBeenLastCalledWith(clearConversion());
  });

  it('dispatches recalculation request with valid inputs', () => {
    const dispatch = jest.fn();
    triggerRecalculateIfNeeded(dispatch, 'AUD', 15, 'JPY', {});
    expect(dispatch).toHaveBeenLastCalledWith(
      recalculateConversion({
        base: {
          currency: 'AUD',
          amount: 15,
        },
        term: 'JPY',
        conversions: {},
      })
    );
  });
});
