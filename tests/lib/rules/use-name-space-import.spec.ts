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
    },
    {
      code: "import 'minireset.css';",
    },
    {
      code: "import React from 'react';",
      options: [{ allowNotNameSpaceImportModules: ["react"] }],
    },
  ],
  invalid: [
    {
      code: `
      import React from 'react';
      `,
      output: `
      import * as NameSpace from "react";
      `,
      errors: [{ messageId: "useNameSpaceImport" }],
    },
    {
      code: `
      import { createSlice, configureStore, PayloadAction } from '@reduxjs/toolkit';
      `,
      output: `
      import * as NameSpace from "@reduxjs/toolkit";
      `,
      errors: [{ messageId: "useNameSpaceImport" }],
    },
  ],
});
