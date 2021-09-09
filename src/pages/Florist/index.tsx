import {
  Button,
  createStyles,
  Grid,
  makeStyles,
  Theme,
  Typography,
} from "@material-ui/core";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Redirect } from "react-router-dom";
import { LoadingWrapper } from "../../components/LoadingWrapper";
import { buyFlower } from "../../helpers/api/flowers/buyFlower";
import { getFlowers } from "../../helpers/api/flowers/getFlowers";
import { useUserState } from "../../store/user/useUserState";
import { useApi } from "../../utils/api/useApi";
import QuestionMark from "./assets/questionMark.png";
import styles from "./Florist.module.css";

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
    buyButton: {
      marginBottom: "0.125rem",
      width: "100%",
    },
    errorMsg: {
      backgroundColor: theme.palette.error.light,
    },
  })
);

export const Florist = () => {
  const classes = useStyles();
  const { userData, setUserData } = useUserState();
  const [lastBought, setLastBought] = useState<string | null>(null);
  const [flowerPrice, setFlowerPrice] = useState(0);
  const [buyFlowerError, setBuyFlowerError] = useState(false);
  const [errMsgVis, setErrMsgVis] = useState(false);

  const [buyFlowerAPIState, buyFlowerReq] = useApi(buyFlower);

  const userId = useMemo(
    () => (userData.isLoggedIn && userData.id) || "",
    [userData]
  );
  const boughtFlowers = useMemo(
    () => (userData.isLoggedIn && userData.flowerCollections) || [],
    [userData]
  );

  const buyFlowerHandler = useCallback(
    async (flowerId: string, flowerPrice: number) => {
      if (userId) {
        setLastBought(flowerId);
        setFlowerPrice(flowerPrice);
        await buyFlowerReq({
          fireBaseUserId: userId,
          flowerId,
          price: flowerPrice,
        });
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [userId]
  );

  useEffect(() => {
    if (buyFlowerAPIState.status === "succeeded" && lastBought) {
      setBuyFlowerError(false);

      setUserData((data) => {
        const newFlowerCollection =
          (data.isLoggedIn && data.flowerCollections) || [];

        const currentBalance = (data.isLoggedIn && data.balance) || 0;
        return {
          ...data,
          balance: currentBalance - flowerPrice,
          flowerCollections: [...newFlowerCollection, ...[lastBought]],
        };
      });
      // MEMO: Conall not sure about this logic so if needed uncomment it else remove it
      // setBought((prev) => {
      //   if (!bought.includes(lastBought)) {
      //     return [...prev, lastBought];
      //   } else {
      //     return prev;
      //   }
      // });
    }

    if (buyFlowerAPIState.status === "failed") {
      setBuyFlowerError(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [buyFlowerAPIState.status, lastBought, flowerPrice]);

  useEffect(() => {
    if (buyFlowerError) {
      setErrMsgVis(true);
      setTimeout(setErrMsgVis, 5000, false);
    }
  }, [buyFlowerError]);

  const [flowersAPIState, getAllFlowers] = useApi(getFlowers);
  const allFlowers = useMemo(
    () => flowersAPIState.response ?? [],
    [flowersAPIState]
  );

  useEffect(() => {
    getAllFlowers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return userData.isLoggedIn ? (
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
        <Grid container direction="row" justifyContent="center">
          {errMsgVis && buyFlowerError ? (
            <Typography className={classes.errorMsg}>
              Error buying flower, please try again.
            </Typography>
          ) : (
            <Typography>
              Welcome to our store, why don't you take a look around?
            </Typography>
          )}
        </Grid>
        <Grid container justifyContent="center" className={classes.flowerList}>
          <LoadingWrapper isLoading={!flowersAPIState.isLoaded}>
            {allFlowers.map((flower) => {
              const isBought = boughtFlowers.includes(flower._id);
              return isBought ? (
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
                    src={flower.imageURL}
                    alt={`${flower.name} pic`}
                    className={styles.boughtPic}
                  />
                </Grid>
              ) : (
                <Grid
                  container
                  direction="column"
                  alignItems="center"
                  justifyContent="center"
                  className={classes.card}
                  key={flower._id}
                >
                  <LoadingWrapper
                    isLoading={
                      flower._id === lastBought &&
                      buyFlowerAPIState.status === "loading"
                    }
                  >
                    <Typography variant="caption">???</Typography>
                    <img
                      src={QuestionMark}
                      alt={"secret flower pic"}
                      className={styles.pic}
                    />
                    <Button
                      variant="contained"
                      onClick={() => buyFlowerHandler(flower._id, flower.price)}
                      color="primary"
                      className={classes.buyButton}
                      disabled={
                        !userData.balance || flower.price > userData.balance
                          ? true
                          : false
                      }
                    >
                      Buy: {flower.price}
                    </Button>
                  </LoadingWrapper>
                </Grid>
              );
            })}
          </LoadingWrapper>
        </Grid>
      </Grid>
    </Grid>
  ) : (
    <Redirect exact to="/" />
  );
};
