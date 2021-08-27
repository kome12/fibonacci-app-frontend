import { Box } from "@material-ui/core";
import { NewUserRule } from "./AddRules";
import "./UserRule.css";

export const UserRule = ({ name, description }: NewUserRule) => {
  return (
    <Box>
      <h3>{name}</h3>
      {description && <p>{description}</p>}
    </Box>
  )
}