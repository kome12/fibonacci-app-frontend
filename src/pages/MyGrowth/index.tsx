import { Grid } from "@material-ui/core";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import { useMemo, useState, useEffect } from "react";
import { useApi } from "../../utils/api/useApi";
import { Garden } from "../../models/garden.model";
import { TabPanel } from "./components/TabPanel";
import { useUserState } from "../../store/user/useUserState";
import { getGardens } from "../../helpers/api/gardens/getGardens";
import { TabData } from "./components/TabData";

export const MyGrowth = () => {
  const { userData } = useUserState();

  const [gardensDataApi, getGardensData] = useApi(getGardens);

  const gardens = useMemo(
    () => gardensDataApi.response ?? [],
    [gardensDataApi]
  );

  useEffect(() => {
    if (userData.isLoggedIn && userData.id) {
      getGardensData(userData.id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userData]);

  const [currentTab, setCurrentTab] = useState(0);

  const handleChangeTab = (_event: React.ChangeEvent<{}>, newValue: number) => {
    setCurrentTab(newValue);
  };

  const tabLabels = () => {
    return gardens.map((garden: Garden) => {
      return <Tab key={garden._id} label={garden.name} wrapped={true}></Tab>;
    });
  };

  const tabPanels = (currentTab: number) => {
    return gardens.map((garden: Garden, index: number) => {
      return (
        <TabPanel value={currentTab} index={index} key={garden._id}>
          <TabData gardenId={garden._id} />
        </TabPanel>
      );
    });
  };

  return (
    <Grid container direction="column" justifyContent="center">
      <h1>My Growth</h1>
      {/* <AppBar> */}
      <Tabs onChange={handleChangeTab} value={currentTab} variant="scrollable"
          scrollButtons="on">
        {tabLabels()} 
      </Tabs>
      {tabPanels(currentTab)}
      {/* <TabPanel value={currentTab} index={0}>

        </TabPanel> */}
      {/* </AppBar> */}
      {/* <TabPanel value={value} index={0}>
        Item One
      </TabPanel>
      <TabPanel value={value} index={1}>
        Item Two
      </TabPanel>
      <TabPanel value={value} index={2}></TabPanel>
        Item Three
      </TabPanel> */}
    </Grid>
  );
};
