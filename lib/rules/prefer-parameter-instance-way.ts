// ------------------------------------------------------------------------------
// Imports
// ------------------------------------------------------------------------------

import { createRule } from "../util";
import {
  TSESTree,
  AST_NODE_TYPES,
} from "@typescript-eslint/experimental-utils";

// ------------------------------------------------------------------------------
// Settings of createRule
// ------------------------------------------------------------------------------

type Options = {
  onlyReference: boolean;
};

const defaultOptions: [Options] = [
  {
    onlyReference: false,
  },
];

type MessageIds = "onlyReference";

// ------------------------------------------------------------------------------
// Rule Definition
// ------------------------------------------------------------------------------

export = createRule<[Options], MessageIds>({
  name: "prefer-parameter-instance-way",
  meta: {
    docs: {
      description: "Check generics paramater instance way whether expected",
      category: "Best Practices",
      recommended: false,
    },
    type: "suggestion",
    messages: {
      onlyReference:
        "Prefer use type reference like `type`, `interface` etc...",
    },
    schema: [
      {
        type: "object",
        properties: {
          onlyReference: {
            type: "boolean",
          },
        },
        required: ["onlyReference"],
      },
    ],
  },
  defaultOptions,
  create(context, optionsWithDefault) {
    const onlyReference =
      context.options[0]?.onlyReference ?? optionsWithDefault[0]?.onlyReference;

    return {
      "TSTypeParameterInstantiation[params.length>0]"(
        node: TSESTree.TSTypeParameterInstantiation
      ) {
        for (const param of node.params) {
          if (param.type === AST_NODE_TYPES.TSTypeReference) continue;

          if (onlyReference) {
            context.report({
              node: param,
              loc: param.loc,
              messageId: "onlyReference",
            });
          }
        }
      },
    };
  },
});
