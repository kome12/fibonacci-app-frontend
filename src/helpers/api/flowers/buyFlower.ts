import { BuyFlower } from "../../../models/flowers.model";
import { api } from "../../../utils/api";

export const buyFlower = (data: BuyFlower) =>
  api.put<BuyFlower>("/flowersStore", data);
