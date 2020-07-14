import { Rule } from "./types";

// @todo add type to environments, processors and configs
type CreateLibIndex = {
  rules?: {
    [k: string]: Rule;
  };
  environments?: {
    [k: string]: any;
  };
  processors?: {
    [k: string]: any;
  };
  configs?: {
    [k: string]: any;
  };
};
export const createLibIndex = ({
  rules,
  environments,
  processors,
  configs,
}: CreateLibIndex) => ({ rules, environments, processors, configs });
