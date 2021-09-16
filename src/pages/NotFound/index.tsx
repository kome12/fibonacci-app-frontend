import Button from "@material-ui/core/Button";
import { motion } from "framer-motion";
import { useHistory } from "react-router-dom";
import { Head } from "../../components/Head";
import Gif1 from "./assets/not-found1.gif";
import Gif2 from "./assets/not-found2.gif";
import styles from "./NotFound.module.css";

const gifs = [Gif1, Gif2, Gif1, Gif2, Gif1, Gif2];
export const NotFound = () => {
  const history = useHistory();
  const index = Math.floor(Math.random() * (gifs.length - 0 + 1)) + 0;
  const notFoundGif = gifs[index];

  return (
    <>
      <Head title="Not Found 😕" />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        exit={{ opacity: 0 }}
        className={styles.wrapper}
      >
        <h1>
          Oops!
          <br />
          This page doesn't exist
        </h1>
        <img src={notFoundGif} alt="" />

        <Button
          className={styles.button}
          variant="contained"
          color="primary"
          onClick={() => history.push("/")}
        >
          Go Back To Top Page
        </Button>
      </motion.div>
    </>
  );
};
