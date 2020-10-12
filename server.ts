import * as http from 'http'
import { keys } from './keys/keys'
import { app } from './app'

const PORT = keys.PORT || 4200

const server = http.createServer(app)

server.listen(PORT, (): void => {
  console.log('server is working on', PORT)
})
