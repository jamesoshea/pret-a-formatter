import serverApp from '../../src/server/app'
import { requireAuth } from '../../src/server/middleware/passport'

const app = serverApp()
app.use(requireAuth, (_req: any, res) => {
  const { email, name } = _req
  res.send({ email, name })
})
export default app
