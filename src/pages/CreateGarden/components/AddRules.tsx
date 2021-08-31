import React from "react";
import { Button, Container } from "@material-ui/core";
import { styled } from "@material-ui/styles";
import { UserRule } from "./UserRule";
import { NewUserRule } from "..";
import "./AddRules.css";

const AddRuleContainer = styled(Container)({
  background: "#6ABC6880",
  borderRadius: 20,
  display: "flex",
  flexDirection: "column",
  height: "40%",
  marginTop: "12%",
})

const RuleButton = styled(Button)({
  alignSelf: "center",
  background: "#ff7f27d9",
  borderRadius: 20,
  color: "#fff",
  fontWeight: "bold",
  margin: "2% 0 2%",
  width: "50%",
})

interface AddRulesProps {
  ruleNameChangeHandler: React.ChangeEventHandler<HTMLInputElement>,
  ruleName: string,
  ruleDescChangeHandler: React.ChangeEventHandler<HTMLInputElement>,
  ruleDesc: string,
  addRuleHandler: React.MouseEventHandler<HTMLButtonElement>,
  userRules: NewUserRule[]
}

export const AddRules: React.FC<AddRulesProps> = ({ruleNameChangeHandler, ruleName, ruleDescChangeHandler, ruleDesc, addRuleHandler, userRules}) => {
  return (
    <div className="add-rules-container">
      <h2>Add rules</h2>
      <h3>Current rules:</h3>
      <div className="user-rules">
        {
        userRules.length < 1 ? 
        <div className="no-rules-container">
          <p className="no-rules">There are currently no rules for this garden.</p>
        </div> :
          <ul>
            {userRules.map((rule, idx) => 
              <li className="rule-li" key={`${rule.name}-${idx}`}>
                <UserRule name={rule.name} description={rule.description}/>
              </li>)}
          </ul>
        }
      </div>
      <AddRuleContainer>
        <label className="rule-label" htmlFor="desc"><p>Name:</p></label>
        <input className="garden-name" 
               type="text" name="name" 
               onChange={ruleNameChangeHandler} 
               value={ruleName}
               autoComplete="off"/>

        <label className="rule-label" htmlFor="desc"><p>Description:</p></label>
        <input className="garden-desc" 
               type="text" name="desc" 
               onChange={ruleDescChangeHandler} 
               value={ruleDesc}
               autoComplete="off" />
        <RuleButton size="large" onClick={addRuleHandler}>+ Add rule</RuleButton>
      </AddRuleContainer>
    </div>
  )
}