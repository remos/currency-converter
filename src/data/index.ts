import { CurrencyCode, Holding } from 'types';
import defaultConversions from './conversions.json';
import defaultCurrencies from './currencies.json';

type ConversionsMap = Record<string, string | number>;
interface CurrencyInfo {
  name: string;
  decimals: number;
}
type CurrenciesMap = Record<string, CurrencyInfo>;

function getRate(
  from: CurrencyCode,
  to: CurrencyCode,
  conversions: ConversionsMap
): number | string {
  if (from === to) {
    return 1.0;
  }

  const key = `${from}-${to}`;
  if (key in conversions) {
    return conversions[key];
  } else {
    const inverseKey = `${to}-${from}`;

    if (inverseKey in conversions) {
      const rate = conversions[inverseKey];
      if (typeof rate === 'number') {
        return rate === 0 ? 0 : 1 / rate; // avoid division by zero
      } else {
        return rate;
      }
    }
  }

  return null;
}

function stepsOnlyConvert(
  from: Holding,
  to: CurrencyCode,
  conversions: ConversionsMap
): Holding[] {
  const trail = [];

  const rate = getRate(from.currency, to, conversions);
  if (rate === null) {
    throw new Error(`Could not find conversion from ${from.currency} to ${to}`);
  } else if (typeof rate === 'string') {
    trail.push(...stepsOnlyConvert(from, rate, conversions));
    trail.push(...stepsOnlyConvert(trail[trail.length - 1], to, conversions));
  } else {
    trail.push({
      currency: to,
      amount: from.amount * rate,
    });
  }

  return trail;
}

export function convert(
  from: Holding,
  to: CurrencyCode,
  conversions: ConversionsMap = defaultConversions
): Holding[] {
  return [{ ...from }, ...stepsOnlyConvert(from, to, conversions)];
}

export function formatHolding(
  holding: Holding,
  currencies: CurrenciesMap = defaultCurrencies
): string {
  return `${holding.amount.toFixed(currencies[holding.currency].decimals)} ${
    holding.currency
  }`;
}
