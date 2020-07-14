---
to: sandbox/.eslintrc.js
---
/** @type import('eslint').Linter.BaseConfig */
module.exports = {
  parser: "@typescript-eslint/parser",
  parserOptions: {
    sourceType: "module",
    project: "sandbox/tsconfig.json",
  },
  rules: {
    "prefer-function-component-type": ["error", { prefer: "React.FC" }],
  },
};