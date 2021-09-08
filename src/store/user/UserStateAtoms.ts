import { atom } from "recoil";
import { Flower } from "../../models/flower.model";

type UserData =
  | {
      id: string;
      displayName: string;
      imageUrl: string | null;
      isLoggedIn: true;
      balance: number | null;
      flowerCollections: Flower[];
    }
  | {
      isLoggedIn: false | null;
    };

export const userState = atom<UserData>({
  key: "userData",
  default: { isLoggedIn: null },
});
