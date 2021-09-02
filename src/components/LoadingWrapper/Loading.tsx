import CircularProgress from "@material-ui/core/CircularProgress";
import React from "react";
import styles from "./LoadingWrapper.module.css";

export const Loading = () => {
  return (
    <div className={styles.loadingWrapper}>
      <CircularProgress />
    </div>
  );
};
