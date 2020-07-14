import { RuleTester } from "../../util";

import rule from "../../../lib/rules/prefer-function-component-type";

const tester = new RuleTester({
  parser: "@typescript-eslint/parser",
  parserOptions: {
    sourceType: "module",
    ecmaFeatures: {
      jsx: true,
    },
  },
});

tester.run("prefer-function-component-type", rule, {
  valid: ["export const App: React.FC = () => <div>aaa</div>"],
  invalid: [
    {
      code: "export const App: FunctionComponent = () => <div>aaa</div>",
      output: "export const App: React.FC = () => <div>aaa</div>",
      options: [{ prefer: "React.FC" }],
      errors: [{ messageId: "preferFunctionComponentType" }],
    },
  ],
});
