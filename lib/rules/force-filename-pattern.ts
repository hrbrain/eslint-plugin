import { createRule } from "../util";
import path from "path";

const getExtensionName = (filenameFromEslint: string) => {
  const extensionName = path.extname(filenameFromEslint).slice(1);

  return { extensionName };
};

const extendedGetFilename = (filenameFromEslint: string) => {
  const splitedFilename = path.basename(filenameFromEslint).split(".");

  const filename = splitedFilename
    .filter((_, index) => index !== splitedFilename.length - 1)
    .join(".");

  return { filename };
};

type Options = {
  regex?: string;
  allowExtensionNames?: string[];
};

const defaultOptions: [Options] = [{ regex: "", allowExtensionNames: [] }];

type MessageIds = "forceFilenamePattern" | "forceExtensionNamePattern";

export = createRule<[Options], MessageIds>({
  name: "force-filename-pattern",
  meta: {
    docs: {
      description: "Force filename",
      category: "Stylistic Issues",
      recommended: false,
    },
    type: "suggestion",
    messages: {
      forceFilenamePattern: "{{ filename }} is incorrect filename pattern.",
      forceExtensionNamePattern:
        "{{ extensionName }} is incorrect extension name pattern.",
    },
    schema: [
      {
        type: "object",
        properties: {
          regex: {
            type: "string",
          },
          allowExtensionNames: {
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
  create(context, [{ regex, allowExtensionNames }]) {
    return {
      Program(node) {
        const { extensionName } = getExtensionName(context.getFilename());
        const { filename } = extendedGetFilename(context.getFilename());

        if (
          regex &&
          !new RegExp(String.raw`${context.options[0].regex}`, "u").test(
            filename
          )
        ) {
          context.report({
            node,
            messageId: "forceFilenamePattern",
            data: {
              filename,
            },
          });
        }

        if (
          allowExtensionNames &&
          allowExtensionNames.length > 0 &&
          !allowExtensionNames.includes(extensionName)
        ) {
          context.report({
            node,
            messageId: "forceExtensionNamePattern",
            data: {
              extensionName,
            },
          });
        }
      },
    };
  },
});
