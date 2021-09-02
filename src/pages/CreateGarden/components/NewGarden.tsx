import { Grid, TextField, Typography } from "@material-ui/core";
import { motion } from "framer-motion";
import React from "react";
import "./NewGarden.css";

interface NewGardenProps {
  nameChangeHandler: React.ChangeEventHandler<HTMLInputElement>;
  name: string;
  descChangeHandler: React.ChangeEventHandler<HTMLInputElement>;
  desc: string;
  animDirection: "left" | "right";
}

export const NewGarden: React.FC<NewGardenProps> = ({
  nameChangeHandler,
  name,
  descChangeHandler,
  desc,
  animDirection,
}) => {
  const initDir = animDirection === "left" ? "5vw" : "-5vw";
  const exitDir = animDirection === "left" ? "-5vw" : "5vw";
  return (
    <Grid
      container={true}
      className="new-garden-container"
      justifyContent="center"
      component={motion.div}
      initial={{ opacity: 0, x: initDir }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6 }}
      exit={{ opacity: 0, x: exitDir }}
    >
      <Typography variant="h3">Create Garden</Typography>
      <Typography variant="overline">Give your Flower Bed a name.</Typography>
      <TextField
        type="text"
        name="name"
        onChange={nameChangeHandler}
        value={name}
        autoComplete="off"
        variant="outlined"
        label="Name:"
        required
      />
      <Typography variant="overline">Add a description(optional)</Typography>
      <TextField
        type="text"
        name="desc"
        onChange={descChangeHandler}
        value={desc}
        autoComplete="off"
        variant="outlined"
        label="Description:"
        multiline
        rows={3}
      />
    </Grid>
  );
};
