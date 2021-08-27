import { useState } from "react";
import { styled } from '@material-ui/core/styles';
import { Button, Container, MobileStepper } from "@material-ui/core";
import { AddRules } from "./components/AddRules";
import { NewGarden } from "./components/NewGarden";
import "./CreateGardenPage.css";
import { GardenSummary } from "./components/GardenSummary";

const CreateGardenContainer = styled(Container)({
  background: "#6ABC6880",
  borderRadius: 20,
  color: "white",
  display: "flex",
  flexDirection: "column",
  height: "80vh",
  paddingTop: "2%",
});

const CreateGardenStepper = styled(MobileStepper)({
  background: "#6ABC6880",
  borderRadius: 20,
})

export interface NewUserRule {
  name: String,
  description?: String,
}

export const CreateGarden = ()  => {
  const [activeStep, setActiveStep] = useState(0);
  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };
  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const nameChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(() => e.target.value);
  }
  const descChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDesc(e.target.value);
  }

  const [ruleName, setRuleName] = useState("");
  const [ruleDesc, setRuleDesc] = useState("");
  const [userRules, setUserRules] = useState<NewUserRule[]>([]);

  const ruleNameChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRuleName(() => e.target.value);
  }
  const ruleDescChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRuleDesc(e.target.value);
  }

  const addRuleHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    const newRule = {
      name: ruleName,
      description: ruleDesc,
    }
    setUserRules(rules => [...rules, newRule]);
    setRuleName("");
    setRuleDesc("");
  }

  const createGardenHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    console.log("Make API call to create garden here.")
  }

  return (
    <Container className="create-garden-root">
      <CreateGardenContainer>
        <div className="create-garden">
          {activeStep === 0 && 
          <NewGarden nameChangeHandler={nameChangeHandler} 
                      name={name} 
                      descChangeHandler={descChangeHandler} 
                      desc={desc}/>}
          {activeStep === 1 && 
          <AddRules ruleNameChangeHandler={ruleNameChangeHandler}
                    ruleName={ruleName} 
                    ruleDescChangeHandler={ruleDescChangeHandler} 
                    ruleDesc={ruleDesc} 
                    addRuleHandler={addRuleHandler} 
                    userRules={userRules}/>}
          {activeStep === 2 &&
          <GardenSummary gardenName={name}
                         gardenDesc={desc}
                         userRules={userRules}
                         createGardenHandler={createGardenHandler} />}
        </div>
      <CreateGardenStepper
        variant="progress"
        steps={3}
        position="static"
        className="stepper"
        activeStep={activeStep}
        nextButton={
          <Button 
            size="medium" 
            onClick={handleNext} 
            disabled={activeStep === 2 || name.length < 1 || (activeStep === 1 && userRules.length < 1)}>
            Next
          </Button>
        }
        backButton={
          <Button 
            size="medium" 
            onClick={handleBack} 
            disabled={activeStep === 0}>
            Back
          </Button>
        }
      />
      </CreateGardenContainer>
    </Container>
  )
}
