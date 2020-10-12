declare module 'types' {
  export type RootState = ReturnType<typeof import('./store').getState>;

  type CurrencyCode = string;

  export type ConversionsMap = Record<string, string | number>;

  export interface CurrencyInfo {
    name: string;
    decimals: number;
  }

  export type CurrenciesMap = Record<string, CurrencyInfo>;

  export interface Holding {
    currency: CurrencyCode;
    amount: number;
  }
}
