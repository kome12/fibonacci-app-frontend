import Grid from "@material-ui/core/Grid";
import styles from "./Section.module.css";

export const Section: React.FC = ({ children }) => {
  return (
    <Grid container component="section" className={styles.container}>
      {children}
    </Grid>
  );
};
