import { RuleTester } from "../../util";

import rule from "../../../lib/rules/prefer-parameter-instance";

const tester = new RuleTester({
  parser: "@typescript-eslint/parser",
  parserOptions: {
    sourceType: "module",
    ecmaFeatures: {
      jsx: true,
    },
  },
});

tester.run("prefer-parameter-instance", rule, {
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
    {
      code: `
      const user: User<string> = {
        name: 'name',
        info: {
          age: 20
        }
      }
    `,
      options: [
        {
          onlyReference: true,
          allowKeywords: true,
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
          allowKeywords: true,
        },
      ],
      errors: [{ messageId: "onlyReference" }],
    },
  ],
});
