import { PopulatedGarden } from "../../../models/garden.model";
import { api } from "../../../utils/api";

export const getGardenByGardenId = (gardenId: string) =>
  api.get<PopulatedGarden>(`/gardens/${gardenId}`);
