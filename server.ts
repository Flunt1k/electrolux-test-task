import * as http from 'http'
import { app } from './app'
import dotenv from 'dotenv'
dotenv.config()

const PORT = process.env.PORT

const server = http.createServer(app)

server.listen(PORT, () : void => {
  console.log('server is working on', PORT)
})

process.on('uncaughtException', (err: Error) : void => {
  console.error('Server RUINED\n', err)
  process.exit(1)
})

process.on('SIGINT', () => {
  console.log('Server has been stopped')
  server.close((err: Error | undefined) => {
    if (err) console.warn('Error ', err)
  })
  process.exit(0)
})
