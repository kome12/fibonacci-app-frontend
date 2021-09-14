import { motion } from "framer-motion";
import pixelGrass from "./assets/pixelgrass.png";
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
            className="flower-animation flower-image1"
            src="https://res.cloudinary.com/dyvrke6ml/image/upload/v1631103161/icons/marigold_timpbu.gif"
            alt="flower"
          />
          <img
            className="flower-animation flower-image2"
            src="https://res.cloudinary.com/dyvrke6ml/image/upload/v1631103160/icons/cosmos_isdopf.gif"
            alt="flower"
          />
          <img className="foreground-grass" src={pixelGrass} alt="field" />
        </div>
      </div>
    </motion.div>
  );
};
