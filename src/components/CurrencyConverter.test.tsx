import { configureStore } from '@reduxjs/toolkit';
import React from 'react';
import { render } from '@testing-library/react';
import { RootState } from 'types';

import conversion from '../store/conversion/reducer';
import { Provider } from 'react-redux';
import { triggerRecalculateIfNeeded } from './CurrencyConverter';
import { clearConversion, recalculateConversion } from '../store/conversion/actions';

function wrappedRender(
  ui: React.ReactElement,
  {
    initialState,
    ...renderOptions
  }: {
    initialState: RootState;
  }
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
