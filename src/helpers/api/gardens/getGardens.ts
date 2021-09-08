import { Garden } from "../../../models/garden.model";
import { api } from "../../../utils/api";

export const getGardens = (userId: string) =>
  api.get<Garden[]>(`/gardens/userid/${userId}`);
