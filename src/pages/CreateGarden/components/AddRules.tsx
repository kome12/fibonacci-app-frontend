import React from "react";
import {
  Button,
  Card,
  Container,
  createStyles,
  Grid,
  List,
  ListItem,
  makeStyles,
  TextField,
  Typography,
} from "@material-ui/core";
import { UserRule } from "./UserRule";
import { NewUserRule } from "..";
import "./AddRules.css";
import { motion } from "framer-motion";

interface AddRulesProps {
  ruleNameChangeHandler: React.ChangeEventHandler<HTMLInputElement>;
  ruleName: string;
  ruleDescChangeHandler: React.ChangeEventHandler<HTMLInputElement>;
  ruleDesc: string;
  addRuleHandler: React.MouseEventHandler<HTMLButtonElement>;
  userRules: NewUserRule[];
  animDirection: "left" | "right";
}

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      flexGrow: 1,
      height: "100%",
    },
    rules: {
      alignItems: "center",
      overflowY: "auto",
      height: "20vh"
    },
  })
);

export const AddRules: React.FC<AddRulesProps> = ({
  ruleNameChangeHandler,
  ruleName,
  ruleDescChangeHandler,
  ruleDesc,
  addRuleHandler,
  userRules,
  animDirection,
}) => {
  const initDir = animDirection === "left" ? "5vw" : "-5vw";
  const exitDir = animDirection === "left" ? "-5vw" : "5vw";
  const classes = useStyles();
  return (
    <Grid
      container={true}
      className={classes.root}
      justifyContent="center"
      component={motion.div}
      initial={{ opacity: 0, x: initDir }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6 }}
      exit={{ opacity: 0, x: exitDir }}
    >
      <Typography variant="h3">Add rules</Typography>
      <Typography variant="h5">Current rules:</Typography>
      <Grid
        container={true}
        className={classes.rules}
        direction="column"
        justifyContent="center"
      >
        {userRules.length < 1 ? (
          <Container className="no-rules-container">
            <Typography variant="body2" className="no-rules">
              There are currently no rules for this garden.
            </Typography>
          </Container>
        ) : (
          <List>
            {userRules.map((rule, idx) => (
              <Card>
              <ListItem className="rule-li" key={`${rule.name}-${idx}`}>
                  <UserRule name={rule.name} description={rule.description} />
              </ListItem>
              </Card>
            ))}
          </List>
        )}
      </Grid>
      <Container>
        <TextField
          type="text"
          name="name"
          label="Name:"
          variant="outlined"
          onChange={ruleNameChangeHandler}
          value={ruleName}
          autoComplete="off"
        />
        <TextField
          type="text"
          name="desc"
          label="Description:"
          variant="outlined"
          onChange={ruleDescChangeHandler}
          value={ruleDesc}
          autoComplete="off"
        />
        <Button size="large" variant="contained" color="primary" onClick={addRuleHandler}>
          + Add rule
        </Button>
      </Container>
    </Grid>
  );
};
