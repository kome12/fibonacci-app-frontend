import React from "react";
import { useHistory } from "react-router-dom";
import { usePageState } from "../../store/page/usePageState";
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
  const { currentPage, setCurrentPage } = usePageState();
  const history = useHistory();
  const handlePageChange = (newValue: string) => {
    setCurrentPage(newValue);
    history.push(newValue);
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
        <div className={styles.nav}>
          <BottomNav
            currentPage={currentPage}
            handlePageChange={handlePageChange}
          />
        </div>
      )}
    </div>
  );
};
