import Grid from "@material-ui/core/Grid";
import React from "react";
import styles from "./SectionTitle.module.css";

export const SectionTitle: React.FC<{ title: string }> = ({
  children,
  title,
}) => {
  return (
    <Grid
      className={styles.titleContainer}
      container
      direction="row"
      justifyContent="space-between"
      alignItems="center"
    >
      <h1>{title}</h1>
      {children}
    </Grid>
  );
};
