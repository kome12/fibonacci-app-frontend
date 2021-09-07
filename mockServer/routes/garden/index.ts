import express, { Request, Response } from "express";
import { gardenData } from "../../data/gardenData";

const router = express.Router();

router.get("/:id", (_req: Request, res: Response) => {
  setTimeout(() => {
    res.status(200).json(gardenData);
  }, 1000);
});

export default router;
