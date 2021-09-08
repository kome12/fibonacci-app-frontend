import {
  Button,
  CircularProgress,
  createStyles,
  Grid,
  List,
  ListItem,
  makeStyles,
  Theme,
  Typography,
} from "@material-ui/core";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import { motion } from "framer-motion";
import { NewUserRule } from "..";
import { UserRule } from "./UserRule";

interface GardenSummaryProps {
  gardenName: string;
  gardenDesc: string;
  userRules: NewUserRule[];
  createGardenHandler: React.MouseEventHandler<HTMLButtonElement>;
  animDirection: "left" | "right";
  loading: boolean;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      height: "100%",
      flexDirection: "column",
      backgroundColor: theme.palette.background.default,
    },
    title: {
      fontWeight: "bold",
      color: theme.palette.primary.main,
      marginTop: "1rem",
    },
    subtitle: {
      color: theme.palette.primary.dark,
    },
    detailsContainer: {
      display: "block",
      marginTop: "1rem",
      marginBottom: "1rem",
    },
    gardenDetailGrid: {
      width: "100%",
    },
    gardenDetails: {
      fontWeight: "bold",
      color: theme.palette.text.primary,
      marginLeft: "5%",
    },
    gardenRules: {
      overflowY: "auto",
      height: "50%",
      width: "90%",
      marginLeft: "5%",
    },
    seedsTitle: {
      width: "100%",
      color: theme.palette.primary.main,
      fontWeight: "bold",
    },
    buttonWrapper: {
      margin: theme.spacing(1),
      position: "relative",
    },
    buttonProgress: {
      position: "absolute",
      top: "50%",
      left: "50%",
      marginTop: -12,
      marginLeft: -12,
    },
  })
);

export const GardenSummary: React.FC<GardenSummaryProps> = ({
  gardenName,
  gardenDesc,
  userRules,
  createGardenHandler,
  animDirection,
  loading,
}) => {
  const initDir = animDirection === "left" ? "5vw" : "-5vw";
  const exitDir = animDirection === "left" ? "-5vw" : "5vw";
  const classes = useStyles();
  return (
    <Grid
      className={classes.root}
      component={motion.div}
      initial={{ opacity: 0, x: initDir }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6 }}
      exit={{ opacity: 0, x: exitDir }}
    >
      <Typography variant="h3" className={classes.title}>
        Summary
      </Typography>
      <Grid container direction="column" className={classes.detailsContainer}>
        <Grid
          container
          direction="row"
          className={classes.gardenDetailGrid}
          justifyContent="center"
        >
          <Typography variant="h6" className={classes.subtitle}>
            Flower Bed Name:
          </Typography>
          <Typography variant="h5" className={classes.gardenDetails}>
            {gardenName}
          </Typography>
        </Grid>
        {gardenDesc && (
          <Grid
            container
            direction="row"
            className={classes.gardenDetailGrid}
            justifyContent="center"
            alignItems="center"
          >
            <Typography variant="h6" className={classes.subtitle}>
              Description:
            </Typography>
            <Typography variant="body1" className={classes.gardenDetails}>
              {gardenDesc}
            </Typography>
          </Grid>
        )}
      </Grid>
      <Grid
        container
        className={classes.gardenRules}
        direction="row"
        justifyContent="center"
      >
        <Typography variant="h5" className={classes.seedsTitle}>
          Your seeds:
        </Typography>
        <List>
          {userRules.map((rule, idx) => (
            <ListItem className="rule-li" key={`${rule.name}-${idx}`}>
              <UserRule name={rule.name} description={rule.description} />
            </ListItem>
          ))}
        </List>
      </Grid>
      <div className={classes.buttonWrapper}>
        <Button
          disabled={loading}
          size="large"
          variant="contained"
          color="primary"
          onClick={createGardenHandler}
          startIcon={<AddCircleIcon />}
        >
          Add Flower Bed
        </Button>
        {loading && (
          <CircularProgress size={28} className={classes.buttonProgress} />
        )}
      </div>
    </Grid>
  );
};
