import crypto from 'crypto'
import nodemailer from 'nodemailer'
import serverApp from '../../../src/server/app'
import auth from '../../../src/server/middleware/passport'
import { User } from '../../../src/server/models/auth'

const app = serverApp()

app.use(auth)

app.post('*', async (req, res, next) => {
  const { email, password } = req.body

  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD
    }
  })

  let info = await transporter.sendMail({
    from: process.env.EMAIL_USERNAME, // sender address
    to: email, // list of receivers
    subject: 'Hello ✔', // Subject line
    html: '<b>Hello world?</b>' // html body
  })

  console.log('Message sent: %s', info.messageId)

  const salt = 'jfnofoihnoi'
  const hash = crypto.createHmac('sha512', salt)
  hash.update(password)
  const hashedPassword = hash.digest('hex')
  await User.sync({ force: false })
  try {
    const newUser = await User.create({
      email,
      password: hashedPassword,
      name: 'James'
    })
    const newUserJson: any = newUser.toJSON()
    req.logIn(newUserJson, e => {
      if (e) {
        return next(e)
      }
      if (req.session) req.session.cookie.maxAge = 86400000

      const { name, email } = newUserJson

      console.log('Successful authentication: ' + name)

      return res.json({
        name,
        email
      })
    })
  } catch (err) {
    console.log(err)
    res.sendStatus(500)
  }
})

export default app
