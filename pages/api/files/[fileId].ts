import { S3GetObjectPromisified } from '../../../src/utils/promisified-functions'

// example
// http://localhost:3000/api/files/02816c183fb89f037fb0c00f451f309f-1563730623677-formatted
export default async (req: any, res: any) => {
  try {
    const data = await S3GetObjectPromisified(
      `${req.query.fileId.replace('-formatted', '')}.js`
    )
    res.send(data.Body.toString())
  } catch (error) {
    console.log(new Error(error))
  }
}
