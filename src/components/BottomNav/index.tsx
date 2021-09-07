import { useState } from "react";
import {
  AppBar,
  BottomNavigation,
  BottomNavigationAction,
  createStyles,
  makeStyles,
  Menu,
  MenuItem,
} from "@material-ui/core";
import LocalFloristIcon from "@material-ui/icons/LocalFlorist";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import StorefrontIcon from "@material-ui/icons/Storefront";
import EmojiNatureIcon from "@material-ui/icons/EmojiNature";

// TODO: fix any type when we can work out what it is supposed to be
interface BottomNavProps {
  currentPage: string;
  handlePageChange: any;
}

const useStyles = makeStyles(() =>
  createStyles({
    appBar: {
      top: "auto",
      bottom: 0,
    },
  })
);

export const BottomNav: React.FC<BottomNavProps> = ({
  currentPage,
  handlePageChange,
}) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  // TODO: decide how to change views on button click

  // TODO: Fix routes when new features are added.
  return (
    <AppBar position="fixed" className={classes.appBar}>
      <BottomNavigation value={currentPage} onChange={handlePageChange}>
        <BottomNavigationAction
          label="My Niwa"
          showLabel={true}
          value="/user/myGardens"
          icon={<EmojiNatureIcon />}
        ></BottomNavigationAction>
        <BottomNavigationAction
          label="Collection"
          showLabel={true}
          value="/user/myCollection"
          icon={<LocalFloristIcon />}
        ></BottomNavigationAction>
        <BottomNavigationAction
          label="Florist"
          showLabel={true}
          value="/user/store"
          icon={<StorefrontIcon />}
        ></BottomNavigationAction>
        <BottomNavigationAction
          label="More"
          showLabel={true}
          value="more"
          icon={<MoreHorizIcon />}
          onClick={handleClick}
        ></BottomNavigationAction>
      </BottomNavigation>
      <Menu
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
        transitionDuration={200}
      >
        <MenuItem>Menu 1</MenuItem>
        <MenuItem>Menu 2</MenuItem>
        <MenuItem>Menu 3</MenuItem>
        <MenuItem>Menu 4</MenuItem>
      </Menu>
    </AppBar>
  );
};
