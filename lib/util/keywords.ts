import { AST_NODE_TYPES } from "@typescript-eslint/experimental-utils";

// @see https://github.com/typescript-eslint/typescript-eslint/blob/1765a178e456b152bd48192eb5db7e8541e2adf2/packages/eslint-plugin/src/rules/no-inferrable-types.ts#L95
const keywordMap = {
  [AST_NODE_TYPES.TSBigIntKeyword]: "bigint",
  [AST_NODE_TYPES.TSBooleanKeyword]: "boolean",
  [AST_NODE_TYPES.TSNumberKeyword]: "number",
  [AST_NODE_TYPES.TSNullKeyword]: "null",
  [AST_NODE_TYPES.TSStringKeyword]: "string",
  [AST_NODE_TYPES.TSSymbolKeyword]: "symbol",
  [AST_NODE_TYPES.TSUndefinedKeyword]: "undefined",
};

export const TSKeywordMap = {
  ...keywordMap,
  [AST_NODE_TYPES.TSAnyKeyword]: "any",
  [AST_NODE_TYPES.TSUnknownKeyword]: "unknown",
  [AST_NODE_TYPES.TSVoidKeyword]: "void",
};
