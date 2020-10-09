import mongoose from 'mongoose';
import {keys} from '../keys/keys';
import {MongoError} from 'mongodb';

mongoose.connect(keys.MONGO_KEY || keys.MONGO_LOCAL, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    },
    (err: MongoError | null): void => {
      if (err) console.log('MongoError', err);
    });

const db = mongoose.connection;

export {db, mongoose};
