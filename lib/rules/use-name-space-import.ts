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

const hasImportDefaultSpecifier = (node: TSESTree.ImportDeclaration) => {
  if (typeof node.source.value !== "string") return false;

  return node.specifiers.some(
    (specifier) => specifier.type === AST_NODE_TYPES.ImportDefaultSpecifier
  );
};

// ------------------------------------------------------------------------------
// Settings of createRule
// ------------------------------------------------------------------------------

type Options = {
  allowNotNameSpaceImportModules?: string[];
  allowDefaultImport?: boolean;
};

const defaultOptions: [Options] = [
  {
    allowDefaultImport: false,
  },
];

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
          allowDefaultImport: {
            type: "boolean",
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
    const allowDefaultImport =
      context.options[0]?.allowDefaultImport ??
      optionsWithDefault[0]?.allowDefaultImport;

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

        if (
          node.specifiers.length === 1 &&
          allowDefaultImport &&
          hasImportDefaultSpecifier(node)
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
