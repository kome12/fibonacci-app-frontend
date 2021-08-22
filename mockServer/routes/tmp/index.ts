import express, { Request, Response } from 'express'
import { tmpData } from '../../data/tmpData'

const router = express.Router()

router.get('/', (_req: Request, res: Response) => {
  res.status(200).json(tmpData)
})

export default router
