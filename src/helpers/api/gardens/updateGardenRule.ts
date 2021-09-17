import { Rule } from "../../../models/rule.model";
import { api } from "../../../utils/api";

export type GardenRuleUpdateParams = {
  ruleId: string;
  data: Pick<Rule, "_id" | "gardenId" | "name" | "description">;
};

export const updateGardenRule = ({ ruleId, data }: GardenRuleUpdateParams) =>
  api.put<Rule>(`/rules/${ruleId}`, data);
