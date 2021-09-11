import { atom } from "recoil";

export const pageState = atom<string>({
  key: "pageData",
  default: "/user/myniwa",
});
