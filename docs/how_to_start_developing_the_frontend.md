# How to start developing the frontend

- First be sure that you ran `yarn install` and installed all packages needed

- Then start the dev server running the script below in the root of the project.
  This would start the dev server for the frontend and also we have a mock server to mock all data from server(api), so we don't have to wait for the backend. Just be sure that after the a specific api is done update the endpoints and response data.

```
// To develop with mock-server
npm run dev:mock
```

## Mock Server

As pointed above we use a mock server in the frontend to speed up the development. It is a simple express server with typescript.
All the code is in the `./mockServer` directory.

### How to run only the mock server separately

Run:

```
npm run start:mockServer
```

Any new api data would be added in their respective routes files inside the `./mockServer/routes` directory

```ts
import express, { Request, Response } from 'express'
import { tmpData } from '../../data/tmpData'

const router = express.Router()

router.get('/', (_req: Request, res: Response) => {
  res.status(200).json(tmpData)
})

export default router
```
