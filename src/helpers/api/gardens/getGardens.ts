import { PopulatedGarden } from "../../../models/garden.model";
import { api } from "../../../utils/api";

export const getGardens = () =>
  api.get<[{ id: string; name: string }]>("/gardens");

export const getGardenByGardenId = (
  gardenId: string = "612789b765c2e6a7e7e76bd2"
) => api.get<PopulatedGarden>(`/gardens/${gardenId}`);
