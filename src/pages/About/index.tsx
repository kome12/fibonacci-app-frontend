import { Paper } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import { motion } from "framer-motion";
import { useHistory } from "react-router";
import { SignIn } from "../../components/SignIn";
import { useUserState } from "../../store/user/useUserState";
import "./About.css";

export const About = () => {
  const { userData } = useUserState();

  const history = useHistory();
  const linkHandler = () => {
    history.push("/user/myniwa");
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      exit={{ opacity: 0 }}
      className="info-page"
    >
      <Paper className="info-container">
        <h1>My niwa is about growing a beautiful garden</h1>
        <ol>
          <li>
            Create a flowerbed with seeds (good habits you'd like to have!)
          </li>
          <li>Every day, complete your seeds to gain coins!</li>
          <li>Use your coins to either buy flowers...</li>
          <li>Or try your luck with the gacha for rare flowers!</li>
          <li>Try to collect all the flowers while bettering yourself!</li>
        </ol>
      </Paper>
      {userData.isLoggedIn ? (
        <Button
          variant="contained"
          color="primary"
          onClick={() => linkHandler()}
        >
          Get me to my Gardens!
        </Button>
      ) : (
        <SignIn />
      )}
    </motion.div>
  );
};
