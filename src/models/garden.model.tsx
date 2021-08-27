import { Rule } from "./rule.model";

export interface PopulatedGarden {
  garden: {
    _id: string;
    name: string;
  };
  rules: Rule[];
}
