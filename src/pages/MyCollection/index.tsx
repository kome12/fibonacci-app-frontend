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
        <div className="collection-box">
          {allFlowers.map((flower, index) => {
            return (
              flower.isActive && (
                <img
                  className="flower-animation flower-image1"
                  src={flower.imageURL}
                  key={flower._id}
                  alt={flower.name}
                  style={{ left: "" + (50 + index * 90) + "px" }}
                />
              )
            );
          })}
          <div className="foreground-grass"></div>
        </div>
      </div>
    </motion.div>
  );
};
