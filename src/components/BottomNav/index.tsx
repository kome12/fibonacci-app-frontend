import {
  AppBar,
  BottomNavigation,
  BottomNavigationAction,
  createStyles,
  makeStyles,
} from "@material-ui/core";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import LocalFloristIcon from "@material-ui/icons/LocalFlorist";
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
          label="Flower Bed"
          showLabel={true}
          value="/user/createGarden"
          icon={<AddCircleIcon />}
        ></BottomNavigationAction>
        <BottomNavigationAction
          label="Collection"
          showLabel={true}
          value="/user/collection"
          icon={<LocalFloristIcon />}
        ></BottomNavigationAction>
        <BottomNavigationAction
          label="Florist"
          showLabel={true}
          value="/user/store"
          icon={<StorefrontIcon />}
        ></BottomNavigationAction>
      </BottomNavigation>
    </AppBar>
  );
};
