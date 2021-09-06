import { Grid, IconButton, Tooltip } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import axios from "axios";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { LoadingWrapper } from "../../components/LoadingWrapper";
import { Garden } from "../../models/garden.model";
import { useUserState } from "../../store/user/useUserState";
import AddIcon from "@material-ui/icons/Add";
import gardenImage from "./assets/garden1.jpg";
import "./MyGardens.css";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      maxWidth: 845,
    },
    media: {
      height: 140,
    },
    myNiwaHeader: {
      width: "100%",
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

export const MyGardens = () => {
  const classes = useStyles();
  const { userData } = useUserState();
  const [isFetchingGardens, setIsFetchingGardens] = useState(true);
  const [myGardens, setMyGardens] = useState<Array<Garden>>([]);

  useEffect(() => {
    const getDataFromBackend = async () => {
      if (userData.isLoggedIn && userData.id) {
        // TODO: FIX DATABASE CALL AFTER MVP
        const res = await axios.get(
          `https://the-fibonacci-api-staging.herokuapp.com/api/v1/gardens/userid/${userData?.id}`
        );
        setMyGardens(res.data || []);
        setIsFetchingGardens(false);
      }
    };

    getDataFromBackend();
  }, [userData]);

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
          <h1>My Gardens</h1>
          <Tooltip title="Add Flower Bed">
            <IconButton
              className={classes.createGarden}
              onClick={goToCreateGarden}
            >
              <AddIcon />
            </IconButton>
          </Tooltip>
        </Grid>
        <LoadingWrapper isLoading={isFetchingGardens}>
          <div className="gardens-view">
            {myGardens.map((garden, index) => {
              return (
                <Link to={`/user/dailyGardening/${garden._id}`} key={index}>
                  <Card className={`garden-card ${classes.root}`}>
                    <CardActionArea>
                      <CardMedia
                        className={classes.media}
                        image={gardenImage}
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
