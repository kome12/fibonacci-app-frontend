import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import Chip from "@material-ui/core/Chip";
import Switch from "@material-ui/core/Switch";
import CloseIcon from "@material-ui/icons/Close";
import DoneIcon from "@material-ui/icons/Done";
import { isSameDay } from "date-fns";
import { motion } from "framer-motion";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useHistory } from "react-router";
import { useParams } from "react-router-dom";
import { LoadingWrapper } from "../../components/LoadingWrapper";
import {
  CompletedTaskToSend,
  sendCompletedTask,
} from "../../helpers/api/completedTasks/sendCompletedTask";
import { getGardenByGardenId } from "../../helpers/api/gardens/getGardenByGardenId";
import { Rule } from "../../models/rule.model";
import { useUserState } from "../../store/user/useUserState";
import { useApi } from "../../utils/api/useApi";
import wateringAnimation from "./assets/watering.gif";
import "./DailyGardening.css";

export const DailyGardening = () => {
  const history = useHistory();
  const { userData } = useUserState();

  const [gardenDataApi, getGardenData] = useApi(getGardenByGardenId);
  const [completedTaskApi, sendCompletedTaskData] = useApi(sendCompletedTask);

  const garden = useMemo(() => gardenDataApi.response?.garden, [gardenDataApi]);
  console.log("MEMO: Use garden data:", { garden });

  const rules = useMemo(
    () => gardenDataApi.response?.rules ?? [],
    [gardenDataApi]
  );
  const completedTasks = useMemo(() => {
    const currentCompletedTasks = gardenDataApi.response?.completedTasks ?? [];
    if (completedTaskApi.response) {
      currentCompletedTasks.push(completedTaskApi.response);
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
      getGardenData(gardenId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gardenId]);

  const completeTaskHandler = useCallback(
    async (rule: Rule) => {
      const completedTask: CompletedTaskToSend = {
        ruleId: rule._id || "",
        fireBaseUserId: (userData.isLoggedIn && userData.id) || "",
        date: new Date().toISOString(),
        rewardTypeId: "61274429d20570644762b99b",
      };

      sendCompletedTaskData(completedTask);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [userData]
  );

  // TODO: Implement delete task
  // const handleDelete = async (rule: Rule) => {
  //   console.log("Needs implementation");
  //   const deleteCompletedTask: CompletedTask | undefined = completedTasks.find(
  //     (completedTask: CompletedTask) =>
  //       completedTask.ruleId === rule._id &&
  //       isSameDay(new Date(), new Date(completedTask.date))
  //   );

  //   if (deleteCompletedTask) {
  //     // will return updated coins for users
  //     await axios.delete(
  //       `https://the-fibonacci-api-staging.herokuapp.com/api/v1/completedTasks${
  //         deleteCompletedTask._id
  //       }/fireBaseUserId/${(userData.isLoggedIn && userData.id) || ""}`
  //     );
  //     setGetData(true);
  //   }
  // };

  const handleChipColor = (bool: boolean) => {
    return bool ? "primary" : "secondary";
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      exit={{ opacity: 0 }}
    >
      <div className="garden-parent-container">
        <h1>Daily Gardening</h1>
        <LoadingWrapper isLoading={!gardenDataApi.isLoaded}>
          <div className="garden-view-container">
            <div className="watering-animation-container">
              <img
                src={wateringAnimation}
                alt="watering animation"
                className="watering-animation"
              />
            </div>
            <div className="rules-container">
              <h2>Daily Goals:</h2>
              <Switch
                checked={showDescriptions}
                onChange={() => setShowDescriptions((status) => !status)}
                name="detailView"
              />
              View Details
              {rules.map((rule) => {
                return (
                  <Card variant="outlined" key={rule._id}>
                    <Chip
                      icon={
                        isRuleCompleted(rule._id) ? <DoneIcon /> : <CloseIcon />
                      }
                      label={rule.name}
                      clickable
                      color={handleChipColor(isRuleCompleted(rule._id))}
                      onClick={() => {
                        !isRuleCompleted(rule._id) && completeTaskHandler(rule);
                      }}
                      // TODO: Implement UNDO
                      // onDelete={() => handleDelete(rule)}
                      // deleteIcon={<UndoIcon />}
                    />
                    {rule.description ? (
                      <div className="rule-description">
                        {showDescriptions && rule.description}
                      </div>
                    ) : (
                      <div></div>
                    )}
                  </Card>
                );
              })}
            </div>
            <div className="centered">
              <Button
                variant="contained"
                color="secondary"
                onClick={() => history.push("/user/myGardens")}
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
