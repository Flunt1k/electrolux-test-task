import mongoose from 'mongoose'
import { keys } from '../keys/keys'
import { MongoError } from 'mongodb'

mongoose.connect(keys.MONGO_KEY || 'mongodb://127.0.0.1:27017/electrolux', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  },
  (err: MongoError | null): void => {
    if (err) console.log('MongoError', err)
  })

const db = mongoose.connection

export {db, mongoose};
