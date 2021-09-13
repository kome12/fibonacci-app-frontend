import {
  createStyles,
  Grid,
  makeStyles,
  Theme,
  Typography,
} from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    name: {
      marginTop: "0.25rem",
      color: theme.palette.text.primary,
      fontWeight: "bold",
      alignSelf: "center",
    },
    desc: {
      marginBottom: "0.25rem",
      color: theme.palette.primary.dark,
      alignSelf: "center",
    },
  })
);

export const UserRule: React.FC<NewUserRule> = ({ name, description }) => {
  const classes = useStyles();
  return (
    <Grid container={true} direction="column" justifyContent="center">
      <Typography variant="h6" className={classes.name}>
        {name}
      </Typography>
      {description && (
        <Typography variant="caption" className={classes.desc}>
          {description}
        </Typography>
      )}
    </Grid>
  );
};
