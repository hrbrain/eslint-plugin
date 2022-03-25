# ESLint plugin for [HRBrain](https://www.hrbrain.jp/)

[![GitHub Packages](https://img.shields.io/badge/package-GitHub-red.svg?style=flat-square)](https://github.com/hrbrain/eslint-plugin/packages/)
![LICENSE Apache-2.0](https://img.shields.io/badge/license-Apache--2.0-green.svg?style=flat-square)
[![deploy](https://img.shields.io/badge/deploy-🛳%20Ship.js-blue?style=flat)](https://github.com/algolia/shipjs)

## Usage

`<your-project>/.npmrc`

```
@hrbrain:registry=https://npm.pkg.github.com
```

```bash
yarn add -D @hrbrain/eslint-plugin eslint
```

`<your-project>/.eslintrc.js`

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

## [Rules](./docs/rules)

## [Configs](./lib/configs)

## Contributing

Thanks!! We prepare [contributing guide](./CONTRIBUTING.md).
Please check this file at first.

## LICENSE (Apache-2.0)

See [LICENSE file](./LICENSE).
