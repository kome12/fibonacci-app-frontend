import Grid from "@material-ui/core/Grid";
import React from "react";
import styles from "./GardenDataWrapper.module.css";

export const GardenDataWrapper: React.FC = ({ children }) => {
  return (
    <Grid
      className={styles.inputContainer}
      container
      direction="row"
      alignItems="center"
    >
      {children}
    </Grid>
  );
};
