import { atom } from "recoil";

type UserData = {
  id: string;
  displayName: string;
  imageUrl: string | null;
};

export const userState = atom<UserData | undefined>({
  key: "userData",
  default: undefined,
});
