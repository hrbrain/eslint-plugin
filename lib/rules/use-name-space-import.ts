import { createRule } from "../util";

type Options = {
  modules: string[];
};

const defaultOptions: [Options] = [{ modules: [""] }];

const isExpectModules = (value: string, modules: Options["modules"]) =>
  modules.includes(value);

type MessageIds = "useNameSpaceImport";

export = createRule<[Options], MessageIds>({
  name: "use-name-space-import",
  meta: {
    docs: {
      description: "Use name space import",
      category: "Best Practices",
      recommended: false,
    },
    fixable: "code",
    type: "suggestion",
    messages: {
      useNameSpaceImport:
        "Should use <{{ nameSpaceImport }}> instead of <{{ namedImport }}>",
    },
    schema: [
      {
        type: "object",
        properties: {
          modules: {
            type: "array",
            items: {
              type: "string",
            },
          },
        },
        required: ["modules"],
      },
    ],
  },
  defaultOptions,
  create(context) {
    return {
      ImportDeclaration(node) {
        if (
          typeof node.source.value === "string" &&
          !isExpectModules(node.source.value, context.options[0].modules)
        ) {
          return;
        }

        for (const specifier of node.specifiers) {
          if (specifier.type !== "ImportDefaultSpecifier") {
            return;
          }

          context.report({
            node,
            loc: specifier.loc,
            messageId: "useNameSpaceImport",
            data: {
              nameSpaceImport: `import * as ${specifier.local.name}`,
              namedImport: `import ${specifier.local.name}`,
            },
            fix(fixer) {
              return fixer.replaceTextRange(
                specifier.range,
                `* as ${specifier.local.name}`
              );
            },
          });
        }
      },
    };
  },
});
