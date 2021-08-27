import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';import "./MyGardens.css";
import gardenImage from "./assets/garden1.jpg";

const useStyles = makeStyles({
  root: {
    maxWidth: 845,
  },
  media: {
    height: 140,
  },
});

export const MyGardens = () => {
  const dummmyGardenData = [{name:"My Routine Garden", id: 1, description:"What I do every day"}, {name:"My Exercise Garden", id: 2, description: "If I move myself"},{name:"My Routine Garden", id: 1, description:"What I do every day"}, {name:"My Exercise Garden", id: 2, description: "If I move myself"}];
  const classes = useStyles();
  
  return (
    <div className="my-gardens-container">
      <h1>My Gardens</h1>
        <div className="gardens-view">
        {dummmyGardenData.map((garden, index) => {
          return (
            <Card key={index} className={`garden-card ${classes.root}`}>
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
                  <Typography variant="body2" color="textSecondary" component="p">
                    {garden.description}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>)
          })
        }
      </div>
    </div>
  )
}
