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
import { buyFlower } from "../../helpers/api/flowers/buyFlower";
import { useUserState } from "../../store/user/useUserState";
import { Redirect } from "react-router-dom";

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
  const { userData, setUserData } = useUserState();
  // const [bought, setBought] = useState<string[]>([]);
  const [lastBought, setLastBought] = useState<string | null>(null);
  // const [currBalance, setCurrBalance] = useState<number | null>(null)
  const [buyFlowerError, setBuyFlowerError] = useState<boolean>(false);
  const [errMsgVis, setErrMsgVis] = useState<boolean>(false);
  // const [buyFlowerLoading, setBuyFlowerLoading] = useState<boolean>(false);
  const [buyFlowerAPIState, buyFlowerReq] = useApi(buyFlower);

  const bought = useMemo(()=>userData.isLoggedIn&&userData.flowerCollections||[],[userData])
  const currBalance = useMemo(()=>userData.isLoggedIn&&userData.balance||0,[userData])

  // useEffect(() => {
  //   if (userData.isLoggedIn) {
  //     // setBought(userData.flowerCollections);
  //     // setCurrBalance(userData.balance);
  //   }
  // }, [userData])

  const buyFlowerHandler = async (flowerId: string, flowerPrice: number) => {
    if (userData.isLoggedIn) {
      setLastBought(flowerId);
      await buyFlowerReq({
        fireBaseUserId: userData.id,
        flowerId,
        price: flowerPrice,
      });
      
    }
  };
  
  useEffect(() => {
    // if (buyFlowerAPIState.status === "loading") {
    //   setBuyFlowerLoading(true);
    // }
    if (buyFlowerAPIState.status === "succeeded" && lastBought) {
      setBuyFlowerError(false);
      
      setUserData((data) => {
        const newFlowerCollection = data.isLoggedIn && data.flowerCollections ||[]
        return({ ...data, balance: currBalance, flowerCollections: [...newFlowerCollection,...bought] })})
      // setBought((prev) => {
      //   if (!bought.includes(lastBought)) {
      //     return [...prev, lastBought];
      //   } else {
      //     return prev;
      //   }
      // });
      // setCurrBalance(buyFlowerAPIState.response.balance);
    }

    if (buyFlowerAPIState.status === "failed") {
      setBuyFlowerError(true);
      
    }
  }, [buyFlowerAPIState.status, lastBought]);

  // useEffect(() => {
  // }, [currBalance, bought, setUserData])

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

  const classes = useStyles();
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
              const isBought = bought.includes(flower._id);
              // console.log("isBought:", isBought,"bought:", bought, "flower:", flower, allFlowers);
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
                    isLoading={flower._id === lastBought && buyFlowerAPIState.status === 'loading'}
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
