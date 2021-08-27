import { Rule } from "./rule.model";

export interface Garden {
  _id?: string;
  name: string;
  description: string;
  userFireBaseId: string;
}

export interface PopulatedGarden {
  garden: {
    _id: string;
    name: string;
  };
  rules: Rule[];
}
