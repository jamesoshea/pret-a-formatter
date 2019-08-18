'use strict'

import { S3GetObjectPromisified } from '../../../src/utils/promisified-functions'

export default async (req, res) => {
  if (req.method === 'GET') {
    get(req, res)
    return
  }
  res.status(405).send('Method Not Allowed')
}

const get = async (req, res) => {
  try {
    const data = await S3GetObjectPromisified(
      `${req.query.fileId.replace('-formatted', '')}.js`
    )
    res.send(data.Body.toString())
  } catch (error) {
    console.log(new Error(error))
  }
}
