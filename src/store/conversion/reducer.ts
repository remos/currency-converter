import { createSlice } from '@reduxjs/toolkit';
import { Holding } from 'types';
import { convert } from '../../data';
import { clearConversion, recalculateConversion } from './actions';

const initialState: Holding[] = [];

export default createSlice({
  name: 'conversion',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      recalculateConversion,
      (state, { payload: { base, term, conversions } }) => {
        return convert(base, term, conversions);
      }
    );

    builder.addCase(clearConversion, () => {
      return [];
    });
  },
}).reducer;
