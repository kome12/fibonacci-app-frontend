import { PopulatedGarden } from "../../../models/garden.model";
import { api } from "../../../utils/api";

export const getGardenByGardenIdWithDates = (
  gardenId: string,
  startDate: string,
  endDate: string
) =>
  api.get<PopulatedGarden>(
    `/gardens/${gardenId}/startDate/${startDate}/endDate/${endDate}`
  );
