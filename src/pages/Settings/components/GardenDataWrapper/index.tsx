import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import React from "react";
import styles from "./GardenDataWrapper.module.css";

type Props = {
  showInput: boolean;
  currentData: string;
  editData: () => void;
};

export const GardenDataWrapper: React.FC<Props> = ({
  children,
  showInput,
  currentData,
  editData,
}) => {
  return !showInput ? (
    <div className={styles.gardenDataWrapper}>
      <h1>{currentData}</h1>
      <Button color="primary" variant="contained" onClick={editData}>
        Edit
      </Button>
    </div>
  ) : (
    <Grid
      className={styles.titleContainer}
      container
      direction="row"
      alignItems="center"
    >
      {children}
    </Grid>
  );
};
