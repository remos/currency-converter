import { recalculateConversion, clearConversion } from './actions';

describe('conversion/actions', () => {
  it('recalculateConversion expected action', () => {
    expect(
      recalculateConversion({
        base: {
          amount: 1,
          currency: 'AUD',
        },
        term: 'JPY',
        conversions: {},
      })
    ).toStrictEqual({
      type: 'recalculateConversion',
      payload: {
        base: {
          amount: 1,
          currency: 'AUD',
        },
        term: 'JPY',
        conversions: {},
      },
    });
  });

  it('clearConversion expected action', () => {
    expect(clearConversion()).toStrictEqual({
      type: 'clearConversion',
      payload: undefined,
    });
  });
});
