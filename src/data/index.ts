import { ConversionsMap, CurrenciesMap, CurrencyCode, Holding } from 'types';
import defaultConversions from './conversions.json';
import defaultCurrencies from './currencies.json';

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

function recursiveConvert(
  from: Holding,
  to: CurrencyCode,
  conversions: ConversionsMap,
  visitedCurrencies: CurrencyCode[] = [from.currency]
): Holding[] {
  const trail = [];

  const rate = getRate(from.currency, to, conversions);
  if (rate === null) {
    throw new Error(`Could not find conversion from ${from.currency} to ${to}`);
  } else if (typeof rate === 'string') {
    if (visitedCurrencies.indexOf(rate) >= 0) {
      throw new Error(`Conversion from ${from.currency} to ${to} looped`);
    }

    const newVisited = [...visitedCurrencies, rate];

    const crossHoldings = recursiveConvert(from, rate, conversions, newVisited);

    trail.push(
      ...crossHoldings,
      ...recursiveConvert(
        crossHoldings[crossHoldings.length - 1],
        to,
        conversions,
        newVisited
      )
    );
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
  return [{ ...from }, ...recursiveConvert(from, to, conversions)];
}

export function getDecimals(
  currency: CurrencyCode,
  currencies: CurrenciesMap = defaultCurrencies
): number {
  return currencies[currency]?.decimals;
}

export function formatHolding(
  holding: Holding,
  currencies: CurrenciesMap = defaultCurrencies
): string {
  const amount = holding.amount.toFixed(getDecimals(holding.currency, currencies));
  return `${amount} ${holding.currency}`;
}
