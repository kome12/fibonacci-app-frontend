import { useState } from "react";
import { styled } from '@material-ui/core/styles';
import { Button, Container, MobileStepper } from "@material-ui/core";
import { AddRules } from "./components/AddRules";
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

export const CreateGarden = ()  => {
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
          {activeStep === 1 && <AddRules />}
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
