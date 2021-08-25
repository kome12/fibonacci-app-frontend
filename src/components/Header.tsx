import { useState } from "react";
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import SunflowerLogo from "../img/sunflowerlogo.png";
import {ReactComponent as Hamburger} from "../img/hamburger.svg";
import "./Header.css";

export const Header = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <div className="header-container">
      <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
        <div style={{color: "#ff7f27"}}><Hamburger /></div>
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      > 
        <MenuItem>Profile</MenuItem>
        <MenuItem>My account</MenuItem>
        <MenuItem>Logout</MenuItem>
      </Menu>
      <img className="sunflower-logo" src={SunflowerLogo} alt="fibonacci logo"></img>
    </div>
  )
};