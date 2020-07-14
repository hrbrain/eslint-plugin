import { TSESLint } from "@typescript-eslint/experimental-utils";

type Parser = "@typescript-eslint/parser" | "espree";

type RuleTesterConfig = Omit<TSESLint.RuleTesterConfig, "parser"> & {
  parser: Parser;
};

export class RuleTester extends TSESLint.RuleTester {
  constructor(protected config: RuleTesterConfig) {
    super({
      ...config,
      // @see https://eslint.org/docs/user-guide/migrating-to-6.0.0#ruletester-now-requires-an-absolute-path-on-parser-option
      parser: require.resolve(config.parser),
    });
  }
}
/* eslint-enable */
