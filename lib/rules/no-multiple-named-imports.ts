// ------------------------------------------------------------------------------
// Imports
// ------------------------------------------------------------------------------

import { createRule } from "../util";
import { TSESTree } from "@typescript-eslint/experimental-utils";

// ------------------------------------------------------------------------------
// Settings of createRule
// ------------------------------------------------------------------------------

const defaultOptions: [] = [];

type MessageIds = "noMultipleNamedImports";

// ------------------------------------------------------------------------------
// Rule Definition
// ------------------------------------------------------------------------------

export = createRule<[], MessageIds>({
  name: "no-multiple-named-imports",
  meta: {
    docs: {
      description: "Don't imports as named import from a module",
      category: "Best Practices",
      recommended: false,
    },
    type: "suggestion",
    messages: {
      noMultipleNamedImports:
        "Should not multiple imports from '{{ moduleName }}' module",
    },
    schema: [],
  },
  defaultOptions,
  create(context) {
    return {
      "ImportDeclaration[specifiers.length>1]"(
        node: TSESTree.ImportDeclaration
      ) {
        context.report({
          node,
          loc: node.loc,
          messageId: "noMultipleNamedImports",
          data: {
            moduleName: node.source.value,
          },
        });
      },
    };
  },
});
