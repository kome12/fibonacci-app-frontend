import { Grid, Typography } from "@material-ui/core";
import { NewUserRule } from "..";
import "./UserRule.css";

export const UserRule: React.FC<NewUserRule> = ({ name, description }) => {
  return (
    <Grid container={true} direction="column" justifyContent="flex-start">
      <Typography variant="h6">{name}</Typography>
      {description && <Typography variant="body1">{description}</Typography>}
    </Grid>
  );
};
