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
import { useState } from "react";
import flowerPic from "./assets/flower.png";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import BackspaceIcon from "@material-ui/icons/Backspace";
import styles from "./Florist.module.css";

const flowers = [
  { name: "Daisy", price: 2 },
  { name: "Rose", price: 7 },
  { name: "Tulip", price: 5 },
  { name: "Sakura", price: 6 },
  { name: "Daisy1", price: 2 },
  { name: "Rose1", price: 7 },
  { name: "Tulip1", price: 5 },
  { name: "Sakura1", price: 6 },
  { name: "Daisy2", price: 2 },
  { name: "Rose2", price: 7 },
  { name: "Tulip2", price: 5 },
  { name: "Sakura2", price: 6 },
];

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

interface Flower {
  name: string;
  price: number;
}

export const Florist = () => {
  const [cart, setCart] = useState<Flower[]>([]);
  const addToCart = (flowerItem: Flower) => {
    setCart((prev) => {
      if (cart.filter((v) => v.name === flowerItem.name).length === 0) {
        return [...prev, flowerItem];
      }
      return prev;
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
        {flowers.map((flower) => {
          return (
            <Button
              key={flower.name}
              className={classes.card}
              onClick={() => addToCart(flower)}
            >
              <Grid
                container
                direction="column"
                alignItems="center"
                justifyContent="center"
                className={
                  cart.includes(flower) ? classes.selected : classes.notSelected
                }
              >
                <Typography variant="h6">{flower.name}</Typography>
                <img
                  src={flowerPic}
                  alt={`${flower.name} pic`}
                  className={styles.pic}
                />
                <Typography variant="body1">Price: {flower.price}</Typography>
              </Grid>
            </Button>
          );
        })}
      </Grid>
    </Grid>
  );
};
