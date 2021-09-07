import express, { Request, Response } from "express";
import { gardenData } from "../../data/gardens/gardenData";
import { gardensData } from "../../data/gardens/gardensData";
import { newGardenData } from "../../data/gardens/newGardenData";

const router = express.Router();

router.get("/:id", (_req: Request, res: Response) => {
  setTimeout(() => {
    res.status(200).json(gardenData);
  }, 1000);
});

router.post("/", (_req: Request, res: Response) => {
  setTimeout(() => {
    res.status(200).json(newGardenData);
  }, 1000);
});

router.get("/userid/:id", (_req: Request, res: Response) => {
  setTimeout(() => {
    res.status(200).json(gardensData);
  }, 1000);
});

export default router;
