import express from 'express'
import {MongoError} from 'mongodb';
export default function (err: Error | MongoError, res: express.Response) {
  res.status(500).json({
    status: 'error',
    message: err.message ? err.message : err
  })
}
