import { Flower } from "../../../models/flowers.model";
import { api } from "../../../utils/api";

export const getFlowers = () => api.get<Flower[]>("/flowers");
