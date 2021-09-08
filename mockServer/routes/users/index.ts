import express, { Request, Response } from "express";
import { userAccountData } from "../../data/users/userAccountData";

const router = express.Router();

router.get("/:id", (_req: Request, res: Response) => {
  setTimeout(() => {
    res.status(200).json(userAccountData);
  }, 1000);
});

export default router;
