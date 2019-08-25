const AWS = require('aws-sdk')
AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_KEY
})
const s3 = new AWS.S3()

module.exports.S3PutObjectPromisified = (fileName, data) => {
  return new Promise((resolve, reject) => {
    try {
      s3.putObject(
        {
          Bucket: 'pret-a-formatter',
          Key: fileName,
          Body: data,
          ACL: 'public-read'
        },
        response => {
          resolve(response)
        }
      )
    } catch (error) {
      reject(error)
    }
  })
}
