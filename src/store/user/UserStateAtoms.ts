import { atom } from "recoil";

type UserData =
  | {
      id: string;
      displayName: string;
      imageUrl: string | null;
      isLoggedIn: true;
      balance: number | null;
      flowerCollections: string[];
    }
  | {
      isLoggedIn: false | null;
    };

export const userState = atom<UserData>({
  key: "userData",
  default: { isLoggedIn: null },
});
