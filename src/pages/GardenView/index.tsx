import Button from "@material-ui/core/Button";
import axios from "axios";
import { useEffect, useState } from "react";
import { Rule } from "../../models/rule.model";
import "./GardenView.css";

export const GardenView = () => {
  const dummyRulesData = [
    {
      id: 1,
      name: "Wake up at 7am",
      description: "I got out of bed on time!",
      gardenId: 1,
    },
    {
      id: 2,
      name: "Go to bed at 11pm",
      description: "I got into bed on time!",
      gardenId: 1,
    },
  ];

  // const [gardenByGardenIdApi, getGardenByGardenIdData] =
  //   useApi(getGardenByGardenId);
  // const gardens = useMemo(
  //   () => gardenByGardenIdApi.response ?? [],
  //   [gardenByGardenIdApi]
  // );

  // const [garden, setGarden] = useState({});
  const [rules, setRules] = useState(Array<Rule>());

  // same id to use 612789b765c2e6a7e7e76bd2
  useEffect(() => {
    const getDataFromBackend = async () => {
      // await getGardenByGardenIdData();
      // console.log("gardenByGardenIdApi:", gardenByGardenIdApi);

      // setRules(gardenByGardenIdApi.response?.rules || []);
      const id = "612789b765c2e6a7e7e76bd2";
      const res = await axios.get(
        `https://the-fibonacci-api-staging.herokuapp.com/api/v1/gardens/${id}`
      );
      console.log("res in getDatafrombackend:", res);
      setRules(res.data?.rules || []);
    };

    getDataFromBackend();
  }, []);

  return (
    <div className="garden-view-container">
      <h1>Garden View</h1>
      <div className="garden-container">Garden Box</div>
      <div className="rules-container">
        <h2>Daily Goals:</h2>
        {rules.map((rule, index) => {
          console.log("rules:", rules);
          return (
            <div key={index}>
              <div className="rule-name">{rule.name}</div>
              <Button variant="contained">
                <div className="rule-description">{rule.description}</div>
              </Button>
            </div>
          );
        })}
      </div>
    </div>
  );
};
