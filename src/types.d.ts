declare module 'types' {
  export type RootState = ReturnType<typeof import('./store').getState>;
}
