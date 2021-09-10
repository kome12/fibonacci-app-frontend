import express, { Request, Response } from "express";
import { flowersData } from "../../data/flowers/flowersData";

const router = express.Router();

router.get("/", (_req: Request, res: Response) => {
  setTimeout(() => {
    res.status(200).json(flowersData);
  }, 1000);
});

export default router;
