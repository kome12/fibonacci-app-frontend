import { Garden } from "../../../models/garden.model";
import { api } from "../../../utils/api";

export type GardenUpdateParams = {
  gardenId: string;
  data: Partial<Pick<Garden, "name" | "description">> &
    Pick<Garden, "fireBaseUserId" | "gardenCategoryId">;
};

export type UpdatedGardenResponse = Garden;

export const updateGardenData = ({ gardenId, data }: GardenUpdateParams) =>
  api.put<UpdatedGardenResponse>(`/gardens/${gardenId}`, data);
