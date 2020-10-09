import express from 'express'
import logger from 'morgan'
import './core/db'

import washingMachineRouter from './routes/washingMachine';


export const app: express.Application = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(logger('dev'))

app.use('/api/washingMachine', washingMachineRouter)
