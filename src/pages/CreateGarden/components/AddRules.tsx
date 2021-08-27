import { Button, Container } from "@material-ui/core";
import { styled } from "@material-ui/styles";
import React, { useState } from "react";
import { UserRule } from "./UserRule";
import "./AddRules.css";

const AddRuleContainer = styled(Container)({
  background: "#6ABC6880",
  borderRadius: 20,
  display: "flex",
  flexDirection: "column",
  height: "40%",
  marginTop: "15%",
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

export interface NewUserRule {
  name: String,
  description?: String,
}

export const AddRules = () => {
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
  }

  return (
    <div className="add-rules-container">
      <h2>Add rules</h2>
      <h3>Current rules:</h3>
      <div className="user-rules">
        {
        userRules.length < 1 ? 
        <div><p>There are currently no rules set for this garden.</p></div> :
          <ul>
            {userRules.map((rule, idx) => <li className="rule-li"><UserRule key={idx} name={rule.name} description={rule.description}/></li>)}
          </ul>
        }
      </div>
      <AddRuleContainer>
        <label className="rule-label" htmlFor="desc"><p>Name:</p></label>
        <input className="garden-name" type="text" name="name" onChange={ruleNameChangeHandler} value={ruleName}/>

        <label className="rule-label" htmlFor="desc"><p>Description:</p></label>
        <input className="garden-desc" type="text" name="desc" onChange={ruleDescChangeHandler} value={ruleDesc} />
        <RuleButton size="large" onClick={addRuleHandler}>+ Add rule</RuleButton>
      </AddRuleContainer>
    </div>
  )
}