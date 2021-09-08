import { Flower } from "./flower.model";

export type UserAccount = {
  _id: string;
  fireBaseUserId: string;
  numCoins: number;
  flowerCollections: Flower[];
};
