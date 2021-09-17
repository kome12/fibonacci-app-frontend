import { createStyles, makeStyles, Theme } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Redirect } from "react-router-dom";
import { Head } from "../../components/Head";
import { LoadingWrapper } from "../../components/LoadingWrapper";
import { buyFlower } from "../../helpers/api/flowers/buyFlower";
import { getFlowers } from "../../helpers/api/flowers/getFlowers";
import { Flower } from "../../models/flower.model";
import { useUserState } from "../../store/user/useUserState";
import { useApi } from "../../utils/api/useApi";
import { AlertDialog } from "./component/dialog";
import styles from "./Florist.module.css";

// TODO: Refactor page layout
// TODO: Add coins to price

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      width: "90%",
      maxWidth: "600px",
      margin: "0 auto",
      padding: "0 5%",
      height: "auto !important",
    },
    header: {
      margin: "2%",
      marginLeft: "5%",
      width: "100%",
    },
    title: {
      margin: "1rem 0",
    },
    subtitle: {
      margin: "2%",
      textAlign: "center",
    },
    welcomeText: {
      marginBottom: "2%",
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
      borderRadius: "4px",
    },
    boughtName: {
      minHeight: "40px",
      textAlign: "center",
      marginTop: "5%",
      fontWeight: "bold",
    },
    noCoin: {
      marginBottom: "2%",
      backgroundColor: theme.palette.error.light,
    },
    notBoughtName: {
      minHeight: "20px",
      textAlign: "center",
      marginTop: "5%",
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

  const [dialogStatus, setDialogStatus] = useState(false);
  const [selectFlowerData, setSelectFlowerData] = useState<Flower | null>(null);

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

  const cancelHandler = () => {
    setDialogStatus(false);
  };

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
    <>
      <Head title="Florist" />
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
          <Grid container justifyContent="flex-start">
            <h1 className={classes.title}>Florist</h1>
          </Grid>
          <Grid container direction="row" justifyContent="center">
            {errMsgVis && buyFlowerError ? (
              <Typography className={classes.errorMsg}>
                Error buying flower, please try again.
              </Typography>
            ) : (
              <Grid className={classes.subtitle}>
                <Typography variant="h6">Welcome to our store.</Typography>
                {!userData.balance ? (
                  <Typography variant="body1" className={classes.noCoin}>
                    To buy flowers you need coins! Plant some seeds and your
                    wallet will grow.
                  </Typography>
                ) : (
                  <Typography variant="body1" className={classes.welcomeText}>
                    Why don't you take a look around?
                  </Typography>
                )}
              </Grid>
            )}
          </Grid>
          <Grid
            container
            justifyContent="center"
            className={classes.flowerList}
          >
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
                    <Typography
                      variant="caption"
                      className={classes.boughtName}
                    >
                      {flower.name}
                    </Typography>
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
                      <Typography
                        variant="caption"
                        className={classes.notBoughtName}
                      >
                        ???
                      </Typography>
                      <img
                        src={flower.imageURL}
                        alt={"secret flower pic"}
                        className={styles.notBoughtPic}
                      />
                      <Button
                        variant="contained"
                        onClick={() => {
                          setDialogStatus(true);
                          setSelectFlowerData(flower);
                        }}
                        color="primary"
                        className={classes.buyButton}
                        disabled={
                          !userData.balance || flower.price > userData.balance
                        }
                      >
                        Buy: {flower.price}
                      </Button>
                    </LoadingWrapper>
                  </Grid>
                );
              })}
              {dialogStatus && selectFlowerData !== null && (
                <AlertDialog
                  selectFlower={selectFlowerData}
                  buyFlowerHandler={buyFlowerHandler}
                  cancelHandler={cancelHandler}
                />
              )}
            </LoadingWrapper>
          </Grid>
        </Grid>
      </Grid>
    </>
  ) : (
    <Redirect exact to="/" />
  );
};
