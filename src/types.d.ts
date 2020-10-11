declare module 'types' {
  export type RootState = ReturnType<typeof import('./store').getState>;

  type CurrencyCode = string;

  export interface Holding {
    currency: CurrencyCode;
    amount: number;
  }
}
