import express, { Request, Response } from "express";
import { completedTaskData } from "../../data/tasks/completedTask";

const router = express.Router();

router.post("/", (_req: Request, res: Response) => {
  setTimeout(() => {
    res.status(200).json(completedTaskData);
  }, 1000);
});

export default router;
