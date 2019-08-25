import crypto from 'crypto'
import jwt from 'jsonwebtoken'
import prettier from 'prettier'
import { File } from '../../../src/server/models/file'
import { S3PutObjectPromisified } from '../util/promisified-functions'

const APP_SECRET: string = process.env.APP_SECRET || ''

export default async (req: any, res: any) => {
  try {
    const user: any = jwt.verify(req.body.token, APP_SECRET)
    const file = req.body.file
    const currentTime = Date.now()
    const md5 = crypto
      .createHash('md5')
      .update(file)
      .digest('hex')
    const fileName = `${md5}-${currentTime}.js`
    const formattedFile = prettier.format(file, { parser: 'babel' })
    const base64data = Buffer.from(formattedFile, 'binary')

    await S3PutObjectPromisified(fileName, base64data)
    await File.sync({ force: false })
    const newFile = File.create({
      fileName,
      userEmail: user.email
    })
    res.send({
      fileName,
      file: formattedFile
    })
  } catch (err) {
    console.log(err)
    res.status(403).send('User not authenticated')
  }
}
