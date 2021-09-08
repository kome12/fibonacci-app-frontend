import express, { Request, Response } from "express";

const router = express.Router();

router.post("/bulk", (req: Request, res: Response) => {
  setTimeout(() => {
    res.status(200).json(req.body);
  }, 1000);
});

export default router;
