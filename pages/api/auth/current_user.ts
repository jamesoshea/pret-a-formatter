import jwt from 'jsonwebtoken'
import serverApp from '../../../src/server/app'
import auth from '../../../src/server/middleware/passport'
import { UserModel } from '../../../src/server/models/auth'
import { File } from '../../../src/server/models/file'

const app = serverApp()

app.use(auth)

app.use(async (req: any, res) => {
  try {
    if (req.user) {
      const { name, email }: UserModel = req.user
      const files = await File.findAll({
        where: {
          userEmail: email
        }
      })
      const APP_SECRET: string = process.env.APP_SECRET || ''
      return res.json({
        files,
        name,
        email,
        token: jwt.sign({ name, email }, APP_SECRET)
      })
    } else {
      res.sendStatus(204)
    }
  } catch (err) {
    console.error(err)
    res.sendStatus(500)
  }
})

export default app
