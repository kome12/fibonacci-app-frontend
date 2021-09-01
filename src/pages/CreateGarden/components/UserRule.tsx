import { Box } from "@material-ui/core";
import { NewUserRule } from "..";
import "./UserRule.css";

export const UserRule: React.FC<NewUserRule> = ({ name, description }) => {
  return (
    <Box>
      <h3>{name}</h3>
      {description && <p>{description}</p>}
    </Box>
  );
};
