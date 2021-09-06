import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { motion } from "framer-motion";
import { useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { LoadingWrapper } from "../../components/LoadingWrapper";
import { getGardens } from "../../helpers/api/gardens/getGardens";
import { useUserState } from "../../store/user/useUserState";
import { useApi } from "../../utils/api/useApi";
import gardenImage from "./assets/garden1.jpg";
import "./MyGardens.css";

const useStyles = makeStyles({
  root: {
    maxWidth: 845,
  },
  media: {
    height: 140,
  },
});

export const MyGardens = () => {
  const classes = useStyles();
  const { userData } = useUserState();
  const [gardensApi, getUserGardens] = useApi(getGardens);

  const myGardens = useMemo(
    () => gardensApi.response?.gardens ?? [],
    [gardensApi]
  );

  useEffect(() => {
    if (userData.isLoggedIn && userData.id) {
      getUserGardens(userData.id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userData]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      exit={{ opacity: 0 }}
    >
      <div className="my-gardens-container">
        <h1>My Gardens</h1>
        <LoadingWrapper isLoading={!gardensApi.isLoaded}>
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
