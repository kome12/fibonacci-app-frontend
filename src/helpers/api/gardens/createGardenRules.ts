import { Rule } from "../../../models/rule.model";
import { api } from "../../../utils/api";

export type NewGardenRule = Pick<Rule, "name" | "description" | "gardenId">;

export const createGardenRules = (data: NewGardenRule[]) =>
  api.post<Rule[]>("/rules/bulk", data);

export const createGardenRule = (data: NewGardenRule) =>
  api.post<Rule>("/rules", data);
