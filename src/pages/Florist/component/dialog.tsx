import React from "react";
import {
  Button,
  createStyles,
  makeStyles,
  Theme,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@material-ui/core";

import { Flower } from "../../../models/flower.model";
import styles from "../Florist.module.css";

interface AlertDialogProps {
  selectFlower: Flower;
  purchaseFunction: Function;
  cancelFunction: Function;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    price: {
      textAlign: "center",
    },
  })
);

export const AlertDialog: React.FC<AlertDialogProps> = ({
  selectFlower,
  purchaseFunction,
  cancelFunction,
}) => {
  const classes = useStyles();

  const [open, setOpen] = React.useState(true);

  const handleClose = () => {
    setOpen(false);
    cancelFunction();
  };

  const purchase = () => {
    purchaseFunction(selectFlower._id, selectFlower.price);
    setOpen(false);
    cancelFunction();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        {"Would you like to purchase it?"}
      </DialogTitle>
      <DialogContent>
        <img
          src={selectFlower.imageURL}
          alt={"secret flower pic"}
          className={styles.boughtPic}
        />
        <DialogContentText className={classes.price}>
          price : {selectFlower.price}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={purchase} color="primary" autoFocus>
          Purchase
        </Button>
      </DialogActions>
    </Dialog>
  );
};
