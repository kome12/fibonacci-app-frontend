import React from "react";
import { Header } from "../Header";
import { BottomNav } from "../BottomNav";
import styles from "./UserViewLayout.module.css";

interface UserViewLayoutProps {
  showHeader: boolean,
  showBottomNav: boolean
}

export const UserViewLayout: React.FC<UserViewLayoutProps> = ({children, showHeader, showBottomNav}) => {
  return (
    <div className={styles.layout}>
      { showHeader && <div className={styles.header}><Header /></div> }
      <div className={styles.content}>{ children }</div>
      { showBottomNav && <div className={styles.nav}><BottomNav /></div>}
    </div>
  )
}