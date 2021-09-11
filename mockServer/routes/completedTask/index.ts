import express, { Request, Response } from "express";
import { completedTask } from "../../data/completedTask";

const router = express.Router();

router.post("/", (req: Request, res: Response) => {
  const data = req.body;

  setTimeout(() => {
    res.status(200).json({
      user: completedTask.user,
      completedTask: {
        ...completedTask.completedTask,
        date: data.date,
        ruleId: data.ruleId,
      },
    });
  }, 1000);
});

export default router;
