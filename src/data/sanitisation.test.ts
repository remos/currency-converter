import { sanitiseAmount } from './sanitisation';

describe('sanitiseAmount', () => {
  it('returns valid values untouched', () => {
    expect(sanitiseAmount('12', 2, false)).toBe('12');
    expect(sanitiseAmount('12.12', 2, false)).toBe('12.12');
    expect(sanitiseAmount('12.12', 2, true)).toBe('12.12');
    expect(sanitiseAmount('12.', 2, false)).toBe('12.');
    expect(sanitiseAmount('12.', 2, true)).toBe('12.');
  });

  it('returns false with non-numeric inputs', () => {
    expect(sanitiseAmount('12a', 2, false)).toBe(false);
    expect(sanitiseAmount('12.a', 2, false)).toBe(false);
    expect(sanitiseAmount('chocolate', 2, false)).toBe(false);
    expect(sanitiseAmount('chocolate', 0, false)).toBe(false);
    expect(sanitiseAmount('chocolate', 0, true)).toBe(false);
  });

  it('truncates decimals without rounding when truncateDecimals true', () => {
    expect(sanitiseAmount('12.123', 2, false)).toBe('12.12');
    expect(sanitiseAmount('12.126', 2, false)).toBe('12.13');

    expect(sanitiseAmount('12.126', 2, true)).toBe('12.12');
  });

  it('removes decimal when decimals is 0', () => {
    expect(sanitiseAmount('12.323', 0, false)).toBe('12');
    expect(sanitiseAmount('12.626', 0, false)).toBe('13');

    expect(sanitiseAmount('12.626', 0, true)).toBe('12');

    expect(sanitiseAmount('12.', 0, true)).toBe('12');
    expect(sanitiseAmount('12.', 0, true)).toBe('12');
  });
});
