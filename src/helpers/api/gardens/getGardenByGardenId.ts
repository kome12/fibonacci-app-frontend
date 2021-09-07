import { PopulatedGarden } from "../../../models/garden.model";
import { api } from "../../../utils/api";

export const getGardenByGardenId = (gardenId: string, date: string) =>
  api.get<PopulatedGarden>(`/gardens/${gardenId}/date/${date}`);
