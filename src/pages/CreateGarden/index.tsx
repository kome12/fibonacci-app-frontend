import { useState } from "react";
import { Header } from "../../components/Header";
import { styled } from '@material-ui/core/styles';
import { Button, Container, Modal } from "@material-ui/core";
import { UserRule } from "./components/UserRule";
import { doc } from "prettier";

const CreateGardenContainer = styled(Container)({
  background: "#6ABC6880",
  borderRadius: 20,
  color: "white",
  height: "60vh",
  paddingTop: "1vh",
});

const CreateGardenButton = styled(Button)({
  background: "#ff7f27d9",
  borderRadius: 20,
  color: "#ffffffff",
  fontSize: "1.5rem",
  fontWeight: "bold",
  margin: "0.5rem",
  width: "80%",
});

const CreateGardenButtonDisabled = styled(CreateGardenButton)({
  background: "#ff7f27a6",
  borderRadius: 20,
  color: "#ffffffa6",
  fontSize: "1.5rem",
  fontWeight: "bold",
  margin: "0.5rem",
  width: "80%",
});

const CreateGardenModal = styled(Modal)({
  background: "#ff7f27a6",
  borderRadius: 20,
  color: "#ffffffff",
  height: "80vh",
  width: "80vw",
})

export interface NewUserRule {
  name: String,
  description?: String,
}

export const CreateGarden = ()  => {
  const [allowCreateGarden, setAllowCreateGarden] = useState<boolean>(false);
  const [userRules, setUserRules] = useState<NewUserRule[]>([]);
  const [ruleModalOpen, setRuleModalOpen] = useState<boolean>(false);

  const handleModalOpen = () => {
    setRuleModalOpen(true);
  };

  const handleModalClose = () => {
    setRuleModalOpen(false);
  };
  return (
    <Container>
      <Header />
      <CreateGardenContainer>
        <h2>Create Garden</h2>
        <h3>Current rules:</h3>
        <div className="user-rules">
          {userRules.length < 1 && <p>There are currently no rules set for this garden.</p>}
          {userRules.map((rule, idx) => <UserRule key={idx} name={rule.name} description={rule.description}/>)}
        </div>
        <CreateGardenButton onClick={handleModalOpen}>+ Add rule</CreateGardenButton>
        {allowCreateGarden ? <CreateGardenButton>Make Garden</CreateGardenButton> : 
        <CreateGardenButtonDisabled disabled={true}>Make Garden</CreateGardenButtonDisabled>}
        <CreateGardenModal 
          open={ruleModalOpen}
          onClose={handleModalClose}
          aria-labelledby="add-rule-modal"
          aria-describedby="add rule box"
        >
          <h2 id="add-rule-modal">Hello Modal</h2>
        </CreateGardenModal>
      </CreateGardenContainer>
    </Container>
  )
}
