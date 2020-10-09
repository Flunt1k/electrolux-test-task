import dotenv from 'dotenv'
dotenv.config()

export const keys = {
  MONGO_KEY : process.env.MONGO_KEY,
  PORT: process.env.PORT
}
