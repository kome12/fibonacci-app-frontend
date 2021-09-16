import { motion } from "framer-motion";
import "./MyCollection.css";
import { useEffect, useMemo } from "react";
import { useApi } from "../../utils/api/useApi";
import { getFlowers } from "../../helpers/api/flowers/getFlowers";

export const MyCollection = () => {
  const [flowersAPIState, getAllFlowers] = useApi(getFlowers);

  const allFlowers = useMemo(
    () => flowersAPIState.response ?? [],
    [flowersAPIState]
  );

  useEffect(() => {
    getAllFlowers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      exit={{ opacity: 0 }}
      className="myCollectionPage"
    >
      <div>
        <div
          className="collection-box"
          style={{
            width: "" + (100 + 21 * 90) + "px",
          }}
        >
          <div className="bird-container bird-container--one">
            <div className="bird bird--one"></div>
          </div>

          <div className="bird-container bird-container--two">
            <div className="bird bird--two"></div>
          </div>

          <div className="bird-container bird-container--three">
            <div className="bird bird--three"></div>
          </div>

          <div className="bird-container bird-container--four">
            <div className="bird bird--four"></div>
          </div>

          {allFlowers.map((flower, index) => {
            return (
              flower.isActive && (
                <img
                  className="flower-animation flower-image"
                  src={flower.imageURL}
                  key={flower._id}
                  alt={flower.name}
                  style={{ left: "" + (20 + index * 90) + "px" }}
                />
              )
            );
          })}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ type: "spring", duration: 0.8 }}
          >
            <div className="foreground-grass grass-animation"></div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};
