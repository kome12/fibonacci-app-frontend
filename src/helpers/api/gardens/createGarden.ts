import { Garden } from "../../../models/garden.model";
import { api } from "../../../utils/api";

export type NewGardenData = Omit<
  Garden,
  "_id" | "createdDate" | "lastUpdate" | "gardenCategory"
>;

export const createGarden = (data: NewGardenData) =>
  api.post<Garden>("/gardens", data);
