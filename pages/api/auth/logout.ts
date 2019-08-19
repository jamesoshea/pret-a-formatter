import serverApp from '../../../src/server/app'
import auth from '../../../src/server/middleware/passport'

const app = serverApp()

app.use(auth)

app.use((req: any, res: any) => {
  req.logout && req.logout()
  req.session && req.session.destroy(() => {})

  res.sendStatus(200)
  if (req.user) {
    console.log(`User disconnected: ${req.user.name}`)
  }
})

export default app
