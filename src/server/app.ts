import dotenv from 'dotenv'
import express from 'express'

import common from './middleware/common'

dotenv.config()

export default () => {
  const app = express()

  app.use(common)
  return app
}
