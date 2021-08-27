import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import axios from "axios";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useUserState } from "../../store/user/useUserState";
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
  const dummmyGardenData = [
    { name: "My Routine Garden", id: 1, description: "What I do every day" },
    { name: "My Exercise Garden", id: 2, description: "If I move myself" },
    { name: "My Routine Garden", id: 1, description: "What I do every day" },
    { name: "My Exercise Garden", id: 2, description: "If I move myself" },
  ];
  const classes = useStyles();
  const { userData } = useUserState();

  useEffect(() => {
    const getDataFromBackend = async () => {
      const res = await axios.get(
        `https://the-fibonacci-api-staging.herokuapp.com/api/v1/gardens/userid/${userData?.id}`
      );
      console.log("res in MyGardens:", res);
    };

    getDataFromBackend();
  }, []);

  return (
    <div className="my-gardens-container">
      <h1>My Gardens</h1>
      <div className="gardens-view">
        {dummmyGardenData.map((garden, index) => {
          return (
            <Link to={`/gardenView/${garden.id}`} key={index}>
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
    </div>
  );
};
