import { updateRulesDocs } from "./update-rules-docs";
import { updateRulesList } from "./update-rules-list";

(async () => {
  await updateRulesDocs();
  await updateRulesList();
})();
