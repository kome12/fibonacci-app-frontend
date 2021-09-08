import cors from "cors";
import express, { Express } from "express";
import gardensRouter from "./routes/gardens";
import rulesRouter from "./routes/rules";
import tasksRouter from "./routes/tasks";
import usersRouter from "./routes/users";

const app: Express = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1/gardens", gardensRouter);
app.use("/api/v1/rules", rulesRouter);
app.use("/api/v1/users", usersRouter);
app.use("/api/v1/completedTasks", tasksRouter);

app.listen(3001, () => {
  console.log("Start on port http://localhost:3001");
});
