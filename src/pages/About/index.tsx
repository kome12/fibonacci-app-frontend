import { SignIn } from "../../components/SignIn";
import { useHistory } from "react-router";
import { useUserState } from "../../store/user/useUserState";
import Button from "@material-ui/core/Button";
import "./About.css";
import { Paper } from "@material-ui/core";

export const About = () => {
  const { userData } = useUserState();

  const history = useHistory();
  const linkHandler = () => {
    history.push("/user/myGardens");
  };

  return (
    <div className="info-page">
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
      {userData ? (
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
      {/* { {!userData && <SignIn /> }} */}
    </div>
  );
};
