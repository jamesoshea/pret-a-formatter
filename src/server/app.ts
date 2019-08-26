import dotenv from 'dotenv'
import express from 'express'

import { User } from '../server/models/auth'
import { File } from '../server/models/file'

dotenv.config()
;(async function wow() {
  await File.sync({ force: false })
  await User.sync({ force: false })
})()

export default () => {
  const app = express()
  return app
}
