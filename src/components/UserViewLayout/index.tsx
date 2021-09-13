import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { BottomNav } from "../BottomNav";
import { Header } from "../Header";
import styles from "./UserViewLayout.module.css";

interface UserViewLayoutProps {
  showHeader?: boolean;
  showBottomNav?: boolean;
}

export const UserViewLayout: React.FC<UserViewLayoutProps> = ({
  children,
  showHeader,
  showBottomNav,
}) => {
  const [currentPage, setCurrentPage] = useState("/user/myniwa");
  const history = useHistory();
  const handlePageChange = (_event, newValue: string) => {
    if (newValue !== "more") {
      setCurrentPage(newValue);
      history.push(newValue);
    }
  };
  return (
    <div className={styles.layout}>
      {showHeader && (
        <div className={styles.header}>
          <Header />
        </div>
      )}
      <div className={styles.content}>{children}</div>
      {showBottomNav && (
        <div>
          <BottomNav
            currentPage={currentPage}
            handlePageChange={handlePageChange}
          />
        </div>
      )}
    </div>
  );
};
