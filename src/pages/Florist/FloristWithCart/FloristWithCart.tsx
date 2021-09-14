import {
  Button,
  createStyles,
  Fab,
  Grid,
  makeStyles,
  Menu,
  MenuItem,
  Theme,
  Typography,
} from "@material-ui/core";
import { useEffect, useMemo, useRef, useState } from "react";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import BackspaceIcon from "@material-ui/icons/Backspace";
import styles from "./Florist.module.css";
import { Flower } from "../../../models/flower.model";
import { getFlowers } from "../../../helpers/api/flowers/getFlowers";
import { useApi } from "../../../utils/api/useApi";
import { LoadingWrapper } from "../../../components/LoadingWrapper";

// Previous component for using the store page with a cart,
// could possibly use in the future so currently not deleted.

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
    selected: {
      backgroundColor: "#6ac69780",
    },
    notSelected: {
      backgroundColor: theme.palette.background.default,
    },
    cartButton: {
      marginLeft: "0%",
      left: "15%",
    },
    deleteButton: {
      color: theme.palette.error.main,
      padding: "5%",
    },
    buyFlowers: {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.background.paper,
      "&:hover": {
        backgroundColor: theme.palette.primary.dark,
      },
    },
  })
);

export const FloristWithCart = () => {
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

  const [cart, setCart] = useState<Flower[]>([]);
  const addOrRemoveFlower = (flowerItem: Flower) => {
    setCart((prev) => {
      const filteredCart = cart.filter((v) => v.name === flowerItem.name);
      if (filteredCart.length === 0) {
        return [...prev, flowerItem];
      } else if (filteredCart.length === 1) {
        return cart.filter((v) => v.name !== flowerItem.name);
      } else {
        return prev;
      }
    });
  };
  const deleteFromCart = (flowerItem: Flower) => {
    setCart((cart) => {
      return cart.filter((flower) => flower.name !== flowerItem.name);
    });
  };
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const openMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    cart.length === 1 && setAnchorEl(null);
  };
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
        <Fab
          color="primary"
          onClick={openMenu}
          disabled={cart.length < 1}
          className={classes.cartButton}
        >
          <ShoppingCartIcon />
        </Fab>
        <Menu
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          {cart.map((cartItem) => (
            <MenuItem onClick={handleClose} key={cartItem.name}>
              <Grid
                container
                direction="row"
                justifyContent="center"
                alignItems="center"
              >
                <Grid item xs={8}>
                  <Typography variant="h6">{cartItem.name}</Typography>
                </Grid>
                <Grid item xs={3}>
                  <Button
                    className={classes.deleteButton}
                    startIcon={<BackspaceIcon />}
                    onClick={() => deleteFromCart(cartItem)}
                  ></Button>
                </Grid>
              </Grid>
            </MenuItem>
          ))}
          <MenuItem>
            <Button className={classes.buyFlowers}>Buy Flowers</Button>
          </MenuItem>
        </Menu>
      </Grid>
      <Grid container justifyContent="center" className={classes.flowerList}>
        <LoadingWrapper isLoading={!flowersAPIState.isLoaded}>
          {allFlowers.map((flower) => {
            return (
              <Button
                key={flower.name}
                className={classes.card}
                onClick={() => addOrRemoveFlower(flower)}
              >
                <Grid
                  container
                  direction="column"
                  alignItems="center"
                  justifyContent="center"
                  className={
                    cart.includes(flower)
                      ? classes.selected
                      : classes.notSelected
                  }
                >
                  <Typography variant="caption">{flower.name}</Typography>
                  <img
                    src={flower.imageURL}
                    alt={`${flower.name} pic`}
                    className={styles.pic}
                  />
                  <Typography variant="caption">
                    Price: {flower.price}
                  </Typography>
                </Grid>
              </Button>
            );
          })}
        </LoadingWrapper>
      </Grid>
    </Grid>
  );
};
