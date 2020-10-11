import { convert, formatHolding } from '.';

describe('convert', () => {
  it('1:1 same currency', () => {
    expect(
      convert(
        {
          currency: 'AUD',
          amount: 2.12,
        },
        'AUD'
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
        'USD'
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
        'AUD'
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
        'JPY'
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
        'NZD'
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

  it('Converts via a cross currency with inferred cross', () => {
    expect(
      convert(
        {
          currency: 'CAD',
          amount: 100,
        },
        'AUD'
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

  it('Throws Error', () => {
    expect(() =>
      convert(
        {
          currency: 'MXN',
          amount: 2,
        },
        'USD'
      )
    ).toThrowErrorMatchingInlineSnapshot(`"Could not find conversion from MXN to USD"`);
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
