import { RuleTester } from "../../util";

import rule from "../../../lib/rules/force-filename-pattern";

const code = "const foo = 'foo';";

const tester = new RuleTester({
  parser: "@typescript-eslint/parser",
  parserOptions: {
    sourceType: "module",
    ecmaFeatures: {
      jsx: true,
    },
  },
});

tester.run("force-filename-pattern", rule, {
  valid: [
    {
      filename: "helper-library.component.ts",
      code,
    },
    {
      filename: "helper-library.ts",
      code,
      options: [
        {
          regex: "library$",
        },
      ],
    },
    {
      filename: "helper-library.ts",
      code,
      options: [
        {
          allowExtensionNames: ["ts"],
        },
      ],
    },
    {
      filename: "helper-library.ts",
      code,
      options: [
        {
          allowExtensionNames: ["ts", "js"],
        },
      ],
    },
  ],
  invalid: [
    {
      filename: "helper-library.ts",
      code,
      options: [
        {
          regex: "foo",
        },
      ],
      errors: [
        {
          messageId: "forceFilenamePattern",
        },
      ],
    },
    {
      filename: "helper-library.ts",
      code,
      options: [
        {
          regex: "helper$",
        },
      ],
      errors: [
        {
          messageId: "forceFilenamePattern",
        },
      ],
    },
    {
      filename: "helper-library.ts",
      code,
      options: [
        {
          allowExtensionNames: ["js"],
        },
      ],
      errors: [
        {
          messageId: "forceExtensionNamePattern",
        },
      ],
    },
    {
      filename: "helper-library.ts",
      code,
      options: [
        {
          regex: "foo",
          allowExtensionNames: ["js"],
        },
      ],
      errors: [
        {
          messageId: "forceFilenamePattern",
        },
        {
          messageId: "forceExtensionNamePattern",
        },
      ],
    },
  ],
});
