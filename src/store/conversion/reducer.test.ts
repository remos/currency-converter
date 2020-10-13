import reducer from './reducer';
import { convert } from '../../data';
import { clearConversion, recalculateConversion } from './actions';

jest.mock('../../data');

describe('converison/reducer', () => {
  const mockedConvert = convert as jest.Mock<
    ReturnType<typeof convert>,
    Parameters<typeof convert>
  >;

  afterEach(() => {
    mockedConvert.mockReset();
  });

  it('recalculateConversion expected valid conversion', () => {
    const mockedHoldings = [
      {
        currency: 'AUD',
        amount: 1,
      },
      {
        currency: 'JPY',
        amount: 100,
      },
    ];

    mockedConvert.mockImplementation(() => mockedHoldings);

    expect(
      reducer(
        {
          error: null,
          holdings: [],
        },
        recalculateConversion({
          base: {
            amount: 1,
            currency: 'AUD',
          },
          term: 'JPY',
          conversions: {},
        })
      )
    ).toStrictEqual({
      error: null,
      holdings: mockedHoldings,
    });

    expect(mockedConvert).toHaveBeenCalledTimes(1);
    expect(mockedConvert).toHaveBeenCalledWith(
      {
        amount: 1,
        currency: 'AUD',
      },
      'JPY',
      {}
    );
  });

  it('recalculateConversion expected failed conversion', () => {
    mockedConvert.mockImplementation(() => {
      throw new Error('Failed to convert');
    });

    expect(
      reducer(
        {
          error: null,
          holdings: [],
        },
        recalculateConversion({
          base: {
            amount: 1,
            currency: 'AUD',
          },
          term: 'JPY',
          conversions: {},
        })
      )
    ).toStrictEqual({
      error: new Error('Failed to convert').toString(),
      holdings: [],
    });

    expect(mockedConvert).toHaveBeenCalledTimes(1);
    expect(mockedConvert).toHaveBeenCalledWith(
      {
        amount: 1,
        currency: 'AUD',
      },
      'JPY',
      {}
    );
  });

  it('clearConversion expected result', () => {
    expect(
      reducer(
        {
          error: 'Error',
          holdings: [
            {
              currency: 'AUD',
              amount: 1,
            },
            {
              currency: 'JPY',
              amount: 100,
            },
          ],
        },
        clearConversion()
      )
    ).toStrictEqual({
      error: null,
      holdings: [],
    });
  });
});
