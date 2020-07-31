import { RuleTester } from "../../util";

import rule from "../../../lib/rules/no-multiple-named-imports";

const tester = new RuleTester({
  parser: "@typescript-eslint/parser",
  parserOptions: {
    sourceType: "module",
    ecmaFeatures: {
      jsx: true,
    },
  },
});

tester.run("no-multiple-named-imports", rule, {
  valid: [
    {
      code: `
      import { FC } from 'react';
    `,
    },
    {
      code: `
      import defaultExportMember, {member1} from 'module';
    `,
    },
  ],
  invalid: [
    {
      code: `
      import { FC, FunctionComponent } from 'react';
      `,
      errors: [{ messageId: "noMultipleNamedImports" }],
    },
    {
      code: `
      import defaultExportMember, {member1, module2} from 'module';
      `,
      errors: [{ messageId: "noMultipleNamedImports" }],
    },
  ],
});
