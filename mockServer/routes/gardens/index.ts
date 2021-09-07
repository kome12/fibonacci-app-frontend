import express, { Request, Response } from "express";
import { gardensData } from "../../data/gardensData";

const router = express.Router();

router.get("/:id", (_req: Request, res: Response) => {
  setTimeout(() => {
    res.status(200).json(gardensData);
  }, 1000);
});

export default router;
