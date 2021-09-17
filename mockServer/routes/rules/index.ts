import express, { Request, Response } from "express";
import { rulesData } from "../../data/rules/rulesBulkData";

const router = express.Router();

router.post("/bulk", (req: Request, res: Response) => {
  setTimeout(() => {
    res.status(200).json(req.body);
  }, 1000);
});

router.put("/:id", (req: Request, res: Response) => {
  const data = req.body;

  setTimeout(() => {
    res.status(200).json({
      ...rulesData[0],
      name: data.name,
      description: data.description,
      _id: data._id,
      gardenId: data.gardenId,
      isRemoved: data.isRemoved,
    });
  }, 1000);
});

export default router;
