import { RuleTester } from "../../util";

import rule from "../../../lib/rules/use-name-space-import";

const tester = new RuleTester({
  parser: "@typescript-eslint/parser",
  parserOptions: {
    sourceType: "module",
    ecmaFeatures: {
      jsx: true,
    },
  },
});

tester.run("use-name-space-import", rule, {
  valid: [
    {
      code: "import * as React from 'react';",
      options: [{ modules: ["react"] }],
    },
  ],
  invalid: [
    {
      code: "import React from 'react';",
      output: "import * as React from 'react';",
      options: [{ modules: ["react"] }],
      errors: [{ messageId: "useNameSpaceImport" }],
    },
  ],
});
