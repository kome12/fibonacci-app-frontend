import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { useCallback, useState } from "react";
import { useHistory } from "react-router";
import MyNiwaLogo from "./assets/borderlessmyniwa.svg";
import { useUserState } from "../../store/user/useUserState";
import { useFirebaseAuth } from "../SignIn/useFirebaseAuth";
import { ReactComponent as Hamburger } from "./assets/hamburger.svg";
import "./Header.css";

export const Header = () => {
  const { userData } = useUserState();
  const { logout } = useFirebaseAuth();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = useCallback(async () => {
    handleClose();
    logout();
  }, []);

  let history = useHistory();
  const linkHandler = (page: string) => {
    history.push(page);
    handleClose();
  };

  return (
    <div className="header-container">
      <img
        className="my-niwa-logo"
        src={MyNiwaLogo}
        alt="my niwa logo"
      />
      <Button
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        <div style={{ color: "#000000" }}>
          <h1 className="italic">menu</h1>
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
        {userData && (
          <MenuItem className="menu-link" onClick={handleLogout}>
            Logout
          </MenuItem>
        )}
      </Menu>
    </div>
  );
};
