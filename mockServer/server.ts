import express, { Express, NextFunction, Request, Response } from 'express'
import tmpRouter from './routes/tmp'

const app: Express = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Handle CORS for dev
app.use((_req: Request, res: Response, next: NextFunction) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', '*')
  res.header('Access-Control-Allow-Headers', '*')
  next()
})

app.use('/api/v1/tmp', tmpRouter)

app.listen(3001, () => {
  console.log('Start on port http://localhost:3001')
})
