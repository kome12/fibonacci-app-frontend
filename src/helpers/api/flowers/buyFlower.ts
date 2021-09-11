import { BuyFlower, BuyFlowerResponse } from "../../../models/flower.model";
import { api } from "../../../utils/api";

export const buyFlower = (data: BuyFlower) =>
  api.put<BuyFlowerResponse>("/flowersStore", data);
