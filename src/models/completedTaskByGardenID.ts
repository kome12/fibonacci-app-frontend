import { CompletedTask } from "./completedTask.model";
import { Garden } from "./garden.model";
import { Rule } from "./rule.model";

export type CompletedTaskByGardenID = {
  garden: Garden;
  rules: Rule[];
  completedTasks: CompletedTask[];
};
