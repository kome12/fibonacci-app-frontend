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
import styles from "./DescriptionInput.module.css";

type Props = {
  currentGardenDescription: string;
  initialGardenDescription: string;
  onDescriptionInputChange: (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => void;
  setShowDescriptionInput: React.Dispatch<React.SetStateAction<boolean>>;
  setGardenDescription: React.Dispatch<
    React.SetStateAction<string | undefined>
  >;
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

export const DescriptionInput: React.FC<Props> = memo(
  ({
    currentGardenDescription,
    initialGardenDescription,
    onDescriptionInputChange,
    setShowDescriptionInput,
    setGardenDescription,
    garden,
  }) => {
    const classes = useStyles();
    const [updateGardenApi, updateGardenInfo] = useApi(updateGardenData);

    const disableUpdate = useMemo(
      () =>
        initialGardenDescription === currentGardenDescription ||
        updateGardenApi.status === "loading",
      [
        initialGardenDescription,
        currentGardenDescription,
        updateGardenApi.status,
      ]
    );

    const updateGarden = useCallback(
      async () => {
        if (!garden) return;

        const data: GardenUpdateParams["data"] = {
          description: currentGardenDescription,
          fireBaseUserId: garden.fireBaseUserId,
          gardenCategoryId: garden.gardenCategoryId,
        };
        updateGardenInfo({
          gardenId: garden._id,
          data,
        });
      },
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [garden, currentGardenDescription]
    );

    const onCancel = useCallback(() => {
      setShowDescriptionInput(false);
      setGardenDescription(initialGardenDescription);
    }, [
      initialGardenDescription,
      setGardenDescription,
      setShowDescriptionInput,
    ]);

    useEffect(() => {
      if (updateGardenApi.status === "succeeded") {
        setShowDescriptionInput(false);
        setGardenDescription(updateGardenApi.response.description);
      }
    }, [setGardenDescription, setShowDescriptionInput, updateGardenApi]);

    return (
      <>
        <TextField
          label="Garden Description"
          variant="outlined"
          className={styles.descriptionInput}
          value={currentGardenDescription}
          onChange={onDescriptionInputChange}
          disabled={updateGardenApi.status === "loading"}
        />
        <div className={styles.descriptionInputButtons}>
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
  }
);
