// ------------------------------------------------------------------------------
// Imports
// ------------------------------------------------------------------------------

import { createRule } from "../util";
import {
  TSESTree,
  AST_NODE_TYPES,
} from "@typescript-eslint/experimental-utils";

// ------------------------------------------------------------------------------
// Helpers
// ------------------------------------------------------------------------------

/**
 * whether module doesn't need to be `nameSpaceImport`
 */
const isAllowNotNameSpaceImportModule = (
  node: TSESTree.ImportDeclaration,
  allowNotNameSpaceImportModules: Options["allowNotNameSpaceImportModules"]
) => {
  if (typeof node.source.value !== "string") return false;

  if (
    !allowNotNameSpaceImportModules ||
    allowNotNameSpaceImportModules.length === 0
  )
    return false;

  return allowNotNameSpaceImportModules.includes(node.source.value);
};

// ------------------------------------------------------------------------------
// Settings of createRule
// ------------------------------------------------------------------------------

type Options = {
  allowNotNameSpaceImportModules?: string[];
};

const defaultOptions: [Options] = [{}];

type MessageIds = "useNameSpaceImport";

// ------------------------------------------------------------------------------
// Rule Definition
// ------------------------------------------------------------------------------

export = createRule<[Options], MessageIds>({
  name: "use-name-space-import",
  meta: {
    docs: {
      description: "Use name space import",
      category: "Best Practices",
      recommended: false,
    },
    type: "suggestion",
    messages: {
      useNameSpaceImport:
        "Should use name space import if import module from {{ moduleName }}.",
    },
    schema: [
      {
        type: "object",
        properties: {
          allowNotNameSpaceImportModules: {
            type: "array",
            items: {
              type: "string",
            },
          },
        },
      },
    ],
  },
  defaultOptions,
  create(context, optionsWithDefault) {
    const allowNotNameSpaceImportModules =
      context.options[0]?.allowNotNameSpaceImportModules ??
      optionsWithDefault[0]?.allowNotNameSpaceImportModules;

    return {
      'ImportDeclaration[parent.type="Program"]'(
        node: TSESTree.ImportDeclaration
      ) {
        // Exclude name space import
        if (
          node.specifiers.length === 0 ||
          node.specifiers[0].type === AST_NODE_TYPES.ImportNamespaceSpecifier
        )
          return;

        if (
          isAllowNotNameSpaceImportModule(node, allowNotNameSpaceImportModules)
        )
          return;

        context.report({
          node,
          loc: node.loc,
          messageId: "useNameSpaceImport",
          data: {
            moduleName: node.source.value,
          },
        });
      },
    };
  },
});
