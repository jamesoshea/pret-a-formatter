import dotenv from 'dotenv'
import express from 'express'

dotenv.config()

export default () => {
  const app = express()
  return app
}
