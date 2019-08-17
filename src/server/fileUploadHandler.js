import prettier from 'prettier'
import S3PutObjectPromisified from '../utils/promisified-functions'

export default async (req, res) => {
  try {
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).send('No files were uploaded.')
    }
    const file = req.files[0]
    // const currentTime = Date.now()
    // const fileName = `${file.md5}-${currentTime}.js`
    console.log(file)
    res.send('wow')
    // const formattedFile = prettier.format(unformattedFile)
    // const base64data = Buffer.from(formattedFile, 'binary')
    // await S3PutObjectPromisified(fileName, base64data)
    // res.status(200).send({
    //   fileName: `${file.md5}-${currentTime}-formatted`,
    //   file: formattedFile
    // })
  } catch (error) {
    console.log(error)
  }
}
