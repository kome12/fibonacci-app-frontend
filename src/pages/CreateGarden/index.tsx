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
import ArrowLeftIcon from "@material-ui/icons/ArrowLeft";
import ArrowRightIcon from "@material-ui/icons/ArrowRight";
import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useHistory } from "react-router-dom";
import {
  createGarden,
  NewGardenData,
} from "../../helpers/api/gardens/createGarden";
import {
  createGardenRules,
  NewGardenRule,
} from "../../helpers/api/gardens/createGardenRules";
import { useUserState } from "../../store/user/useUserState";
import { useApi } from "../../utils/api/useApi";
import { AddRules } from "./components/AddRules";
import { GardenSummary } from "./components/GardenSummary";
import { NewGarden } from "./components/NewGarden";
import { getCategories } from "../../helpers/api/gardens/getCategories";

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
  const classes = useStyles();

  const [createGardenApi, createNewGarden] = useApi(createGarden);
  const [createGardenRulesApi, createNewGardenRules] =
    useApi(createGardenRules);

  const isApiProcessing = useMemo(
    () =>
      createGardenApi.status === "loading" ||
      createGardenRulesApi.status === "loading",
    [createGardenApi.status, createGardenRulesApi.status]
  );

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

  // Garden input state
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [categoryName, setCategoryName] = useState("");

  // Get Categories
  const [categoriesApi, getGardenCategories] = useApi(getCategories);
  const categories = useMemo(() => categoriesApi.response, [categoriesApi]);
  useEffect(() => {
    getGardenCategories();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    let result;
    if (categoryId) {
      console.log({ categoryId });
      result = categories?.find(
        (category) => category._id === categoryId
      )?.name;
    }
    setCategoryName(result);
  }, [categoryId]);

  const nameChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(() => e.target.value);
  };
  const descChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDesc(e.target.value);
  };
  const categoryIdChangeHandler = (
    e: React.ChangeEvent<{ name?: string | undefined; value: unknown }>
  ) => {
    setCategoryId(e.target.value as string);
  };

  // Garden rules input state
  const [ruleName, setRuleName] = useState("");
  const [ruleDesc, setRuleDesc] = useState("");
  const [userRules, setUserRules] = useState<NewUserRule[]>([]);

  const ruleNameChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRuleName(() => e.target.value);
  };
  const ruleDescChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRuleDesc(e.target.value);
  };

  const addRuleHandler = () => {
    const newRule = {
      name: ruleName,
      description: ruleDesc,
    };
    setUserRules((rules) => [...rules, newRule]);
    setRuleName("");
    setRuleDesc("");
  };

  const removeRule = useCallback(
    (index: number) => {
      const rules = [...userRules];
      rules.splice(index, 1);

      setUserRules(rules);
    },
    [userRules]
  );

  const createGardenHandler = async () => {
    const newGarden: NewGardenData = {
      name: name,
      description: desc,
      fireBaseUserId: (userData.isLoggedIn && userData.id) || "",
      gardenCategoryId: categoryId || "",
    };

    await createNewGarden(newGarden);
  };

  const createGardenRulesBulk = useCallback(
    async (gardenId: string) => {
      const rules: NewGardenRule[] = userRules.map(({ name, description }) => ({
        name,
        description: description ?? "",
        gardenId,
      }));
      await createNewGardenRules(rules);
      history.push(`/user/dailyGardening/${gardenId}`);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [userRules, history]
  );

  useEffect(() => {
    if (createGardenApi.status === "succeeded") {
      const { _id: gardenId } = createGardenApi.response;
      if (gardenId) {
        createGardenRulesBulk(gardenId);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [createGardenApi.response, createGardenApi.status]);

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
      transition={{ duration: 0.3 }}
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
                  categories={categories}
                  categoryIdChangeHandler={categoryIdChangeHandler}
                  categoryId={categoryId}
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
                  removeRule={removeRule}
                />
              )}
              {activeStep === 2 && (
                <GardenSummary
                  loading={isApiProcessing}
                  gardenName={name}
                  gardenDesc={desc}
                  gardenCategoryName={categoryName}
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
                disabled={activeStep === 0 || isApiProcessing}
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
