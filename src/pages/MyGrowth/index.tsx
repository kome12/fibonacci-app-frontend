import { createStyles, makeStyles, Paper, Theme } from "@material-ui/core";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import { useEffect, useMemo, useState } from "react";
import { Head } from "../../components/Head";
import { Section } from "../../components/Section";
import { SectionTitle } from "../../components/SectionTitle";
import { getGardens } from "../../helpers/api/gardens/getGardens";
import { Garden } from "../../models/garden.model";
import { useUserState } from "../../store/user/useUserState";
import { useApi } from "../../utils/api/useApi";
import { TabData } from "./components/TabData";
import { TabPanel } from "./components/TabPanel";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    tabBar: {
      backgroundColor: theme.palette.primary.main,
      // display: "flex",
      // flex: "0 0 100%",
      marginTop: "0.5rem",
      width: "100%",
    },
  })
);

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
  const classes = useStyles();
  return (
    <>
      <Head title="MyGrowth" />
      <Section>
        <SectionTitle title="My Growth" />
      </Section>
      <Section>
        <Paper className={classes.tabBar}>
          <Tabs
            onChange={handleChangeTab}
            value={currentTab}
            variant="scrollable"
            scrollButtons="on"
          >
            {tabLabels()}
          </Tabs>
        </Paper>
        {tabPanels(currentTab)}
      </Section>
    </>
  );
};
