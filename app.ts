import express from 'express'
import logger from 'morgan'
import './core/db'

export const app: express.Application = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(logger('dev'))
