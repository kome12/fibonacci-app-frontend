import { Button, Container, Grid, styled } from "@material-ui/core";
import { UserRule } from "./UserRule";
import { NewUserRule } from "..";
import "./GardenSummary.css";
import { motion } from "framer-motion";

// const CreateGardenButton = styled(Button)({
//   alignSelf: "center",
//   background: "#ff7f27d9",
//   borderRadius: 20,
//   color: "#fff",
//   fontSize: "1.2rem",
//   fontWeight: "bold",
//   margin: "10% 2rem 5%",
//   height: "10%",
//   width: "80%",
// });

interface GardenSummaryProps {
  gardenName: string;
  gardenDesc: string;
  userRules: NewUserRule[];
  createGardenHandler: React.MouseEventHandler<HTMLButtonElement>;
  animDirection: "left" | "right";
}

export const GardenSummary: React.FC<GardenSummaryProps> = ({
  gardenName,
  gardenDesc,
  userRules,
  createGardenHandler,
  animDirection,
}) => {
  const initDir = animDirection === "left" ? "5vw" : "-5vw";
  const exitDir = animDirection === "left" ? "-5vw" : "5vw";
  return (
    <Grid
      className="garden-summary-container"
      component={motion.div}
      initial={{ opacity: 0, x: initDir }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6 }}
      exit={{ opacity: 0, x: exitDir }}
    >
      <h2>Garden Summary</h2>
      <Container className="garden-summary-details">
        <h3>
          Name: <span className="garden-summary-name">{gardenName}</span>
        </h3>
        <h3>
          Description: <span className="garden-summary-desc">{gardenDesc}</span>
        </h3>
      </Container>
      <Container className="garden-summary-rules">
        <ul>
          {userRules.map((rule, idx) => (
            <li className="rule-li" key={`${rule.name}-${idx}`}>
              <UserRule name={rule.name} description={rule.description} />
            </li>
          ))}
        </ul>
      </Container>
      <Button size="large" variant="contained" color="primary" onClick={createGardenHandler}>
        + Create Garden
      </Button>
    </Grid>
  );
};
