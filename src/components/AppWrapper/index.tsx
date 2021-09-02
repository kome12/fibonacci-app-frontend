import React from "react";
import { useFirebaseAuth } from "../SignIn/useFirebaseAuth";

export const AppWrapper: React.FC = ({ children }) => {
  useFirebaseAuth();

  return <>{children}</>;
};
