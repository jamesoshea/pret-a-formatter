import jwt from 'jsonwebtoken'
import { File } from '../../../src/server/models/file'

const APP_SECRET: string = process.env.APP_SECRET || ''

export default async (req: any, res: any) => {
  try {
    const user: any = jwt.verify(req.token, APP_SECRET)
    const file = File.create({
      fileName: req.body.fileName,
      user: user.email
    })
    res.send(file)
  } catch (err) {
    console.log(err)
    res.status(403).send('User not authenticated')
  }
}
