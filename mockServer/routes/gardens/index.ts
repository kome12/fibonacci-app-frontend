import express, { Request, Response } from 'express'
import { gardensData } from '../../data/gardensData'

const router = express.Router()

router.get('/', (_req: Request, res: Response) => {
  res.status(200).json(gardensData)
})

export default router
