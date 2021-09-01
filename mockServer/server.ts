import cors from "cors";
import express, { Express } from "express";
import gardensRouter from "./routes/gardens";
import tmpRouter from "./routes/tmp";

const app: Express = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1/tmp", tmpRouter);
app.use("/api/v1/gardens", gardensRouter);

app.listen(3001, () => {
  console.log("Start on port http://localhost:3001");
});
