import { motion } from "framer-motion";

import grassyField from "./assets/grassyfield.png";
import "./MyCollection.css";

export const MyCollection = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      exit={{ opacity: 0 }}
      className="myCollectionPage"
    >
      <div>
        <div>
          <h1>This is my Collection</h1>
        </div>
        <div className="collection-box">
          <img className="background-image" src={grassyField} alt="field" />
          <img
            className="flower-animation flower-image"
            src="https://res.cloudinary.com/dyvrke6ml/image/upload/v1631103161/icons/marigold_timpbu.gif"
            alt="flower"
          />
        </div>
      </div>
    </motion.div>
  );
};
