import express, { Request, Response } from "express";
import { gardenCategories } from "../../data/gardens/gardenCategoriesData";

const router = express.Router();

router.get("/", (_req: Request, res: Response) => {
  setTimeout(() => {
    res.status(200).json(gardenCategories);
  }, 1000);
});

export default router;
