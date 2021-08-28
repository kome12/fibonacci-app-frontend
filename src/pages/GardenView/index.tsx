import Button from "@material-ui/core/Button";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Rule } from "../../models/rule.model";
import { useHistory } from 'react-router'
import "./GardenView.css";

export const GardenView = () => {
  // TODO: FIX API CALL AFTER MVP

  // const [gardenByGardenIdApi, getGardenByGardenIdData] =
  //   useApi(getGardenByGardenId);
  // const gardens = useMemo(
  //   () => gardenByGardenIdApi.response ?? [],
  //   [gardenByGardenIdApi]
  // );

  // const [garden, setGarden] = useState({});
  const [rules, setRules] = useState(Array<Rule>());
  const [completedTasks, setCompletedTasks] = useState([]);
  const { gardenId } = useParams<{ gardenId: string }>();

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
    };

    getDataFromBackend();
  }, []);
  
  let history = useHistory();
  const linkHandler = (page: string) => {
    history.push(page);
  }

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
          console.log("rules:", rules);
          return (
            <div key={index}>
              <div className="rule-name">{rule.name}</div>
              <Button variant="contained" color="secondary">
                <div className="rule-description">{rule.description}</div>
              </Button>
            </div>
          );
        })}
      </div>
      <div className="centered">
        <Button variant="contained" onClick={() => linkHandler("/myGardens")}>Go back to My Gardens</Button>
      </div>
    </div>
  );
};
