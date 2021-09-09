import { Flower } from "./flower.model";

export type UserAccount = {
  _id: string;
  fireBaseUserId: string;
  balance: number;
  flowerCollections: Flower[];
};
