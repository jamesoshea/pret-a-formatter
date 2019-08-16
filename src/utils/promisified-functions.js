const AWS = require('aws-sdk')
AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_KEY
})
const s3 = new AWS.S3()

const S3GetObjectPromisified = fileName => {
  return new Promise((resolve, reject) => {
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

const S3PutObjectPromisified = (fileName, data) => {
  return new Promise((resolve, reject) => {
    try {
      s3.putObject(
        {
          Bucket: 'host-with-the-most',
          Key: fileName.slice(5),
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

const ExpressMoveFilePromisified = (file, fileName) => {
  return new Promise((resolve, reject) => {
    try {
      file.mv(fileName, async err => {
        if (err) {
          reject(err)
        }
        resolve()
      })
    } catch (error) {
      reject(error)
    }
  })
}

export {
  ExpressMoveFilePromisified,
  S3GetObjectPromisified,
  S3PutObjectPromisified
}
