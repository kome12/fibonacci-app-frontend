import React, { useEffect, useMemo } from "react";
import { getUserAccountData } from "../../helpers/api/users/getUserAccountData";
import { useUserState } from "../../store/user/useUserState";
import { useApi } from "../../utils/api/useApi";
import { useFirebaseAuth } from "../SignIn/useFirebaseAuth";

export const AppWrapper: React.FC = ({ children }) => {
  const { userData, setUserData } = useUserState();
  const [userAccountApi, getUserData] = useApi(getUserAccountData);

  const userId = useMemo(
    () => (userData.isLoggedIn && userData.id) || "",
    [userData]
  );

  useFirebaseAuth();

  useEffect(() => {
    if (userId) {
      getUserData(userId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId]);

  useEffect(() => {
    if (userAccountApi.response) {
      const { balance, flowerCollections } = userAccountApi.response;
      setUserData((data) => ({ ...data, balance, flowerCollections }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userAccountApi.status, userAccountApi.response]);

  return <>{children}</>;
};
