import { Box } from "@material-ui/core";
import { NewUserRule } from "..";

export const UserRule = ({ name, description }: NewUserRule) => {
  return (
    <Box color="secondary">
      <h3>{name}</h3>
      {description && <p>{description}</p>}
    </Box>
  )
}