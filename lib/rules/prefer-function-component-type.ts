import { createRule, isFunctionComponentType } from "../util";

type Options = {
  prefer: string;
};

const defaultOptions: [Options] = [
  {
    prefer: "",
  },
];

type MessageIds = "preferFunctionComponentType";

export = createRule<[Options], MessageIds>({
  name: "prefer-function-component-type",
  meta: {
    docs: {
      description: "Unify type for function comoponents",
      category: "Best Practices",
      recommended: false,
    },
    fixable: "code",
    type: "suggestion",
    messages: {
      preferFunctionComponentType:
        "Prefer using {{ prefer }} instead of {{ name }}",
    },
    schema: [
      {
        type: "object",
        properties: {
          prefer: {
            type: "string",
          },
        },
        required: ["prefer"],
      },
    ],
  },
  defaultOptions,
  create(context) {
    return {
      TSTypeReference(node) {
        if (node.typeName.type !== "Identifier") {
          return;
        }

        if (isFunctionComponentType(node.typeName.name)) {
          context.report({
            node,
            loc: node.loc,
            messageId: "preferFunctionComponentType",
            data: {
              prefer: context.options[0].prefer,
              name: node.typeName.name,
            },
            fix(fixer) {
              return fixer.replaceText(node, context.options[0].prefer);
            },
          });
        }
      },
    };
  },
});
