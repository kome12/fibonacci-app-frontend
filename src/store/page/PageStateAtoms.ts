import { atom } from "recoil";

export const pageState = atom<string>({
  key: "pageData",
  default: "/user/myniwa",
  effects_UNSTABLE: [
    ({ onSet }) => {
      onSet((newVal) => {
        console.log("Current page:", newVal);
      });
    },
  ],
});
