import { Grid, IconButton, Tooltip } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import AddIcon from "@material-ui/icons/Add";
import { motion } from "framer-motion";
import { useEffect, useMemo } from "react";
import { Link, useHistory } from "react-router-dom";
import { LoadingWrapper } from "../../components/LoadingWrapper";
import { getGardens } from "../../helpers/api/gardens/getGardens";
import { useUserState } from "../../store/user/useUserState";
import { useApi } from "../../utils/api/useApi";
import { getCategories } from "../../helpers/api/gardens/getCategories";
import gardenImage from "./assets/garden1.jpg";
import "./MyNiwa.css";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      maxWidth: 845,
    },
    media: {
      height: 140,
    },
    myNiwaHeader: {
      width: "90%",
      marginLeft: "5%",
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
  const classes = useStyles();
  const tooltipStyles = useTooltipStyles();
  const { userData } = useUserState();
  const [gardensApi, getUserGardens] = useApi(getGardens);

  const gardens = useMemo(() => gardensApi.response ?? [], [gardensApi]);

  const [categoriesApi, getGardenCategories] = useApi(getCategories);

  const categories = useMemo(() => categoriesApi.response, [categoriesApi]);

  useEffect(() => {
    getGardenCategories();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (userData.isLoggedIn && userData.id) {
      getUserGardens(userData.id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userData]);

  const getImage = (categoryId: string) => {
    const result = categories?.find((category) => category._id === categoryId);
    console.log(result?.[0]);
    if (result?.[0]?.imageURL) {
      return result[0]?.imageURL;
    }
    return gardenImage;
  };

  const history = useHistory();
  const goToCreateGarden = () => {
    history.push("/user/createGarden");
  };
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      exit={{ opacity: 0 }}
    >
      <div className="my-gardens-container">
        <Grid
          container
          className={classes.myNiwaHeader}
          direction="row"
          justifyContent="space-between"
        >
          <h1>My Niwa</h1>
          <Tooltip arrow classes={tooltipStyles} title="Add Flower Bed">
            <IconButton
              className={classes.createGarden}
              onClick={goToCreateGarden}
            >
              <AddIcon />
            </IconButton>
          </Tooltip>
        </Grid>
        <LoadingWrapper isLoading={!gardensApi.isLoaded}>
          <div className="gardens-view">
            {gardens.map((garden, index) => {
              return (
                <Link to={`/user/dailyGardening/${garden._id}`} key={index}>
                  <Card className={`garden-card ${classes.root}`}>
                    <CardActionArea>
                      <CardMedia
                        className={classes.media}
                        image={getImage(garden.gardenCategoryId)}
                        title="Contemplative Reptile"
                      />
                      <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
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
            })}
          </div>
        </LoadingWrapper>
      </div>
    </motion.div>
  );
};
