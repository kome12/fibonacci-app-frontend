import { createStyles, makeStyles } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import TextField from "@material-ui/core/TextField";
import React, { memo, useCallback, useEffect, useMemo } from "react";
import {
  GardenUpdateParams,
  updateGardenData,
} from "../../../../helpers/api/gardens/updateGardenData";
import { Garden } from "../../../../models/garden.model";
import { useApi } from "../../../../utils/api/useApi";
import styles from "./NameInput.module.css";

type Props = {
  showInput: boolean;
  currentGardenName: string;
  initialGardenName: string;
  onNameInputChange: (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => void;
  setShowNameInput: React.Dispatch<React.SetStateAction<boolean>>;
  setGardenName: React.Dispatch<React.SetStateAction<string | undefined>>;
  updateInitVal: React.Dispatch<React.SetStateAction<string | undefined>>;
  garden: Required<Garden> | undefined;
};

const useStyles = makeStyles(() =>
  createStyles({
    buttonWrapper: {
      position: "relative",
      display: "inline-block",
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

export const NameInput: React.FC<Props> = memo(
  ({
    currentGardenName,
    initialGardenName,
    onNameInputChange,
    setShowNameInput,
    setGardenName,
    garden,
    showInput,
    updateInitVal,
  }) => {
    const classes = useStyles();
    const [updateGardenApi, updateGardenInfo] = useApi(updateGardenData);

    const disableUpdate = useMemo(
      () =>
        initialGardenName === currentGardenName ||
        updateGardenApi.status === "loading" ||
        currentGardenName.length === 0,
      [initialGardenName, currentGardenName, updateGardenApi.status]
    );

    const updateGarden = useCallback(
      async () => {
        if (!garden) return;

        const data: GardenUpdateParams["data"] = {
          name: currentGardenName,
          fireBaseUserId: garden.fireBaseUserId,
          gardenCategoryId: garden.gardenCategoryId,
        };
        updateGardenInfo({
          gardenId: garden._id,
          data,
        });
      },
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [garden, currentGardenName]
    );

    const onCancel = useCallback(() => {
      setShowNameInput(false);
      setGardenName(initialGardenName);
    }, [initialGardenName, setGardenName, setShowNameInput]);

    const onEdit = useCallback(() => {
      setShowNameInput(true);
    }, [setShowNameInput]);

    useEffect(() => {
      if (updateGardenApi.status === "succeeded") {
        setShowNameInput(false);
        setGardenName(updateGardenApi.response.name || "-");
        updateInitVal(updateGardenApi.response.name || "-");
      }
    }, [setGardenName, setShowNameInput, updateGardenApi, updateInitVal]);

    return (
      <>
        <TextField
          label="Garden Name"
          variant={showInput ? "outlined" : undefined}
          className={styles.nameInput}
          value={currentGardenName}
          onChange={onNameInputChange}
          InputProps={{
            readOnly: !showInput,
          }}
          disabled={updateGardenApi.status === "loading"}
        />
        <div className={styles.nameInputButtons}>
          {showInput ? (
            <>
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
                  <CircularProgress
                    size={28}
                    className={classes.buttonProgress}
                  />
                )}
              </div>
            </>
          ) : (
            <Button color="primary" variant="contained" onClick={onEdit}>
              Edit
            </Button>
          )}
        </div>
      </>
    );
  }
);
