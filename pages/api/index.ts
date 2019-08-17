import serverApp from '../../src/server/app'
import { requireAuth } from '../../src/server/middleware/passport'
import fileUploadHandler from '../../src/server/fileUploadHandler'

const app = serverApp()
app.use(requireAuth, (_req, res) => {
  res.send('hello world')
})
app.post('/upload', fileUploadHandler)

export default app
