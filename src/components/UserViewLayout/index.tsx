import React from "react";
import { Header } from "../Header";
import { BottomNav } from "../BottomNav";
import styles from "./UserViewLayout.module.css";
import { useHistory } from "react-router-dom";
import { usePageState } from "../../store/page/usePageState";
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
