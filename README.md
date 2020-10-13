# currency-converter
[![codecov](https://codecov.io/gh/remos/currency-converter/branch/master/graph/badge.svg)](https://codecov.io/gh/remos/currency-converter)
[![Mutation testing badge](https://img.shields.io/endpoint?style=flat&url=https%3A%2F%2Fbadge-api.stryker-mutator.io%2Fgithub.com%2Fremos%2Fcurrency-converter%2Fmaster)](https://dashboard.stryker-mutator.io/reports/github.com/remos/currency-converter/master)

Very basic web app written in typescript to convert an amount from a base currency to another, provided a lookup map of rates and currencies to "cross" via during the conversion.

## Quickstart:
```
yarn
yarn serve
```
Then visit http://localhost:8080

## Considerations
* If the conversions and currencies maps were to become larger, loading could be performed asynchronously.
* The conversion itself could be performed in a web worker if the number of cross-via's became an issue and started to impact rendering performance.
* The cross-via map could be generate on the fly/when rates are updated to find the most cost effective route to the desired currency.

## Libraries
Built using React + Redux with styled-components to keep styling beside the components using it.

## Testing
Utilises jest, stryker and storybook with the storyshots addon for snapshot testing.

Stryker mutates code in attempt to catch faulty/missing tests and flags when tests do *not* fail due to the mutations

## CI/CD
Builds using travisci and deploys to [github pages](https://remos.github.io/currency-converter/)

## Scripts
```
yarn build
```
Builds app into `dist` directory using webpack

```
yarn test
```
Runs jest unit tests

```
yarn test:stryker
```
Runs stryker mutation testing

```
yarn storybook
```
Builds and runs storybook