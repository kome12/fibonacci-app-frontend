import { Garden } from "../../../models/garden.model";
import { api } from "../../../utils/api";

export type GardenUpdateParams = {
  gardenId: string;
  data: Pick<
    Garden,
    "fireBaseUserId" | "gardenCategoryId" | "name" | "description"
  >;
};

export type UpdatedGardenResponse = Garden;

export const updateGardenData = ({ gardenId, data }: GardenUpdateParams) =>
  api.put<UpdatedGardenResponse>(`/gardens/${gardenId}`, data);
