import { createAction } from '@reduxjs/toolkit';
import { ConversionsMap, CurrencyCode, Holding } from 'types';

export const recalculateConversion = createAction<{
  base: Holding;
  term: CurrencyCode;
  conversions: ConversionsMap;
}>('recalculateConversion');

export const clearConversion = createAction('clearConversion');
