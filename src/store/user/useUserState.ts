import { useRecoilState } from "recoil";
import { userState } from "./UserStateAtoms";

export const useUserState = () => {
  const [userData, setUserData] = useRecoilState(userState);

  return { userData, setUserData } as const;
};
