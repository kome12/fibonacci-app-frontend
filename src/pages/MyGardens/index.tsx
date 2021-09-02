import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Garden } from "../../models/garden.model";
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
  const classes = useStyles();
  const { userData } = useUserState();
  const [myGardens, setMyGardens] = useState(Array<Garden>());

  useEffect(() => {
    const getDataFromBackend = async () => {
      if (userData?.id) {
        // TODO: FIX DATABASE CALL AFTER MVP
        const res = await axios.get(
          `https://the-fibonacci-api-staging.herokuapp.com/api/v1/gardens/userid/${userData?.id}`
        );
        setMyGardens(res.data || []);
      }
    };

    getDataFromBackend();
  }, []);

  interface IFlower {
    _id: string;
    imageURL: string;
    name: string;
    isActive: boolean;
    isSecret: boolean;
  }
  const [flowers, setFlowers] = useState(Array<IFlower>());
  useEffect(() => {
    // get flowers for test
    const getFlowers = async () => {
      const res = await axios.get(`http://localhost:3001/api/v1/flowers`);
      console.log("res for flowers:", res);
      setFlowers(res.data);
    };

    getFlowers();
  }, []);

  const renderFlowers = () => {
    return flowers.map((flower: IFlower) => {
      return (
        <div key={flower._id}>
          <img src={flower.imageURL} alt={flower.name} />
        </div>
      );
    });
  };

  return (
    <div className="my-gardens-container">
      <h1>My Gardens</h1>
      <div className="gardens-view">
        {myGardens.map((garden, index) => {
          return (
            <Link to={`/user/gardenView/${garden._id}`} key={index}>
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
      <div>
        <h3>Test from Cloudinary</h3>
        {renderFlowers()}
      </div>
    </div>
  );
};
