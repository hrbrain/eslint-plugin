# ESLint plugin for HRBrain

[![npm version](https://badge.fury.io/js/%40hrbrain%2Feslint-plugin.svg)](https://badge.fury.io/js/%40hrbrain%2Feslint-plugin)
![LICENSE Apache-2.0](https://img.shields.io/badge/license-Apache--2.0-green.svg?style=flat-square)

## Usage

```bash
npm install -D @hrbrain/eslint-plugin eslint

# or

yarn add -D @hrbrain/eslint-plugin eslint
```

```js
// use plugin:

module.exports = {
  parser: "@typescript-eslint/parser",
  parserOptions: { sourceType: "module" },
  plugins: ["@hrbrain"],
  ecmaFeatures: {
    jsx: true,
  },
  rules: {
    "@hrbrain/no-multiple-named-imports": "warn",
    // ...
  },
};
```

```js
// use config:

module.exports = {
  extends: ["plugin:@hrbrain/recommended"],
};
```

## [Rules](https://github.com/hrbrain/eslint-plugin/blob/master/docs/rules/README.md)

## [Configs](https://github.com/hrbrain/eslint-plugin/tree/master/lib/configs)

## Development

This projects use `yarn`.😺

### Create new rule

```bash
yarn gen:rule
```

### Create sandbox

Sandbox means environment that running ESLint as actual.

```bash
yarn gen:sandbox
```

Then, you can run ESLint.

```bash
yarn sandbox
```

### Release

This package use [shipjs](https://github.com/algolia/shipjs).

1. You should add file `.env` at project's root.
   Then, add token of your GitHub's.

```
GITHUB_TOKEN=token_is_here
```

2. Run `yarn release` and answer the some question from prompt.
3. Merge PR made by shipjs like this https://github.com/hrbrain/eslint-plugin/pull/24

Good!! This package is released by GitHub Actions!! Congrats!!

## LICENSE (Apache-2.0)

See [LICENSE](https://github.com/hrbrain/eslint-plugin/blob/master/LICENSE)
