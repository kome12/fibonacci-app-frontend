import { useState } from "react";
import { styled } from '@material-ui/core/styles';
import { Button, Container, MobileStepper } from "@material-ui/core";

import { UserRule } from "./components/UserRule";
import { NewGarden } from "./components/NewGarden";
import "./CreateGardenPage.css";

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
  const [userRules, setUserRules] = useState<NewUserRule[]>([]);
  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <Container>
      <CreateGardenContainer>
        <div className="create-garden">
          {activeStep === 0 && <NewGarden />}
          {activeStep === 1 && userRules.length < 1 && <div><h3>Current rules:</h3><p>There are currently no rules set for this garden.</p></div>}
          {userRules.map((rule, idx) => <UserRule key={idx} name={rule.name} description={rule.description}/>)}
        </div>
      <CreateGardenStepper
        variant="progress"
        steps={3}
        position="static"
        className="stepper"
        activeStep={activeStep}
        nextButton={
          <Button size="medium" onClick={handleNext} disabled={activeStep === 2}>
            Next
          </Button>
        }
        backButton={
          <Button size="medium" onClick={handleBack} disabled={activeStep === 0}>
            Back
          </Button>
        }
      />
      </CreateGardenContainer>
    </Container>
  )
}
