import {
  Button,
  createStyles,
  Grid,
  makeStyles,
  Theme,
  Typography,
} from "@material-ui/core";
import { useEffect, useMemo, useRef, useState } from "react";
import styles from "./Florist.module.css";
import QuestionMark from "./assets/questionMark.png";
import { getFlowers } from "../../helpers/api/flowers/getFlowers";
import { useApi } from "../../utils/api/useApi";
import { LoadingWrapper } from "../../components/LoadingWrapper";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      width: "90%",
      marginLeft: "2.5%",
      padding: "5%",
    },
    header: {
      margin: "2%",
      marginLeft: "5%",
      width: "100%",
    },
    flowerList: {
      width: "100%",
    },
    card: {
      margin: "1%",
      height: "30%",
      width: "30%",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    cardBought: {
      margin: "1%",
      height: "30%",
      width: "30%",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      backgroundColor: "#6ac69780",
    },
  })
);

export const Florist = () => {
  const [bought, setBought] = useState<string[]>([]);
  const buyFlower = (flowerId, flowerPrice) => {
    setBought((prev) => [...prev, flowerId]);
  };
  const [flowersAPIState, getAllFlowers] = useApi(getFlowers);
  const allFlowers = useMemo(
    () => flowersAPIState.response ?? [],
    [flowersAPIState]
  );
  const calledOnMount = useRef(false);
  useEffect(() => {
    if (!calledOnMount.current) {
      getAllFlowers();
    }
    calledOnMount.current = true;
  }, [getAllFlowers]);

  const classes = useStyles();
  return (
    <Grid
      container
      direction="column"
      alignItems="center"
      justifyContent="center"
      className={classes.container}
    >
      <Grid
        container
        direction="row"
        alignItems="center"
        justifyContent="center"
        className={classes.header}
      >
        <Typography variant="h3">Florist</Typography>
        <Grid container justifyContent="center" className={classes.flowerList}>
          <LoadingWrapper isLoading={!flowersAPIState.isLoaded}>
            {allFlowers.map((flower) => {
              const isBought = bought.includes(flower._id);
              return isBought ? (
                <Grid
                  container
                  direction="column"
                  alignItems="center"
                  justifyContent="center"
                  className={classes.card}
                  key={flower._id}
                >
                  <Typography variant="caption">{flower.name}</Typography>
                  <img
                    src={flower.imageURL}
                    alt={`${flower.name} pic`}
                    className={styles.pic}
                  />
                  <Button
                    variant="contained"
                    onClick={() => buyFlower(flower._id, flower.price)}
                  >
                    Buy: {flower.price}
                  </Button>
                </Grid>
              ) : (
                <Grid
                  container
                  direction="column"
                  alignItems="center"
                  justifyContent="center"
                  className={classes.cardBought}
                  key={flower._id}
                >
                  <Typography variant="caption">{flower.name}</Typography>
                  <img
                    src={QuestionMark}
                    alt={"secret flower pic"}
                    className={styles.pic}
                  />
                </Grid>
              );
            })}
            ;
          </LoadingWrapper>
        </Grid>
      </Grid>
    </Grid>
  );
};
