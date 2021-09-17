import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";
import { createStyles, makeStyles } from "@material-ui/styles";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  createGardenRule,
  NewGardenRule,
} from "../../../../helpers/api/gardens/createGardenRules";
import { Rule } from "../../../../models/rule.model";
import { useApi } from "../../../../utils/api/useApi";

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
  handleModal: React.Dispatch<React.SetStateAction<boolean>>;
  showModal: boolean;
  gardenId: string;
  updateInitSeeds: React.Dispatch<React.SetStateAction<Rule[] | undefined>>;
  initSeeds: Rule[];
};

export const CreateSeedModal: React.FC<Props> = ({
  handleModal,
  showModal,
  gardenId,
  updateInitSeeds,
  initSeeds,
}) => {
  const classes = useStyles();
  const [createGardenRuleApi, createNewRule] = useApi(createGardenRule);
  const handleClose = useCallback(() => handleModal(false), [handleModal]);
  const [newSeed, setNewSeed] = useState<{ name: string; description: string }>(
    { name: "", description: "" }
  );

  const onInputChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
      const { value, name } = e.currentTarget;

      setNewSeed((seed) => ({ ...seed, [name]: value }));
    },
    []
  );

  const createGardenSeed = useCallback(() => {
    const data: NewGardenRule = {
      gardenId,
      ...newSeed,
    };
    createNewRule(data);
  }, [createNewRule, newSeed, gardenId]);

  const disableButton = useMemo(
    () => newSeed.name.length === 0 || createGardenRuleApi.status === "loading",
    [newSeed, createGardenRuleApi.status]
  );

  useEffect(() => {
    if (createGardenRuleApi.status === "succeeded") {
      handleModal(false);
      updateInitSeeds((seeds) => {
        const currentSeeds = [...(seeds ?? initSeeds)];

        return [...currentSeeds, createGardenRuleApi.response];
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [createGardenRuleApi, handleModal, updateInitSeeds]);

  return (
    <div>
      <Dialog open={showModal} onClose={handleClose}>
        <DialogTitle>Create a new Seed</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            name="name"
            label="New Seed Name"
            placeholder="Add New Seed Name"
            type="text"
            fullWidth
            variant="standard"
            onChange={onInputChange}
            disabled={createGardenRuleApi.status === "loading"}
            required
          />
          <TextField
            margin="dense"
            name="description"
            label="New Seed Description"
            placeholder="Add New Seed Description"
            type="text"
            fullWidth
            onChange={onInputChange}
            disabled={createGardenRuleApi.status === "loading"}
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button
            variant="outlined"
            onClick={handleClose}
            disabled={createGardenRuleApi.status === "loading"}
          >
            Cancel
          </Button>
          <div className={classes.buttonWrapper}>
            <Button
              color="primary"
              variant="contained"
              onClick={createGardenSeed}
              disabled={disableButton}
            >
              Create Seed
            </Button>

            {createGardenRuleApi.status === "loading" && (
              <CircularProgress size={28} className={classes.buttonProgress} />
            )}
          </div>
        </DialogActions>
      </Dialog>
    </div>
  );
};
