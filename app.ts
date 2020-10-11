import express from 'express'
import logger from 'morgan'
import path from 'path'
import './core/db'

import washingMachineRouter from './routes/washingMachine';


export const app: express.Application = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(logger('dev'))

app.use('/api/washingMachine', washingMachineRouter)

if (process.env.MODE === 'production') {
app.use(express.static(path.join(__dirname, '..', 'client/build')))
  app.get('*', (_:any, res:express.Response) => {
    res.sendFile(__dirname + '../client/build/index.html')
  })
}
