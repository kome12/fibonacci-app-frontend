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
} from "@material-ui/core";

import MuiDialogTitle from "@material-ui/core/DialogTitle";
import { withStyles } from "@material-ui/core/styles";
import { Flower } from "../../../models/flower.model";
import styles from "../Florist.module.css";

interface AlertDialogProps {
  selectFlower: Flower;
  buyFlowerHandler: (flowerid: string, flowerprice: number) => void;
  cancelHandler: () => void;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    form: {
      width: "fit-content",
    },
    dialog: {
      textAlign: "center",
    },
    confirmText: {
      fontSize: "0.5rem",
    },
    priceText: {
      textAlign: "center",
      fontWeight: "bold",
      fontSize: "1.3rem",
    },
    confirmButton: {
      alignItems: "center",
      justifyContent: "space-around",
    },
  })
);

const DialogTitle = withStyles((theme: Theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogTitle);

export const AlertDialog: React.FC<AlertDialogProps> = ({
  selectFlower,
  buyFlowerHandler,
  cancelHandler,
}) => {
  const classes = useStyles();

  const [open, setOpen] = React.useState(true);

  const handleClose = () => {
    setOpen(false);
    cancelHandler();
  };

  const purchase = () => {
    buyFlowerHandler(selectFlower._id, selectFlower.price);
    setOpen(false);
    cancelHandler();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title" className={classes.confirmText}>
        "Would you like to purchase it?"
      </DialogTitle>
      <DialogContent className={classes.dialog}>
        <img
          src={selectFlower.imageURL}
          alt={"secret flower pic"}
          className={styles.notBoughtPicDialog}
        />
        <DialogContentText className={classes.priceText}>
          price : {selectFlower.price}
        </DialogContentText>
      </DialogContent>
      <DialogActions className={classes.confirmButton}>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button
          variant="contained"
          onClick={purchase}
          color="primary"
          autoFocus
        >
          Purchase
        </Button>
      </DialogActions>
    </Dialog>
  );
};
