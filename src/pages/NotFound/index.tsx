import Gif1 from "./assets/not-found1.gif";
import Gif2 from "./assets/not-found2.gif";
import styles from "./NotFound.module.css";

const gifs = [Gif1, Gif2, Gif1, Gif2, Gif1, Gif2];
export const NotFound = () => {
  const index = Math.floor(Math.random() * (gifs.length - 0 + 1)) + 0;
  const notFoundGif = gifs[index];

  return (
    <div className={styles.wrapper}>
      <h1>Oops! This page doesn't</h1>
      <img src={notFoundGif} alt="" />
    </div>
  );
};
