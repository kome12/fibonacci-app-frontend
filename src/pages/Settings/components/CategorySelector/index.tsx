import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import TextField from "@material-ui/core/TextField";
import { createStyles, makeStyles } from "@material-ui/styles";
import React, { useCallback, useEffect, useMemo } from "react";
import {
  GardenUpdateParams,
  updateGardenData,
} from "../../../../helpers/api/gardens/updateGardenData";
import { Category } from "../../../../models/category.model";
import { useApi } from "../../../../utils/api/useApi";
import styles from "./CategorySelector.module.css";

const useStyles = makeStyles(() =>
  createStyles({
    buttonWrapper: {
      position: "relative",
      display: "inline-block",
      marginLeft: 15,
    },
    buttonProgress: {
      position: "absolute",
      top: "50%",
      left: "50%",
      marginTop: -12,
      marginLeft: -12,
    },
  })
);

type Props = {
  categories: Category[];
  showSelector: boolean;
  currentGardenCategoryId: string;
  initialGardenCategoryId: string;
  onCategoryInputChange: (
    e: React.ChangeEvent<{ name?: string | undefined; value: unknown }>
  ) => void;
  setShowCategoryInput: React.Dispatch<React.SetStateAction<boolean>>;
  setGardenCategoryId: React.Dispatch<React.SetStateAction<string | undefined>>;
  updateInitVal: React.Dispatch<React.SetStateAction<string | undefined>>;
  gardenId: string;
  updateData: GardenUpdateParams["data"];
};

export const CategorySelector: React.FC<Props> = ({
  categories,
  showSelector,
  currentGardenCategoryId,
  initialGardenCategoryId,
  onCategoryInputChange,
  setShowCategoryInput,
  setGardenCategoryId,
  updateInitVal,
  gardenId,
  updateData,
}) => {
  const classes = useStyles();
  const [updateGardenApi, updateGardenInfo] = useApi(updateGardenData);

  const disableUpdate = useMemo(
    () =>
      initialGardenCategoryId === currentGardenCategoryId ||
      updateGardenApi.status === "loading",
    [currentGardenCategoryId, initialGardenCategoryId, updateGardenApi.status]
  );

  const categoryName = useMemo(
    () =>
      categories.find((category) => category._id === initialGardenCategoryId)
        ?.name ?? "-",
    [categories, initialGardenCategoryId]
  );

  const updateGarden = useCallback(
    async () => {
      updateGardenInfo({
        gardenId,
        data: { ...updateData, gardenCategoryId: currentGardenCategoryId },
      });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [gardenId, currentGardenCategoryId]
  );

  const onCancel = useCallback(() => {
    setShowCategoryInput(false);
    setGardenCategoryId(initialGardenCategoryId);
  }, [initialGardenCategoryId, setGardenCategoryId, setShowCategoryInput]);

  const onEdit = useCallback(() => {
    setShowCategoryInput(true);
  }, [setShowCategoryInput]);

  useEffect(() => {
    if (updateGardenApi.status === "succeeded") {
      setShowCategoryInput(false);
      updateInitVal(updateGardenApi.response.gardenCategoryId || "-");
    }
  }, [setShowCategoryInput, updateGardenApi, updateInitVal]);

  return !showSelector ? (
    <>
      <TextField
        label="Garden Category"
        variant={showSelector ? "outlined" : undefined}
        className={styles.categoryData}
        value={categoryName}
        InputProps={{
          readOnly: true,
        }}
      />
      <div className={styles.buttonsWrapper}>
        <Button color="primary" variant="contained" onClick={onEdit}>
          Edit
        </Button>
      </div>
    </>
  ) : (
    <>
      <FormControl className={styles.selectorWrapper}>
        <InputLabel id="category-select-label">Garden Category</InputLabel>
        <Select
          labelId="category-select-label"
          id="category-select"
          value={currentGardenCategoryId}
          onChange={onCategoryInputChange}
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
      <div className={styles.buttonsWrapper}>
        <Button
          variant="outlined"
          onClick={onCancel}
          disabled={updateGardenApi.status === "loading"}
        >
          Cancel
        </Button>

        <div className={classes.buttonWrapper}>
          <Button
            color="primary"
            variant="contained"
            onClick={updateGarden}
            disabled={disableUpdate}
          >
            Update
          </Button>
          {updateGardenApi.status === "loading" && (
            <CircularProgress size={28} className={classes.buttonProgress} />
          )}
        </div>
      </div>
    </>
  );
};
