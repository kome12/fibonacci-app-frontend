import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import IconButton from "@material-ui/core/IconButton";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Tooltip from "@material-ui/core/Tooltip";
import Typography from "@material-ui/core/Typography";
import AddIcon from "@material-ui/icons/Add";
import { motion } from "framer-motion";
import { useEffect, useMemo } from "react";
import { Link, useHistory } from "react-router-dom";
import { Head } from "../../components/Head";
import { LoadingWrapper } from "../../components/LoadingWrapper";
import { Section } from "../../components/Section";
import { SectionTitle } from "../../components/SectionTitle";
import { getGardens } from "../../helpers/api/gardens/getGardens";
import { useUserState } from "../../store/user/useUserState";
import { useApi } from "../../utils/api/useApi";
import gardenImage from "./assets/garden1.jpg";
import styles from "./MyNiwa.module.css";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      maxWidth: 845,
    },
    media: {
      height: 160,
    },
    createGarden: {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.background.paper,
      alignSelf: "center",
      "&:hover": {
        backgroundColor: theme.palette.primary.dark,
      },
    },
  })
);

const useTooltipStyles = makeStyles((theme: Theme) =>
  createStyles({
    arrow: {
      color: theme.palette.primary.dark,
    },
    tooltip: {
      backgroundColor: theme.palette.primary.dark,
      fontWeight: "bold",
    },
  })
);

export const MyNiwa = () => {
  const history = useHistory();
  const classes = useStyles();
  const tooltipStyles = useTooltipStyles();
  const { userData } = useUserState();
  const [gardensApi, getUserGardens] = useApi(getGardens);

  const gardens = useMemo(() => gardensApi.response ?? [], [gardensApi]);

  useEffect(() => {
    if (userData.isLoggedIn && userData.id) {
      getUserGardens(userData.id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userData]);

  const goToCreateGarden = () => {
    history.push("/user/createGarden");
  };
  return (
    <>
      <Head />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        exit={{ opacity: 0 }}
      >
        <Section>
          <SectionTitle title="My Niwa">
            <Tooltip arrow classes={tooltipStyles} title="Add Flower Bed">
              <IconButton
                className={classes.createGarden}
                onClick={goToCreateGarden}
              >
                <AddIcon />
              </IconButton>
            </Tooltip>
          </SectionTitle>

          <LoadingWrapper isLoading={!gardensApi.isLoaded}>
            <div className={styles.gardensView}>
              {gardens.length === 0 ? (
                <Typography variant="h4">
                  Use the + button to make a new flower bed! ⤴
                </Typography>
              ) : (
                gardens.map((garden) => {
                  return (
                    <Link
                      to={`/user/dailyGardening/${garden._id}`}
                      key={garden._id}
                      className={styles.gardenCard}
                    >
                      <Card className={classes.root}>
                        <CardActionArea>
                          <CardMedia
                            className={classes.media}
                            image={
                              garden.gardenCategory?.imageURL || gardenImage
                            }
                            title="Contemplative Reptile"
                          />
                          <CardContent>
                            <Typography
                              gutterBottom
                              variant="h5"
                              component="h2"
                            >
                              {garden.name}
                            </Typography>
                            <Typography
                              variant="body2"
                              color="textSecondary"
                              component="p"
                            >
                              {garden.description}
                            </Typography>
                          </CardContent>
                        </CardActionArea>
                      </Card>
                    </Link>
                  );
                })
              )}
            </div>
          </LoadingWrapper>
        </Section>
      </motion.div>
    </>
  );
};
