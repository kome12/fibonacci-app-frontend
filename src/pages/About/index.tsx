import { SignIn } from "../../components/SignIn";
import { useHistory } from 'react-router'
import { useUserState } from "../../store/user/useUserState";
import Button from '@material-ui/core/Button';
import "./About.css";
import { Paper } from "@material-ui/core";

export const About = () => {
  const { userData } = useUserState();
  
  let history = useHistory();
  const linkHandler = (page: string) => {
    history.push(page);
  };

  return (
    <div className="info-page">
      <Paper>
        This is what my niwa is about
        <ul>
          <li>Thing 1</li>
          <li>Thing 2</li>
          <li>Thing 3</li>
        </ul>
      </Paper>
      {userData ? 
      <Button 
        variant="contained" 
        color="primary"         
        onClick={() => linkHandler("/user/myGardens")}
      >Get me to my Gardens!</Button> : 
      <SignIn />}
    {/* { {!userData && <SignIn /> }} */}
    </div>
  );
};
