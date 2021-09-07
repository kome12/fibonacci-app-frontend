import {
  Card,
  createStyles,
  Grid,
  makeStyles,
  Theme,
  Typography,
} from "@material-ui/core";
import flowerPic from "./assets/flower.png";
import styles from "./Florist.module.css";

const flowers = [
  { name: "Daisy", price: 2 },
  { name: "Rose", price: 7 },
  { name: "Tulip", price: 5 },
  { name: "Sakura", price: 6 },
];

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      width: "90%",
    },
    card: {
      height: "30%",
      width: "30%",
    },
  })
);

export const Florist = () => {
  const classes = useStyles();
  return (
    <Grid
      container
      direction="column"
      alignItems="center"
      justifyContent="center"
      className={classes.container}
    >
      <Grid container direction="row">
        <Typography variant="h3">Flora's Flowers</Typography>
      </Grid>
      <Grid container justifyContent="center">
        {flowers.map((flower) => (
          <Card key={flower.name} className={classes.card}>
            <Grid container direction="column">
              <Typography variant="h6">{flower.name}</Typography>
              <img
                src={flowerPic}
                alt={`${flower.name} pic`}
                className={styles.pic}
              />
              <Typography variant="body1">Price: {flower.price}</Typography>
            </Grid>
          </Card>
        ))}
      </Grid>
    </Grid>
  );
};
