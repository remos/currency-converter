import { ConversionsMap, CurrenciesMap, CurrencyCode, Holding } from 'types';
import defaultConversions from './conversions.json';
import defaultCurrencies from './currencies.json';

export { defaultConversions as conversionMap };
export { defaultCurrencies as currencies };

export function getRate(
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
    // No rate mapping is found
    throw new Error(`Could not find conversion from ${from.currency} to ${to}`);
  } else if (typeof rate === 'string') {
    // The conversion goes via a cross currency
    if (visitedCurrencies.indexOf(rate) >= 0) {
      // The currency has previously been visited during this conversion
      throw new Error(`Conversion from ${from.currency} to ${to} looped`);
    }

    const newVisited = [...visitedCurrencies, rate];

    // Get conversion from base to cross currency
    const crossHoldings = recursiveConvert(from, rate, conversions, newVisited);
    // Get conversion from cross to term currency
    const remainingHoldings = recursiveConvert(
      crossHoldings[crossHoldings.length - 1],
      to,
      conversions,
      newVisited
    );

    trail.push(...crossHoldings, ...remainingHoldings);
  } else {
    // Numerical rate (direct or inverse)
    trail.push({
      currency: to,
      amount: from.amount * rate,
    });
  }

  return trail;
}

/**
 * Convert from a base currency to a term currency, given a map of conversion rates
 * @returns An array of holdings, including the base holding visited to reach the term currency
 * @throws Error when the path of a conversion loops or cannot be found
 */
export function convert(
  base: Holding,
  term: CurrencyCode,
  conversions: ConversionsMap
): Holding[] {
  return [{ ...base }, ...recursiveConvert(base, term, conversions)];
}

export function getDecimals(currency: CurrencyCode, currencies: CurrenciesMap): number {
  return currencies[currency]?.decimals || 0;
}

export function formatHolding(holding: Holding, currencies: CurrenciesMap): string {
  const amount = holding.amount.toFixed(getDecimals(holding.currency, currencies));
  return `${amount} ${holding.currency}`;
}
