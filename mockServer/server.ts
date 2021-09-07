import cors from "cors";
import express, { Express } from "express";
import gardenRouter from "./routes/garden";
import gardensRouter from "./routes/gardens";

const app: Express = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1/gardens", gardenRouter);
app.use("/api/v1/gardens/userid", gardensRouter);

app.listen(3001, () => {
  console.log("Start on port http://localhost:3001");
});
