import Button from "@material-ui/core/Button";
import axios from "axios";
import * as moment from "moment";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Rule } from "../../models/rule.model";
import { CompletedTask } from "../../models/completedTask.model";
import { useHistory } from "react-router";
import "./GardenView.css";
import { useUserState } from "../../store/user/useUserState";

export const GardenView = () => {
  // TODO: FIX API CALL AFTER MVP

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

  useEffect(() => {
    const getDataFromBackend = async () => {
      // await getGardenByGardenIdData();
      // console.log("gardenByGardenIdApi:", gardenByGardenIdApi);

      // setRules(gardenByGardenIdApi.response?.rules || []);
      const res = await axios.get(
        `https://the-fibonacci-api-staging.herokuapp.com/api/v1/gardens/${gardenId}`
      );
      console.log("res in getDatafrombackend:", res);

      setRules(res.data?.rules || []);
      setCompletedTasks(res.data?.completedTasks || []);
      const completedTasks = res.data?.completedTasks || [];

      checkCompletedTaskStatus(rules, completedTasks);
      setGetData(false);
    };

    if (getData) {
      getDataFromBackend();
    }
  }, [gardenId, getData]);

  let history = useHistory();
  const linkHandler = (page: string) => {
    history.push(page);
  };

  const completeTaskHandler = (rule: Rule) => {
    const completedTask: CompletedTask = {
      ruleId: rule._id || "",
      // TODO: Fix when backend updates schema for completedTask's fireBaseUserId
      fireBaseUserId: userData?.id || "",
      date: moment.utc().startOf("day").toDate(),
      rewardTypeId: "61274429d20570644762b99b",
    };

    const sendCompletedTask = async () => {
      const res = await axios.post(
        "https://the-fibonacci-api-staging.herokuapp.com/api/v1/completedTasks",
        completedTask
      );
      console.log("completedTask response:", res);
      setGetData(true);
    };

    sendCompletedTask();
  };

  const checkCompletedTaskStatus = (
    currentRules: Array<Rule>,

    currentCompletedTasks: Array<CompletedTask>
  ) => {
    const today: moment.Moment = moment.utc();

    const currentRulesStatus: Array<boolean> = currentRules.map(
      (rule: Rule) => {
        const filteredCompletedTasks: Array<CompletedTask> =
          currentCompletedTasks.filter((completedTask: CompletedTask) => {
            return completedTask.ruleId === rule._id;
          });

        return filteredCompletedTasks.some((completedTask: CompletedTask) =>
          moment.utc(completedTask.date).isSame(today, "day")
        );
      }
    );
    setRulesStatus(currentRulesStatus);
  };

  return (
    <div className="garden-view-container">
      <h1>Garden View</h1>
      <div className="garden-container">
        {completedTasks.length === 0 ?
          <div><h2>You have no flowers yet!</h2></div> : <div>{completedTasks.map((task, index) => "🌱")}</div>}
      </div>
      <div className="rules-container">
        <h2>Daily Goals:</h2>
        {rules.map((rule, index) => {
          return (
            <div key={index}>
              <Button
                variant="contained"
                color="secondary"
                onClick={(e) => completeTaskHandler(rule)}
                disabled={rulesStatus[index]}
              >
                <div className="rule-name">{rule.name}</div>
              </Button>
              {/* <div className="rule-description">{rule.description}</div> */}
            </div>
          );
        })}
      </div>
      <div className="centered">
        <Button variant="contained" onClick={() => linkHandler("/myGardens")}>
          Go back to My Gardens
        </Button>
      </div>
    </div>
  );
};
