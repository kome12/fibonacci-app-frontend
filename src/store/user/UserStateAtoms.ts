import { atom } from "recoil";

type UserData =
  | {
      id: string;
      displayName: string;
      imageUrl: string | undefined;
      isLoggedIn: true;
    }
  | {
      isLoggedIn: false | null;
    };

export const userState = atom<UserData>({
  key: "userData",
  default: { isLoggedIn: null },
});
