import { Flower } from "../../../models/flower.model";
import { api } from "../../../utils/api";

export const getFlowers = () => api.get<Flower[]>("/flowers");
