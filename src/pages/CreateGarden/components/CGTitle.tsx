import { createStyles, makeStyles, Theme } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import React from "react";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    title: {
      margin: 0,
      fontSize: "2.2rem",
      color: theme.palette.primary.main,
      paddingBottom: "0.5rem",
    },
  })
);

export const CGTitle: React.FC<{ title: string }> = ({ title }) => {
  const classes = useStyles();
  return (
    <Grid container direction="row" justifyContent="center" alignItems="center">
      <h1 className={classes.title}>{title}</h1>
    </Grid>
  );
};
