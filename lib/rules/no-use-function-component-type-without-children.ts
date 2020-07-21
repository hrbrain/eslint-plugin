// ------------------------------------------------------------------------------
// Imports
// ------------------------------------------------------------------------------
import { createRule, isFunctionComponentType } from "../util";
import {
  AST_NODE_TYPES,
  TSESTree,
} from "@typescript-eslint/experimental-utils";

// ------------------------------------------------------------------------------
// Helpers
// ------------------------------------------------------------------------------

const getFunctionComponentTypeName = (node: TSESTree.VariableDeclarator) => {
  let typeName: string | undefined;
  if (
    node.id?.typeAnnotation?.typeAnnotation.type ===
    AST_NODE_TYPES.TSTypeReference
  ) {
    if (
      node.id?.typeAnnotation?.typeAnnotation.typeName.type ===
        AST_NODE_TYPES.TSQualifiedName &&
      node.id?.typeAnnotation?.typeAnnotation.typeName.left.type ===
        AST_NODE_TYPES.Identifier &&
      node.id?.typeAnnotation?.typeAnnotation.typeName.right.type ===
        AST_NODE_TYPES.Identifier
    ) {
      /**
       * Note: Expect:
       * - LeftType.RightType
       */
      typeName = `${node.id?.typeAnnotation?.typeAnnotation.typeName.left.name}.${node.id?.typeAnnotation?.typeAnnotation.typeName.right.name}`;
    } else if (
      node.id?.typeAnnotation?.typeAnnotation.typeName.type ===
      AST_NODE_TYPES.Identifier
    ) {
      /**
       * Note: Expect:
       * - TypeName
       */
      typeName = node.id?.typeAnnotation?.typeAnnotation.typeName.name;
    }
  } else {
    typeName = undefined;
  }

  return { typeName };
};

// ------------------------------------------------------------------------------
// Settings of createRule
// ------------------------------------------------------------------------------

const defaultOptions: [] = [];

type MessageIds = "noUseFunctionComponentTypeWithoutChildren";

// ------------------------------------------------------------------------------
// Rule Definition
// ------------------------------------------------------------------------------

export = createRule<[], MessageIds>({
  name: "no-use-function-component-type-without-children",
  meta: {
    docs: {
      description: "Don't use Function Component type without props.children",
      category: "Best Practices",
      recommended: false,
    },
    type: "suggestion",
    messages: {
      noUseFunctionComponentTypeWithoutChildren:
        "Should not use '{{ typeName }}' when components doesn't use props.children",
    },
    schema: [],
  },
  defaultOptions,
  create(context) {
    return {
      'VariableDeclarator:not(:has(Literal[value="children"])):not(:has(Identifier[name="children"]))'(
        node: TSESTree.VariableDeclarator
      ) {
        const { typeName } = getFunctionComponentTypeName(node);

        if (
          node.id?.typeAnnotation?.typeAnnotation.type ===
            AST_NODE_TYPES.TSTypeReference &&
          typeName &&
          isFunctionComponentType(typeName)
        ) {
          context.report({
            node: node.id.typeAnnotation?.typeAnnotation.typeName,
            loc: node.id.typeAnnotation?.typeAnnotation.typeName.loc,
            messageId: "noUseFunctionComponentTypeWithoutChildren",
            data: {
              typeName,
            },
          });
        }
      },
    };
  },
});
