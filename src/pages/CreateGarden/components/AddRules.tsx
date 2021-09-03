import React, { useEffect, useRef } from "react";
import {
  Button,
  Container,
  createStyles,
  Grid,
  List,
  ListItem,
  makeStyles,
  TextField,
  Theme,
  Typography,
} from "@material-ui/core";
import AddCircleIcon from '@material-ui/icons/AddCircle';
import { UserRule } from "./UserRule";
import { NewUserRule } from "..";
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

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      height: "100%",
      flexDirection: "column",
      backgroundColor: theme.palette.background.default
    },
    title: {
      fontWeight: "bold",
      color: theme.palette.primary.main
    },
    subtitle: {
      color: theme.palette.primary.dark
    },
    rules: {
      width: "90%",
      marginBottom: "0.25rem",
      marginLeft: "5%",
      overflowY: "auto",
      scrollBehavior: "smooth",
      height: "40%"
    },
    noRules: {
      color: theme.palette.error.main,
      fontWeight: "bold"
    },
    ruleInput: {
      width: "90%",
      marginLeft: "5%",
      gap: "0.25rem"
    },
    ruleList: {
      marginTop: ""
    },
    ruleLi: {
      marginTop: "0.25rem",
      marginBottom: "0.25rem",
    }
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
  // TODO: fix not being able to see all of top elements for odd numbered rules
  const lastRule = useRef<HTMLDivElement>(null);
  useEffect(() => {
    lastRule.current?.scrollIntoView();
  }, [userRules])
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
      <Typography variant="h3" className={classes.title}>Plant Seeds</Typography>
      <Typography variant="h5" className={classes.subtitle}>Current Seeds:</Typography>
      <Grid
        container={true}
        className={classes.rules}
        direction="column"
        justifyContent="center"
      >
        {userRules.length < 1 ? (
          <Container>
            <Typography variant="h5" className={classes.noRules}>
              You haven't sown any Seeds in this garden yet...
            </Typography>
          </Container>
        ) : (
          <List className={classes.ruleList}>
            {userRules.map((rule, idx) => (
                <ListItem key={`${rule.name}-${idx}`} className={classes.ruleLi}>
                  <UserRule name={rule.name} description={rule.description} />
                </ListItem>
            ))}
            <div ref={lastRule}></div>
          </List>
        )}
      </Grid>
      <Grid container direction="column" className={classes.ruleInput} spacing={1}>
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
        <Button size="large" variant="contained" color="primary" onClick={addRuleHandler} startIcon={<AddCircleIcon />}>
          Plant Seed
        </Button>
      </Grid>
    </Grid>
  );
};
