import { Card, Grid, Theme } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Switch from "@material-ui/core/Switch";
import CloseIcon from "@material-ui/icons/Close";
import DoneIcon from "@material-ui/icons/Done";
import { createStyles, makeStyles } from "@material-ui/styles";
import { formatISO, isSameDay } from "date-fns";
import { motion } from "framer-motion";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useHistory } from "react-router";
import { useParams } from "react-router-dom";
import { LoadingWrapper } from "../../components/LoadingWrapper";
// TODO: Revisit when delete api is implemented
// import { deleteCompletedTask } from "../../helpers/api/completedTasks/deleteCompletedTask";
import {
  CompletedTaskToSend,
  sendCompletedTask,
} from "../../helpers/api/completedTasks/sendCompletedTask";
import { getGardenByGardenId } from "../../helpers/api/gardens/getGardenByGardenId";
import { Rule } from "../../models/rule.model";
import { useUserState } from "../../store/user/useUserState";
import { useApi } from "../../utils/api/useApi";
import wateringAnimation from "./assets/watering.gif";
import styles from "./DailyGardening.module.css";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    taskDescription: {
      width: "100%"
    },
    ruleButton: {
      margin: "2%",
    },
    returnButton: {
      backgroundColor: theme.palette.text.primary,
      color: theme.palette.background.default,
      marginTop: "5%"
    },
  })
);

export const DailyGardening = () => {
  const history = useHistory();
  const { userData } = useUserState();

  const [gardenDataApi, getGardenData] = useApi(getGardenByGardenId);
  const [completedTaskApi, sendCompletedTaskData] = useApi(sendCompletedTask);
  // TODO: Revisit when delete api is implemented
  // const [deletedTaskApi, deleteTask] = useApi(deleteCompletedTask);

  const [lastClicked, setLastClicked] = useState("");

  const userId = useMemo(
    () => (userData.isLoggedIn ? userData.id : ""),
    [userData]
  );
  const garden = useMemo(() => gardenDataApi.response?.garden, [gardenDataApi]);
  console.log("TODO: Use garden data:", { garden });

  const rules = useMemo(
    () => gardenDataApi.response?.rules ?? [],
    [gardenDataApi]
  );
  const completedTasks = useMemo(() => {
    const currentCompletedTasks = gardenDataApi.response?.completedTasks ?? [];
    if (completedTaskApi.response) {
      currentCompletedTasks.push(completedTaskApi.response.completedTask);
      return currentCompletedTasks;
    }
    return currentCompletedTasks;
  }, [gardenDataApi, completedTaskApi]);

  const isRuleCompleted = useCallback(
    (ruleId?: string) => {
      if (!completedTasks || !ruleId) return false;

      return completedTasks.some((completedTask) => {
        return (
          isSameDay(new Date(), new Date(completedTask.date)) &&
          completedTask.ruleId === ruleId
        );
      });
    },
    [completedTasks]
  );

  // TODO: Please uncomment below line for delete!
  // const [completedTasks, setCompletedTasks] = useState(Array<CompletedTask>());
  const { gardenId } = useParams<{ gardenId: string }>();
  const [showDescriptions, setShowDescriptions] = useState(false);

  useEffect(() => {
    if (gardenId) {
      const dateISO: string = formatISO(new Date(), {
        representation: "date",
      });
      getGardenData(gardenId, dateISO);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gardenId]);

  const completeTaskHandler = useCallback(
    async (rule: Rule) => {
      if (rule._id) {
        setLastClicked(rule._id);
      }
      const localeDate = new Date();
      const utcDate = new Date(
        Date.UTC(
          localeDate.getFullYear(),
          localeDate.getMonth(),
          localeDate.getDate(),
          0,
          0,
          0,
          0
        )
      );
      const completedTask: CompletedTaskToSend = {
        ruleId: rule._id || "",
        fireBaseUserId: userId,
        date: utcDate.toISOString(),
        rewardTypeId: "61274429d20570644762b99b",
      };
      sendCompletedTaskData(completedTask);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [userData]
  );

  // TODO: Revisit when delete api is implemented.
  // const handleDelete = useCallback(
  //   async (rule: Rule) => {
  //     const deleteCompletedTask: CompletedTask | undefined =
  //       completedTasks.find(
  //         (completedTask: CompletedTask) =>
  //           completedTask.ruleId === rule._id &&
  //           isSameDay(new Date(), new Date(completedTask.date))
  //       );

  //     if (deleteCompletedTask && userId) {
  //       // will return updated coins for users
  //       await deleteTask(deleteCompletedTask._id, userId);
  //     }
  //   },
  //   [completedTasks, deleteTask, userId]
  // );

  const handleChipColor = (bool: boolean) => {
    return bool ? "primary" : "secondary";
  };

  const classes = useStyles();
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      exit={{ opacity: 0 }}
    >
      <div className={styles.gardenParentContainer}>
        <h1>Daily Gardening</h1>
        <LoadingWrapper isLoading={!gardenDataApi.isLoaded}>
          <div className={styles.gardenViewContainer}>
            <div className={styles.wateringAnimationContainer}>
              <img
                src={wateringAnimation}
                alt="watering animation"
                className={styles.wateringAnimation}
              />
            </div>
            <div className={styles.rulesContainer}>
              <Grid
                container
                alignItems="center"
                justifyContent="space-between"
              >
                <Grid container alignItems="center" xs={6}>
                  <h2 className={styles.subtitle}>Daily Goals:</h2>
                </Grid>
                <Grid
                  container
                  alignItems="center"
                  xs={6}
                  justifyContent="flex-end"
                >
                  <Switch
                    checked={showDescriptions}
                    color="primary"
                    onChange={() => setShowDescriptions((status) => !status)}
                    name="detailView"
                  />
                  <h5>View Details</h5>
                </Grid>
              </Grid>
              <div className={styles.taskButtonContainer}>
                {rules.map((rule) => {
                  return (
                    <LoadingWrapper
                      key={rule._id}
                      isLoading={
                        lastClicked === rule._id &&
                        completedTaskApi.status === "loading"
                      }
                    >
                      <Button
                        startIcon={!isRuleCompleted(rule._id) && <CloseIcon />}
                        endIcon={isRuleCompleted(rule._id) && <DoneIcon />}
                        className={classes.ruleButton}
                        size="large"
                        variant="contained"
                        color={handleChipColor(isRuleCompleted(rule._id))}
                        onClick={() => {
                          !isRuleCompleted(rule._id) &&
                            completeTaskHandler(rule);
                        }}
                        disabled={completedTaskApi.status === "loading"}
                        // TODO: Implement UNDO
                        // onDelete={() => handleDelete(rule)}
                        // deleteIcon={<UndoIcon />}
                      >
                        {rule.name}
                      </Button>
                      {rule.description && showDescriptions && (
                        <Card className={classes.taskDescription}>
                        <p className={styles.ruleDescription}>
                          {showDescriptions && rule.description}
                        </p>
                        </Card>
                      )}
                    </LoadingWrapper>
                  );
                })}
              </div>
            </div>
            <div className={styles.centered}>
              <Button
                variant="contained"
                className={classes.returnButton}
                onClick={() => history.push("/user/myniwa")}
              >
                Go back to My Gardens
              </Button>
            </div>
          </div>
        </LoadingWrapper>
      </div>
    </motion.div>
  );
};
