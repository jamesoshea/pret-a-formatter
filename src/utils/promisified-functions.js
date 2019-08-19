const AWS = require('aws-sdk')
AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_KEY
})
const s3 = new AWS.S3()

const S3GetObjectPromisified = fileName => {
  return new Promise((resolve, reject) => {
    console.log(fileName)
    const params = {
      Bucket: 'host-with-the-most',
      Key: fileName
    }
    s3.getObject(params, (error, data) => {
      if (error) {
        reject(error)
      }
      resolve(data)
    })
  })
}

export { S3GetObjectPromisified }
