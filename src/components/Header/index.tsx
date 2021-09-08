import { Avatar, createStyles, makeStyles } from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { useCallback, useMemo, useState } from "react";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import { useUserState } from "../../store/user/useUserState";
import { logout } from "../SignIn/useFirebaseAuth";
import CoinAsset from "./assets/coin.png";
import MyNiwaLogo from "./assets/myniwa.svg";
import styles from "./Header.module.css";

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      flexDirection: "row",
    },
    large: {
      width: 45,
      height: 45,
    },
  })
);

export const Header = () => {
  const history = useHistory();
  const { userData } = useUserState();

  const coinBalance = useMemo(
    () => (userData.isLoggedIn && userData.numCoins) || "-",
    [userData]
  );

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
  }, [history]);

  const classes = useStyles();

  return (
    <AppBar
      position="static"
      className={styles.header}
      classes={{ root: classes.root }}
    >
      <Link to="/" className={styles.logoWrapper}>
        <img className={styles.logo} src={MyNiwaLogo} alt="my niwa logo" />
      </Link>

      {userData.isLoggedIn && (
        <div className={styles.userContent}>
          <div className={styles.coinBalance}>
            <img src={CoinAsset} alt="" /> <h3>{coinBalance}</h3>
          </div>
          <Button
            aria-controls="simple-menu"
            aria-haspopup="true"
            onClick={handleClick}
          >
            <div className={styles.avatar}>
              <Avatar
                alt={userData.displayName}
                src={userData.imageUrl ?? ""}
                className={classes.large}
              />
              <span />
            </div>
          </Button>
          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={() => history.push("/about")}>
              About My Niwa
            </MenuItem>
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </Menu>
        </div>
      )}
    </AppBar>
  );
};
