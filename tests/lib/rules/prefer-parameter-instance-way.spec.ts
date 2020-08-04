import { RuleTester } from "../../util";

import rule from "../../../lib/rules/prefer-parameter-instance-way";

const tester = new RuleTester({
  parser: "@typescript-eslint/parser",
  parserOptions: {
    sourceType: "module",
    ecmaFeatures: {
      jsx: true,
    },
  },
});

tester.run("prefer-parameter-instance-way", rule, {
  valid: [
    {
      code: `
      const user: User<UserProps> = {
        age: 'name',
        info: {
          age: 20
        }
      }
    `,
      options: [
        {
          onlyReference: true,
        },
      ],
    },
    {
      code: `
      const user: User<{age: number}> = {
        name: 'name',
        info: {
          age: 20
        }
      }
    `,
      options: [
        {
          onlyReference: false,
        },
      ],
    },
  ],
  invalid: [
    {
      code: `
      const user: User<{age: number}> = {
        name: 'name',
        info: {
          age: 20
        }
      }
    `,
      options: [
        {
          onlyReference: true,
        },
      ],
      errors: [{ messageId: "onlyReference" }],
    },
  ],
});
