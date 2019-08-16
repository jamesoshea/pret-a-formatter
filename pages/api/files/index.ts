import { S3GetObjectPromisified } from '../../../src/utils/promisified-functions'

export default async (req: any, res: any) => {
  try {
    const data = await S3GetObjectPromisified(
      `${req.params.fileName.replace('-formatted', '')}.js`
    )
    res.send(data.Body.toString())
  } catch (error) {
    console.log(new Error(error))
  }
}
