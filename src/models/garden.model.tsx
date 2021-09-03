import { Rule } from "./rule.model";

export interface Garden {
  _id?: string;
  name: string;
  description: string;
  fireBaseUserId: string;
}

export interface PopulatedGarden {
  garden: {
    _id: string;
    name: string;
  };
  rules: Rule[];
}
