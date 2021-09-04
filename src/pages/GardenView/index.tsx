import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import Chip from "@material-ui/core/Chip";
import CloseIcon from "@material-ui/icons/Close";
import DoneIcon from "@material-ui/icons/Done";
import UndoIcon from "@material-ui/icons/Undo";
import axios from "axios";
import { isSameDay } from "date-fns";
import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { useParams } from "react-router-dom";
import { LoadingWrapper } from "../../components/LoadingWrapper";
import { CompletedTask } from "../../models/completedTask.model";
import { Rule } from "../../models/rule.model";
import { useUserState } from "../../store/user/useUserState";
import "./GardenView.css";

export const GardenView = () => {
  // TODO: FIX API CALL AFTER MVP
  // TODO: Need to be refactor

  // const [gardenByGardenIdApi, getGardenByGardenIdData] =
  //   useApi(getGardenByGardenId);
  // const gardens = useMemo(
  //   () => gardenByGardenIdApi.response ?? [],
  //   [gardenByGardenIdApi]
  // );

  // const [garden, setGarden] = useState({});
  const { userData } = useUserState();
  const [rules, setRules] = useState(Array<Rule>());
  const [completedTasks, setCompletedTasks] = useState([]);
  const { gardenId } = useParams<{ gardenId: string }>();
  const [rulesStatus, setRulesStatus] = useState(Array<boolean>());
  const [getData, setGetData] = useState(true);
  const [isFetchingGardenData, setIsFetchingGardenData] = useState(true);

  useEffect(() => {
    const getDataFromBackend = async () => {
      // await getGardenByGardenIdData();
      // console.log("gardenByGardenIdApi:", gardenByGardenIdApi);

      // setRules(gardenByGardenIdApi.response?.rules || []);
      const res = await axios.get(
        `https://the-fibonacci-api-staging.herokuapp.com/api/v1/gardens/${gardenId}`
      );

      setRules(res.data?.rules || []);
      setCompletedTasks(res.data?.completedTasks || []);
      const completedTasks = res.data?.completedTasks || [];

      checkCompletedTaskStatus(rules, completedTasks);
      setIsFetchingGardenData(false);
      setGetData(false);
    };

    if (getData) {
      getDataFromBackend();
    }
  }, [rules, gardenId, getData]);

  const history = useHistory();
  const linkHandler = (page: string) => {
    history.push(page);
  };

  const completeTaskHandler = (rule: Rule) => {
    const completedTask: CompletedTask = {
      ruleId: rule._id || "",
      // TODO: Fix when backend updates schema for completedTask's fireBaseUserId
      fireBaseUserId: (userData.isLoggedIn && userData.id) || "",
      date: new Date().toISOString(),
      rewardTypeId: "61274429d20570644762b99b",
    };

    const sendCompletedTask = async () => {
      const res = await axios.post(
        "https://the-fibonacci-api-staging.herokuapp.com/api/v1/completedTasks",
        completedTask
      );
      setGetData(true);
    };

    sendCompletedTask();
  };

  const handleDelete = () => {
    // TODO: Implement delete task
    console.log("Needs implementation");
  };

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
    <>
      <div className="garden-parent-container">
        <h1>Garden View</h1>
        <LoadingWrapper isLoading={isFetchingGardenData}>
          <div className="garden-view-container">
            <div className="garden-container">
              {completedTasks.length === 0 ? (
                <div>
                  <h2>You have no flowers yet!</h2>
                </div>
              ) : (
                <div>{completedTasks.map((_) => "🌱")}</div>
              )}
            </div>
            <div className="rules-container">
              <h2>Daily Goals:</h2>
              {rules.map((rule, index) => {
                return (
                  <Card variant="outlined">
                    <div key={rule._id}>
                      <Chip
                        icon={rulesStatus[index] ? <DoneIcon /> : <CloseIcon />}
                        label={rule.name}
                        clickable
                        color={handleChipColor(rulesStatus[index])}
                        onClick={() => {
                          completeTaskHandler(rule);
                        }}
                        onDelete={handleDelete}
                        deleteIcon={<UndoIcon />}
                      />
                      {rule.description ? (
                        <div className="rule-description">
                          {rule.description}
                        </div>
                      ) : (
                        <div></div>
                      )}
                    </div>
                  </Card>
                );
              })}
            </div>
            <div className="centered">
              <Button
                variant="contained"
                onClick={() => linkHandler("/user/myGardens")}
              >
                Go back to My Gardens
              </Button>
            </div>
          </div>
        </LoadingWrapper>
      </div>
    </>
  );
};
