import express, { Request, Response } from "express";
import { flowerStore } from "../../data/flowers/flowerStoreData";

const router = express.Router();

router.put("/", (_req: Request, res: Response) => {
  setTimeout(() => {
    res.status(200).json(flowerStore);
  }, 1000);
});

export default router;
