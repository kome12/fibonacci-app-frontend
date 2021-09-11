import { createStyles, makeStyles, Theme } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import { motion } from "framer-motion";
import { useHistory } from "react-router";
import { ReactComponent as MyNiwaLogo } from "../../components/Header/assets/myniwa.svg";
import { SignIn } from "../../components/SignIn";
import { useUserState } from "../../store/user/useUserState";
import { ReactComponent as Niwa } from "./assets/niwa.svg";
import styles from "./Home.module.css";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    loginButton: {
      margin: "4%",
      backgroundColor: theme.palette.text.primary,
      color: theme.palette.background.default,
    },
  })
);

export const Home = () => {
  const { userData } = useUserState();

  const history = useHistory();
  const linkHandler = (page: string) => {
    history.push(page);
  };

  const classes = useStyles();
  // // Sample code of how to use the useApi hook in a component
  // // If you want to check useApi: src/utils/api/useApi.ts
  // // How to define the apiHelper(getGardens): src/helpers/api/gardens/getGardens.ts
  // const [gardensApi, getGardensData] = useApi(getGardens);
  // const gardens = useMemo(() => gardensApi.response ?? [], [gardensApi]);

  // useEffect(() => {
  //   getGardensData();
  // }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      exit={{ opacity: 0 }}
      className={styles.splashPage}
    >
      <div className={styles.splashPage}>
        <div className={styles.niWaContainer}>
          <MyNiwaLogo className={styles.myNiwaLogo} />
          <Niwa className={styles.niWaCharacter} />
          <h1 className={styles.niWa}>ni•wa</h1>
          <h3 className={styles.niWaDefinition}>a garden or courtyard</h3>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => linkHandler("/about")}
            size="large"
          >
            What is my niwa?
          </Button>
          <div>
            {userData.isLoggedIn ? (
              <Button
                variant="contained"
                onClick={() => linkHandler("/user/myniwa")}
                size="large"
                className={classes.loginButton}
              >
                Get me to My Niwa!
              </Button>
            ) : (
              <div>
                <h4>Sign in to get started!</h4>
                <SignIn />
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};
