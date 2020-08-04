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
    {
      code: `
      import Module1 from 'module/1';
      import Module2 from 'module/2';

      import React from 'react';
      `,
      options: [{ allowNotNameSpaceImportModules: ["module/**/*", "react"] }],
    },
    {
      code: "import React from 'react';",
      options: [{ allowDefaultImport: true }],
    },
  ],
  invalid: [
    {
      code: `
      import React from 'react';
      `,
      errors: [{ messageId: "useNameSpaceImport" }],
    },
    {
      code: `
      import { createSlice, configureStore, PayloadAction } from '@reduxjs/toolkit';
      `,
      errors: [{ messageId: "useNameSpaceImport" }],
    },
    {
      code: "import React, { useState } from 'react';",
      options: [{ allowDefaultImport: true }],
      errors: [{ messageId: "useNameSpaceImport" }],
    },
  ],
});
