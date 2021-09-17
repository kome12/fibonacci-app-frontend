import { createStyles, makeStyles } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import React, { memo, useCallback, useEffect, useMemo, useState } from "react";
import {
  GardenRuleUpdateParams,
  updateGardenRule,
} from "../../../../helpers/api/gardens/updateGardenRule";
import { Rule } from "../../../../models/rule.model";
import { useApi } from "../../../../utils/api/useApi";
import { objectDeepEqual } from "../../../../utils/objectDeepEqual";
import styles from "./SeedList.module.css";

const useStyles = makeStyles(() =>
  createStyles({
    buttonWrapper: {
      position: "relative",
      display: "inline-block",
      marginBottom: 10,
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

const ListItem: React.FC<{
  seed: Rule;
  setGardenSeeds: React.Dispatch<React.SetStateAction<Rule[] | undefined>>;
  setInitSeeds: React.Dispatch<React.SetStateAction<Rule[] | undefined>>;
  seedIndex: number;
  initSeeds: Rule[];
  onSeedInputChange: (
    e: React.ChangeEvent<HTMLInputElement>,
    seedIndex: number
  ) => void;
}> = memo(
  ({
    seed,
    setGardenSeeds,
    setInitSeeds,
    seedIndex,
    onSeedInputChange,
    initSeeds,
  }) => {
    const classes = useStyles();
    const [showInput, setShowInput] = useState(false);
    const [updateGardenRuleApi, updateGardenRuleData] =
      useApi(updateGardenRule);

    const disableUpdate = useMemo(
      () =>
        objectDeepEqual(initSeeds[seedIndex], seed) ||
        seed.name.length === 0 ||
        updateGardenRuleApi.status === "loading",
      [initSeeds, seed, seedIndex, updateGardenRuleApi.status]
    );

    const updateRule = useCallback(async () => {
      if (seed._id) {
        const updateData: GardenRuleUpdateParams["data"] = {
          _id: seed._id,
          gardenId: seed.gardenId,
          name: seed.name,
          description: seed.description,
        };

        updateGardenRuleData({
          ruleId: seed._id,
          data: updateData,
        });
      }
    }, [seed, updateGardenRuleData]);

    const onEdit = useCallback(() => {
      setShowInput(true);
    }, []);

    const onCancel = useCallback(() => {
      setShowInput(false);
      setGardenSeeds(initSeeds);
    }, [initSeeds, setGardenSeeds]);

    useEffect(() => {
      if (updateGardenRuleApi.status === "succeeded") {
        setShowInput(false);

        setInitSeeds((seeds) => {
          const currentSeeds = [...(seeds ?? [])];

          currentSeeds[seedIndex] = updateGardenRuleApi.response;

          return currentSeeds;
        });
      }
    }, [updateGardenRuleApi, setInitSeeds, seedIndex]);

    return (
      <li className={styles.listItem}>
        {!showInput ? (
          <>
            <p className={styles.listItemText}>
              {seed.name}
              <br />
              <small>{seed.description}</small>
            </p>
            <Button color="primary" variant="contained" onClick={onEdit}>
              Edit
            </Button>
          </>
        ) : (
          <>
            <div className={styles.inputsWrapper}>
              <label>
                Seed Name:
                <input
                  type="text"
                  onChange={(e) => onSeedInputChange(e, seedIndex)}
                  name="name"
                  value={seed.name}
                />
              </label>

              <label>
                Seed Description:
                <input
                  type="text"
                  onChange={(e) => onSeedInputChange(e, seedIndex)}
                  name="description"
                  value={seed.description}
                />
              </label>
            </div>
            <div>
              <div className={classes.buttonWrapper}>
                <Button
                  color="primary"
                  variant="contained"
                  onClick={updateRule}
                  disabled={disableUpdate}
                >
                  Update
                </Button>

                {updateGardenRuleApi.status === "loading" && (
                  <CircularProgress
                    size={28}
                    className={classes.buttonProgress}
                  />
                )}
              </div>
              <Button
                variant="outlined"
                onClick={onCancel}
                disabled={updateGardenRuleApi.status === "loading"}
              >
                Cancel
              </Button>
            </div>
          </>
        )}
      </li>
    );
  }
);

export const SeedList: React.FC<{
  seeds: Rule[];
  setGardenSeeds: React.Dispatch<React.SetStateAction<Rule[] | undefined>>;
  setInitSeeds: React.Dispatch<React.SetStateAction<Rule[] | undefined>>;
  initSeeds: Rule[];
  onSeedInputChange: (
    e: React.ChangeEvent<HTMLInputElement>,
    seedIndex: number
  ) => void;
}> = memo(({ seeds, ...restProps }) => {
  return (
    <ul className={styles.seedList}>
      {seeds?.map((seed, i) => (
        <ListItem key={seed._id} seed={seed} seedIndex={i} {...restProps} />
      ))}
    </ul>
  );
});
