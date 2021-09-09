import {
  createStyles,
  Grid,
  makeStyles,
  TextField,
  Theme,
  Typography,
} from "@material-ui/core";
import { motion } from "framer-motion";
import React from "react";
import { useMemo, useEffect } from "react";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { getCategories } from "../../../helpers/api/gardens/getCategories";
import { useApi } from "../../../utils/api/useApi";

interface NewGardenProps {
  nameChangeHandler: React.ChangeEventHandler<HTMLInputElement>;
  name: string;
  descChangeHandler: React.ChangeEventHandler<HTMLInputElement>;
  desc: string;
  categoryChangeHandler: (
    e: React.ChangeEvent<{ name?: string | undefined; value: unknown }>
  ) => void;
  category: string;
  animDirection: "left" | "right";
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      flexGrow: 1,
      height: "100%",
      flexDirection: "column",
      backgroundColor: theme.palette.background.default,
    },
    title: {
      marginTop: "1rem",
      marginBottom: "1rem",
      color: theme.palette.primary.main,
      fontWeight: "bold",
    },
    text: {
      marginTop: "1rem",
      marginBottom: "0.5rem",
      color: theme.palette.primary.dark,
    },
    textInput: {
      width: "90%",
      marginLeft: "5%",
    },
    formControl: {
      margin: "auto",
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  })
);

export const NewGarden: React.FC<NewGardenProps> = ({
  nameChangeHandler,
  name,
  descChangeHandler,
  desc,
  categoryChangeHandler,
  category,
  animDirection,
}) => {
  const initDir = animDirection === "left" ? "5vw" : "-5vw";
  const exitDir = animDirection === "left" ? "-5vw" : "5vw";
  const classes = useStyles();

  const [categoriesApi, getGardenCategories] = useApi(getCategories);

  const categories = useMemo(() => categoriesApi.response, [categoriesApi]);

  useEffect(() => {
    console.log(categories);
    getGardenCategories();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Grid
      container={true}
      className={classes.container}
      justifyContent="center"
      component={motion.div}
      initial={{ opacity: 0, x: initDir }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6 }}
      exit={{ opacity: 0, x: exitDir }}
    >
      <Typography variant="h3" className={classes.title}>
        Add Flower Bed
      </Typography>
      <Typography variant="body1" className={classes.text}>
        Give your Flower Bed a name.
      </Typography>
      <TextField
        type="text"
        name="name"
        className={classes.textInput}
        onChange={nameChangeHandler}
        value={name}
        autoComplete="off"
        variant="outlined"
        label="Name:"
        required
      />
      <Typography variant="body1" className={classes.text}>
        Add a description(optional)
      </Typography>
      <TextField
        type="text"
        name="desc"
        className={classes.textInput}
        onChange={descChangeHandler}
        value={desc}
        autoComplete="off"
        variant="outlined"
        label="Description:"
      />
      <FormControl className={classes.formControl}>
        <InputLabel id="category-select-label">Category</InputLabel>
        <Select
          labelId="category-select-label"
          id="category-select"
          value={category}
          onChange={categoryChangeHandler}
          required
        >
          {categories?.map((category, index) => {
            return (
              <MenuItem value={category._id} key={index}>
                {category.name}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    </Grid>
  );
};
