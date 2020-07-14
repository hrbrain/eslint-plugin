import fs from "fs";

import { DIR_LIB } from "./const";
import { RuleMetaData } from "./types";

import { Rule } from "../../lib/util/types";

const getRuleName = (rulePath: string) => {
  const ruleName = rulePath.slice(0, -3);

  return ruleName;
};

export const getRulesMetaData = async () => {
  const rulePaths = fs.readdirSync(`${DIR_LIB}/rules`);
  const rulesMetaData: RuleMetaData[] = [];

  for (const rulePath of rulePaths) {
    const name = getRuleName(rulePath);

    const rule: Promise<Rule> = await import(`${DIR_LIB}/rules/${rulePath}`);
    rulesMetaData.push({
      name,
      meta: (await rule).meta,
    });
  }

  return { rulesMetaData };
};
