import { createStyles, makeStyles } from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { useCallback, useState } from "react";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import { useUserState } from "../../store/user/useUserState";
import { logout } from "../SignIn/useFirebaseAuth";
import { ReactComponent as Hamburger } from "./assets/hamburger.svg";
import MyNiwaLogo from "./assets/myniwa.svg";
import styles from "./Header.module.css";

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      flexDirection: "row",
    },
  })
);

export const Header = () => {
  const history = useHistory();
  const { userData } = useUserState();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = useCallback(async () => {
    handleClose();
    await logout();
    history.push("/");
  }, []);

  const linkHandler = (page: string) => {
    history.push(page);
    handleClose();
  };

  const classes = useStyles();

  return (
    <AppBar
      position="static"
      className={styles.header}
      classes={{ root: classes.root }}
    >
      <Link to="/">
        <img className={styles.logo} src={MyNiwaLogo} alt="my niwa logo" />
      </Link>

      <Button
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        <div style={{ color: "#000000" }}>
          <Hamburger />
        </div>
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem
          className="menu-link"
          onClick={() => linkHandler("/user/myGardens")}
        >
          My Gardens
        </MenuItem>
        <MenuItem
          className="menu-link"
          onClick={() => linkHandler("/user/createGarden")}
        >
          Create Garden
        </MenuItem>
        {userData.isLoggedIn && (
          <MenuItem className="menu-link" onClick={handleLogout}>
            Logout
          </MenuItem>
        )}
      </Menu>
    </AppBar>
  );
};
