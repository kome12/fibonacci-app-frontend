import { Category } from "./category.model";
import { CompletedTask } from "./completedTask.model";
import { Rule } from "./rule.model";

export interface Garden {
  _id?: string;
  name: string;
  description: string;
  fireBaseUserId: string;
  createdDate: string;
  lastUpdate: string;
  gardenCategoryId: string;
  gardenCategory: Category;
}

export interface PopulatedGarden {
  garden: Garden;
  rules: Rule[];
  completedTasks: CompletedTask[];
}
