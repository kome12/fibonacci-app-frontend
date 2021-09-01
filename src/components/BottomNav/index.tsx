import { useState } from 'react';
import { AppBar, BottomNavigation, BottomNavigationAction, createStyles, makeStyles } from '@material-ui/core';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles(() =>
  createStyles({
    appBar: {
      top: 'auto',
      bottom: 0,
    }}));

export const BottomNav = () => {
  const [currentPage, setCurrentPage] = useState("/user/myGardens");
  const classes = useStyles();
  // TODO: decide how to change views on button click, fix issue with page changing
  let history = useHistory();
  const handlePageChange = (_event: React.ChangeEvent<{}>, newValue: string) => {
    setCurrentPage(newValue);
    history.push(newValue)
  };
  // Fix routes when new features are added.
  return (
    <AppBar position="fixed" className={classes.appBar}>
      <BottomNavigation value={currentPage} onChange={handlePageChange}>
        <BottomNavigationAction label="My Garden / 庭" showLabel={true} value="/user/myGardens"></BottomNavigationAction>
        <BottomNavigationAction label="Create Flower Bed" showLabel={true} value="/user/createGarden"></BottomNavigationAction>
        <BottomNavigationAction label="My Collection" showLabel={true} value="/user/myGardens"></BottomNavigationAction>
        <BottomNavigationAction label="Florist / 花屋" showLabel={true} value="/user/myGardens"></BottomNavigationAction>
      </BottomNavigation>
    </AppBar>
  )
}