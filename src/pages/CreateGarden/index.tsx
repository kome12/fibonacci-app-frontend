import {
  Button,
  Container,
  createStyles,
  Grid,
  makeStyles,
  MobileStepper,
  Paper,
  Theme,
} from "@material-ui/core";
import axios from "axios";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { Garden } from "../../models/garden.model";
import { Rule } from "../../models/rule.model";
import { useUserState } from "../../store/user/useUserState";
import { AddRules } from "./components/AddRules";
import { GardenSummary } from "./components/GardenSummary";
import { NewGarden } from "./components/NewGarden";
import ArrowRightIcon from "@material-ui/icons/ArrowRight";
import ArrowLeftIcon from "@material-ui/icons/ArrowLeft";

export interface NewUserRule {
  name: string;
  description?: string;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      height: "100%",
      overflowX: "hidden",
    },
    container: {
      height: "85%",
    },
    card: {
      textAlign: "center",
      height: "100%",
      backgroundColor: theme.palette.background.default,
    },
    stepper: {
      height: "10%",
      alignSelf: "flex-end",
      paddingBottom: "6%",
    },
  })
);

export const CreateGarden = () => {
  const { userData } = useUserState();
  const history = useHistory();
  const [activeStep, setActiveStep] = useState(0);
  // TODO: Refactor animation code
  const [animDirection, setAnimDirection] = useState<"left" | "right">("right");
  const handleNext = () => {
    setAnimDirection("left");
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };
  const handleBack = () => {
    setAnimDirection("right");
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const nameChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(() => e.target.value);
  };
  const descChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDesc(e.target.value);
  };

  const [ruleName, setRuleName] = useState("");
  const [ruleDesc, setRuleDesc] = useState("");
  const [userRules, setUserRules] = useState<NewUserRule[]>([]);

  const ruleNameChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRuleName(() => e.target.value);
  };
  const ruleDescChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRuleDesc(e.target.value);
  };

  const addRuleHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    const newRule = {
      name: ruleName,
      description: ruleDesc,
    };
    setUserRules((rules) => [...rules, newRule]);
    setRuleName("");
    setRuleDesc("");
  };

  const createGardenHandler = () => {
    const createGardenAndRules = async () => {
      // TODO: FIX the endpoint
      const newGarden: Garden = {
        name: name,
        description: desc,
        userFireBaseId: (userData.isLoggedIn && userData.id) || "",
      };
      const resCreateGarden = await axios.post(
        `https://the-fibonacci-api-staging.herokuapp.com/api/v1/gardens`,
        newGarden
      );

      if (resCreateGarden.data._id) {
        const gardenId: string = resCreateGarden.data._id;
        const populateRulesWithGardendId: Rule[] = userRules.map(
          (userRule: NewUserRule) => {
            const newRule: Rule = {
              name: userRule.name,
              description: userRule.description ?? "",
              gardenId,
            };
            return newRule;
          }
        );

        await axios.post(
          `https://the-fibonacci-api-staging.herokuapp.com/api/v1/rules/bulk`,
          populateRulesWithGardendId
        );
        history.push(`/user/dailyGardening/${gardenId}`);
      }
    };

    createGardenAndRules();
  };
  const classes = useStyles();
  return (
    <Grid
      container={true}
      direction="column"
      alignItems="center"
      justifyContent="space-between"
      className={classes.root}
      component={motion.div}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      exit={{ opacity: 0 }}
    >
      <Container className={classes.root} component={motion.div}>
        <Paper className={classes.card} elevation={0}>
          <Grid container className={classes.container}>
            <AnimatePresence>
              {activeStep === 0 && (
                <NewGarden
                  nameChangeHandler={nameChangeHandler}
                  name={name}
                  descChangeHandler={descChangeHandler}
                  desc={desc}
                  animDirection={animDirection}
                />
              )}
              {activeStep === 1 && (
                <AddRules
                  ruleNameChangeHandler={ruleNameChangeHandler}
                  ruleName={ruleName}
                  ruleDescChangeHandler={ruleDescChangeHandler}
                  ruleDesc={ruleDesc}
                  addRuleHandler={addRuleHandler}
                  userRules={userRules}
                  animDirection={animDirection}
                />
              )}
              {activeStep === 2 && (
                <GardenSummary
                  gardenName={name}
                  gardenDesc={desc}
                  userRules={userRules}
                  createGardenHandler={createGardenHandler}
                  animDirection={animDirection}
                />
              )}
            </AnimatePresence>
          </Grid>
          <MobileStepper
            variant="progress"
            steps={3}
            position="static"
            className={classes.stepper}
            activeStep={activeStep}
            nextButton={
              <Button
                size="small"
                variant="contained"
                color="primary"
                endIcon={<ArrowRightIcon />}
                onClick={handleNext}
                disabled={
                  activeStep === 2 ||
                  name.length < 1 ||
                  (activeStep === 1 && userRules.length < 1)
                }
              >
                Next
              </Button>
            }
            backButton={
              <Button
                size="small"
                variant="contained"
                color="primary"
                startIcon={<ArrowLeftIcon />}
                onClick={handleBack}
                disabled={activeStep === 0}
              >
                Back
              </Button>
            }
          />
        </Paper>
      </Container>
    </Grid>
  );
};
