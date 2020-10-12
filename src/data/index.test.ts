import { convert, formatHolding, conversionMap } from '.';

describe('convert', () => {
  it('1:1 same currency', () => {
    expect(
      convert(
        {
          currency: 'AUD',
          amount: 2.12,
        },
        'AUD',
        conversionMap
      )
    ).toMatchInlineSnapshot(`
      Array [
        Object {
          "amount": 2.12,
          "currency": "AUD",
        },
        Object {
          "amount": 2.12,
          "currency": "AUD",
        },
      ]
    `);
  });

  it('Converts directly', () => {
    expect(
      convert(
        {
          currency: 'AUD',
          amount: 2,
        },
        'USD',
        conversionMap
      )
    ).toMatchInlineSnapshot(`
      Array [
        Object {
          "amount": 2,
          "currency": "AUD",
        },
        Object {
          "amount": 1.6742,
          "currency": "USD",
        },
      ]
    `);
  });

  it('Converts via inverse', () => {
    expect(
      convert(
        {
          currency: 'USD',
          amount: 2,
        },
        'AUD',
        conversionMap
      )
    ).toMatchInlineSnapshot(`
      Array [
        Object {
          "amount": 2,
          "currency": "USD",
        },
        Object {
          "amount": 2.3892008123282764,
          "currency": "AUD",
        },
      ]
    `);
  });

  it('Converts via a cross currency direct', () => {
    expect(
      convert(
        {
          currency: 'AUD',
          amount: 1,
        },
        'JPY',
        conversionMap
      )
    ).toMatchInlineSnapshot(`
      Array [
        Object {
          "amount": 1,
          "currency": "AUD",
        },
        Object {
          "amount": 0.8371,
          "currency": "USD",
        },
        Object {
          "amount": 100.410145,
          "currency": "JPY",
        },
      ]
    `);
  });

  it('Converts via a cross currency with inverse', () => {
    expect(
      convert(
        {
          currency: 'AUD',
          amount: 1,
        },
        'NZD',
        conversionMap
      )
    ).toMatchInlineSnapshot(`
      Array [
        Object {
          "amount": 1,
          "currency": "AUD",
        },
        Object {
          "amount": 0.8371,
          "currency": "USD",
        },
        Object {
          "amount": 1.0801290322580643,
          "currency": "NZD",
        },
      ]
    `);
  });

  it('Converts via two cross currencies', () => {
    expect(
      convert(
        {
          currency: 'CAD',
          amount: 1,
        },
        'CZK',
        conversionMap
      )
    ).toMatchInlineSnapshot(`
      Array [
        Object {
          "amount": 1,
          "currency": "CAD",
        },
        Object {
          "amount": 0.8711,
          "currency": "USD",
        },
        Object {
          "amount": 0.7073487616727567,
          "currency": "EUR",
        },
        Object {
          "amount": 19.52480639870077,
          "currency": "CZK",
        },
      ]
    `);
  });

  it('Converts via a cross currency with inferred cross', () => {
    expect(
      convert(
        {
          currency: 'CAD',
          amount: 100,
        },
        'AUD',
        conversionMap
      )
    ).toMatchInlineSnapshot(`
      Array [
        Object {
          "amount": 100,
          "currency": "CAD",
        },
        Object {
          "amount": 87.11,
          "currency": "USD",
        },
        Object {
          "amount": 104.06164138095808,
          "currency": "AUD",
        },
      ]
    `);
  });

  it('Does not error with zero inverse conversion rate', () => {
    expect(
      convert(
        {
          currency: 'USD',
          amount: 100,
        },
        'AUD',
        {
          'AUD-USD': 0,
        }
      )
    ).toMatchInlineSnapshot(`
      Array [
        Object {
          "amount": 100,
          "currency": "USD",
        },
        Object {
          "amount": 0,
          "currency": "AUD",
        },
      ]
    `);
  });

  it('Throws error when no path exists', () => {
    expect(() =>
      convert(
        {
          currency: 'MXN',
          amount: 2,
        },
        'USD',
        conversionMap
      )
    ).toThrowErrorMatchingInlineSnapshot(`"Could not find conversion from MXN to USD"`);
  });

  it('Throws error when path loops', () => {
    expect(() =>
      convert(
        {
          currency: 'AUD',
          amount: 2,
        },
        'JPY',
        {
          'AUD-JPY': 'USD',
          'AUD-USD': 'JPY',
        }
      )
    ).toThrowErrorMatchingInlineSnapshot(`"Conversion from AUD to JPY looped"`);
  });

  it('Throws error when path loops to base currency', () => {
    expect(() =>
      convert(
        {
          currency: 'AUD',
          amount: 2,
        },
        'JPY',
        {
          'AUD-JPY': 'AUD',
        }
      )
    ).toThrowErrorMatchingInlineSnapshot(`"Conversion from AUD to JPY looped"`);
  });
});

describe('formatHolding', () => {
  it('Formats currencies as expected', () => {
    const getMap = (decimals: number) => ({
      AUD: {
        decimals,
        name: 'Australian Dollar',
      },
    });

    expect(
      formatHolding(
        {
          currency: 'AUD',
          amount: 0,
        },
        getMap(2)
      )
    ).toBe('0.00 AUD');

    expect(
      formatHolding(
        {
          currency: 'AUD',
          amount: 12.34567,
        },
        getMap(2)
      )
    ).toBe('12.35 AUD');

    expect(
      formatHolding(
        {
          currency: 'AUD',
          amount: 12.34567,
        },
        getMap(0)
      )
    ).toBe('12 AUD');
  });
});
