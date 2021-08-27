import { Button, Container, styled } from "@material-ui/core";
import { UserRule } from "./UserRule";
import { NewUserRule } from "..";
import "./GardenSummary.css";

const CreateGardenButton = styled(Button)({
  alignSelf: "center",
  background: "#ff7f27d9",
  borderRadius: 20,
  color: "#fff",
  fontSize: "1.2rem",
  fontWeight: "bold",
  margin: "10% 2rem 5%",
  height: "10%",
  width: "80%",
})

interface GardenSummaryProps {
  gardenName: string,
  gardenDesc: string,
  userRules: NewUserRule[],
  createGardenHandler: React.MouseEventHandler<HTMLButtonElement>
}

export const GardenSummary = ({gardenName, gardenDesc, userRules, createGardenHandler}: GardenSummaryProps) => {
  return (
    <Container className="garden-summary-container">
      <h2>Garden Summary</h2>
      <Container className="garden-summary-details">
        <h3>Name: <span className="garden-name">{gardenName}</span></h3>
        <h3>Description: <span className="garden-desc">{gardenDesc}</span></h3>
      </Container>
      <Container className="garden-summary-rules">
        <ul>
          {userRules.map((rule, idx) => 
            <li className="rule-li" key={idx}>
              <UserRule name={rule.name} description={rule.description}/>
            </li>)}
        </ul>
      </Container>
      <CreateGardenButton onClick={createGardenHandler}>+ Create Garden</CreateGardenButton>
    </Container>
  )
}