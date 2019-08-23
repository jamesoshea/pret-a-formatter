import jwt from 'jsonwebtoken'
import { File } from '../../../src/server/models/file'

const { APP_SECRET } = process.env

export default async (req: any, res: any) => {
  try {
    const { email } = jwt.verify(req.token, APP_SECRET)
    const file = File.create({
      fileName: req.body.fileName,
      user: email
    })
    res.send(file)
  } catch (err) {
    console.log(err)
    res.status(403).send('User not authenticated')
  }
}
