import { createSlice } from '@reduxjs/toolkit';
import { Holding } from 'types';
import { convert } from '../../data';
import { clearConversion, recalculateConversion } from './actions';

const initialState: {
  error?: string;
  holdings: Holding[];
} = {
  error: null,
  holdings: [],
};

export default createSlice({
  name: 'conversion',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      recalculateConversion,
      (state, { payload: { base, term, conversions } }) => {
        try {
          return {
            error: null,
            holdings: convert(base, term, conversions),
          };
        } catch (e) {
          return {
            error: e.toString(),
            holdings: [],
          };
        }
      }
    );

    builder.addCase(clearConversion, () => {
      return {
        error: null,
        holdings: [],
      };
    });
  },
}).reducer;
