---
to: lib/rules/<%= name %>.ts
---
import { createRule } from "../util";

type Options = {};

const defaultOptions: [Options] = [];

type MessageIds = "<%= h.changeCase.camel(name) %>";

export = createRule<[Options], MessageIds>({
  name: "<%= name %>",
  meta: {
    docs: {
      description: "<%= description %>",
      category: "",
      recommended: false,
    },
    fixable: "",
    type: "",
    messages: {
      <%= h.changeCase.camel(name) %>:
        "",
    },
    schema: [],
  },
  defaultOptions,
  create(context) {
    return {
      TSTypeReference(node) {
        if (node.typeName.type !== "") {
          return;
        }

        context.report({
          node,
          loc: node.loc,
          messageId: "<%= h.changeCase.camel(name) %>",
        });
      },
    };
  },
});