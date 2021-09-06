import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import Chip from "@material-ui/core/Chip";
import Switch from "@material-ui/core/Switch";
import CloseIcon from "@material-ui/icons/Close";
import DoneIcon from "@material-ui/icons/Done";
import axios from "axios";
import { isSameDay } from "date-fns";
import { motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import { useHistory } from "react-router";
import { useParams } from "react-router-dom";
import { LoadingWrapper } from "../../components/LoadingWrapper";
import { getGardenByGardenId } from "../../helpers/api/gardens/getGardenByGardenId";
import { CompletedTask } from "../../models/completedTask.model";
import { Rule } from "../../models/rule.model";
import { useUserState } from "../../store/user/useUserState";
import { useApi } from "../../utils/api/useApi";
import wateringAnimation from "./assets/watering.gif";
import "./DailyGardening.css";

export const DailyGardening = () => {
  const [gardenDataApi, getGardenData] = useApi(getGardenByGardenId);
  const garden = useMemo(() => gardenDataApi.response?.garden, [gardenDataApi]);

  const rules = useMemo(
    () => gardenDataApi.response?.rules ?? [],
    [gardenDataApi]
  );

  const { userData } = useUserState();

  // TODO: Please uncomment below line for delete!
  // const [completedTasks, setCompletedTasks] = useState(Array<CompletedTask>());
  const { gardenId } = useParams<{ gardenId: string }>();
  const [rulesStatus, setRulesStatus] = useState(Array<boolean>());
  const [getData, setGetData] = useState(true);
  const [showDescriptions, setShowDescriptions] = useState(false);

  useEffect(() => {
    if (gardenId) {
      getGardenData(gardenId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gardenId]);

  const history = useHistory();
  const linkHandler = (page: string) => {
    history.push(page);
  };

  const completeTaskHandler = async (rule: Rule) => {
    const completedTask: Omit<
      CompletedTask,
      "_id" | "createdDate" | "lastUpdate"
    > = {
      ruleId: rule._id || "",
      fireBaseUserId: (userData.isLoggedIn && userData.id) || "",
      date: new Date().toISOString(),
      rewardTypeId: "61274429d20570644762b99b",
    };

    const sendCompletedTask = async () => {
      await axios.post(
        "https://the-fibonacci-api-staging.herokuapp.com/api/v1/completedTasks",
        completedTask
      );
      setGetData(true);
    };

    sendCompletedTask();
  };

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

  const checkCompletedTaskStatus = (
    currentRules: Array<Rule>,
    currentCompletedTasks: Array<CompletedTask>
  ) => {
    const currentRulesStatus: Array<boolean> = currentRules.map(
      (rule: Rule) => {
        const filteredCompletedTasks: Array<CompletedTask> =
          currentCompletedTasks.filter((completedTask: CompletedTask) => {
            return completedTask.ruleId === rule._id;
          });

        return filteredCompletedTasks.some((completedTask: CompletedTask) => {
          return isSameDay(new Date(), new Date(completedTask.date));
        });
      }
    );
    setRulesStatus(currentRulesStatus);
  };

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
              {rules.map((rule, index) => {
                return (
                  <Card variant="outlined" key={rule._id}>
                    <Chip
                      icon={rulesStatus[index] ? <DoneIcon /> : <CloseIcon />}
                      label={rule.name}
                      clickable
                      color={handleChipColor(rulesStatus[index])}
                      onClick={() => {
                        completeTaskHandler(rule);
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
                onClick={() => linkHandler("/user/myGardens")}
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
