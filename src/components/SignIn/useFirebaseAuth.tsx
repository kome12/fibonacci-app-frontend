import { useEffect } from "react";
import { useUserState } from "../../store/user/useUserState";
import fb from "../../utils/firebase";

export const logout = async () => {
  await fb.auth().signOut();
};

export const useFirebaseAuth = () => {
  const { setUserData } = useUserState();

  // Listen to the Firebase Auth state and set user global state
  useEffect(() => {
    const unregisterAuthObserver = fb.auth().onAuthStateChanged((user) => {
      if (user) {
        setUserData({
          id: user.uid,
          displayName: user.displayName ?? "",
          imageUrl: user.photoURL,
          isLoggedIn: true,
          balance: null,
          flowerCollections: [],
        });
        return;
      }
      setUserData({ isLoggedIn: false });
    });

    // Make sure we un-register Firebase observers when the component unmounts
    return () => unregisterAuthObserver();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};
